const POT_COUNT = 24;
const STORAGE = "cactus-line-v4";
const SOIL_SECONDS = 5 * 60;
const CACTUS_TYPES = [
  { id: "normal", name: "みどりサボテン", rarity: "ノーマル", rarityKey: "normal", sprite: "assets/cactus-normal.png", reward: 10, description: "いつも げんきで にこにこ。みんなの なかま。" },
  { id: "rare", name: "おはなサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-rare-flower.png", reward: 20, description: "あたまに さいた おはなが じまんの おしゃれもの。" },
  { id: "super", name: "うさみみサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-super-bunny.png", reward: 20, description: "おおきな みみで こうじょうの かぜを かんじとる。" },
  { id: "legend", name: "ほしのサボテン", rarity: "レア", rarityKey: "rare", sprite: "assets/cactus-star-v3.webp", reward: 20, description: "ほしの ひかりを あつめて きらきら そだつ。" },
  { id: "superSuit", name: "エリートサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-super-suit.png?v=2", reward: 50, description: "けいさんも しごとも スマートに こなす エリート。" },
  { id: "superRed", name: "あかサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-super-red.png", reward: 50, description: "あつい きもちを かくさない まっすぐな せいかく。" },
  { id: "superBlue", name: "あおサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-super-blue.png", reward: 50, description: "いつでも おちついている クールな サボテン。" },
  { id: "superYellow", name: "きいろサボテン", rarity: "スーパーレア", rarityKey: "super", sprite: "assets/cactus-super-yellow.png", reward: 50, description: "まわりを あかるくする こうじょうの ムードメーカー。" },
  { id: "legendSage", name: "せんにんサボテン", rarity: "レジェンド", rarityKey: "legend", sprite: "assets/cactus-legend-sage-v6.png", reward: 150, description: "ながい ときを いきる サボテンたちの せんにん。" },
];

const RARE_CACTUS_IDS = ["rare", "super", "legend"];
const SUPER_CACTUS_IDS = ["superSuit", "superRed", "superBlue", "superYellow"];

function randomRareCactusId() {
  return RARE_CACTUS_IDS[Math.floor(Math.random() * RARE_CACTUS_IDS.length)];
}

function randomSuperCactusId() {
  return SUPER_CACTUS_IDS[Math.floor(Math.random() * SUPER_CACTUS_IDS.length)];
}

function rollCactusId() {
  const roll = Math.random() * 100;
  if (roll < .5) return "legendSage";
  if (roll < 2) return randomSuperCactusId();
  if (roll < 5) return randomRareCactusId();
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
      if (!saved.collections) saved.collections = { normal: saved.harvested || 0, rare: 0, super: 0, legend: 0 };
      saved.rarityVersion = 5;
      saved.specialSeedQueued = Boolean(saved.specialSeedQueued);
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
      if (saved.visualVersion !== 4) {
        saved.visualVersion = 4;
        saved.pots.forEach(function (pot) {
          pot.stage = 2;
          pot.ready = true;
          pot.startedAt = Date.now() - 70000;
        });
        saved.pots[2].cactusId = "rare";
        saved.pots[10].cactusId = "super";
        saved.pots[18].cactusId = "legend";
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
    rarityVersion: 5,
    collections: { normal: 0, rare: 0, super: 0, legend: 0 },
    specialSeedQueued: false,
    nutrientActivePot: null,
    nutrientTrackingVersion: 1,
    layoutSeed: Math.floor(Math.random() * 2147483647),
    pots: Array.from({ length: POT_COUNT }, function (_, i) {
      const showcase = i === 2 ? "rare" : i === 10 ? "super" : i === 18 ? "legend" : "normal";
      return { stage: 2, ready: true, startedAt: Date.now() - 70000 - i * 1700, generation: 0, cactusId: showcase };
    }),
  };
}

function save() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
const nursery = document.querySelector("#nursery");
const coinCount = document.querySelector("#coinCount");
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
let tutorialTimer;
let audioContext;

