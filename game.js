const POT_COUNT = 24;
const ROSTER_SHOWCASE = { 1: "sleepy", 2: "robot", 3: "mechanic", 4: "hero", 5: "pirate", 6: "kappa", 7: "chef", 8: "astronaut", 9: "salaryman", 10: "scientist", 11: "cowboy", 12: "explorer", 13: "ghost", 14: "boxer", 15: "surfer", 16: "punk", 17: "sage", 18: "lord", 19: "king", 20: "ninja", 21: "withered", 22: "dragon", 23: "idol" };
const NEW_SHOWCASE_IDS = { 1: "sleepy", 2: "robot", 4: "hero", 6: "kappa", 8: "astronaut", 10: "scientist", 12: "explorer", 14: "boxer", 22: "dragon" };
const STORAGE = "cactus-line-v4";
const SOIL_SECONDS = 5 * 60;
const CACTUS_TYPES = [
  { id: "normal", name: "みどりサボテン", rarity: "ノーマル", rarityKey: "normal", sprite: "assets/cactus-normal.png", reward: 10, description: "いつも げんきで にこにこ。みんなの なかま。" },
  { id: "punk", name: "パンクサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-punk-slim-v267.png", reward: 50, description: "あかい モヒカンと くろい ベストが じまん。" },
  { id: "idol", name: "アイドルサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-idol-slim-v271.png", reward: 50, description: "おおきな リボンで みんなを えがおに するよ。" },
  { id: "withered", name: "かれたサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-withered-slim-v271.png", reward: 150, description: "かれた からだに ふしぎな ちからを やどす。" },
  { id: "king", name: "おうさまサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-king-unified.png", reward: 150, description: "ちいさな おうかんを のせた みどりの おうさま。" },
  { id: "mechanic", name: "せいびしサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-mechanic-simple-v263.png", reward: 30, description: "こうじょうの どうぐを つかいこなす。" },
  { id: "pirate", name: "かいぞくサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-pirate-simple-v263.png", reward: 50, description: "たからものを さがして ぼうけんする。" },
  { id: "chef", name: "コックサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-chef-slim-v271.png", reward: 30, description: "おいしい りょうりを つくる。" },
  { id: "salaryman", name: "サラリーマンサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-salaryman-simple-v263.png", reward: 30, description: "かばんを もって しごとに いく。" },
  { id: "cowboy", name: "カウボーイサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-cowboy-simple-v263.png", reward: 30, description: "ぼうしが じまんの たびびと。" },
  { id: "ghost", name: "おばけサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-ghost-simple-v263.png", reward: 30, description: "よるに ふわふわ あらわれる。" },
  { id: "surfer", name: "サーファーサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-surfer-slim-v271.png", reward: 150, description: "なみに のるのが だいすき。" },
  { id: "sage", name: "せんにんサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-sage-slim-v271.png", reward: 50, description: "やまおくで しゅぎょうを つづける。" },
  { id: "lord", name: "とのさまサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-lord-slim-v271.png", reward: 150, description: "おうぎを ひらいて いばっている。" },
  { id: "ninja", name: "ニンジャサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-ninja-simple-v263.png", reward: 30, description: "しずかに すばやく かけぬける。" },
  { id: "sleepy", name: "ねぼすけサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-sleepy-simple-v266.png", reward: 30, description: "いつでも ねむそう。あさは ちょっぴり にがて。" },
  { id: "robot", name: "ロボサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-robot-simple-v266.png", reward: 30, description: "ピコピコ うごく こうじょうの なかま。" },
  { id: "hero", name: "ヒーローサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-hero-simple-v266.png", reward: 150, description: "あかい マントで なかまを まもる。" },
  { id: "kappa", name: "カッパサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-kappa-beak-v269.png", reward: 30, description: "くちばしと あたまの おさらが じまん。" },
  { id: "astronaut", name: "うちゅうひこうしサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-astronaut-simple-v266.png", reward: 50, description: "うちゅうへ とびだす ひを ゆめみている。" },
  { id: "scientist", name: "はかせサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-scientist-simple-v266.png", reward: 30, description: "ふしぎな くすりを けんきゅうちゅう。" },
  { id: "explorer", name: "たんけんたいサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-explorer-simple-v266.png", reward: 30, description: "そうがんきょうで あたらしい せかいを さがす。" },
  { id: "boxer", name: "ボクサーサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-boxer-simple-v266.png", reward: 30, description: "まいにち げんきに トレーニング。" },
  { id: "magician", name: "マジシャンサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-magician-simple-v266.png", reward: 50, description: "ほしの ステッキで ふしぎな マジック。" },
  { id: "dragon", name: "ドラゴンサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-dragon-simple-v266.png", reward: 150, description: "ちいさな つばさで そらを めざす。" },
  { id: "santa", name: "サンタサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-santa-v270.png", reward: 50, description: "あかい ぼうしと しろい ひげが じまん。" },
  { id: "honey", name: "はちみつサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-honey-v270.png", reward: 30, description: "あまい はちみつの つぼを はこんでいる。" },
  { id: "firefighter", name: "しょうぼうしサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-firefighter-v270.png", reward: 30, description: "あかい ヘルメットで みんなを まもる。" },
  { id: "musician", name: "おんがくかサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-musician-v270.png", reward: 30, description: "タンバリンで たのしく リズムを きざむ。" },
  { id: "samurai", name: "さむらいサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-samurai-v270.png", reward: 30, description: "ちょんまげと かたなを たいせつに している。" },
  { id: "wizard", name: "まほうつかいサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-wizard-v270.png", reward: 50, description: "ほしの つえで まほうの れんしゅうちゅう。" },
  { id: "thief", name: "どろぼうサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-thief-v270.png", reward: 30, description: "しましまの ふくろを かついで こっそり あるく。" },
  { id: "festival", name: "おまつりサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-festival-v270.png", reward: 30, description: "うちわを ふって おまつりを たのしむ。" },
  { id: "angel", name: "てんしサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-angel-v270.png", reward: 50, description: "ちいさな はねで ふわりと まいおりる。" },
  { id: "devil", name: "あくまサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-devil-v270.png", reward: 50, description: "あかい つのと マントが じまん。" },
  { id: "sumo", name: "おすもうサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-sumo-v270.png", reward: 30, description: "まわしを しめて どすこい！" },
  { id: "phoenix", name: "フェニックスサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-phoenix-v270.png", reward: 150, description: "ほのおの はねを ひろげて はばたく。" },
  { id: "unicorn", name: "ユニコーンサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-unicorn-v270.png", reward: 150, description: "ひとつの つのに ふしぎな ひかりが やどる。" },
  { id: "sun", name: "たいようサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-sun-v270.png", reward: 150, description: "おひさまみたいに あかるく かがやく。" },
  { id: "moon", name: "つきサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-moon-v270.png", reward: 150, description: "みかづきと いっしょに よるを てらす。" },
];
const RARE_CACTUS_IDS = CACTUS_TYPES.filter(function (type) { return type.rarityKey === "rare"; }).map(function (type) { return type.id; });
const SUPER_CACTUS_IDS = CACTUS_TYPES.filter(function (type) { return type.rarityKey === "super"; }).map(function (type) { return type.id; });
const LEGEND_CACTUS_IDS = CACTUS_TYPES.filter(function (type) { return type.rarityKey === "legend"; }).map(function (type) { return type.id; });

const ACTIVE_CACTUS_IDS = new Set(CACTUS_TYPES.map(function (type) { return type.id; }));

function rollCactusId() {
  const roll = Math.random() * 100;
  if (roll < .1) return LEGEND_CACTUS_IDS[Math.floor(roll / (.1 / LEGEND_CACTUS_IDS.length))];
  if (roll < 2) return SUPER_CACTUS_IDS[Math.floor((roll - .1) / (1.9 / SUPER_CACTUS_IDS.length))];
  if (roll < 10) return RARE_CACTUS_IDS[Math.floor((roll - 2) / (8 / RARE_CACTUS_IDS.length))];
  return "normal";
}

function cactusType(id) {
  return CACTUS_TYPES.find(function (type) { return type.id === id; }) || CACTUS_TYPES[0];
}

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE));
    if (saved && saved.pots && saved.pots.length === POT_COUNT) {
      if (!Number.isInteger(saved.layoutSeed)) saved.layoutSeed = Math.floor(Math.random() * 2147483647);
      if (!saved.equipment) {
        const oldLevel = Math.max(1, Math.min(3, Number(saved.equipmentLevel) || 1));
        saved.equipment = oldLevel >= 3
          ? { light: 2, mist: 2, air: 2, sensor: 2 }
          : oldLevel === 2
            ? { light: 2, mist: 2, air: 1, sensor: 1 }
            : { light: 1, mist: 1, air: 1, sensor: 1 };
      }
      ["light", "mist", "air", "sensor"].forEach(function (key) {
        saved.equipment[key] = Math.max(0, Math.min(3, Number(saved.equipment[key]) || 0));
      });
      saved.pots.forEach(function (pot) {
        if (!Number.isInteger(pot.generation)) pot.generation = 0;
        if (!pot.cactusId) pot.cactusId = "normal";
      });
      if (!saved.collections) saved.collections = { normal: saved.harvested || 0 };
      if (!Number.isInteger(saved.lastViewedCollectionCount)) {
        saved.lastViewedCollectionCount = CACTUS_TYPES.filter(function (type) { return (saved.collections[type.id] || 0) > 0; }).length;
      }
      saved.rarityVersion = 7;
      saved.specialSeedQueued = Boolean(saved.specialSeedQueued);
      if (!saved.shopPlant || !ACTIVE_CACTUS_IDS.has(saved.shopPlant.cactusId) || !Number.isFinite(saved.shopPlant.startedAt)) saved.shopPlant = null;
      if (typeof saved.soundEnabled !== "boolean") saved.soundEnabled = true;
      if (!["harvest", "math", "equipment", "done"].includes(saved.tutorialStep)) {
        saved.tutorialStep = (Number(saved.harvested) || 0) > 0 ? "done" : "harvest";
      }
      if (saved.nutrientTrackingVersion !== 1) {
        saved.nutrientTrackingVersion = 1;
        saved.nutrientActivePot = null;
        if (!saved.specialSeedQueued) {
          const growingRare = saved.pots.findIndex(function (pot) { return !pot.ready && cactusType(pot.cactusId).rarityKey !== "normal"; });
          if (growingRare >= 0) saved.nutrientActivePot = growingRare;
        }
      } else if (!Number.isInteger(saved.nutrientActivePot) || saved.nutrientActivePot < 0 || saved.nutrientActivePot >= POT_COUNT) saved.nutrientActivePot = null;
      // Retire showcase migrations without replacing any player's plants or collection.
      saved.visualVersion = 4;
      saved.rosterVersion = 1;
      saved.rosterShowcaseVersion = Math.max(3, Number(saved.rosterShowcaseVersion) || 0);
      // Earlier builds showed the full roster even before the first harvest.
      // Correct those untouched starters without changing an existing collection.
      if ((Number(saved.harvested) || 0) === 0
          && saved.pots.every(function (pot) { return pot.ready && (Number(pot.generation) || 0) === 0; })
          && CACTUS_TYPES.every(function (type) { return (Number(saved.collections[type.id]) || 0) === 0; })
          && saved.pots.some(function (pot) { return pot.cactusId !== "normal"; })) {
        saved.pots.forEach(function (pot) { pot.cactusId = "normal"; });
        localStorage.setItem(STORAGE, JSON.stringify(saved));
      }
      return saved;
    }
  } catch {}
  return createInitialState();
}

