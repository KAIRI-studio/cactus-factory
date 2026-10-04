// No dependencies: node qa/shop.spec.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'game.js'), 'utf8');
const now = Date.now();
const fixture = {
  coins:25000, harvested:140, equipment:{light:3,mist:3,air:3,sensor:3},
  collections:{normal:90,king:2,punk:7,retired:5}, layoutSeed:42,
  tutorialStep:'done',soundEnabled:false,specialSeedQueued:true,
  nutrientTrackingVersion:1,nutrientActivePot:null,
  pots:Array.from({length:24},(_,i)=>({cactusId:i===1?'king':'normal',ready:i>1,stage:i>1?2:0,startedAt:now-1200000,generation:8}))
};
let stored = JSON.stringify(fixture);
const elements = {'#shopPot':{value:'0'},'#shopFeedback':{textContent:''}};
const context = vm.createContext({
  console, Math:Object.create(Math), Date,
  localStorage:{getItem:()=>stored,setItem:(_,value)=>{stored=value}},
  document:{querySelector:selector=>elements[selector] || (elements[selector]={open:false})},
  equipmentTotal:()=>12, playSound:()=>{}, renderShop:()=>{},
});
vm.runInContext(source.slice(0,source.indexOf('const nursery =')),context);
vm.runInContext(source.slice(source.indexOf('function growthSeconds()'),source.indexOf('function rollSpecialSeed()')),context);
vm.runInContext(source.slice(source.indexOf('function refreshNaturalGrowth()'),source.indexOf('function makePot(')),context);
vm.runInContext(source.slice(source.indexOf('const SHOP_PRODUCTS'),source.indexOf('function shopSignature()')),context);
vm.runInContext(source.slice(source.indexOf('function buyShopProduct()'),source.indexOf('SHOP_PRODUCTS.forEach')),context);
vm.runInContext('function render() { refreshNaturalGrowth(); save(); }',context);
const run = code => vm.runInContext(code,context);
const data = code => JSON.parse(run('JSON.stringify('+code+')'));
assert.deepEqual(data('state.collections'), fixture.collections, 'old saves preserve all collection entries');
assert.deepEqual(data('state.pots'), fixture.pots, 'old showcase migration never overwrites growing/ready pots');
assert.equal(run('state.coins'),25000);
run('selectedShopProduct="gold"; buyShopProduct()');
assert.equal(run('state.coins'),15000);
assert.equal(run('state.pots[0].shopSeed'),'gold');
assert.notEqual(run('state.pots[0].cactusId'),'normal');
assert.equal(run('state.pots[0].startedAt'),fixture.pots[0].startedAt);
assert.deepEqual(data('state.collections'),fixture.collections,'purchase does not collect early');
run('buyShopProduct()');
assert.equal(run('state.coins'),15000,'duplicate seed rejected');
run('state=loadState()');
assert.equal(run('state.pots[0].shopSeed'),'gold','seed persists across reload');
assert.equal(run('state.specialSeedQueued'),true,'queued nutrient preserved');
run('selectedShopProduct="fertilizer"; buyShopProduct()');
assert.equal(run('state.coins'),14500);
assert.equal(run('state.pots[0].ready'),true,'remaining time less than an hour finishes immediately');
run('buyShopProduct()');
assert.equal(run('state.coins'),14500,'ready pot cannot consume fertilizer');
elements['#shopPot'].value='1';
run('selectedShopProduct="mystery"; buyShopProduct()');
assert.equal(run('state.coins'),11500);
assert.equal(run('state.pots[1].shopSeed'),'mystery');
run('state.coins=10; state.pots[2].ready=false; state.pots[2].startedAt=Date.now()');
elements['#shopPot'].value='2';
run('buyShopProduct()');
assert.equal(run('state.coins'),10,'overdraft rejected');
run('state.coins=25000; state.nutrientActivePot=2; buyShopProduct()');
assert.equal(run('state.coins'),25000,'seed never overwrites active nutrient');
run('state.nutrientActivePot=null; selectedShopProduct="fertilizer"; buyShopProduct()');
assert.ok(Math.abs(run('state.pots[2].startedAt') - (Date.now()-3600000)) < 1000);
const odds = run(`(() => {
 const random=Math.random,result={};
 try { for(const kind of ['gold','mystery']) {
   result[kind]={normal:0,rare:0,super:0,legend:0};
   for(let i=0;i<100000;i++) { Math.random=()=> (i+.5)/100000; result[kind][cactusType(rollShopSeed(kind)).rarityKey]++; }
 } } finally { Math.random=random; } return JSON.stringify(result);
})()`);
assert.deepEqual(JSON.parse(odds),{gold:{normal:0,rare:80000,super:19900,legend:100},mystery:{normal:60000,rare:30000,super:9900,legend:100}});
// The harvest path clears the consumed seed before the next growth cycle.
assert.match(source,/delete pot\.shopSeed;\s*pot\.ready = false/);
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw = fs.readFileSync(path.join(root,'sw.js'),'utf8');
for(const id of ['shopDialog','shopOpen','shopClose','shopCoins','shopProducts','shopPot','shopHint','shopBuy','shopFeedback']) assert.match(html,new RegExp('id="'+id+'"'));
for(const file of ['game.js?v=302','styles.css?v=302']) { assert.ok(html.includes(file)); assert.ok(sw.includes(file)); }
assert.equal(run('STORAGE'),'cactus-line-v4');
assert.ok(!sw.includes('localStorage'));
console.log('PASS: old save preservation, seed/fertilizer purchases, repeat guards, nutrient coexistence, reload, exact odds, harvest cleanup, UI IDs and PWA cache versions');