function getAudioContext() {
  if (!state.soundEnabled) return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(function () {});
  return audioContext;
}

function soundTone(frequency, delay, duration, volume, type, endFrequency) {
  const context = getAudioContext();
  if (!context) return;
  const start = context.currentTime + (delay || 0);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type || "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume || .035, start + .012);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .02);
}

function playSound(name, detail) {
  if (!state.soundEnabled) return;
  if (name === "start") {
    soundTone(330, 0, .16, .025, "sine", 440);
    soundTone(495, .11, .23, .025, "sine", 660);
  } else if (name === "harvest") {
    soundTone(360, 0, .12, .03, "triangle", 620);
    soundTone(760, .055, .10, .018, "sine", 940);
  } else if (name === "correct") {
    [523, 659, 784].forEach(function (note, index) { soundTone(note, index * .065, .16, .027, "sine"); });
  } else if (name === "wrong") {
    soundTone(230, 0, .18, .025, "triangle", 185);
    soundTone(174, .13, .20, .021, "sine");
  } else if (name === "upgrade") {
    soundTone(150, 0, .10, .027, "square", 110);
    soundTone(440, .09, .18, .022, "sine", 660);
    soundTone(880, .20, .22, .018, "sine");
  } else if (name === "result") {
    [392, 523, 659, 784].forEach(function (note, index) { soundTone(note, index * .075, .22, .024, "sine"); });
  } else if (name === "rare") {
    const notes = detail === "legend" ? [392, 523, 659, 784, 1047] : detail === "super" ? [440, 554, 659, 880] : [440, 659, 880];
    notes.forEach(function (note, index) { soundTone(note, index * .075, .24, detail === "legend" ? .028 : .022, "sine"); });
  }
}

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
  if (state.soundEnabled) playSound("correct");
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
  state.tutorialStep = "done";
  hideTutorial();
  save();
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
    screenShutter.classList.remove("is-closing");
    screenShutter.classList.add("is-opening");
    window.setTimeout(function () {
      screenShutter.classList.remove("is-opening");
      scheduleTutorial(reduceMotion.matches ? 40 : 240);
    }, reduceMotion.matches ? 0 : 250);
  }, reduceMotion.matches ? 0 : 320);
}

startGameButton.addEventListener("click", function () {
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
  const EMPTY_FACTORY_GROWTH_SECONDS = 5 * 60 * 60;
  const REDUCTION_PER_LEVEL_SECONDS = 15 * 60;
  return EMPTY_FACTORY_GROWTH_SECONDS - equipmentTotal() * REDUCTION_PER_LEVEL_SECONDS;
}

function rollSpecialSeed() {
  const roll = Math.random() * 100;
  return roll < 1 ? "legendSage" : roll < 10 ? randomSuperCactusId() : randomRareCactusId();
}

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
  equipmentLevelText.textContent = equipmentTotal() + " / 12";
  renderSpecialNutrient();
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
  if (cactusType(item.cactusId).rarityKey === "normal") return;
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

function harvest(indexes) {
  const harvestedItems = [];
  indexes.forEach(function (index) {
    const pot = state.pots[index];
    if (!pot.ready) return;
    const type = cactusType(pot.cactusId);
    harvestedItems.push({ index: index, cactusId: type.id, reward: type.reward });
    state.collections[type.id] = (state.collections[type.id] || 0) + 1;
    if (state.specialSeedQueued) {
      pot.cactusId = rollSpecialSeed();
      state.specialSeedQueued = false;
      state.nutrientActivePot = index;
    } else {
      pot.cactusId = rollCactusId();
    }
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
    if (finishedHarvestGuide) scheduleTutorial(reduceMotion.matches ? 80 : 220);
  }, animationTime);
}

let swiping = false;
let swipeStartX = 0;
let swipeStartY = 0;
let swipeIndexes = new Set();

function collectSwipePot(x, y) {
  const target = document.elementFromPoint(x, y);
  const button = target && target.closest(".nursery-pot");
  if (!button || !nursery.contains(button)) return;
  const index = Number(button.dataset.potIndex);
  if (!Number.isInteger(index) || !state.pots[index].ready) return;
  swipeIndexes.add(index);
  button.classList.add("swipe-picked");
  harvest([index]);
}

nursery.addEventListener("pointerdown", function (event) {
  if (!event.target.closest(".nursery-pot")) return;
  swiping = true;
  swipeStartX = event.clientX;
  swipeStartY = event.clientY;
  swipeIndexes = new Set();
  nursery.setPointerCapture(event.pointerId);
  collectSwipePot(event.clientX, event.clientY);
});

nursery.addEventListener("pointermove", function (event) {
  if (!swiping) return;
  if (Math.hypot(event.clientX - swipeStartX, event.clientY - swipeStartY) > 5) event.preventDefault();
  collectSwipePot(event.clientX, event.clientY);
});

function finishSwipe(event) {
  if (!swiping) return;
  swiping = false;
  if (nursery.hasPointerCapture(event.pointerId)) nursery.releasePointerCapture(event.pointerId);
  swipeIndexes.clear();
}

nursery.addEventListener("pointerup", finishSwipe);
nursery.addEventListener("pointercancel", finishSwipe);

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
  return { text: a + " " + symbol + " " + b + " ＝ ？", correct: correct, choices: Array.from(choices).sort(function () { return Math.random() - .5; }) };
}