function createInitialState() {
  return {
    coins: 120,
    equipment: { light: 0, mist: 0, air: 0, sensor: 0 },
    harvested: 0,
    tutorialStep: "harvest",
    soundEnabled: true,
    visualVersion: 4,
    rarityVersion: 7,
    rosterVersion: 1,
    rosterShowcaseVersion: 3,
    collections: Object.fromEntries(CACTUS_TYPES.map(function (type) { return [type.id, 0]; })),
    lastViewedCollectionCount: 0,
    specialSeedQueued: false,
    shopPlant: null,
    nutrientActivePot: null,
    nutrientTrackingVersion: 1,
    layoutSeed: Math.floor(Math.random() * 2147483647),
    pots: Array.from({ length: POT_COUNT }, function (_, i) {
      return { stage: 2, ready: true, startedAt: Date.now() - 70000 - i * 1700, generation: 0, cactusId: "normal" };
    }),
  };
}

function save() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
const nursery = document.querySelector("#nursery");
const coinCount = document.querySelector("#coinCount");
const factoryProgressButton = document.querySelector("#factoryProgressButton");
const factoryProgressDialog = document.querySelector("#factoryProgressDialog");
const factoryProgressClose = document.querySelector("#factoryProgressClose");
const equipmentCoinCount = document.querySelector("#equipmentCoinCount");
const equipmentCoinMeter = document.querySelector("#equipmentCoinMeter");
const equipmentLevelText = document.querySelector("#equipmentLevelText");
const specialNutrient = document.querySelector("#specialNutrient");
const game = document.querySelector(".game");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const brandSplash = document.querySelector("#brandSplash");
const titleScreen = document.querySelector("#titleScreen");
const startGameButton = document.querySelector("#startGameButton");
const screenShutter = document.querySelector("#screenShutter");
const soundToggle = document.querySelector("#soundToggle");
const onboardingTip = document.querySelector("#onboardingTip");
const onboardingStep = document.querySelector("#onboardingStep");
const onboardingText = document.querySelector("#onboardingText");
const onboardingSkip = document.querySelector("#onboardingSkip");
const factoryGuide = document.querySelector("#factoryGuide");
const factoryGuideButton = document.querySelector("#factoryGuideButton");
const factoryGuideKicker = document.querySelector("#factoryGuideKicker");
const factoryGuideText = document.querySelector("#factoryGuideText");
const factoryGuideAction = document.querySelector("#factoryGuideAction");
const upgradeCelebration = document.querySelector("#upgradeCelebration");
const upgradeCelebrationClose = document.querySelector("#upgradeCelebrationClose");
const upgradeCelebrationEquipment = document.querySelector("#upgradeCelebrationEquipment");
const upgradeCelebrationName = document.querySelector("#upgradeCelebrationName");
const upgradeCelebrationLevel = document.querySelector("#upgradeCelebrationLevel");
let tutorialTimer;
let upgradeCelebrationTimer;
let audioContext;

function hideUpgradeCelebration() {
  window.clearTimeout(upgradeCelebrationTimer);
  upgradeCelebration.classList.remove("show");
  if (upgradeCelebration.hidden) return;
  if (reduceMotion.matches) {
    upgradeCelebration.classList.remove("hiding");
    upgradeCelebration.hidden = true;
    return;
  }
  upgradeCelebration.classList.add("hiding");
  upgradeCelebrationTimer = window.setTimeout(function () {
    upgradeCelebration.classList.remove("hiding");
    upgradeCelebration.hidden = true;
  }, 280);
}

function showUpgradeCelebration(item, fromLevel, toLevel) {
  window.clearTimeout(upgradeCelebrationTimer);
  upgradeCelebrationName.textContent = item.name;
  upgradeCelebrationLevel.textContent = "LV." + fromLevel + " → LV." + toLevel;
  upgradeCelebrationClose.setAttribute("aria-label", "強化完了！ " + item.name + " LV." + fromLevel + "からLV." + toLevel + "。タップで閉じる");
  upgradeCelebrationEquipment.className = "upgrade-celebration-equipment upgrade-celebration-equipment-" + item.key;
  upgradeCelebration.hidden = false;
  upgradeCelebration.classList.remove("show", "hiding");
  void upgradeCelebration.offsetWidth;
  upgradeCelebration.classList.add("show");
  upgradeCelebrationTimer = window.setTimeout(hideUpgradeCelebration, 3600);
}

upgradeCelebrationClose.addEventListener("click", hideUpgradeCelebration);

function getAudioContext() {
  if (!state.soundEnabled) return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(function () {});
  return audioContext;
}

const SOUND_FILES = {
  harvest: "assets/audio/harvest.mp3", tap: "assets/audio/tap.mp3",
  correct: "assets/audio/correct.mp3", wrong: "assets/audio/wrong.mp3",
  reward: "assets/audio/reward.mp3"
};
const soundBytes = new Map();
const soundBuffers = new Map();
const soundVoices = new Map();
const soundLastPlayed = new Map();
Object.entries(SOUND_FILES).forEach(function ([key, url]) {
  soundBytes.set(key, fetch(url).then(function (response) {
    if (!response.ok) throw new Error("Sound unavailable");
    return response.arrayBuffer();
  }).catch(function () { return null; }));
});

const bgmAudio = document.querySelector("#bgmAudio");
let bgmGain, bgmMediaSource, factoryAudioStarted = false, bgmDuckUntil = 0, bgmDuckTimer;
function updateBgmVolume() {
  if (!bgmGain || !audioContext) return;
  const target = !state.soundEnabled || document.hidden ? 0 :
    performance.now() < bgmDuckUntil ? .14 : mathDialog.open ? .22 : .32;
  bgmGain.gain.cancelScheduledValues(audioContext.currentTime);
  bgmGain.gain.setTargetAtTime(target, audioContext.currentTime, .12);
}
function startBgm() {
  if (!bgmAudio || !factoryAudioStarted || !state.soundEnabled || document.hidden) return;
  const context = getAudioContext();
  if (!context) return;
  if (!bgmMediaSource) {
    bgmMediaSource = context.createMediaElementSource(bgmAudio);
    bgmGain = context.createGain(); bgmGain.gain.value = 0;
    bgmMediaSource.connect(bgmGain); bgmGain.connect(context.destination);
  }
  updateBgmVolume();
  bgmAudio.play().catch(function () { /* Retry on the next user gesture. */ });
}
function duckBgm() {
  bgmDuckUntil = performance.now() + 2800;
  updateBgmVolume(); clearTimeout(bgmDuckTimer);
  bgmDuckTimer = setTimeout(updateBgmVolume, 2850);
}
const bgmDialogObserver = new MutationObserver(updateBgmVolume);
document.querySelectorAll("dialog").forEach(function (dialog) {
  bgmDialogObserver.observe(dialog, { attributes: true, attributeFilter: ["open"] });
});

function stopSounds() {
  if (bgmAudio) bgmAudio.pause();
  updateBgmVolume();
  soundVoices.forEach(function (voices) {
    voices.forEach(function (source) { try { source.stop(); } catch (_) {} });
  });
  soundVoices.clear();
}

async function playSound(name) {
  if (!state.soundEnabled || document.hidden) return;
  const key = name === "start" ? "tap" : ["upgrade", "result", "rare"].includes(name) ? "reward" : name;
  if (!SOUND_FILES[key]) return;
  const context = getAudioContext();
  if (!context) return;
  const requestedAt = performance.now();
  const previous = soundLastPlayed.get(key) || -Infinity;
  if (requestedAt - previous < (key === "harvest" ? 70 : 100)) return;
  soundLastPlayed.set(key, requestedAt);
  try {
    if (!soundBuffers.has(key)) {
      soundBuffers.set(key, soundBytes.get(key).then(function (bytes) {
        return bytes ? context.decodeAudioData(bytes.slice(0)) : null;
      }).catch(function () { return null; }));
    }
    const buffer = await soundBuffers.get(key);
    if (!buffer || !state.soundEnabled || document.hidden || performance.now() - requestedAt > 500) return;
    const group = key === "correct" || key === "wrong" ? "answer" : key;
    const voices = soundVoices.get(group) || [];
    const limit = key === "harvest" ? 3 : 1;
    while (voices.length >= limit) { try { voices.shift().stop(); } catch (_) {} }
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    gain.gain.value = key === "tap" ? .65 : key === "reward" ? .8 : .85;
    source.connect(gain); gain.connect(context.destination);
    voices.push(source); soundVoices.set(group, voices);
    source.onended = function () {
      const index = voices.indexOf(source);
      if (index !== -1) voices.splice(index, 1);
      source.disconnect(); gain.disconnect();
    };
    source.start();
    if (key === "reward") duckBgm();
  } catch (_) { /* Audio failure must not interrupt play. */ }
}

document.addEventListener("click", function (event) {
  if (bgmAudio && bgmAudio.paused) startBgm();
  const button = event.target.closest("button, summary");
  if (!button || button.disabled || button.closest("#answerGrid, .nursery-pot") ||
      ["soundToggle", "startGameButton", "upgradeButton"].includes(button.id) ||
      button.classList.contains("equipment-upgrade")) return;
  playSound("tap");
}, true);
document.addEventListener("visibilitychange", function () {
  if (document.hidden) stopSounds();
  else startBgm();
});

