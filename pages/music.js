export const access = "public";

export default async function (req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Babydoll Music</title>
  <link rel="stylesheet" href="/theme.css">
  <style>
    :root {
      color-scheme: light;
      --pink: #c44d89;
      --pink-dark: #8e315f;
      --pink-soft: #fff0f7;
      --ink: #302432;
      --muted: #857584;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top left,
        #fff0f7 0, #fff9fc 38%, #f7f3ff 100%);
      color: var(--ink);
    }

    button, input { font: inherit; }

    .music-page {
      width: min(1220px, 100% - 32px);
      margin: 28px auto 44px;
    }

    .page-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 20px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 13px;
    }

    .brand-icon {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border-radius: 15px;
      background: linear-gradient(135deg, #eaa1c7, #b7a4ef);
      color: white;
      font-size: 25px;
      box-shadow: 0 8px 22px #c65b9128;
    }

    h1 {
      font-size: clamp(25px, 3vw, 34px);
      margin: 0;
      letter-spacing: -1px;
    }

    .subtitle {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: 14px;
    }
          .back-home {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 11px 17px;
      border: 1px solid #efd5e4;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      color: #8e315f;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      transition: background 0.2s, transform 0.2s;
    }

    .back-home:hover {
      background: #fce5f0;
      transform: translateY(-1px);
    }

    .player-panel {
      display: grid;
      grid-template-columns: 92px minmax(0, 1fr);
      gap: 22px;
      align-items: center;
      padding: 22px 26px;
      border: 1px solid #f0dce8;
      border-radius: 22px;
      background: rgba(255,255,255,.9);
      box-shadow: 0 12px 34px rgba(91,45,76,.07);
    }

    .album {
      width: 92px;
      height: 92px;
      border-radius: 18px;
      display: grid;
      place-items: center;
      background: linear-gradient(140deg, #f3bfd9, #c6b8f6);
      color: white;
      font-size: 43px;
      box-shadow: inset 0 0 0 1px #ffffff66;
    }

    .now-playing { min-width: 0; }

    .eyebrow {
      color: var(--pink);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 800;
      font-size: 10px;
      margin: 0 0 6px;
    }

    #trackTitle {
      margin: 0;
      font-size: 20px;
      font-weight: 750;
      overflow-wrap: anywhere;
    }

    #status {
      min-height: 17px;
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 12px;
    }

    #player { display: none; }

    .duration-control {
      width: 100%;
      margin: 13px 0 4px;
    }

    #seekBar {
      display: block;
      width: 100%;
      height: 5px;
      margin: 0 0 9px;
      cursor: pointer;
      accent-color: var(--pink);
      touch-action: pan-y;
    }

    .time-row {
      display: flex;
      justify-content: space-between;
      color: var(--muted);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }

    .player-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .controls button {
      width: 39px;
      height: 39px;
      display: grid;
      place-items: center;
      border: 1px solid #f0dce8;
      border-radius: 50%;
      cursor: pointer;
      background: #fff5fa;
      color: var(--pink-dark);
      font-size: 16px;
      transition: transform .15s ease, background .15s ease;
    }

    .controls button:hover {
      transform: translateY(-1px);
      background: #fce5f0;
    }

    #playPauseBtn {
      width: 45px;
      height: 45px;
      background: var(--pink);
      border-color: var(--pink);
      color: white;
      font-size: 19px;
      box-shadow: 0 6px 15px #c44d8933;
    }

    .player-hint {
      color: var(--muted);
      font-size: 12px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(320px, .85fr) minmax(0, 1.15fr);
      gap: 20px;
      margin-top: 20px;
      align-items: stretch;
    }

    .panel {
      min-width: 0;
      overflow: hidden;
      border: 1px solid #f0dce8;
      border-radius: 22px;
      background: rgba(255,255,255,.92);
      box-shadow: 0 12px 34px rgba(91,45,76,.055);
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 19px 21px 15px;
      border-bottom: 1px solid #f5e7ef;
    }

    .panel-header h2 {
      margin: 0;
      font-size: 17px;
    }

    .panel-count {
      padding: 5px 9px;
      border-radius: 20px;
      background: var(--pink-soft);
      color: var(--pink-dark);
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
    }

    .playlist {
      max-height: 570px;
      overflow-y: auto;
      padding: 8px;
      scrollbar-color: #e8bfd5 transparent;
      scrollbar-width: thin;
    }

    .track {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 12px;
      border-radius: 12px;
      cursor: pointer;
      transition: background .15s ease;
      outline: none;
    }

    .track:hover, .track:focus-visible {
      background: #fff4f9;
    }

    .track.active { background: #fce8f2; }

    .track-number {
      width: 28px;
      flex: 0 0 28px;
      text-align: center;
      color: #a78c9c;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .track.active .track-number {
      color: var(--pink-dark);
      font-weight: 800;
    }

    .track-info { flex: 1; min-width: 0; }

    .track-info b {
      display: block;
      color: #382b38;
      font-size: 13px;
      font-weight: 650;
      overflow-wrap: anywhere;
    }

    .video-meta {
      font-size: 11px;
      color: var(--muted);
      margin-top: 4px;
    }

    .track-indicator {
      color: var(--pink);
      opacity: 0;
      font-size: 14px;
    }

    .track.active .track-indicator { opacity: 1; }

    .lyrics-panel {
      display: flex;
      flex-direction: column;
      min-height: 600px;
    }

    .lyrics-panel .panel-header { padding-bottom: 18px; }
    .lyrics-heading-wrap { min-width: 0; }

    #lyricsTitle {
      color: var(--pink-dark);
      font-size: 12px;
      margin: 5px 0 0;
      overflow-wrap: anywhere;
    }

    .lyrics-content {
      flex: 1;
      min-height: 430px;
      max-height: 570px;
      overflow-y: auto;
      padding: 23px 26px 28px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      line-height: 2;
      font-size: 14px;
      color: #554655;
      scrollbar-color: #e8bfd5 transparent;
      scrollbar-width: thin;
    }

    .lyrics-empty { color: var(--muted); }

    .lyrics-note {
      padding: 12px 22px;
      border-top: 1px solid #f5e7ef;
      color: #9a8797;
      font-size: 11px;
    }

    @media (max-width: 760px) {
      .music-page {
        width: min(100% - 20px, 600px);
        margin: 18px auto 30px;
      }

      .player-panel {
        grid-template-columns: 66px minmax(0, 1fr);
        gap: 14px;
        padding: 16px;
        border-radius: 18px;
      }

      .album {
        width: 66px;
        height: 66px;
        border-radius: 14px;
        font-size: 32px;
      }

      .content-grid {
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .playlist { max-height: 320px; }
      .lyrics-panel { min-height: 400px; }

      .lyrics-content {
        min-height: 300px;
        max-height: 420px;
        padding: 18px;
      }

      .player-hint { display: none; }
    }

    @media (max-width: 420px) {
      .page-heading { align-items: flex-start; }
      .brand-icon { width: 42px; height: 42px; }
      .player-panel { grid-template-columns: 1fr; }

      .player-top {
        display: flex;
        align-items: center;
        gap: 13px;
      }

      .player-top .album { flex: 0 0 66px; }
      .player-bottom { align-items: center; }
    }
  </style>
</head>
<body>
  <main class="music-page">
    <header class="page-heading">
      <div class="brand">
        <div class="brand-icon" aria-hidden="true">♫</div>
        <div>
          <h1>Babydoll Music</h1>
          <p class="subtitle">Your songs, your mood, your little music space.</p>
        </div>
      </div>
      <a href="/" class="back-home">← Back to Home</a>
    </header>

    <section class="player-panel" aria-label="Music player">
      <div class="album" id="albumCover" role="img" aria-label="Music cover">♫</div>
      <div class="now-playing">
        <div class="player-top">
          <p class="eyebrow">Now playing</p>
          <p id="trackTitle">Select a song to play</p>
          <p id="status" role="status">Ready when you are</p>
        </div>
        <audio id="player" preload="metadata"></audio>
        <div class="duration-control">
          <input id="seekBar" type="range" min="0" max="1000" value="0" step="1" aria-label="Song progress">
          <div class="time-row">
            <span id="currentTime">0:00</span>
            <span id="duration">0:00</span>
          </div>
        </div>
        <div class="player-bottom">
          <div class="controls">
            <button id="prevBtn" type="button" aria-label="Previous song" title="Previous song">⏮</button>
            <button id="playPauseBtn" type="button" aria-label="Play" title="Play">▶</button>
            <button id="nextBtn" type="button" aria-label="Next song" title="Next song">⏭</button>
          </div>
          <span class="player-hint">Choose a track from the playlist below</span>
        </div>
      </div>
    </section>

    <section class="content-grid">
      <section class="panel playlist-panel" aria-labelledby="playlistHeading">
        <div class="panel-header">
          <h2 id="playlistHeading">Your Playlist</h2>
          <span class="panel-count">18 songs</span>
        </div>
        <div class="playlist" id="playlist"></div>
      </section>

      <section class="panel lyrics-panel" aria-labelledby="lyricsHeading">
        <div class="panel-header">
          <div class="lyrics-heading-wrap">
            <h2 id="lyricsHeading">Song Lyrics</h2>
            <p id="lyricsTitle">Select a song to view its lyrics</p>
          </div>
          <span class="panel-count">Lyrics</span>
        </div>
        <div id="lyricsContent" class="lyrics-content lyrics-empty">Your selected song's lyrics will appear here.</div>
        <div class="lyrics-note">Lyrics are loaded from your separate text files.</div>
      </section>
    </section>
  </main>

  <script>
      const songs = [
      { title: "Adiga Adiga", file: "AdigaAdiga.mp3", artist: "Telugu" },
      { title: "Amma Amma", file: "AmmaAmma.mp3", artist: "Telugu" },
      { title: "Baagundu Po", file: "BaagunduPo.mp3", artist: "Telugu" },
      { title: "Deewaana Deewaana", file: "DeewaanaDeewaana.mp3", artist: "Telugu" },
      { title: "Dhun", file: "Dhun.mp3", artist: "Hindi" },
      { title: "Emitemitemo", file: "Emitemitemo.mp3", artist: "Telugu" },
      { title: "Endharo Cheppinna", file: "EndharoCheppinna.mp3", artist: "Telugu" },
      { title: "Gehra Hua", file: "GehraHua.mp3", artist: "Hindi" },
      { title: "I Think They Call This Love", file: "IThinkTheyCallThisLove.mp3", artist: "English" },
      { title: "Kaise Hua", file: "KaiseHua.mp3", artist: "Hindi" },
      { title: "Mallepula Pallaki Bangaru Pallaki", file: "MallepulaPallakiBangaruPallaki.mp3", artist: "Telugu" },
      { title: "Mari Antaga", file: "MariAntaga.mp3", artist: "Telugu" },
      { title: "Needa Padadhani", file: "NeedaPadadhani.mp3", artist: "Telugu" },
      { title: "Peniviti", file: "Peniviti.mp3", artist: "Telugu" },
      { title: "Perfect", file: "Perfect.mp3", artist: "English" },
      { title: "Unakku Thaan", file: "UnakkuThaan.mp3", artist: "Tamil" },
      { title: "Waiting For You", file: "WaitingForYou.mp3", artist: "Telugu" },
      { title: "Wanna Be Yours", file: "WannaBeYours.mp3", artist: "English" }
    ];

    // Map MP3 filenames to the corresponding files in public/lyrics/.
    const lyricsFiles = {
      "AdigaAdiga.mp3": "AdigaAdiga.txt",
      "AmmaAmma.mp3": "AmmaAmma.txt",
      "BaagunduPo.mp3": "BaagunduPo.txt",
      "DeewaanaDeewaana.mp3": "DeewaanaDeewaana.txt",
      "Dhun.mp3": "Dhun.txt",
      "Emitemitemo.mp3": "Emitemitemo.txt",
      "EndharoCheppinna.mp3": "EndharoCheppinna.txt",
      "GehraHua.mp3": "GehraHua.txt",
      "IThinkTheyCallThisLove.mp3": "IThinkTheyCallThisLove.txt",
      "KaiseHua.mp3": "KaiseHua.txt",
      "MallepulaPallakiBangaruPallaki.mp3": "MallepulaPallakiBangaruPallaki.txt",
      "MariAntaga.mp3": "MariAntaga.txt",
      "NeedaPadadhani.mp3": "NeedaPadadhani.txt",
      "Peniviti.mp3": "Peniviti.txt",
      "Perfect.mp3": "Perfect.txt",
      "UnakkuThaan.mp3": "UnakkuThaan.txt",
      "WaitingForYou.mp3": "WaitingForYou.txt",
      "WannaBeYours.mp3": "WannaBeYours.txt"
    };

    const player = document.getElementById("player");
    const playlist = document.getElementById("playlist");
    const trackTitle = document.getElementById("trackTitle");
    const status = document.getElementById("status");
    const seekBar = document.getElementById("seekBar");
    const currentTimeLabel = document.getElementById("currentTime");
    const durationLabel = document.getElementById("duration");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const lyricsTitle = document.getElementById("lyricsTitle");
    const lyricsContent = document.getElementById("lyricsContent");

    let currentIndex = -1;
    let isSeeking = false;
    let lyricsRequestId = 0;

    function formatTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
      }

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);

      return minutes + ":" + String(remainingSeconds).padStart(2, "0");
    }

    function renderPlaylist() {
      playlist.innerHTML = "";

      songs.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "track";
        item.dataset.index = String(index);
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", "Play " + song.title);

        const number = document.createElement("span");
        number.className = "track-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const info = document.createElement("div");
        info.className = "track-info";

        const title = document.createElement("b");
        title.textContent = song.title;

        const artist = document.createElement("div");
        artist.className = "video-meta";
        artist.textContent = song.artist;

        const indicator = document.createElement("span");
        indicator.className = "track-indicator";
        indicator.textContent = "♫";
        indicator.setAttribute("aria-hidden", "true");

        info.appendChild(title);
        info.appendChild(artist);
        item.appendChild(number);
        item.appendChild(info);
        item.appendChild(indicator);

        item.addEventListener("click", () => {
          playSong(index, true);
        });

        item.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            playSong(index, true);
          }
        });

        playlist.appendChild(item);
      });
    }

    function updateActiveTrack() {
      playlist.querySelectorAll(".track").forEach((item, index) => {
        const active = index === currentIndex;
        item.classList.toggle("active", active);

        if (active) {
          item.setAttribute("aria-current", "true");
        } else {
          item.removeAttribute("aria-current");
        }
      });
    }

    async function showLyrics(song) {
      const requestId = ++lyricsRequestId;
      const lyricsFile = lyricsFiles[song.file];

      lyricsTitle.textContent = song.title;
      lyricsContent.textContent = "Loading lyrics...";
      lyricsContent.classList.remove("lyrics-empty");
      lyricsContent.scrollTop = 0;

      if (!lyricsFile) {
        lyricsContent.textContent = "No lyrics file mapped for this song.";
        lyricsContent.classList.add("lyrics-empty");
        return;
      }

      try {
        const response = await fetch(
          "/lyrics/" + encodeURIComponent(lyricsFile),
          { cache: "no-cache" }
        );

        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }

        const lyrics = await response.text();

        // Prevent a slower earlier request replacing the newly selected song.
        if (requestId !== lyricsRequestId) return;

        if (!lyrics.trim()) {
          lyricsContent.textContent = "This lyrics file is empty.";
          lyricsContent.classList.add("lyrics-empty");
        } else {
          lyricsContent.textContent = lyrics;
          lyricsContent.classList.remove("lyrics-empty");
        }

        lyricsContent.scrollTop = 0;
      } catch (error) {
        if (requestId !== lyricsRequestId) return;

        lyricsContent.textContent =
          "Unable to load lyrics. Check the file inside public/lyrics/.";

        lyricsContent.classList.add("lyrics-empty");
        console.error("Lyrics loading error:", lyricsFile, error);
      }
    }

    async function playSong(index, autoplay = true) {
      if (index < 0 || index >= songs.length) return;

      currentIndex = index;
      const song = songs[index];

      trackTitle.textContent = song.title;
      status.textContent = "Loading...";
      currentTimeLabel.textContent = "0:00";
      durationLabel.textContent = "0:00";
      seekBar.value = "0";

      updateActiveTrack();
      showLyrics(song);

      const audioUrl =
        "/assets/music/" + encodeURIComponent(song.file);

      if (player.src !== new URL(audioUrl, window.location.href).href) {
        player.src = audioUrl;
      }

      player.load();

      if (autoplay) {
        try {
          await player.play();
        } catch (error) {
          status.textContent = "Press Play to start the song.";
          console.error("Audio playback error:", error);
        }
      }
    }

    function togglePlayPause() {
      if (currentIndex === -1) {
        playSong(0, true);
        return;
      }

      if (player.paused) {
        player.play().catch(error => {
          status.textContent = "Unable to play this song.";
          console.error("Playback error:", error);
        });
      } else {
        player.pause();
      }
    }

    function playNext() {
      const nextIndex = currentIndex < 0
        ? 0
        : (currentIndex + 1) % songs.length;

      playSong(nextIndex, true);
    }

    function playPrevious() {
      if (currentIndex < 0) {
        playSong(0, true);
        return;
      }

      if (player.currentTime > 3) {
        player.currentTime = 0;
        return;
      }

      const previousIndex =
        (currentIndex - 1 + songs.length) % songs.length;

      playSong(previousIndex, true);
    }
          // Play, pause, previous, and next buttons.
    playPauseBtn.addEventListener("click", togglePlayPause);

    document.getElementById("nextBtn").addEventListener("click", playNext);
    document.getElementById("prevBtn").addEventListener("click", playPrevious);

    player.addEventListener("play", () => {
      playPauseBtn.textContent = "⏸";
      playPauseBtn.setAttribute("aria-label", "Pause");
      playPauseBtn.title = "Pause";
      status.textContent = "Playing";
    });

    player.addEventListener("pause", () => {
      playPauseBtn.textContent = "▶";
      playPauseBtn.setAttribute("aria-label", "Play");
      playPauseBtn.title = "Play";

      if (player.ended) {
        status.textContent = "Finished";
      } else if (currentIndex !== -1) {
        status.textContent = "Paused";
      }
    });

    // Update the duration after the audio metadata loads.
    player.addEventListener("loadedmetadata", () => {
      durationLabel.textContent = formatTime(player.duration);
      currentTimeLabel.textContent = formatTime(player.currentTime);

      if (Number.isFinite(player.duration) && player.duration > 0) {
        seekBar.value = String(
          Math.round((player.currentTime / player.duration) * 1000)
        );
      }
    });

    // Keep the progress bar synchronized with playback.
    player.addEventListener("timeupdate", () => {
      currentTimeLabel.textContent = formatTime(player.currentTime);

      if (Number.isFinite(player.duration) && player.duration > 0) {
        durationLabel.textContent = formatTime(player.duration);

        if (!isSeeking) {
          seekBar.value = String(
            Math.round((player.currentTime / player.duration) * 1000)
          );
        }
      }
    });

    // Preview the selected time while dragging.
    seekBar.addEventListener("input", () => {
      isSeeking = true;

      if (Number.isFinite(player.duration) && player.duration > 0) {
        const targetTime =
          (Number(seekBar.value) / 1000) * player.duration;

        currentTimeLabel.textContent = formatTime(targetTime);
      }
    });

    // Seek only when the user finishes moving the slider.
    seekBar.addEventListener("change", () => {
      if (Number.isFinite(player.duration) && player.duration > 0) {
        const targetTime =
          (Number(seekBar.value) / 1000) * player.duration;

        try {
          player.currentTime = Math.max(
            0,
            Math.min(targetTime, player.duration)
          );
        } catch (error) {
          console.error("Seeking error:", error);
        }
      }

      isSeeking = false;
    });

    // Automatically continue to the next song.
    player.addEventListener("ended", playNext);

    player.addEventListener("error", () => {
      if (currentIndex !== -1) {
        status.textContent =
          "Unable to load audio. Check the MP3 filename and path.";
      }
    });

    player.addEventListener("waiting", () => {
      status.textContent = "Buffering...";
    });

    player.addEventListener("canplay", () => {
      status.textContent = player.paused ? "Ready to play" : "Playing";
    });

    // Display all songs in the playlist.
    renderPlaylist();
  </script>
</body>
</html>`);
}