const mathDialog = document.querySelector("#mathDialog");
const mathProblem = document.querySelector("#mathProblem");
const answerGrid = document.querySelector("#answerGrid");
const mathFeedback = document.querySelector("#mathFeedback");
const mathCard = document.querySelector("#mathDialog .math-card");
const answerCelebration = document.querySelector("#answerCelebration");
const answerCelebrationText = document.querySelector("#answerCelebrationText");
const answerSymbol = document.querySelector("#answerSymbol");
const questionNumber = document.querySelector("#questionNumber");
const score = document.querySelector("#score");
let challenge = { answered: 0, correct: 0 };
let nextTimer;

function showQuestion() {
  const q = makeQuestion(challenge.answered + 1);
  questionNumber.textContent = (challenge.answered + 1) + " / 10";
  score.textContent = "せいかい " + challenge.correct;
  mathProblem.textContent = q.text;
  mathFeedback.textContent = "";
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
}

function answerQuestion(correct, button, correctValue) {
  answerGrid.querySelectorAll("button").forEach(function (item) { item.disabled = true; });
  challenge.answered += 1;
  mathCard.classList.remove("answer-correct", "answer-wrong");
  void mathCard.offsetWidth;
  mathCard.classList.add(correct ? "answer-correct" : "answer-wrong");
  answerCelebration.hidden = false;
  answerCelebration.className = "answer-celebration " + (correct ? "is-correct" : "is-wrong");
  answerSymbol.textContent = "";
  answerCelebrationText.textContent = correct ? "せいかい！" : "ちがうよ";
  answerCelebration.setAttribute("aria-label", correct ? "せいかい！" : "ちがうよ");
  playSound(correct ? "correct" : "wrong");
  if (correct) {
    challenge.correct += 1;
    button.classList.add("correct");
    mathFeedback.textContent = "そのちょうし！";
    if (navigator.vibrate) navigator.vibrate(35);
  } else {
    button.classList.add("wrong");
    answerGrid.querySelectorAll("button").forEach(function (item) {
      if (Number(item.textContent) === correctValue) item.classList.add("correct-answer");
    });
    mathFeedback.textContent = "こたえは " + correctValue;
    if (navigator.vibrate) navigator.vibrate([35, 45, 35]);
  }
  score.textContent = "せいかい " + challenge.correct;
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
  mathDialog.close();
  const target = grownForScore(challenge.correct);
  const candidates = state.pots.map(function (pot, index) { return { pot: pot, index: index }; }).filter(function (item) { return !item.pot.ready; });
  candidates.sort(function () { return Math.random() - .5; }).slice(0, target).forEach(function (item) { item.pot.stage = 2; item.pot.ready = true; });
  render();
  document.querySelector("#resultTitle").textContent = "10もんちゅう " + challenge.correct + "もんせいかい";
  document.querySelector("#grownCount").textContent = Math.min(target, candidates.length) + "こ";
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
function renderEquipment() {
  const grid = document.querySelector("#equipmentGrid");
  const detail = document.querySelector("#equipmentDetail");
  grid.replaceChildren();
  detail.replaceChildren();
  const total = equipmentTotal();
  renderSoundSetting();
  document.querySelector("#equipmentTotalText").textContent = total + " / 12";
  document.querySelector("#equipmentMeterFill").style.width = (total / 12 * 100) + "%";

  EQUIPMENT.forEach(function (item) {
    const level = state.equipment[item.key];
    const hotspot = document.createElement("button");
    hotspot.type = "button";
    hotspot.className = "equipment-hotspot equipment-hotspot-" + item.key + (selectedEquipmentKey === item.key ? " selected" : "") + " level-" + level;
    hotspot.dataset.equipmentSelect = item.key;
    hotspot.setAttribute("aria-pressed", String(selectedEquipmentKey === item.key));
    hotspot.setAttribute("aria-label", item.name + " LV." + level);
    hotspot.innerHTML = "<span>LV." + level + "</span>";
    grid.append(hotspot);
  });

  const item = EQUIPMENT.find(function (entry) { return entry.key === selectedEquipmentKey; }) || EQUIPMENT[0];
  const level = state.equipment[item.key];
  const cost = equipmentUpgradeCost(level);
  const previewLevel = level >= 3 ? 3 : level + 1;
  detail.className = "equipment-detail equipment-detail-" + item.key;
  detail.style.setProperty("--equipment-detail-art", 'url("assets/equipment-detail-' + item.key + '-lv' + level + '.webp")');
  const upgrade = document.createElement("button");
  upgrade.type = "button";
  upgrade.className = "equipment-upgrade";
  upgrade.dataset.equipment = item.key;
  upgrade.disabled = level >= 3 || state.coins < cost;
  const actionLabel = level >= 3 ? "かんせい" : "かいぞう " + cost + "コイン";
  upgrade.setAttribute("aria-label", actionLabel);
  detail.append(upgrade);

  const complete = total >= 12;
  const specialShop = document.querySelector("#specialShop");
  specialShop.hidden = !complete;
  if (complete) {
    const specialButton = document.querySelector("#specialSeedButton");
    const nutrientInUse = nutrientIsInUse();
    specialButton.disabled = nutrientInUse || state.coins < 300;
    specialButton.textContent = nutrientInUse ? "しようちゅう" : "300コイン";
  }
  document.querySelector("#equipmentFeedback").textContent = complete ? "せつび かんせい！ コインで レア栄養剤が つかえます" : "";
}
document.querySelector("#equipmentButton").addEventListener("click", function () {
  if (state.tutorialStep === "equipment") finishTutorial();
  renderEquipment();
  equipmentDialog.showModal();
});
document.querySelector("#equipmentClose").addEventListener("click", function () { equipmentDialog.close(); });
document.querySelector("#equipmentDialog").addEventListener("click", function (event) {
  const select = event.target.closest(".equipment-hotspot");
  if (select) {
    selectedEquipmentKey = select.dataset.equipmentSelect;
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
  playSound("upgrade");
  game.classList.remove("facility-installing");
  void game.offsetWidth;
  game.classList.add("facility-installing");
  render();
  equipmentDialog.close();
  window.setTimeout(function () { game.classList.remove("facility-installing"); }, 900);
});
document.querySelector("#specialSeedButton").addEventListener("click", function () {
  if (equipmentTotal() < 12 || nutrientIsInUse() || state.coins < 300) return;
  state.specialSeedQueued = true;
  state.coins -= 300;
  playSound("upgrade");
  render();
  renderEquipment();
});

document.querySelector("#fillTestButton").addEventListener("click", function () {
  state.pots.forEach(function (pot) {
    pot.stage = 2;
    pot.ready = true;
    pot.startedAt = Date.now() - growthSeconds() * 1000;
  });
  potSignatures.fill("");
  save();
  render();
  equipmentDialog.close();
});

const resetDialog = document.querySelector("#resetDialog");
document.querySelector("#resetTestButton").addEventListener("click", function () { equipmentDialog.close(); resetDialog.showModal(); });
document.querySelector("#resetCancelButton").addEventListener("click", function () { resetDialog.close(); });
document.querySelector("#resetConfirmButton").addEventListener("click", function () {
  state = createInitialState();
  localStorage.setItem(STORAGE, JSON.stringify(state));
  resetDialog.close();
  location.reload();
});

const zukanDialog = document.querySelector("#zukanDialog");
function zukanGroup(type) {
  if (type.rarityKey === "legend") return { key: "legend", name: "レジェンド", english: "LEGEND ARCHIVE" };
  if (type.rarityKey === "super") return { key: "super", name: "スーパーレア", english: "SPECIAL SPECIMENS" };
  return { key: "standard", name: "ノーマル・レア", english: "STANDARD COLLECTION" };
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

function renderZukan() {
  const grid = document.querySelector("#zukanGrid");
  grid.replaceChildren();
  const foundCount = CACTUS_TYPES.filter(function (type) { return (state.collections[type.id] || 0) > 0; }).length;
  document.querySelector("#zukanDialog .collection-progress").textContent = foundCount + " / " + CACTUS_TYPES.length;
  let currentGroup = "";
  CACTUS_TYPES.forEach(function (type, typeIndex) {
    const count = state.collections[type.id] || 0;
    const group = zukanGroup(type);
    if (group.key !== currentGroup) {
      currentGroup = group.key;
      const heading = document.createElement("div");
      heading.className = "zukan-section-title group-" + group.key;
      heading.innerHTML = "<b>" + group.name + "</b><small>" + group.english + "</small>";
      grid.append(heading);
    }
    const entry = document.createElement("button");
    entry.className = "zukan-entry rarity-" + type.rarityKey + (count ? " found" : " not-found");
    entry.type = "button";
    entry.dataset.cactusId = type.id;
    entry.setAttribute("aria-pressed", "false");
    entry.innerHTML = '<span class="zukan-entry-number">No.' + String(typeIndex + 1).padStart(2, "0") + '</span><span class="zukan-picture"><img src="' + type.sprite + '" alt="" /></span><span class="zukan-info"><small>' + type.rarity + '</small><b>' + (count ? type.name : "？？？") + '</b><em>' + count + 'たい しゅうかく</em></span>';
    entry.addEventListener("click", function () { showZukanHero(type, count, entry); });
    grid.append(entry);
  });
}
document.querySelector("#zukanButton").addEventListener("click", function () {
  renderZukan();
  const firstFound = CACTUS_TYPES.find(function (type) { return (state.collections[type.id] || 0) > 0; }) || CACTUS_TYPES[0];
  const firstFoundCount = state.collections[firstFound.id] || 0;
  const firstEntry = document.querySelector('.zukan-entry[data-cactus-id="' + firstFound.id + '"]');
  showZukanHero(firstFound, firstFoundCount, firstEntry);
  zukanDialog.showModal();
});
document.querySelector("#zukanClose").addEventListener("click", function () { zukanDialog.close(); });
[mathDialog, equipmentDialog, zukanDialog, resetDialog].forEach(function (dialog) {
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
});
mathDialog.addEventListener("close", function () {
  clearTimeout(nextTimer);
  if (state.tutorialStep === "equipment") scheduleTutorial(180);
});
render();
setInterval(function () { if (!harvestAnimationCount) render(); }, 1000);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").then(function (registration) {
      registration.update();
    }).catch(function () {});
  });
}