function renderSoundSetting() {
  if (!soundToggle) return;
  soundToggle.textContent = state.soundEnabled ? "ON" : "OFF";
  soundToggle.classList.toggle("is-off", !state.soundEnabled);
  soundToggle.setAttribute("aria-pressed", String(state.soundEnabled));
}

soundToggle.addEventListener("click", function () {
  state.soundEnabled = !state.soundEnabled;
  renderSoundSetting();
  save();
  if (state.soundEnabled) { startBgm(); playSound("tap"); }
  else stopSounds();
});

const TUTORIAL_COPY = {
  harvest: { number: "1 / 3", text: "サボテンを タップして しゅうかく！", target: ".nursery-pot.ready" },
  math: { number: "2 / 3", text: "けいさんで はやく そだつよ！", target: "#mathButton" },
  equipment: { number: "3 / 3", text: "コインで せつびを つよくしよう！", target: "#equipmentButton" },
};

function clearTutorialFocus() {
  document.querySelectorAll(".tutorial-focus").forEach(function (element) { element.classList.remove("tutorial-focus"); });
}

function hideTutorial() {
  window.clearTimeout(tutorialTimer);
  clearTutorialFocus();
  onboardingTip.hidden = true;
}

function showTutorial() {
  hideTutorial();
  const step = state.tutorialStep;
  const copy = TUTORIAL_COPY[step];
  if (!copy || game.getAttribute("aria-hidden") === "true" || document.querySelector("dialog[open]")) return;
  factoryGuide.hidden = true;
  onboardingStep.textContent = copy.number;
  onboardingText.textContent = copy.text;
  onboardingSkip.textContent = step === "equipment" ? "とじる" : "つぎへ";
  onboardingSkip.setAttribute("aria-label", step === "equipment" ? "はじめてガイドを閉じる" : "つぎのガイドを見る");
  onboardingTip.className = "onboarding-tip stage-" + step;
  onboardingTip.hidden = false;
  const target = document.querySelector(copy.target);
  if (target) target.classList.add("tutorial-focus");
}

function scheduleTutorial(delay) {
  window.clearTimeout(tutorialTimer);
  tutorialTimer = window.setTimeout(showTutorial, delay || 0);
}

function finishTutorial() {
  const newlyFinished = state.tutorialStep !== "done";
  state.tutorialStep = "done";
  if (newlyFinished && window.CactusInstall) window.CactusInstall.beginSuggestion();
  hideTutorial();
  save();
  renderFactoryGuide();
}

function showNextTutorialTip() {
  const nextStep = { harvest: "math", math: "equipment", equipment: "done" }[state.tutorialStep];
  if (!nextStep || nextStep === "done") {
    finishTutorial();
    return;
  }
  state.tutorialStep = nextStep;
  hideTutorial();
  save();
  scheduleTutorial(140);
}

onboardingSkip.addEventListener("click", showNextTutorialTip);

if (new URLSearchParams(window.location.search).get("debug") === "1") {
  document.body.classList.add("debug-mode");
}

function showTitleScreen() {
  brandSplash.hidden = true;
  document.body.classList.remove("launching");
  titleScreen.hidden = false;
  requestAnimationFrame(function () {
    titleScreen.classList.add("is-visible");
    startGameButton.disabled = false;
  });
}

function enterFactory() {
  if (startGameButton.disabled) return;
  startGameButton.disabled = true;
  screenShutter.classList.add("is-closing");
  window.setTimeout(function () {
    titleScreen.hidden = true;
    game.setAttribute("aria-hidden", "false");
    renderFactoryGuide();
    screenShutter.classList.remove("is-closing");
    screenShutter.classList.add("is-opening");
    window.setTimeout(function () {
      screenShutter.classList.remove("is-opening");
      scheduleTutorial(reduceMotion.matches ? 40 : 240);
    }, reduceMotion.matches ? 0 : 250);
  }, reduceMotion.matches ? 0 : 320);
}

