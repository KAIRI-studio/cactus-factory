// Run: node qa/update.spec.cjs
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const handlers = {}, navigated = [], deleted = [];
const scope = 'https://kairi-studio.github.io/cactus-factory/';
function client(id, version, url = scope) {
  return { id, url, postMessage(message, ports) {
    assert.equal(message.type, 'CACTUS_PAGE_VERSION');
    if (version) ports[0].reply({ data: { version } });
  }, navigate(url) { navigated.push({ id, url }); return Promise.resolve(); } };
}
class TestChannel {
  constructor() {
    this.port1 = { onmessage: null, close() {} };
    this.port2 = { reply: event => this.port1.onmessage(event) };
  }
}
const context = vm.createContext({
  Promise, MessageChannel: TestChannel, clearTimeout,
  setTimeout: fn => setTimeout(fn, 5),
  self: { registration: { scope }, addEventListener: (name, fn) => handlers[name] = fn,
    clients: { claim: () => Promise.resolve(), matchAll: () => Promise.resolve([
      client('legacy', null), client('outdated', '305'), client('current', '318'),
      client('other-game', null, 'https://kairi-studio.github.io/kanji-quest/')
    ]) } },
  caches: { keys: () => Promise.resolve(['cactus-factory-old','cactus-factory-2026-10-05-318','other-game']),
    delete: key => { deleted.push(key); return Promise.resolve(true); } }
});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../sw.js'), 'utf8'), context);
let activation;
handlers.activate({ waitUntil: promise => activation = promise });
activation.then(() => {
  assert.deepEqual(navigated.map(x => x.id).sort(), ['legacy', 'outdated']);
  assert.ok(navigated.every(x => x.url === scope), 'reload original URL only');
  assert.deepEqual(deleted, ['cactus-factory-old']);
  console.log('PASS: old pages reload, current pages do not loop, other apps untouched, only old app caches removed');
}).catch(error => { console.error(error); process.exitCode = 1; });
