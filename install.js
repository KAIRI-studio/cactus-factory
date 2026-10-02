(function () {
  "use strict";
  const key = "cactus-factory-install-guide-dismissed";
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/.test(navigator.userAgent);
  const desktop = !ios && !android;
  const installLabel = desktop ? "アプリとして追加" : "ホーム画面に追加";
  const standalone = window.matchMedia("(display-mode: standalone)");
  const dialog = document.querySelector("#installDialog");
  const steps = document.querySelector("#installSteps");
  const help = document.querySelector("#installHelpButton");
  const nativeButton = document.querySelector("#installNativeButton");
  const status = document.querySelector("#installStatus");
  let promptEvent = null;
  let installed = false;
  let dismissed = false;
  try { dismissed = localStorage.getItem(key) === "1"; } catch (_) {}
  function isInstalled() { return installed || standalone.matches || navigator.standalone === true; }
  function refresh() {
    help.textContent = installLabel;
    nativeButton.textContent = installLabel;
    help.hidden = isInstalled() || !(ios || android || promptEvent);
    if (typeof renderFactoryGuide === "function") renderFactoryGuide();
  }
  function dismiss() {
    dismissed = true;
    try { localStorage.setItem(key, "1"); } catch (_) {}
    refresh();
  }
  function open() {
    dismiss();
    document.querySelector("#installHeading").textContent = desktop
      ? "アプリとして追加して\nすぐに あそぼう"
      : "ホーム画面から\nすぐに あそぼう";
    document.querySelector(".install-lead").textContent = desktop
      ? "専用のウィンドウで、いつでも工場へ。"
      : "アイコンを追加して、いつでも工場へ。";
    status.hidden = true;
    nativeButton.hidden = !promptEvent;
    steps.hidden = !!promptEvent;
    const instructions = ios
      ? ["Safariで このゲームを開く", "共有ボタン（□に↑）をタップ", "「ホーム画面に追加」→「追加」"]
      : desktop
        ? ["ブラウザのアドレスバーの追加アイコン、またはメニューを開く", "このゲームをアプリとしてインストール", "追加したアプリから、いつでも工場へ"]
        : ["ブラウザのメニュー（⋮）を開く", "「ホーム画面に追加」または「アプリをインストール」を選ぶ", "表示された案内にそって追加"];
    steps.replaceChildren(...instructions.map(function (copy) {
      const li = document.createElement("li"); li.textContent = copy; return li;
    }));
    if (!dialog.open) dialog.showModal();
  }
  window.CactusInstall = {
    shouldSuggest: function () { return !dismissed && !isInstalled() && (ios || android || !!promptEvent); },
    suggestionText: desktop ? "アプリから すぐあそべるよ" : "ホーム画面から すぐあそべるよ",
    open: open
  };
  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault(); promptEvent = event; refresh();
  });
  window.addEventListener("appinstalled", function () {
    installed = true; promptEvent = null; dismiss(); dialog.close();
  });
  standalone.addEventListener("change", refresh);
  document.querySelector("#installLater").addEventListener("click", dismiss);
  help.addEventListener("click", open);
  document.querySelector("#installClose").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  nativeButton.addEventListener("click", async function () {
    if (!promptEvent) return;
    const request = promptEvent;
    promptEvent = null;
    nativeButton.disabled = true;
    try {
      await request.prompt();
      const choice = await request.userChoice;
      status.textContent = choice.outcome === "accepted" ? "追加の手続きを受け付けました。" : "あとから、ブラウザのメニューでも追加できます。";
    } catch (_) {
      status.textContent = "ブラウザのメニューから追加してください。";
    } finally {
      status.hidden = false; nativeButton.hidden = true; nativeButton.disabled = false; refresh();
    }
  });
  refresh();
}());