startGameButton.addEventListener("click", function () {
  factoryAudioStarted = true;
  startBgm();
  playSound("start");
  enterFactory();
});
window.setTimeout(showTitleScreen, reduceMotion.matches ? 120 : 3000);
const EQUIPMENT = [
  { key: "light", icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="15" r="6"/><path d="M16 3v4M16 23v4M4 15h4M24 15h4M7.5 6.5l3 3M21.5 20.5l3 3M24.5 6.5l-3 3M10.5 20.5l-3 3"/></svg>', name: "そだてるライト", copy: "ランプが 1とう → 3とう → 5とう" },
  { key: "mist", icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4C12 10 9 13.4 9 18a7 7 0 0 0 14 0c0-4.6-3-8-7-14z"/><path d="M5 27h7M15 27h5M23 27h4"/></svg>', name: "ミスト", copy: "ノズルが 1こ → 2こ → 3こ" },
  { key: "air", icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="3"/><circle cx="16" cy="16" r="12"/><path d="M16 13c-1-6 1-9 4-8.2 3.1.8 2.6 5.3-1.5 9M18.6 17.5c5.7 2 7.3 5.3 5.1 7.4-2.2 2.2-5.9-.5-7.2-5M13.4 17.5c-4.7 3.9-8.4 3.3-9.2.3-.8-3 3.4-4.8 8.1-2.3"/></svg>', name: "かぜおくり", copy: "こがた → おおがた → ターボ" },
  { key: "sensor", icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="5" width="16" height="22" rx="4"/><circle cx="16" cy="19" r="3"/><path d="M12 11h8M12 14h5M5 10c-2 3.5-2 8.5 0 12M27 10c2 3.5 2 8.5 0 12"/></svg>', name: "みまもり", copy: "おんどけい → パネル → かんせい盤" },
];
const FACILITY_BACKGROUNDS = {
  base: "assets/original-sand-factory-v2.png",
  // Keep the wind system visually consistent with the completed large fan.
  air: "assets/sand-factory-automatic.png?v=3",
  sensor: "assets/factory-sensor.png",
  complete: "assets/sand-factory-automatic.png?v=3",
};
const PLANT_VARIANTS = [
  { scale: 1.06, rotate: -1.1, shift: -1.2, flip: 1, hue: -2, bright: 1.01 },
  { scale: .96, rotate: 1.4, shift: .8, flip: -1, hue: 1, bright: .98 },
  { scale: 1.02, rotate: -.4, shift: 0, flip: 1, hue: 3, bright: 1 },
  { scale: .93, rotate: 1.8, shift: 1.2, flip: 1, hue: -1, bright: 1.02 },
  { scale: 1.08, rotate: .7, shift: -.8, flip: -1, hue: 2, bright: .99 },
  { scale: .98, rotate: -1.6, shift: .5, flip: 1, hue: -3, bright: 1.01 },
  { scale: 1.03, rotate: 1.1, shift: -1, flip: -1, hue: 0, bright: .98 },
  { scale: .95, rotate: -.8, shift: 1.1, flip: 1, hue: 3, bright: 1.02 },
  { scale: 1.05, rotate: -1.3, shift: .3, flip: 1, hue: -2, bright: 1 },
  { scale: .97, rotate: 1.6, shift: -.6, flip: -1, hue: 1, bright: 1.01 },
  { scale: 1.01, rotate: .4, shift: 1, flip: 1, hue: -1, bright: .99 },
  { scale: .94, rotate: -1.7, shift: -.4, flip: -1, hue: 2, bright: 1.02 },
];
Object.values(FACILITY_BACKGROUNDS).forEach(function (src) { const image = new Image(); image.src = src; });
let harvestAnimationCount = 0;
const potSignatures = Array(POT_COUNT).fill("");
function equipmentTotal() { return Object.values(state.equipment).reduce(function (sum, level) { return sum + level; }, 0); }
function equipmentUpgradeCost(level) {
  if (level === 0) return 100;
  if (level === 1) return 300;
  return 700;
}

function collectionFoundCount() {
  return CACTUS_TYPES.filter(function (type) { return (state.collections[type.id] || 0) > 0; }).length;
}

function renderFactoryProgress() {
  const found = collectionFoundCount();
  const equipment = equipmentTotal();
  const maximum = CACTUS_TYPES.length + 12;
  const total = found + equipment;
  const percent = Math.round(total / maximum * 100);
  let rank = "こうじょう かどうちゅう";
  if (total >= maximum) rank = "サボテンマスター";
  else if (total >= 16) rank = "ベテランこうじょう";
  else if (total >= 10) rank = "ぐんぐん せいちょうちゅう";
  else if (total >= 5) rank = "なかまが ふえてきた";

  let nextGoal = "まずは サボテンを みつけよう！";
  if (total >= maximum) nextGoal = "サボテンこうじょう かんせい！";
  else if (found < CACTUS_TYPES.length) nextGoal = "あと " + (CACTUS_TYPES.length - found) + "しゅるいで ずかんかんせい";
  else nextGoal = "あと " + (12 - equipment) + "レベルで せつびかんせい";

  document.querySelector("#factoryProgressCount").textContent = total + " / " + maximum;
  document.querySelector("#factoryProgressFill").style.width = percent + "%";
  factoryProgressButton.classList.toggle("is-complete", total >= maximum);
  factoryProgressButton.setAttribute("aria-label", "こうじょうの たっせいど " + total + " / " + maximum + "。" + nextGoal);
  document.querySelector("#factoryRankLabel").textContent = rank;
  document.querySelector("#factoryRankPercent").textContent = percent + "%";
  document.querySelector("#factoryNextGoal").textContent = nextGoal;
  document.querySelector("#factoryCollectionCount").textContent = found + " / " + CACTUS_TYPES.length;
  document.querySelector("#factoryCollectionFill").style.width = (found / CACTUS_TYPES.length * 100) + "%";
  document.querySelector("#factoryEquipmentCount").textContent = equipment + " / 12";
  document.querySelector("#factoryEquipmentFill").style.width = (equipment / 12 * 100) + "%";
  document.querySelector("#factoryCompleteStamp").hidden = total < maximum;
  factoryProgressDialog.classList.toggle("is-complete", total >= maximum);
}

function affordableEquipmentUpgrade() {
  return Object.keys(state.equipment).find(function (key) {
    const level = state.equipment[key];
    return level < 3 && state.coins >= equipmentUpgradeCost(level);
  });
}

function factoryGuideRecommendation() {
  if (window.CactusInstall && window.CactusInstall.shouldSuggest()) {
    return { type: "install", kicker: "いつでも こうじょうへ", text: window.CactusInstall.suggestionText, action: "追加する" };
  }
  const foundCount = collectionFoundCount();
  if (foundCount > state.lastViewedCollectionCount) {
    return { type: "zukan", kicker: "あたらしい なかま", text: "あたらしい なかまを ずかんでみよう！", action: "ずかんへ" };
  }
  const readyCount = state.pots.filter(function (pot) { return pot.ready; }).length;
  if (readyCount > 0) {
    return { type: "harvest", kicker: "しゅうかく", text: readyCount + "たいの サボテンが まってるよ！", action: "みつける" };
  }
  if (affordableEquipmentUpgrade()) {
    return { type: "equipment", kicker: "せつび かいぞう", text: "コインで せつびを つよくできるよ！", action: "せつびへ" };
  }
  return { type: "math", kicker: "そだつ チャンス", text: "けいさんで はやく そだてよう！", action: "ちょうせん" };
}

function renderFactoryGuide() {
  if (!factoryGuide || state.tutorialStep !== "done" || game.getAttribute("aria-hidden") === "true") {
    if (factoryGuide) factoryGuide.hidden = true;
    return;
  }
  const recommendation = factoryGuideRecommendation();
  document.querySelector("#installLater").hidden = recommendation.type !== "install";
  const passive = recommendation.type === "harvest";
  factoryGuide.className = "factory-guide guide-" + recommendation.type + (passive ? " is-passive" : "");
  factoryGuide.dataset.action = recommendation.type;
  factoryGuideKicker.textContent = recommendation.kicker;
  factoryGuideText.textContent = recommendation.text;
  factoryGuideAction.textContent = recommendation.action;
  factoryGuideAction.hidden = passive;
  factoryGuideButton.disabled = passive;
  factoryGuideButton.setAttribute("aria-label", passive ? recommendation.text : recommendation.text + " " + recommendation.action);
  factoryGuide.hidden = false;
}

factoryGuideButton.addEventListener("click", function () {
  const action = factoryGuide.dataset.action;
  if (action === "install") {
    window.CactusInstall.open();
    return;
  }
  if (action === "zukan") {
    document.querySelector("#zukanButton").click();
    return;
  }
  if (action === "equipment") {
    document.querySelector("#equipmentButton").click();
    return;
  }
  if (action === "math") {
    document.querySelector("#mathButton").click();
    return;
  }
});
function nutrientIsInUse() {
  return state.specialSeedQueued || Number.isInteger(state.nutrientActivePot);
}

function renderSpecialNutrient() {
  const growingBatch = Number.isInteger(state.nutrientActivePot);
  const allPotsReady = state.pots.every(function (pot) { return pot.ready; });
  if (!state.specialSeedQueued && growingBatch && allPotsReady) {
    state.nutrientActivePot = null;
  }
  const inUse = nutrientIsInUse();
  specialNutrient.hidden = !inUse;
  specialNutrient.dataset.phase = state.specialSeedQueued ? "queued" : "growing";
  specialNutrient.setAttribute("aria-label", state.specialSeedQueued
    ? "レア栄養剤 待機中。つぎに収穫した場所へ使います"
    : "レア栄養剤 使用中。すべてのサボテンが生えたら終了します");
}
function growthSeconds() {
  const EMPTY_FACTORY_GROWTH_SECONDS = 3 * 60 * 60;
  const REDUCTION_PER_LEVEL_SECONDS = 10 * 60;
  return EMPTY_FACTORY_GROWTH_SECONDS - equipmentTotal() * REDUCTION_PER_LEVEL_SECONDS;
}

function rollSpecialSeed() {
  const roll = Math.random() * 100;
  if (roll < .1) return LEGEND_CACTUS_IDS[Math.floor(roll / (.1 / LEGEND_CACTUS_IDS.length))];
  if (roll < 19) return SUPER_CACTUS_IDS[Math.floor((roll - .1) / (18.9 / SUPER_CACTUS_IDS.length))];
  return RARE_CACTUS_IDS[Math.floor((roll - 19) / (81 / RARE_CACTUS_IDS.length))];
}

// Consumables reuse the existing save and never reset collections or growing pots.
const SHOP_PRODUCTS = [
  { id: "silver", name: "銀のタネ", sprite: "assets/shop-silver-seed-v307.webp", cost: 15000, description: "レア以上 かくてい！専用の鉢で そだてよう。" },
  { id: "gold", name: "金のタネ", sprite: "assets/shop-gold-seed-v307.webp", cost: 50000, description: "スーパーレア以上 かくてい！特別な1体を そだてよう。" }
];
let selectedShopProduct = null;
let lastShopSignature = "";
const shopDialog = document.querySelector("#shopDialog");
let shopReturnsToEquipment = false;
const dedicatedPot = document.querySelector("#dedicatedPot");

function rollShopSeed(id) {
  const roll = Math.random() * 100;
  if (roll < .1) return LEGEND_CACTUS_IDS[Math.floor(roll / (.1 / LEGEND_CACTUS_IDS.length))];
  const superEnd = id === "gold" ? 100 : 20;
  if (roll < superEnd) return SUPER_CACTUS_IDS[Math.floor((roll - .1) / ((superEnd - .1) / SUPER_CACTUS_IDS.length))];
  return RARE_CACTUS_IDS[Math.floor((roll - superEnd) / (80 / RARE_CACTUS_IDS.length))];
}
function shopProductAvailable(product) {
  return !state.shopPlant;
}
function shopSignature() {
  return selectedShopProduct + ":" + state.coins + ":" + (state.shopPlant ? Number(state.shopPlant.ready) + ":" + Math.ceil((growthSeconds() * 1000 - Date.now() + state.shopPlant.startedAt) / 60000) : "empty");
}
function renderShop() {
  lastShopSignature = shopSignature();
  const product = SHOP_PRODUCTS.find(function (item) { return item.id === selectedShopProduct; });
  document.querySelector("#shopCoins").textContent = state.coins.toLocaleString("ja-JP");
  document.querySelectorAll("[data-shop-product]").forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.dataset.shopProduct === selectedShopProduct));
  });
  const buy = document.querySelector("#shopBuy");
  buy.disabled = !product || !shopProductAvailable(product) || state.coins < product.cost;
  buy.textContent = "そだてる";
  document.querySelector("#shopHint").textContent = !product ? "タネを えらんでね。"
    : !shopProductAvailable(product) ? (state.shopPlant ? "専用の鉢の サボテンを収穫したら、次のタネを そだてられるよ。" : "まず専用の鉢に タネを うえよう。")
    : state.coins < product.cost ? "あと " + (product.cost - state.coins).toLocaleString("ja-JP") + "コインで かえるよ！"
    : "栽培エリアの下の 専用の鉢で育つよ。正体は 収穫までのお楽しみ！";
}
function buyShopProduct() {
  refreshNaturalGrowth();
  const product = SHOP_PRODUCTS.find(function (item) { return item.id === selectedShopProduct; });
  if (!product || !shopProductAvailable(product) || state.coins < product.cost) { renderShop(); return; }
  state.coins -= product.cost;
  state.shopPlant = { cactusId: rollShopSeed(product.id), shopSeed: product.id, startedAt: Date.now(), stage: 0, ready: false };
  save();
  shopReturnsToEquipment = false;
  shopDialog.close();
  equipmentDialog.close();
  render();
  dedicatedPot.focus();
  playSound("tap");
}
SHOP_PRODUCTS.forEach(function (product) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "shop-product shop-product-" + product.id;
  button.dataset.shopProduct = product.id;
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = '<span class="shop-item-art"><img src="' + product.sprite + '" alt="" /></span><span class="shop-item-copy"><b>' + product.name + '</b><small>' + product.description + '</small><strong class="shop-price coin-chip">' + document.querySelector(".topbar .coin").outerHTML + '<span>' + product.cost.toLocaleString("ja-JP") + '</span></strong></span>';
  button.addEventListener("click", function () {
    selectedShopProduct = product.id;
    document.querySelector("#shopFeedback").textContent = "";
    renderShop();
  });
  document.querySelector("#shopProducts").append(button);
});
function openSeedShop(returnToEquipment) {
  shopReturnsToEquipment = returnToEquipment;
  equipmentDialog.close();
  selectedShopProduct = null;
  document.querySelector("#shopFeedback").textContent = "";
  renderShop();
  shopDialog.showModal();
}
document.querySelector("#shopOpen").addEventListener("click", function () { openSeedShop(true); });
document.querySelector("#shopClose").addEventListener("click", function () { shopDialog.close(); });
shopDialog.addEventListener("close", function () {
  if (shopReturnsToEquipment) { renderEquipment(); equipmentDialog.showModal(); }
});
shopDialog.addEventListener("click", function (event) { if (event.target === shopDialog) shopDialog.close(); });
document.querySelector("#shopBuy").addEventListener("click", buyShopProduct);

function dedicatedPotStatus() {
  const pot = state.shopPlant;
  if (!pot) return "タネを うえよう";
  if (pot.ready) return "タップで しゅうかく！";
  const minutes = Math.max(1, Math.ceil((growthSeconds() * 1000 - Date.now() + pot.startedAt) / 60000));
  return "そだてています ・ あと " + minutes + "ぷん";
}
function renderDedicatedPot() {
  const pot = state.shopPlant;
  dedicatedPot.hidden = !pot;
  const image = document.querySelector("#dedicatedPlant");
  image.hidden = !pot;
  dedicatedPot.classList.toggle("is-sprout", Boolean(pot && !pot.ready));
  if (pot) image.src = pot.ready ? cactusType(pot.cactusId).sprite : "assets/simple-bold-sprout.png";
  document.querySelector("#dedicatedStatus").textContent = dedicatedPotStatus();
  dedicatedPot.classList.toggle("is-ready", Boolean(pot && pot.ready));
  dedicatedPot.setAttribute("aria-label", "専用の鉢。" + dedicatedPotStatus());
}
function harvestDedicatedPot() {
  refreshNaturalGrowth();
  const pot = state.shopPlant;
  if (!pot || !pot.ready) return;
  const type = cactusType(pot.cactusId);
  const item = { cactusId: type.id, reward: type.reward, isNew: (state.collections[type.id] || 0) === 0 };
  state.collections[type.id] = (state.collections[type.id] || 0) + 1;
  state.coins += type.reward;
  state.harvested += 1;
  state.shopPlant = null;
  save();
  playSound("harvest");
  render();
  if (item.isNew) { discoveryQueue.push(item); playNextDiscovery(); }
  else showRarityReveal(item);
}
dedicatedPot.addEventListener("click", function () {
  refreshNaturalGrowth();
  if (state.shopPlant && state.shopPlant.ready) harvestDedicatedPot();
  else openSeedShop(false);
});

