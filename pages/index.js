
export const access = "public";

export default async function (req, res) {
  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Babydoll Google</title>
  <link rel="stylesheet" href="/theme.css">

  <style>
    /* Birthday logo */

    .birthday-doodle {
      text-align: center;
      margin: 20px auto 12px;
      padding: 10px 12px;
      overflow: hidden;
    }

    .google-birthday-logo {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
      font-size: clamp(48px, 9vw, 88px);
      font-weight: 700;
      letter-spacing: -5px;
      line-height: 1.2;
      white-space: nowrap;
      animation: logo-arrive 0.9s ease-out both;
    }

    .g-letter {
      display: inline-block;
      position: relative;
      transform-origin: center bottom;
      animation: letter-bounce 2.8s ease-in-out infinite;
    }

    .g-letter:nth-child(1) { animation-delay: 0s; }
    .g-letter:nth-child(2) { animation-delay: 0.12s; }
    .g-letter:nth-child(3) { animation-delay: 0.24s; }
    .g-letter:nth-child(4) { animation-delay: 0.36s; }
    .g-letter:nth-child(5) { animation-delay: 0.48s; }
    .g-letter:nth-child(6) { animation-delay: 0.60s; }

    .g-blue { color: #4285f4; }
    .g-red { color: #ea4335; }
    .g-yellow { color: #fbbc05; }
    .g-green { color: #34a853; }

    /* First o becomes 2 */

    .first-o {
      min-width: 0.57em;
      text-align: center;
    }

    .first-o .original-letter,
    .first-o .age-number {
      display: inline-block;
      transition:
        opacity 0.65s ease,
        transform 0.65s ease;
    }

    .first-o .age-number {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0.25) rotate(-15deg);
      pointer-events: none;
    }

    .birthday-doodle.show-age .first-o .original-letter {
      opacity: 0;
      transform: scale(0.35);
    }

    .birthday-doodle.show-age .first-o .age-number {
      opacity: 1;
      transform: scale(1) rotate(0);
    }

    .birthday-caption {
      min-height: 26px;
      margin: 12px auto 0;
      color: #5f6368;
      font-size: clamp(14px, 2.5vw, 17px);
      letter-spacing: 0.2px;
    }

    /* Profile popup */

    .topbar {
      position: relative;
    }

    .profile {
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .profile img {
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-popup {
      position: absolute;
      z-index: 1000;
      top: 52px;
      right: 0;
      width: min(340px, calc(100vw - 32px));
      padding: 22px;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #e8eaed;
      border-radius: 22px;
      box-shadow: 0 8px 30px rgba(60, 64, 67, 0.22);
      color: #202124;
      text-align: center;
    }

    .profile-popup[hidden] {
      display: none !important;
    }

    .profile-close {
      position: absolute;
      top: 9px;
      right: 12px;
      width: 32px;
      height: 32px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: #5f6368;
      font-size: 25px;
      cursor: pointer;
    }

    .profile-close:hover {
      background: #f1f3f4;
    }

    .profile-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 9px;
      padding: 10px 0 18px;
    }

    .profile-main img {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-email {
      font-size: 15px;
      font-weight: 600;
    }

    .profile-label {
      color: #5f6368;
      font-size: 13px;
    }

    .profile-quote {
      padding: 16px 12px;
      border-radius: 15px;
      background: #fff3f7;
      color: #a33d69;
      font-size: 14px;
      line-height: 1.6;
    }

    /* Video shortcut icons: S, V, 1, 8 */

    .video-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 12px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 22px;
      font-weight: 500;
      color: #fff;
      box-sizing: border-box;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .icon-s { background: #4285f4; }
    .icon-v { background: #34a853; }
    .icon-one {
      background: #fbbc05;
      color: #202124;
    }
    .icon-eight { background: #ea4335; }

    .video-shortcut {
      border: none;
      background: transparent;
      cursor: pointer;
      font: inherit;
      color: inherit;
      text-align: center;
      width: 100%;
    }

    .video-shortcut:hover .video-icon {
      transform: scale(1.08);
      box-shadow: 0 3px 10px rgba(60, 64, 67, 0.2);
    }

    .video-shortcut:focus-visible {
      outline: 2px solid #4285f4;
      outline-offset: 3px;
    }

    /* Video popup */

    .video-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(5px);
    }

    .video-modal[hidden] {
      display: none !important;
    }

    .video-modal-content {
      position: relative;
      width: 75vw;
      height: 75vh;
      max-width: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #111;
      border-radius: 16px;
      box-shadow: 0 20px 70px rgba(0, 0, 0, 0.5);
    }

    .video-modal-content video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 16px;
      background: #000;
    }

    .video-close {
      position: absolute;
      z-index: 2;
      top: -15px;
      right: -15px;
      width: 42px;
      height: 42px;
      border: 0;
      border-radius: 50%;
      background: #fff;
      color: #202124;
      font-size: 29px;
      line-height: 1;
      cursor: pointer;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
    }

    .video-close:hover {
      background: #f1f3f4;
    }

    body.video-modal-open {
      overflow: hidden;
    }

    .video-error {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 12px;
      z-index: 3;
      padding: 10px;
      border-radius: 8px;
      background: #fff;
      color: #b3261e;
      text-align: center;
      font-size: 14px;
    }

    .video-error[hidden] {
      display: none !important;
    }

    @keyframes logo-arrive {
      from {
        opacity: 0;
        transform: translateY(18px) scale(0.85);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes letter-bounce {
      0%, 75%, 100% {
        transform: translateY(0) rotate(0);
      }
      15% {
        transform: translateY(-6px) rotate(-3deg);
      }
      30% {
        transform: translateY(0) rotate(2deg);
      }
    }

    @media (max-width: 480px) {
      .google-birthday-logo {
        letter-spacing: -3px;
      }

      .birthday-doodle {
        margin-top: 12px;
      }

      .video-modal {
        padding: 12px;
      }

      .video-modal-content {
        width: 94vw;
        height: 70vh;
      }

      .video-close {
        top: -12px;
        right: -5px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .birthday-doodle *,
      .video-icon {
        animation: none !important;
        transition: none !important;
      }
    }
  </style>
</head>

<body>
  <div class="topbar">
    <button class="apps-btn" type="button" aria-label="Google apps">
      <span class="dots" aria-hidden="true"></span>
    </button>

    <button
      class="profile"
      id="profileBtn"
      type="button"
      aria-label="Open profile"
      aria-expanded="false"
      aria-controls="profilePopup"
    >
      <img src="/assets/cat.svg" alt="Cat">
    </button>

    <div class="profile-popup" id="profilePopup" hidden>
      <button
        class="profile-close"
        id="profileClose"
        type="button"
        aria-label="Close profile"
      >×</button>

      <div class="profile-main">
        <img src="/assets/cat.svg" alt="Cat profile picture">
        <div class="profile-email">meow143@gmail.com</div>
        <div class="profile-label">
          My little corner of the internet 🐾
        </div>
      </div>

      <div class="profile-quote">
        “You make the world a little brighter just by being you. Keep smiling! 💗”
      </div>
    </div>
  </div>

  <main class="home-main">

    <!-- Birthday logo -->
    <div class="birthday-doodle" id="birthdayDoodle">
      <div class="google-birthday-logo" aria-label="Birthday logo animation">
        <span class="g-letter g-blue">G</span>

        <span class="g-letter g-blue first-o">
          <span class="original-letter">o</span>
          <span class="age-number">2</span>
        </span>

        <span class="g-letter g-red">o</span>
        <span class="g-letter g-yellow">g</span>
        <span class="g-letter g-green">l</span>
        <span class="g-letter g-red">e</span>
      </div>

      <p class="birthday-caption" id="birthdayCaption" aria-live="polite">
        A little birthday magic is coming...
      </p>
    </div>

    <!-- Search -->
    <div class="search-wrap" id="searchWrap">
      <div class="searchbox">
        <span class="search-icon" aria-hidden="true"></span>

        <input
          id="search"
          placeholder="Search"
          readonly
          aria-readonly="true"
          autocomplete="off"
        >

        <button class="voice-btn" type="button" aria-label="Voice Search">
          🎙
        </button>

        <button class="lens-btn" type="button" aria-label="Birthday gift">
          🎁
        </button>
      </div>

      <div class="history" id="history" hidden>
        <a class="history-item" href="/search/babydoll">
          ◷ who is babydoll
        </a>
        <a class="history-item" href="/search/cute">
          ◷ How to look cute
        </a>
        <a class="history-item" href="/search/smiles">
          ◷ how to put a hundred smiles with a single click
        </a>
      </div>
    </div>

    <div class="search-buttons">
      <button type="button">Google Search</button>
      <button type="button">Feeling Lucky</button>
    </div>

    <!-- Video shortcuts -->
    <section class="shortcuts">


      <div class="shortcut-grid">
        <button
          class="shortcut video-shortcut"
          type="button"
          data-video="/assets/shortcut/1.mp4"
        >
          <div class="shortcut-icon video-icon icon-s">S</div>
          
          <small>Click to watch</small>
        </button>

        <button
          class="shortcut video-shortcut"
          type="button"
          data-video="/assets/shortcut/2.mp4"
        >
          <div class="shortcut-icon video-icon icon-v">V</div>
          
          <small>Click to watch</small>
        </button>

        <button
          class="shortcut video-shortcut"
          type="button"
          data-video="/assets/shortcut/3.mp4"
        >
          <div class="shortcut-icon video-icon icon-one">1</div>
          
          <small>Click to watch</small>
        </button>

        <button
          class="shortcut video-shortcut"
          type="button"
          data-video="/assets/shortcut/4.mp4"
        >
          <div class="shortcut-icon video-icon icon-eight">8</div>
          
          <small>Click to watch</small>
        </button>
      </div>
    </section>
  </main>

  <!-- Video modal -->
  <div class="video-modal" id="videoModal" hidden>
    <div
      class="video-modal-content"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <button
        class="video-close"
        id="videoClose"
        type="button"
        aria-label="Close video"
      >×</button>

      <video
        id="shortcutVideo"
        controls
        playsinline
        preload="metadata"
      ></video>

      <p class="video-error" id="videoError" role="alert" hidden>
        Unable to play this video. Check the file path and video format.
      </p>
    </div>
  </div>

  <script src="/site.js"></script>

  <script>
    (() => {
      /* Birthday animation */

      const doodle = document.getElementById("birthdayDoodle");
      const caption = document.getElementById("birthdayCaption");

      if (doodle && doodle.dataset.started !== "true") {
        doodle.dataset.started = "true";

        setTimeout(() => {
          doodle.classList.add("show-age");
          caption.textContent = "Hello 21 ✨";
        }, 1000);
      }

      /* Profile popup */

      const profileBtn = document.getElementById("profileBtn");
      const profilePopup = document.getElementById("profilePopup");
      const profileClose = document.getElementById("profileClose");

      if (profileBtn && profilePopup && profileClose) {
        function openProfile() {
          profilePopup.hidden = false;
          profileBtn.setAttribute("aria-expanded", "true");
        }

        function closeProfile() {
          profilePopup.hidden = true;
          profileBtn.setAttribute("aria-expanded", "false");
        }

        profileBtn.addEventListener("click", (event) => {
          event.stopPropagation();

          if (profilePopup.hidden) {
            openProfile();
          } else {
            closeProfile();
          }
        });

        profileClose.addEventListener("click", closeProfile);

        document.addEventListener("click", (event) => {
          if (
            !profilePopup.hidden &&
            !profilePopup.contains(event.target) &&
            !profileBtn.contains(event.target)
          ) {
            closeProfile();
          }
        });

        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && !profilePopup.hidden) {
            closeProfile();
            profileBtn.focus();
          }
        });
      }

      /* Video popup */

      const modal = document.getElementById("videoModal");
      const video = document.getElementById("shortcutVideo");
      const closeBtn = document.getElementById("videoClose");
      const videoError = document.getElementById("videoError");
      const shortcuts = document.querySelectorAll(".video-shortcut");

      if (!modal || !video || !closeBtn) {
        console.error("Video modal elements are missing.");
        return;
      }

      let previousFocus = null;
      let historyEntryAdded = false;
      let ignoreNextPopstate = false;

      function openVideo(src) {
        if (!src) return;

        previousFocus = document.activeElement;
        videoError.hidden = true;

        video.pause();
        video.src = src;
        video.load();

        modal.hidden = false;
        document.body.classList.add("video-modal-open");
        closeBtn.focus();

        if (!historyEntryAdded) {
          history.pushState({ videoPopup: true }, "");
          historyEntryAdded = true;
        }

        video.play().catch((error) => {
          console.warn("Playback did not start automatically:", error);
          // The video controls remain available to start playback manually.
        });
      }

      function closeVideo(goBack = true) {
        if (modal.hidden) return;

        modal.hidden = true;
        video.pause();
        video.removeAttribute("src");
        video.load();

        document.body.classList.remove("video-modal-open");
        videoError.hidden = true;

        if (goBack && historyEntryAdded) {
          historyEntryAdded = false;
          ignoreNextPopstate = true;
          history.back();
        } else {
          historyEntryAdded = false;
        }

        if (previousFocus && typeof previousFocus.focus === "function") {
          previousFocus.focus();
        }
      }

      shortcuts.forEach((button) => {
        button.addEventListener("click", () => {
          openVideo(button.dataset.video);
        });
      });

      closeBtn.addEventListener("click", () => {
        closeVideo(true);
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeVideo(true);
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
          closeVideo(true);
        }
      });

      video.addEventListener("error", () => {
        if (!modal.hidden && video.currentSrc) {
          videoError.hidden = false;
        }
      });

      window.addEventListener("popstate", () => {
        if (ignoreNextPopstate) {
          ignoreNextPopstate = false;
          return;
        }

        if (!modal.hidden) {
          closeVideo(false);
        } else {
          historyEntryAdded = false;
        }
      });
    })();
  </script>
</body>
</html>`);
}
