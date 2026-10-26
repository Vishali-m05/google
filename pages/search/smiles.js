
export const access = "public";

export default async function (req, res) {
  const videos = [
    { file: "chaturya.mp4", paper: "#fff0f5", seal: "#d9689a" },
    { file: "devi.mp4", paper: "#fff3e8", seal: "#d88b69" },
    { file: "grace.mp4", paper: "#fff0f5", seal: "#d9689a" },
    { file: "harshitha.mp4", paper: "#f3edff", seal: "#9c83d6" },
    { file: "jasmi.mp4", paper: "#eaf6ff", seal: "#6eabc9" },
    { file: "keerthana.mp4", paper: "#fff0f0", seal: "#d87883" },
    { file: "kiranmai.mp4", paper: "#fff0f0", seal: "#d87883" },
    { file: "lavanya.mp4", paper: "#f1f9e9", seal: "#8cae68" },
    { file: "madhu.mp4", paper: "#fcecff", seal: "#c66db5" },
    { file: "pranavi.mp4", paper: "#fff1e6", seal: "#db9671" },
    { file: "vishali.mp4", paper: "#eaf8f2", seal: "#73ad99" },
    { file: "yamini.mp4", paper: "#f0edff", seal: "#9282d1" }
  ];

  const envelopes = videos.map((video, index) => `
    <button
      class="letter-card"
      type="button"
      data-video="/assets/wishes/${encodeURIComponent(video.file)}"
      style="--paper:${video.paper}; --seal:${video.seal}; --i:${index}"
      aria-label="Open video ${index + 1}"
    >
      <span class="envelope-scene" aria-hidden="true">
        <span class="letter-paper"></span>
        <span class="envelope-body"></span>
        <span class="envelope-flap"></span>
        <span class="envelope-seal">♥</span>
      </span>
    </button>
  `).join("");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fffafc">
  <title>Hundred Smiles</title>

  <style>
    :root {
      --page-bg: #fffafc;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      width: 100%;
      height: 100%;
      min-height: 0;
      margin: 0;
      background: var(--page-bg);
    }

    body {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    /* HOME NAVIGATION */

    .smile-navbar {
      position: relative;
      z-index: 20;
      flex: 0 0 auto;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 12px 30px;
      background: rgba(255, 250, 252, 0.96);
    }

    .home-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 10px 20px;
      border: 1px solid #f0cbd9;
      border-radius: 30px;
      background: #fff;
      color: #8b4565;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(139, 69, 101, 0.10);
      transition:
        background 0.25s ease,
        transform 0.25s ease,
        box-shadow 0.25s ease;
    }

    .home-btn:hover {
      background: #fbeaf1;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(139, 69, 101, 0.16);
    }

    .home-icon {
      font-size: 22px;
      line-height: 1;
    }

    /* MAIN ENVELOPE AREA */

    .smile-main {
      flex: 1 1 auto;
      width: 100%;
      height: 0;
      min-height: 0;
      padding: 8px 20px 12px;
      overflow: hidden;
      background: var(--page-bg);
    }

    /* DESKTOP: 4 COLUMNS × 3 ROWS */

    .letter-gallery {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      width: 100%;
      height: 100%;
      min-height: 0;
      max-width: 1500px;
      margin: 0 auto;
      padding: 8px 12px;
      column-gap: 14px;
      row-gap: 12px;
      overflow: hidden;
    }

    .letter-card {
      appearance: none;
      position: relative;
      display: grid;
      place-items: center;
      justify-self: center;
      align-self: center;
      width: min(76%, 165px, 20vh);
      min-width: 0;
      height: auto;
      aspect-ratio: 1.55 / 1;
      margin: 0;
      padding: 0;
      border: none;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: pointer;
      animation: envelopeFloat 4s ease-in-out infinite;
      animation-delay: calc(var(--i) * -0.4s);
      -webkit-tap-highlight-color: transparent;
    }

    /* NATURAL SCATTERED APPEARANCE */

    .letter-card:nth-child(1)  { rotate: -9deg; translate: -7px -3px; }
    .letter-card:nth-child(2)  { rotate: 7deg;  translate: 8px 4px; }
    .letter-card:nth-child(3)  { rotate: -5deg; translate: -5px -4px; }
    .letter-card:nth-child(4)  { rotate: 8deg;  translate: 5px 5px; }
    .letter-card:nth-child(5)  { rotate: 6deg;  translate: 7px -3px; }
    .letter-card:nth-child(6)  { rotate: -8deg; translate: -7px 4px; }
    .letter-card:nth-child(7)  { rotate: 5deg;  translate: 6px -5px; }
    .letter-card:nth-child(8)  { rotate: -6deg; translate: -5px 4px; }
    .letter-card:nth-child(9)  { rotate: 9deg;  translate: -5px -4px; }
    .letter-card:nth-child(10) { rotate: -7deg; translate: 6px 4px; }
    .letter-card:nth-child(11) { rotate: 6deg;  translate: -5px -3px; }
    .letter-card:nth-child(12) { rotate: -8deg; translate: 6px 4px; }

    .letter-card:focus-visible {
      outline: 2px dashed var(--seal);
      outline-offset: 5px;
    }

    /* ENVELOPE ART */

    .envelope-scene {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      perspective: 700px;
      isolation: isolate;
    }

    .letter-paper {
      position: absolute;
      z-index: 1;
      top: 10%;
      left: 13%;
      right: 13%;
      height: 78%;
      border: 1px solid #78505f20;
      border-radius: 5px 5px 2px 2px;
      background: #fffdf8;
      box-shadow: 0 3px 8px #502d3c14;
      transition:
        top 0.5s ease,
        transform 0.5s ease;
    }

    .envelope-body {
      position: absolute;
      z-index: 2;
      inset: 25% 0 0;
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--seal) 22%, white);
      border-radius: 5px 5px 10px 10px;
      background: var(--paper);
      box-shadow: 0 8px 15px #502d3c17;
    }

    .envelope-body::before,
    .envelope-body::after {
      position: absolute;
      bottom: -1px;
      width: 0;
      height: 0;
      content: "";
      border-top: 70px solid transparent;
    }

    .envelope-body::before {
      left: 0;
      border-right: 95px solid
        color-mix(in srgb, var(--seal) 12%, var(--paper));
      clip-path: polygon(0 0, 100% 100%, 0 100%);
    }

    .envelope-body::after {
      right: 0;
      border-left: 95px solid
        color-mix(in srgb, var(--seal) 12%, var(--paper));
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }

    .envelope-flap {
      position: absolute;
      z-index: 4;
      top: 25%;
      left: 0;
      width: 100%;
      height: 48%;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      transform-origin: top center;
      background: color-mix(in srgb, var(--seal) 15%, var(--paper));
      transition: transform 0.5s ease;
    }

    .envelope-seal {
      position: absolute;
      z-index: 5;
      top: 47%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border: 2px solid #ffffffcc;
      border-radius: 50%;
      background: var(--seal);
      color: white;
      font-size: 15px;
      box-shadow: 0 3px 8px #502d3c2e;
      transform: translate(-50%, -50%);
      transition: opacity 0.25s ease;
    }

    /* HOVER AND OPENING ANIMATIONS */

    .letter-card:hover .letter-paper {
      top: -2%;
      transform: translateY(-8px) rotate(-2deg);
    }

    .letter-card:hover .envelope-flap {
      transform: rotateX(35deg);
    }

    .letter-card.is-opening {
      animation-play-state: paused;
    }

    .letter-card.is-opening .letter-paper {
      top: -24%;
      transform: translateY(-12px) rotate(-3deg);
    }

    .letter-card.is-opening .envelope-flap {
      transform: rotateX(180deg);
    }

    .letter-card.is-opening .envelope-seal {
      opacity: 0;
    }

    @keyframes envelopeFloat {
      0%, 100% {
        translate: 0 0;
      }

      50% {
        translate: 0 -5px;
      }
    }

    /* VIDEO POPUP */

    .memory-modal {
      position: fixed;
      z-index: 9999;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      background: #2c1925cc;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .memory-modal.is-visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .memory-dialog {
      position: relative;
      width: min(900px, 100%);
      max-height: 90vh;
      max-height: 90dvh;
      padding: 12px;
      border-radius: 14px;
      background: #fffafc;
      box-shadow: 0 24px 90px #140a1152;
      transform: scale(0.97);
      transition: transform 0.25s ease;
    }

    .memory-modal.is-visible .memory-dialog {
      transform: scale(1);
    }

    .memory-close {
      position: absolute;
      z-index: 2;
      top: 18px;
      right: 18px;
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border: 0;
      border-radius: 50%;
      background: #fffafc;
      color: #6b3e55;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 2px 8px #0002;
    }

    .memory-video {
      display: block;
      width: 100%;
      max-height: 82vh;
      max-height: 82dvh;
      border-radius: 8px;
      background: #000;
      object-fit: contain;
    }

    body.modal-open {
      overflow: hidden;
    }

    /* TABLET: 3 COLUMNS × 4 ROWS */

    @media (max-width: 900px) {
      .smile-navbar {
        padding: 10px 20px;
      }

      .smile-main {
        padding: 6px 10px 8px;
      }

      .letter-gallery {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(4, minmax(0, 1fr));
        column-gap: 8px;
        row-gap: 6px;
        padding: 6px;
      }

      .letter-card {
        width: min(78%, 145px, 15vh);
      }
    }

    /* MOBILE */

    @media (max-width: 600px) {
      .smile-navbar {
        padding: 8px 12px;
      }

      .home-btn {
        gap: 7px;
        padding: 8px 14px;
        font-size: 13px;
      }

      .home-icon {
        font-size: 19px;
      }

      .smile-main {
        padding: 3px 5px 5px;
      }

      .letter-gallery {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(4, minmax(0, 1fr));
        column-gap: 3px;
        row-gap: 3px;
        padding: 5px 2px;
      }

      .letter-card {
        width: min(84%, 120px, 14vh);
      }

      .envelope-seal {
        width: 25px;
        height: 25px;
        font-size: 12px;
      }

      .envelope-body::before {
        border-right-width: 73px;
        border-top-width: 56px;
      }

      .envelope-body::after {
        border-left-width: 73px;
        border-top-width: 56px;
      }

      .memory-modal {
        padding: 8px;
      }

      .memory-dialog {
        width: 100%;
        max-height: 90vh;
        max-height: 90dvh;
        padding: 8px;
      }

      .memory-video {
        max-height: 80vh;
        max-height: 80dvh;
      }

      .memory-close {
        top: 12px;
        right: 12px;
        width: 36px;
        height: 36px;
      }
    }

    /* EXTRA SMALL PHONES */

    @media (max-width: 380px) {
      .letter-gallery {
        column-gap: 1px;
        row-gap: 2px;
        padding: 4px 1px;
      }

      .letter-card {
        width: min(88%, 105px, 13vh);
      }

      .envelope-seal {
        width: 21px;
        height: 21px;
        font-size: 11px;
      }
    }

    /* SHORT SCREENS */

    @media (max-height: 650px) {
      .smile-navbar {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .smile-main {
        padding-top: 3px;
        padding-bottom: 4px;
      }

      .letter-gallery {
        padding-top: 4px;
        padding-bottom: 4px;
        row-gap: 3px;
      }

      .letter-card {
        width: min(70%, 125px, 15vh);
      }
    }

    /* ACCESSIBILITY */

    @media (prefers-reduced-motion: reduce) {
      .letter-card {
        animation: none;
      }

      .letter-paper,
      .envelope-flap {
        transition: none;
      }
    }
  </style>
</head>

<body>
  <!-- HOME NAVIGATION -->

  <nav class="smile-navbar" aria-label="Main navigation">
    <a href="/" class="home-btn">
      <span class="home-icon" aria-hidden="true">⌂</span>
      <span>Home</span>
    </a>
  </nav>

  <!-- ENVELOPES -->

  <main class="smile-main">
    <div class="letter-gallery">
      ${envelopes}
    </div>
  </main>

  <!-- VIDEO POPUP -->

  <div
    class="memory-modal"
    id="memoryModal"
    aria-hidden="true"
    role="dialog"
    aria-modal="true"
    aria-label="Video player"
  >
    <section class="memory-dialog">
      <button
        class="memory-close"
        id="memoryClose"
        type="button"
        aria-label="Close video"
      >×</button>

      <video
        class="memory-video"
        id="memoryVideo"
        controls
        playsinline
        preload="metadata"
      ></video>
    </section>
  </div>

  <script>
    (() => {
      const cards = document.querySelectorAll(".letter-card");
      const modal = document.getElementById("memoryModal");
      const closeButton = document.getElementById("memoryClose");
      const player = document.getElementById("memoryVideo");

      let lastCard = null;
      let openTimer = null;

      function openLetter(card) {
        if (openTimer !== null) {
          clearTimeout(openTimer);
        }

        cards.forEach((item) => {
          item.classList.remove("is-opening");
        });

        lastCard = card;
        card.classList.add("is-opening");

        openTimer = setTimeout(() => {
          player.pause();
          player.removeAttribute("src");

          const source = document.createElement("source");
          source.src = card.dataset.video;
          source.type = "video/mp4";

          player.replaceChildren(source);
          player.load();

          modal.classList.add("is-visible");
          modal.setAttribute("aria-hidden", "false");
          document.body.classList.add("modal-open");

          openTimer = null;
          closeButton.focus();

          const playAttempt = player.play();

          if (playAttempt && typeof playAttempt.catch === "function") {
            playAttempt.catch(() => {
              // Playback can be started using the video controls.
            });
          }
        }, 450);
      }

      function closeLetter() {
        if (openTimer !== null) {
          clearTimeout(openTimer);
          openTimer = null;
        }

        modal.classList.remove("is-visible");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        player.pause();
        player.removeAttribute("src");
        player.replaceChildren();
        player.load();

        cards.forEach((item) => {
          item.classList.remove("is-opening");
        });

        if (lastCard) {
          lastCard.focus();
          lastCard = null;
        }
      }

      cards.forEach((card) => {
        card.addEventListener("click", () => openLetter(card));
      });

      closeButton.addEventListener("click", closeLetter);

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeLetter();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape" &&
          modal.classList.contains("is-visible")
        ) {
          closeLetter();
        }
      });
    })();
  </script>
</body>
</html>`);
}