function seededUnit(index, salt) {
  const generation = state.pots[index].generation || 0;
  let value = (state.layoutSeed + index * 374761393 + generation * 668265263 + salt * 1274126177) >>> 0;
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  value = (value ^ (value >>> 16)) >>> 0;
  return value / 4294967295;
}

function plantPosition(index) {
  const rows = [
    { start: 0, count: 8, y: 29, minX: 9, maxX: 91 },
    { start: 8, count: 8, y: 59, minX: 12, maxX: 88 },
    { start: 16, count: 8, y: 88, minX: 9, maxX: 91 },
  ];
  const row = rows.find(function (candidate) { return index >= candidate.start && index < candidate.start + candidate.count; });
  const column = index - row.start;
  const baseX = row.minX + column * ((row.maxX - row.minX) / (row.count - 1));
  const scatteredX = baseX + (seededUnit(index, 1) - .5) * 5.6;
  const scatteredY = row.y + (seededUnit(index, 2) - .5) * 12;
  return {
    x: Math.max(7, Math.min(93, scatteredX)),
    y: Math.max(23, Math.min(94, scatteredY)),
  };
}

function refreshNaturalGrowth() {
  const duration = growthSeconds() * 1000;
  state.pots.forEach(function (pot) {
    if (pot.ready) return;
    const elapsed = Date.now() - pot.startedAt;
    pot.stage = elapsed < SOIL_SECONDS * 1000 ? -1 : 0;
    if (elapsed >= duration) { pot.stage = 2; pot.ready = true; }
  });
  const special = state.shopPlant;
  if (special && !special.ready) {
    const elapsed = Date.now() - special.startedAt;
    special.stage = 0;
    if (elapsed >= duration) { special.stage = 2; special.ready = true; }
  }
}

function makePot(pot, index) {
  const type = cactusType(pot.cactusId);
  const button = document.createElement("button");
  button.className = "nursery-pot stage-" + pot.stage + (pot.ready ? " ready" : "") + " rarity-" + type.rarityKey;
  button.classList.add("cactus-" + type.id);
  button.classList.add("motion-" + Math.floor(seededUnit(index, 3) * 5));
  button.type = "button";
  button.dataset.potIndex = index;
  const variant = PLANT_VARIANTS[index % PLANT_VARIANTS.length];
  button.style.setProperty("--plant-scale", variant.scale);
  button.style.setProperty("--plant-rotate", variant.rotate + "deg");
  button.style.setProperty("--plant-shift", variant.shift + "%");
  button.style.setProperty("--plant-flip", variant.flip);
  button.style.setProperty("--plant-hue", variant.hue + "deg");
  button.style.setProperty("--plant-bright", variant.bright);
  button.style.setProperty("--idle-delay", -(index * 1.37) + "s");
  button.style.setProperty("--idle-speed", (8.6 + seededUnit(index, 4) * 7.2).toFixed(2) + "s");
  button.style.setProperty("--squash-x", (1.045 + seededUnit(index, 5) * .055).toFixed(3));
  button.style.setProperty("--squash-y", (.82 + seededUnit(index, 6) * .08).toFixed(3));
  button.style.setProperty("--stretch-x", (.89 + seededUnit(index, 7) * .055).toFixed(3));
  button.style.setProperty("--stretch-y", (1.08 + seededUnit(index, 8) * .07).toFixed(3));
  button.setAttribute("aria-label", pot.ready ? (index + 1) + "ばんの サボテンを とる" : (index + 1) + "ばんの サボテンを そだてています");
  const plantImage = pot.stage === -1
      ? ''
      : pot.ready
        ? '<img class="default-cactus-sprite" src="' + type.sprite + '" alt="" />'
        : '<img class="tiny-sprout-sprite" src="assets/simple-bold-sprout.png" alt="" />';
  button.innerHTML = '<span class="sprite-crop">' + plantImage + '</span>';
  button.addEventListener("click", function () { if (pot.ready) harvest([index]); });
  return button;
}

function render() {
  refreshNaturalGrowth();
  state.pots.forEach(function (pot, index) {
    const nextSignature = pot.stage + ":" + Number(pot.ready) + ":" + (pot.generation || 0) + ":" + (pot.cactusId || "normal");
    const currentButton = nursery.querySelector('[data-pot-index="' + index + '"]');
    if (!currentButton || potSignatures[index] !== nextSignature) {
      const newButton = makePot(pot, index);
      const position = plantPosition(index);
      newButton.style.left = position.x.toFixed(2) + "%";
      newButton.style.top = position.y.toFixed(2) + "%";
      newButton.style.setProperty("--row-scale", (.80 + position.y * .0027).toFixed(3));
      newButton.style.zIndex = String(Math.round(100 + position.y));
      if (currentButton) currentButton.replaceWith(newButton);
      else nursery.append(newButton);
      potSignatures[index] = nextSignature;
    }
  });
  coinCount.textContent = state.coins;
  equipmentCoinCount.textContent = state.coins.toLocaleString("ja-JP");
  equipmentCoinMeter.setAttribute("aria-label", "しょじコイン " + state.coins.toLocaleString("ja-JP"));
  equipmentLevelText.textContent = equipmentTotal() + " / 12";
  renderFactoryProgress();
  renderSpecialNutrient();
  renderDedicatedPot();
  renderFactoryGuide();
  if (shopDialog.open && shopSignature() !== lastShopSignature) renderShop();
  // Level-specific equipment is rendered as illustrated hardware above the base room.\n  document.querySelector(".greenhouse-back").src = FACILITY_BACKGROUNDS.base;
  game.className = game.className.replace(/\b(light|mist|air|sensor)-level-\d+\b/g, "").trim();
  Object.keys(state.equipment).forEach(function (key) { game.classList.add(key + "-level-" + state.equipment[key]); });
  save();
}

function playHarvestAnimation(item, order) {
  if (reduceMotion.matches) return;
  const index = item.index;
  const button = nursery.querySelector('[data-pot-index="' + index + '"]');
  if (!button) return;
  const buttonRect = button.getBoundingClientRect();
  const gameRect = game.getBoundingClientRect();
  const delay = Math.min(order * 42, 210);
  button.classList.add("harvesting");

  const flyer = document.createElement("img");
  flyer.className = "harvest-flyer";
  flyer.src = cactusType(item.cactusId).sprite;
  flyer.alt = "";
  flyer.style.left = buttonRect.left - gameRect.left + buttonRect.width / 2 + "px";
  flyer.style.top = buttonRect.top - gameRect.top - buttonRect.height * .08 + "px";
  flyer.style.width = buttonRect.width * 1.03 + "px";
  const fanDirection = [-1, -.48, 0, .48, 1][(index + order) % 5];
  const startCenterX = buttonRect.left - gameRect.left + buttonRect.width / 2;
  const startTop = buttonRect.top - gameRect.top;
  const exitX = fanDirection < -.8
    ? -(startCenterX + buttonRect.width)
    : fanDirection > .8
      ? gameRect.width - startCenterX + buttonRect.width
      : fanDirection * gameRect.width * .72;
  const exitY = Math.abs(fanDirection) > .8
    ? -gameRect.height * .32
    : -(startTop + buttonRect.height * 1.45);
  flyer.style.setProperty("--fly-x", exitX + "px");
  flyer.style.setProperty("--fly-y", exitY + "px");
  flyer.style.setProperty("--fly-rotate", fanDirection * 42 + (index % 2 ? 7 : -7) + "deg");
  flyer.style.animationDelay = delay + "ms";
  game.append(flyer);

  [-1.15, -.7, -.25, .25, .7, 1.15].forEach(function (direction, particleIndex) {
    const particle = document.createElement("i");
    particle.className = "harvest-particle";
    particle.style.left = buttonRect.left - gameRect.left + buttonRect.width / 2 + "px";
    particle.style.top = buttonRect.top - gameRect.top + buttonRect.height * .68 + "px";
    particle.style.setProperty("--particle-x", direction * buttonRect.width * .34 + "px");
    particle.style.setProperty("--particle-y", (-16 - (particleIndex % 3) * 7) + "px");
    particle.style.animationDelay = delay + 55 + "ms";
    game.append(particle);
    particle.addEventListener("animationend", function () { particle.remove(); }, { once: true });
  });

  const reward = document.createElement("span");
  reward.className = "harvest-reward";
  reward.textContent = "+" + item.reward;
  reward.style.left = buttonRect.left - gameRect.left + buttonRect.width / 2 + "px";
  reward.style.top = buttonRect.top - gameRect.top + "px";
  reward.style.animationDelay = delay + 120 + "ms";
  game.append(reward);
  flyer.addEventListener("animationend", function () { flyer.remove(); }, { once: true });
  reward.addEventListener("animationend", function () { reward.remove(); }, { once: true });
}

const rarityRevealQueue = [];
let rarityRevealActive = false;
function showRarityReveal(item) {
  if (item.isNew || cactusType(item.cactusId).rarityKey === "normal") return;
  rarityRevealQueue.push(item);
  playNextRarityReveal();
}

function playNextRarityReveal() {
  if (rarityRevealActive || !rarityRevealQueue.length) return;
  rarityRevealActive = true;
  const item = rarityRevealQueue.shift();
  const type = cactusType(item.cactusId);
  playSound("rare", type.rarityKey);
  const reveal = document.createElement("div");
  reveal.className = "rarity-reveal " + type.rarityKey;
  reveal.setAttribute("aria-hidden", "true");
  reveal.innerHTML = '<div class="rarity-reveal-card"><img src="' + type.sprite + '" alt="" /><span><small>' + type.rarity.toUpperCase() + '</small><b>' + type.name + '</b></span></div>';
  game.append(reveal);
  window.setTimeout(function () {
    reveal.remove();
    rarityRevealActive = false;
    playNextRarityReveal();
  }, 1650);
}

const discoveryDialog = document.querySelector("#discoveryDialog");
const discoveryCard = document.querySelector("#discoveryDialog .discovery-card");
const discoveryQueue = [];
let activeDiscovery = null;

function schedulePostDiscoveryTutorial() {
  if (state.tutorialStep === "math") scheduleTutorial(180);
}

function playNextDiscovery() {
  if (activeDiscovery || !discoveryQueue.length || document.querySelector("dialog[open]")) return;
  activeDiscovery = discoveryQueue.shift();
  const type = cactusType(activeDiscovery.cactusId);
  discoveryCard.className = "dialog-card discovery-card rarity-" + type.rarityKey;
  document.querySelector("#discoveryImage").src = type.sprite;
  document.querySelector("#discoveryImage").alt = type.name;
  document.querySelector("#discoveryRarity").textContent = type.rarity;
  document.querySelector("#discoveryName").textContent = type.name;
  document.querySelector("#discoveryDescription").textContent = type.description;
  discoveryDialog.setAttribute("aria-label", "あたらしいサボテンをはっけん。" + type.name + "。ずかんにとうろくしました");
  playSound("rare", type.rarityKey);
  discoveryDialog.showModal();
}

function finishDiscovery(openZukan) {
  const item = activeDiscovery;
  if (!item) return;
  discoveryDialog.close();
  activeDiscovery = null;
  if (openZukan) {
    state.lastViewedCollectionCount = collectionFoundCount();
    save();
    const typeIndex = CACTUS_TYPES.findIndex(function (type) { return type.id === item.cactusId; });
    zukanPage = Math.max(0, Math.floor(typeIndex / ZUKAN_PAGE_SIZE));
    renderZukan();
    const type = cactusType(item.cactusId);
    const entry = document.querySelector('.zukan-entry[data-cactus-id="' + type.id + '"]');
    showZukanHero(type, state.collections[type.id] || 0, entry);
    zukanDialog.showModal();
    return;
  }
  renderFactoryGuide();
  window.setTimeout(function () {
    if (discoveryQueue.length) playNextDiscovery();
    else schedulePostDiscoveryTutorial();
  }, 140);
}

document.querySelector("#discoveryContinue").addEventListener("click", function () { finishDiscovery(false); });
document.querySelector("#discoveryZukan").addEventListener("click", function () { finishDiscovery(true); });
discoveryDialog.addEventListener("cancel", function (event) { event.preventDefault(); finishDiscovery(false); });

function harvest(indexes) {
  const harvestedItems = [];
  indexes.forEach(function (index) {
    const pot = state.pots[index];
    if (!pot.ready) return;
    const type = cactusType(pot.cactusId);
    const isNew = (state.collections[type.id] || 0) === 0;
    harvestedItems.push({ index: index, cactusId: type.id, reward: type.reward, isNew: isNew });
    state.collections[type.id] = (state.collections[type.id] || 0) + 1;
    if (state.specialSeedQueued) {
      pot.cactusId = rollSpecialSeed();
      state.specialSeedQueued = false;
      state.nutrientActivePot = index;
    } else {
      pot.cactusId = rollCactusId();
    }
    delete pot.shopSeed;
    pot.ready = false; pot.stage = -1; pot.startedAt = Date.now(); pot.generation = (pot.generation || 0) + 1;
  });
  if (!harvestedItems.length) return;
  playSound("harvest");
  const finishedHarvestGuide = state.tutorialStep === "harvest";
  if (finishedHarvestGuide) {
    state.tutorialStep = "math";
    hideTutorial();
  }
  renderSpecialNutrient();
  harvestAnimationCount += harvestedItems.length;
  harvestedItems.forEach(playHarvestAnimation);
  harvestedItems.forEach(showRarityReveal);
  harvestedItems.filter(function (item) { return item.isNew; }).forEach(function (item) { discoveryQueue.push(item); });
  state.coins += harvestedItems.reduce(function (sum, item) { return sum + item.reward; }, 0);
  state.harvested += harvestedItems.length;
  coinCount.textContent = state.coins;
  save();
  if (navigator.vibrate) navigator.vibrate(12);
  const animationTime = reduceMotion.matches ? 0 : 1350 + Math.min((harvestedItems.length - 1) * 42, 210);
  window.setTimeout(function () {
    harvestAnimationCount = Math.max(0, harvestAnimationCount - harvestedItems.length);
    if (!harvestAnimationCount) render();
    const coinChip = document.querySelector(".coin-chip");
    coinChip.classList.remove("coin-bump");
    void coinChip.offsetWidth;
    coinChip.classList.add("coin-bump");
    if (discoveryQueue.length) playNextDiscovery();
    else if (finishedHarvestGuide) scheduleTutorial(reduceMotion.matches ? 80 : 220);
  }, animationTime);
}

let swiping = false;
let swipeStartX = 0;
let swipeStartY = 0;
let swipeLastX = 0;
let swipeLastY = 0;
let swipePointerId = null;
let swipeIndexes = new Set();

function collectSwipePot(x, y) {
  const target = document.elementFromPoint(x, y);
  const button = target && target.closest(".nursery-pot");
  if (!button || !nursery.contains(button)) return;
  const index = Number(button.dataset.potIndex);
  if (!Number.isInteger(index) || swipeIndexes.has(index) || !state.pots[index].ready) return;
  swipeIndexes.add(index);
  button.classList.add("swipe-picked");
  harvest([index]);
}

document.addEventListener("pointerdown", function (event) {
  if (document.querySelector("dialog[open]")) return;
  if (swiping || event.pointerType === "mouse" && event.button !== 0) return;
  swiping = true;
  swipePointerId = event.pointerId;
  swipeStartX = event.clientX;
  swipeStartY = event.clientY;
  swipeLastX = event.clientX;
  swipeLastY = event.clientY;
  swipeIndexes = new Set();
  collectSwipePot(event.clientX, event.clientY);
});

document.addEventListener("pointermove", function (event) {
  if (!swiping || event.pointerId !== swipePointerId) return;
  if (Math.hypot(event.clientX - swipeStartX, event.clientY - swipeStartY) > 5) event.preventDefault();
  // Check the path between events so a quick swipe cannot skip a small pot.
  const distance = Math.hypot(event.clientX - swipeLastX, event.clientY - swipeLastY);
  const steps = Math.max(1, Math.ceil(distance / 8));
  for (let step = 1; step <= steps; step += 1) {
    const fraction = step / steps;
    collectSwipePot(swipeLastX + (event.clientX - swipeLastX) * fraction,
      swipeLastY + (event.clientY - swipeLastY) * fraction);
  }
  swipeLastX = event.clientX;
  swipeLastY = event.clientY;
});

function finishSwipe(event) {
  if (!swiping || event.pointerId !== swipePointerId) return;
  swiping = false;
  swipePointerId = null;
  swipeIndexes.clear();
}

document.addEventListener("pointerup", finishSwipe);
document.addEventListener("pointercancel", finishSwipe);

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function makeQuestion(questionIndex) {
  let a;
  let b;
  let correct;
  let symbol;
  if (questionIndex >= 8) {
    b = randomInt(2, 9);
    correct = randomInt(2, 9);
    a = b * correct;
    symbol = "÷";
  } else if (questionIndex >= 5) {
    a = randomInt(2, 9);
    b = randomInt(2, 9);
    correct = a * b;
    symbol = "×";
  } else {
    const minus = Math.random() < .45;
    a = randomInt(3, 18);
    b = randomInt(1, 9);
    if (minus && b > a) { const swap = a; a = b; b = swap; }
    correct = minus ? a - b : a + b;
    symbol = minus ? "−" : "＋";
  }
  const choices = new Set([correct]);
  while (choices.size < 3) {
    const range = symbol === "×" ? 9 : 4;
    const candidate = correct + randomInt(-range, range);
    if (candidate >= 0) choices.add(candidate);
  }
  return { text: a + symbol + b + "＝？", correct: correct, choices: Array.from(choices).sort(function () { return Math.random() - .5; }) };
}

const mathDialog = document.querySelector("#mathDialog");
const mathProblem = document.querySelector("#mathProblem");
const answerGrid = document.querySelector("#answerGrid");
const mathTimer = document.querySelector("#mathTimer");
const mathTimerLabel = document.querySelector("#mathTimerLabel");
let mathTimeLeft = document.querySelector("#mathTimeLeft");
const mathTimerFill = document.querySelector("#mathTimerFill");
const mathCard = document.querySelector("#mathDialog .math-card");
const answerCelebration = document.querySelector("#answerCelebration");
const answerCelebrationText = document.querySelector("#answerCelebrationText");
const answerSymbol = document.querySelector("#answerSymbol");
const questionNumber = document.querySelector("#questionNumber");
const score = document.querySelector("#score");
const mathProgress = document.querySelector("#mathProgress");
let challenge = { answered: 0, correct: 0 };
let nextTimer;
let questionFrame;
let questionActive = false;
let questionDeadline = 0;
let pausedRemaining = 0;
const QUESTION_TIME_MS = 5000;

function stopQuestionTimer() {
  questionActive = false;
  cancelAnimationFrame(questionFrame);
}

function tickQuestionTimer(now) {
  if (!questionActive) return;
  const remaining = Math.max(0, questionDeadline - now);
  mathTimeLeft.textContent = Math.ceil(remaining / 1000);
  mathTimerFill.style.transform = "scaleX(" + (remaining / QUESTION_TIME_MS) + ")";
  mathTimer.classList.toggle("is-urgent", remaining <= 2000);
  mathTimer.setAttribute("aria-label", "のこり " + Math.ceil(remaining / 1000) + " びょう");
  if (remaining === 0) {
    answerQuestion(false, null, currentQuestion.correct, true);
  } else {
    questionFrame = requestAnimationFrame(tickQuestionTimer);
  }
}

let currentQuestion;

document.addEventListener("visibilitychange", function () {
  if (!mathDialog.open || !questionActive) return;
  if (document.hidden) {
    pausedRemaining = Math.max(0, questionDeadline - performance.now());
    cancelAnimationFrame(questionFrame);
  } else if (pausedRemaining > 0) {
    questionDeadline = performance.now() + pausedRemaining;
    pausedRemaining = 0;
    questionFrame = requestAnimationFrame(tickQuestionTimer);
  }
});

function showQuestion() {
  stopQuestionTimer();
  pausedRemaining = 0;
  const q = makeQuestion(challenge.answered + 1);
  currentQuestion = q;
  questionNumber.textContent = (challenge.answered + 1) + " / 10";
  score.textContent = challenge.correct;
  mathProblem.textContent = q.text;
  mathProblem.classList.remove("is-updating");
  void mathProblem.offsetWidth;
  mathProblem.classList.add("is-updating");
  Array.from(mathProgress.children).forEach(function (lamp, index) {
    lamp.className = index < challenge.answered ? "done" : index === challenge.answered ? "current" : "";
  });
  mathTimerLabel.innerHTML = 'のこり <b id="mathTimeLeft">5</b> びょう';
  // The label is rebuilt after each answer, so refresh its number reference.
  mathTimeLeft = mathTimerLabel.querySelector("b");
  mathTimerFill.style.transform = "scaleX(1)";
  mathTimer.classList.remove("is-urgent");
  mathTimer.setAttribute("aria-label", "のこり 5 びょう");
  mathCard.classList.remove("answer-correct", "answer-wrong");
  answerCelebration.hidden = true;
  answerCelebration.className = "answer-celebration";
  answerGrid.replaceChildren();
  q.choices.forEach(function (choice) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", function () { answerQuestion(choice === q.correct, button, q.correct); });
    answerGrid.append(button);
  });
  questionActive = true;
  questionDeadline = performance.now() + QUESTION_TIME_MS;
  questionFrame = requestAnimationFrame(tickQuestionTimer);
}

function answerQuestion(correct, button, correctValue, timedOut) {
  if (!questionActive) return;
  stopQuestionTimer();
  answerGrid.querySelectorAll("button").forEach(function (item) { item.disabled = true; });
  challenge.answered += 1;
  mathCard.classList.remove("answer-correct", "answer-wrong");
  void mathCard.offsetWidth;
  mathCard.classList.add(correct ? "answer-correct" : "answer-wrong");
  answerCelebration.hidden = false;
  answerCelebration.className = "answer-celebration " + (timedOut ? "is-timeout" : correct ? "is-correct" : "is-wrong");
  answerSymbol.textContent = "";
  answerCelebrationText.textContent = timedOut ? "じかんぎれ！" : correct ? "せいかい！" : "ちがうよ";
  answerCelebration.setAttribute("aria-label", answerCelebrationText.textContent);
  mathTimerLabel.textContent = timedOut ? "じかんぎれ！" : correct ? "せいかい！" : "ちがうよ";
  playSound(correct ? "correct" : "wrong");
  if (correct) {
    challenge.correct += 1;
    if (button) button.classList.add("correct");
    if (navigator.vibrate) navigator.vibrate(35);
  } else {
    if (button) button.classList.add("wrong");
    answerGrid.querySelectorAll("button").forEach(function (item) {
      if (Number(item.textContent) === correctValue) item.classList.add("correct-answer");
    });
    if (navigator.vibrate) navigator.vibrate([35, 45, 35]);
  }
  score.textContent = challenge.correct;
  nextTimer = setTimeout(challenge.answered >= 10 ? finishChallenge : showQuestion, 1150);
}

function grownForScore(value) {
  if (value === 10) return 24;
  if (value === 9) return 20;
  if (value === 8) return 16;
  if (value === 7) return 12;
  if (value >= 4) return 6;
  if (value >= 1) return 3;
  return 0;
}

function finishChallenge() {
  stopQuestionTimer();
  mathDialog.close();
  const target = grownForScore(challenge.correct);
  const candidates = state.pots.map(function (pot, index) { return { pot: pot, index: index }; }).filter(function (item) { return !item.pot.ready; });
  const grownCount = Math.min(target, candidates.length);
  candidates.sort(function () { return Math.random() - .5; }).slice(0, grownCount).forEach(function (item) { item.pot.stage = 2; item.pot.ready = true; });
  render();
  document.querySelector("#resultScore").textContent = challenge.correct;
  document.querySelector("#resultTitle").textContent = challenge.correct === 10 ? "パーフェクト！" : challenge.correct >= 7 ? "すごい！" : challenge.correct >= 4 ? "よくできました！" : "つぎも がんばろう！";
  document.querySelector("#resultMessage").textContent = "10もんちゅう " + challenge.correct + "もん せいかい";
  const allReady = candidates.length === 0;
  const resultGrowth = document.querySelector("#resultGrowth");
  resultGrowth.classList.toggle("is-all-ready", allReady);
  document.querySelector("#resultRewardHeading").textContent = allReady ? "いまの ようす" : "けいさんの ごほうび";
  document.querySelector("#grownCount").textContent = allReady ? "みんな" : grownCount + "たい";
  document.querySelector("#resultRewardRule").textContent = allReady ? "サボテンを しゅうかくしよう！" : challenge.correct + "もんせいかい の ごほうび";
  document.querySelector("#resultRewardText").textContent = grownCount > 0 ? "すぐに そだった！" : allReady ? "そだっているよ！" : "つぎは そだてよう！";
  playSound("result");
  document.querySelector("#resultDialog").showModal();
}

document.querySelector("#mathButton").addEventListener("click", function () {
  if (state.tutorialStep === "math") {
    state.tutorialStep = "equipment";
    hideTutorial();
    save();
  }
  challenge = { answered: 0, correct: 0 }; showQuestion(); mathDialog.showModal();
});
document.querySelector("#mathClose").addEventListener("click", function () { mathDialog.close(); });
document.querySelector("#resultClose").addEventListener("click", function () {
  document.querySelector("#resultDialog").close();
  if (state.tutorialStep === "equipment") scheduleTutorial(180);
});

const equipmentDialog = document.querySelector("#equipmentDialog");
let selectedEquipmentKey = "light";

factoryProgressButton.addEventListener("click", function () {
  renderFactoryProgress();
  factoryProgressDialog.showModal();
});
factoryProgressClose.addEventListener("click", function () { factoryProgressDialog.close(); });
document.querySelector("#factoryProgressZukan").addEventListener("click", function () {
  factoryProgressDialog.close();
  document.querySelector("#zukanButton").click();
});
document.querySelector("#factoryProgressEquipment").addEventListener("click", function () {
  factoryProgressDialog.close();
  document.querySelector("#equipmentButton").click();
});

function renderEquipment() {
  const grid = document.querySelector("#equipmentGrid");
  const detail = document.querySelector("#equipmentDetail");
  grid.replaceChildren();
  detail.replaceChildren();
  const total = equipmentTotal();
  renderSoundSetting();
  document.querySelector("#equipmentTotalText").textContent = total + " / 12";
  document.querySelector("#equipmentMeterFill").style.width = (total / 12 * 100) + "%";
  const growthMinutes = Math.round(growthSeconds() / 60);
  const formatGrowthTime = function (minutes) {
    return Math.floor(minutes / 60) + "じかん" + (minutes % 60 ? (minutes % 60) + "ぷん" : "");
  };
  document.querySelector(".equipment-growth-guide b").textContent = total < 12
    ? "そだつ時間　1レベルで 10ぷん短縮"
    : "せつび かんせい！";
  document.querySelector("#equipmentGrowthGuide").textContent = total < 12
    ? formatGrowthTime(growthMinutes) + " → " + formatGrowthTime(growthMinutes - 10)
    : "ぜんぶ かいぞう！ そだつまで 1じかん";
  equipmentCoinCount.textContent = state.coins.toLocaleString("ja-JP");
  equipmentCoinMeter.setAttribute("aria-label", "しょじコイン " + state.coins.toLocaleString("ja-JP"));

  EQUIPMENT.forEach(function (item) {
    const level = state.equipment[item.key];
    const hotspot = document.createElement("button");
    hotspot.type = "button";
    hotspot.className = "equipment-hotspot equipment-hotspot-" + item.key + (selectedEquipmentKey === item.key ? " selected" : "") + " level-" + level;
    hotspot.dataset.equipmentSelect = item.key;
    hotspot.setAttribute("aria-pressed", String(selectedEquipmentKey === item.key));
    hotspot.setAttribute("aria-label", item.name + (level >= 3 ? " MAX・かいぞう かんせい" : " LV." + level));
    hotspot.innerHTML = "<span>" + (level >= 3 ? "MAX" : "LV." + level) + "</span>";
    grid.append(hotspot);
  });

  const complete = total >= 12;
  if (complete) {
    const nutrientInUse = nutrientIsInUse();
    const nutrientUnavailable = nutrientInUse || state.coins < 300;
    detail.className = "equipment-detail equipment-detail-nutrient" + (nutrientInUse ? " is-active" : "") + (nutrientUnavailable ? " is-disabled" : "");
    detail.style.removeProperty("--equipment-detail-art");
    const nutrientButton = document.createElement("button");
    nutrientButton.id = "specialSeedButton";
    nutrientButton.type = "button";
    nutrientButton.className = "nutrient-purchase";
    nutrientButton.disabled = nutrientUnavailable;
    nutrientButton.setAttribute("aria-label", nutrientInUse ? "レア栄養剤 しようちゅう" : "レア栄養剤を 300コインで こうにゅう");
    nutrientButton.innerHTML = '<img src="assets/rare-nutrient-crate-bold.png" alt="" /><span class="nutrient-copy"><b>レアえいようざい</b><small>レアな サボテンが そだつよ</small><strong>' + (nutrientInUse ? "しようちゅう" : document.querySelector(".topbar .coin").outerHTML + " 300コインで こうにゅう") + '</strong></span>';
    detail.append(nutrientButton);
    document.querySelector("#equipmentFeedback").textContent = nutrientInUse ? "レア栄養剤を しようちゅう" : "";
    return;
  }

  const item = EQUIPMENT.find(function (entry) { return entry.key === selectedEquipmentKey; }) || EQUIPMENT[0];
  const level = state.equipment[item.key];
  const cost = equipmentUpgradeCost(level);
  const previewLevel = level >= 3 ? 3 : level + 1;
  const shortfall = level < 3 ? Math.max(0, cost - state.coins) : 0;
  detail.className = "equipment-detail equipment-detail-" + item.key + (shortfall ? " is-unaffordable" : "");
  detail.style.setProperty("--equipment-detail-art", 'url("assets/equipment-detail-' + item.key + '-lv' + level + '.webp")');
  const upgrade = document.createElement("button");
  upgrade.type = "button";
  upgrade.className = "equipment-upgrade";
  upgrade.dataset.equipment = item.key;
  upgrade.disabled = level >= 3 || state.coins < cost;
  const actionLabel = level >= 3 ? "かんせい" : "かいぞう " + cost + "コイン";
  upgrade.setAttribute("aria-label", actionLabel);
  detail.append(upgrade);
  if (shortfall) {
    const hint = document.createElement("span");
    hint.className = "equipment-cost-shortfall";
    hint.textContent = "あと" + shortfall + "コイン";
    detail.append(hint);
  }

  document.querySelector("#equipmentFeedback").textContent = "";
}
document.querySelector("#equipmentButton").addEventListener("click", function () {
  if (state.tutorialStep === "equipment") finishTutorial();
  renderEquipment();
  equipmentDialog.showModal();
});
document.querySelector("#equipmentClose").addEventListener("click", function () { equipmentDialog.close(); });
document.querySelector("#equipmentDialog .save-settings").addEventListener("toggle", function (event) {
  if (event.target.open) requestAnimationFrame(function () { event.target.scrollIntoView({ block: "end", behavior: "smooth" }); });
});
document.querySelector("#equipmentDialog").addEventListener("click", function (event) {
  const select = event.target.closest(".equipment-hotspot");
  if (select) {
    selectedEquipmentKey = select.dataset.equipmentSelect;
    renderEquipment();
    return;
  }
  const nutrientButton = event.target.closest(".nutrient-purchase");
  if (nutrientButton) {
    if (equipmentTotal() < 12 || nutrientIsInUse() || state.coins < 300) return;
    state.specialSeedQueued = true;
    state.coins -= 300;
    playSound("upgrade");
    render();
    renderEquipment();
    return;
  }
  const button = event.target.closest(".equipment-upgrade");
  if (!button) return;
  const key = button.dataset.equipment;
  const level = state.equipment[key];
  const cost = equipmentUpgradeCost(level);
  if (level >= 3 || state.coins < cost) return;
  state.coins -= cost; state.equipment[key] += 1;
  const upgradedItem = EQUIPMENT.find(function (item) { return item.key === key; });
  playSound("upgrade");
  game.classList.remove("facility-installing");
  void game.offsetWidth;
  game.classList.add("facility-installing");
  render();
  equipmentDialog.close();
  if (upgradedItem) window.setTimeout(function () { showUpgradeCelebration(upgradedItem, level, level + 1); }, 100);
  window.setTimeout(function () { game.classList.remove("facility-installing"); }, 900);
});

document.querySelector("#temporaryTestControls")?.remove();

const resetDialog = document.querySelector("#resetDialog");
document.querySelector("#resetSaveButton").addEventListener("click", function () { equipmentDialog.close(); resetDialog.showModal(); });
document.querySelector("#resetCancelButton").addEventListener("click", function () { resetDialog.close(); });
document.querySelector("#resetConfirmButton").addEventListener("click", function () {
  state = createInitialState();
  if (window.CactusInstall) window.CactusInstall.beginSuggestion();
  localStorage.setItem(STORAGE, JSON.stringify(state));
  resetDialog.close();
  location.reload();
});

const zukanDialog = document.querySelector("#zukanDialog");
function zukanGroup(type) {
  if (type.rarityKey === "legend") return { key: "legend", name: "レジェンド", english: "LEGEND ARCHIVE" };
  if (type.rarityKey === "super") return { key: "super", name: "スーパーレア", english: "SPECIAL SPECIMENS" };
  if (type.rarityKey === "rare") return { key: "rare", name: "レア", english: "RARE SPECIMENS" };
  return { key: "standard", name: "ノーマル", english: "STANDARD COLLECTION" };
}

function showZukanHero(type, count, entry) {
  const hero = document.querySelector(".zukan-hero");
  hero.className = "zukan-hero rarity-" + type.rarityKey + (count ? "" : " not-found");
  document.querySelector("#zukanHeroImage").src = type.sprite;
  document.querySelector("#zukanHeroImage").alt = count ? type.name : "";
  document.querySelector("#zukanHeroNumber").textContent = "No." + String(CACTUS_TYPES.indexOf(type) + 1).padStart(2, "0");
  document.querySelector("#zukanHeroRarity").textContent = type.rarity;
  document.querySelector("#zukanHeroName").textContent = count ? type.name : "？？？";
  document.querySelector("#zukanHeroDescription").textContent = count ? type.description : "まだ はっけんされていない サボテンです。";
  document.querySelector("#zukanHeroCount").textContent = count + "たい しゅうかく";
  document.querySelectorAll(".zukan-entry").forEach(function (item) {
    const selected = item === entry;
    item.classList.toggle("selected", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  hero.classList.remove("is-switching");
  requestAnimationFrame(function () { hero.classList.add("is-switching"); });
}

const ZUKAN_PAGE_SIZE = 8;
let zukanPage = 0;

function renderZukanPage() {
  const grid = document.querySelector("#zukanGrid");
  grid.replaceChildren();
  const pageCount = Math.max(1, Math.ceil(CACTUS_TYPES.length / ZUKAN_PAGE_SIZE));
  zukanPage = Math.min(zukanPage, pageCount - 1);
  const pageTypes = CACTUS_TYPES.slice(zukanPage * ZUKAN_PAGE_SIZE, (zukanPage + 1) * ZUKAN_PAGE_SIZE);
  pageTypes.forEach(function (type) {
    const typeIndex = CACTUS_TYPES.indexOf(type);
    const count = state.collections[type.id] || 0;
    const entry = document.createElement("button");
    entry.className = "zukan-entry rarity-" + type.rarityKey + (count ? " found" : " not-found");
    entry.type = "button";
    entry.dataset.cactusId = type.id;
    entry.setAttribute("aria-pressed", "false");
    const displayName = count ? type.name.replace(/サボテン$/, '<br><span class="cactus-name-suffix">サボテン</span>') : "？？？";
    entry.innerHTML = '<span class="zukan-entry-number">No.' + String(typeIndex + 1).padStart(2, "0") + '</span><span class="zukan-picture"><img src="' + type.sprite + '" alt="" /></span><span class="zukan-info"><small>' + type.rarity + '</small><b>' + displayName + '</b><em>' + count + 'たい</em></span>';
    entry.addEventListener("click", function () { showZukanHero(type, count, entry); });
    grid.append(entry);
  });

  const pagination = document.querySelector("#zukanPagination");
  pagination.replaceChildren();
  pagination.hidden = pageCount <= 1;
  if (pageCount > 1) {
    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "zukan-page-button";
    previous.textContent = "‹ まえへ";
    previous.disabled = zukanPage === 0;
    previous.addEventListener("click", function () { zukanPage -= 1; renderZukanPage(); });

    const indicator = document.createElement("span");
    indicator.className = "zukan-page-indicator";
    indicator.textContent = String(zukanPage + 1) + " / " + String(pageCount) + " ページ";
    indicator.setAttribute("aria-live", "polite");

    const next = document.createElement("button");
    next.type = "button";
    next.className = "zukan-page-button";
    next.textContent = "つぎへ ›";
    next.disabled = zukanPage === pageCount - 1;
    next.addEventListener("click", function () { zukanPage += 1; renderZukanPage(); });
    pagination.append(previous, indicator, next);
  }
  document.querySelector(".zukan-list-scroll").scrollTop = 0;
  // Keep the specimen detail in sync with the cards on the current page.
  if (grid.firstElementChild) {
    const firstType = pageTypes[0];
    showZukanHero(firstType, state.collections[firstType.id] || 0, grid.firstElementChild);
  }
}

function renderZukan() {
  const foundCount = CACTUS_TYPES.filter(function (type) { return (state.collections[type.id] || 0) > 0; }).length;
  const collectionProgress = document.querySelector("#collectionProgress");
  document.querySelector("#collectionProgressCount").textContent = foundCount + " / " + CACTUS_TYPES.length;
  collectionProgress.setAttribute("aria-label", "しゅうしゅう " + foundCount + " / " + CACTUS_TYPES.length);
  Array.from(document.querySelector("#collectionTrack").children).forEach(function (lamp, index) {
    lamp.classList.toggle("filled", index < foundCount);
  });
  document.querySelector("#zukanListTotal").textContent = foundCount + " / " + CACTUS_TYPES.length;
  renderZukanPage();
}
document.querySelector("#zukanButton").addEventListener("click", function () {
  state.lastViewedCollectionCount = collectionFoundCount();
  save();
  zukanPage = 0;
  renderZukan();
  const firstFound = CACTUS_TYPES.slice(0, ZUKAN_PAGE_SIZE).find(function (type) { return (state.collections[type.id] || 0) > 0; }) || CACTUS_TYPES[0];
  const firstFoundCount = state.collections[firstFound.id] || 0;
  const firstEntry = document.querySelector('.zukan-entry[data-cactus-id="' + firstFound.id + '"]');
  showZukanHero(firstFound, firstFoundCount, firstEntry);
  zukanDialog.showModal();
});
document.querySelector("#zukanClose").addEventListener("click", function () { zukanDialog.close(); });
zukanDialog.addEventListener("close", function () {
  renderFactoryGuide();
  window.setTimeout(function () {
    if (discoveryQueue.length) playNextDiscovery();
    else schedulePostDiscoveryTutorial();
  }, 140);
});
[mathDialog, equipmentDialog, zukanDialog, resetDialog, factoryProgressDialog].forEach(function (dialog) {
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
});
mathDialog.addEventListener("close", function () {
  stopQuestionTimer();
  clearTimeout(nextTimer);
  if (state.tutorialStep === "equipment") scheduleTutorial(180);
});
render();
setInterval(function () { if (!harvestAnimationCount) render(); }, 1000);

if ("serviceWorker" in navigator) {
  let appRegistration = null;
  function checkAppUpdate() {
    if (appRegistration) appRegistration.update().catch(function () {});
  }
  navigator.serviceWorker.addEventListener("message", function (event) {
    if (event.data && event.data.type === "CACTUS_PAGE_VERSION" && event.ports[0]) {
      save();
      event.ports[0].postMessage({ version: "318" });
    }
  });
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then(function (registration) {
      appRegistration = registration;
      checkAppUpdate();
    }).catch(function () {});
  });
  window.addEventListener("pageshow", checkAppUpdate);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) checkAppUpdate();
  });
}
