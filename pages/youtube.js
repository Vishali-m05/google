
export const access = "public";

export default async function (req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>YouTube</title>
  <link rel="stylesheet" href="/theme.css">

  <style>
    body.youtube-home {
      margin: 0;
      background: #fff;
      color: #0f0f0f;
      font-family: Arial, Helvetica, sans-serif;
    }
    .youtube-home .yt-home-back {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #0f0f0f;
  font-size: 27px;
  cursor: pointer;
}

.youtube-home .yt-home-back:hover {
  background: #f2f2f2;
}
    .youtube-home .yt-header {
      height: 56px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 22px;
      position: sticky;
      top: 0;
      z-index: 20;
      background: #fff;
    }

    .youtube-home .yt-header button {
      border: 0;
      cursor: pointer;
    }

    .youtube-home .yt-hamburger {
      width: 34px;
      height: 40px;
      flex: 0 0 34px;
      font-size: 25px;
      background: transparent;
    }

    .youtube-home .yt-logo {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 0 0 auto;
      text-decoration: none;
      color: #0f0f0f;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -1px;
    }

    .youtube-home .yt-logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 21px;
      background: #ff0033;
      color: white;
      border-radius: 6px;
      font-size: 15px;
      letter-spacing: 0;
    }

    .youtube-home .yt-country {
      align-self: flex-start;
      margin: 8px 0 0 -2px;
      color: #606060;
      font-size: 10px;
    }

    .youtube-home .yt-search-area {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex: 1;
      min-width: 100px;
      margin-left: auto;
      max-width: 680px;
    }

    .youtube-home .yt-search {
      display: flex;
      align-items: center;
      height: 44px;
      flex: 1;
      min-width: 0;
      border: 1px solid #c6c6c6;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px #eee;
    }

    .youtube-home .yt-search input {
      flex: 1;
      min-width: 0;
      height: 100%;
      padding: 0 18px;
      border: 0;
      outline: 0;
      font-size: 16px;
      background: transparent;
    }

    .youtube-home .yt-search-button {
      height: 44px;
      width: 72px;
      flex: 0 0 72px;
      border-left: 1px solid #d3d3d3 !important;
      background: #f8f8f8;
      font-size: 25px;
    }

    .youtube-home .yt-mic {
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      border-radius: 50%;
      background: #f2f2f2;
      font-size: 22px;
    }

    .youtube-home .yt-header-right {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-left: auto;
      flex: 0 0 auto;
    }

    .youtube-home .yt-create {
      height: 42px;
      padding: 0 17px;
      border-radius: 24px;
      background: #f2f2f2;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
    }

    .youtube-home .yt-notification {
      background: transparent;
      font-size: 24px;
      width: 34px;
      height: 40px;
    }

    
.youtube-home .yt-avatar {
  width: 38px;
  height: 38px;
  padding: 3px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 0;
  border-radius: 50%;
  background: #f7dced;
  cursor: pointer;
}

.youtube-home .yt-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}


    .youtube-home .yt-layout {
      display: grid;
      grid-template-columns: 220px minmax(0, 1fr);
      min-height: calc(100vh - 56px);
    }

    .youtube-home .yt-sidebar {
      padding: 14px 12px;
    }

    .youtube-home .yt-side-link {
      display: block;
      padding: 13px 16px;
      margin-bottom: 4px;
      color: #0f0f0f;
      text-decoration: none;
      border-radius: 10px;
      font-size: 14px;
    }

    .youtube-home .yt-side-link:hover,
    .youtube-home .yt-side-link.active {
      background: #f2f2f2;
    }

    .youtube-home .yt-sidebar hr {
      border: 0;
      border-top: 1px solid #e5e5e5;
      margin: 14px 0;
    }

    .youtube-home .yt-main {
      min-width: 0;
      padding: 14px 24px 35px;
    }

    .youtube-home .yt-chips {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 20px;
      scrollbar-width: none;
    }

    .youtube-home .yt-chips::-webkit-scrollbar {
      display: none;
    }

    .youtube-home .yt-chip {
      flex: 0 0 auto;
      padding: 9px 13px;
      background: #f2f2f2;
      border-radius: 8px;
      font-size: 14px;
      white-space: nowrap;
    }

    .youtube-home .yt-chip.selected {
      background: #0f0f0f;
      color: white;
    }

    /* Thumbnails only: no titles or descriptions on the home page */
    .youtube-home .yt-video-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 28px 16px;
    }

    .youtube-home .yt-video-card {
      display: block;
      min-width: 0;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .youtube-home .yt-video-card video {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      background: #111;
      border-radius: 12px;
      pointer-events: none;
    }

    .youtube-home .yt-video-card:hover video {
      border-radius: 8px;
    }

    @media (max-width: 1000px) {
      .youtube-home .yt-layout {
        grid-template-columns: 78px minmax(0, 1fr);
      }

      .youtube-home .yt-sidebar {
        padding: 12px 4px;
      }

      .youtube-home .yt-side-link {
        padding: 14px 2px;
        text-align: center;
        font-size: 12px;
      }

      .youtube-home .yt-video-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .youtube-home .yt-header {
        gap: 12px;
        padding: 0 14px;
      }
    }

    @media (max-width: 600px) {
      .youtube-home .yt-header {
        gap: 8px;
        padding: 0 10px;
      }

      .youtube-home .yt-logo {
        font-size: 18px;
      }

      .youtube-home .yt-logo-mark {
        width: 27px;
        height: 19px;
      }

      .youtube-home .yt-search-area {
        gap: 4px;
      }

      .youtube-home .yt-search {
        height: 38px;
      }

      .youtube-home .yt-search input {
        padding: 0 10px;
        font-size: 14px;
      }

      .youtube-home .yt-search-button {
        display: none;
      }

      .youtube-home .yt-mic {
        display: none;
      }

      .youtube-home .yt-header-right {
        gap: 6px;
      }

      .youtube-home .yt-create {
        display: none;
      }

      .youtube-home .yt-notification {
        display: none;
      }

      .youtube-home .yt-avatar {
        width: 30px;
        height: 30px;
      }

      .youtube-home .yt-layout {
        grid-template-columns: 1fr;
      }

      .youtube-home .yt-sidebar {
        display: none;
      }

      .youtube-home .yt-main {
        padding: 12px;
      }

      .youtube-home .yt-video-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  </style>
</head>

<body class="youtube-home">

  <header class="yt-header">
    <button class="yt-hamburger" type="button" aria-label="Menu">☰</button>

    <a class="yt-logo" href="/youtube" aria-label="YouTube Home">
      <span class="yt-logo-mark">▶</span>
      <span>YouTube</span>
      <sup class="yt-country">IN</sup>
    </a>

    <div class="yt-search-area">
      <div class="yt-search">
        <input type="text" placeholder="Search" aria-label="Search">
        <button class="yt-search-button" type="button" aria-label="Search">⌕</button>
      </div>
      <button class="yt-mic" type="button" aria-label="Voice search">🎙</button>
    </div>

    <div class="yt-header-right">
      <button class="yt-create" type="button">＋ Create</button>
      <button class="yt-notification" type="button" aria-label="Notifications">♧</button>
      <button
  class="yt-home-back"
  type="button"
  onclick="window.location.href='/'"
  aria-label="Back to homepage"
  title="Back to homepage"
>←</button>
      
<button class="yt-avatar" type="button" aria-label="Profile">
  <img src="/assets/cat.svg" alt="Cat profile">
</button>

    </div>
  </header>

  <div class="yt-layout">
    <aside class="yt-sidebar">
      <a class="yt-side-link active" href="/youtube">⌂ &nbsp; Home</a>
      <a class="yt-side-link" href="/youtube">◉ &nbsp; Shorts</a>
      <a class="yt-side-link" href="/youtube">▣ &nbsp; Subscriptions</a>
      <hr>
      <a class="yt-side-link" href="/youtube">You &nbsp; ›</a>
      <a class="yt-side-link" href="/youtube">◷ &nbsp; History</a>
      <a class="yt-side-link" href="/youtube">▤ &nbsp; Playlists</a>
      <a class="yt-side-link" href="/youtube">◴ &nbsp; Watch later</a>
    </aside>

    <main class="yt-main">
      
<div class="yt-chips">
  <span class="yt-chip selected">All</span>
  <span class="yt-chip">Sowjuvirat</span>
  <span class="yt-chip">ViratKohli</span>
  <span class="yt-chip">Cricket</span>
  <span class="yt-chip">Recently uploaded</span>
</div>


      <div class="yt-video-grid">
        <a class="yt-video-card" href="/watch?id=myman" aria-label="Watch My Man">
          <video preload="metadata" muted poster="/assets/video-placeholder.svg">
            <source src="/assets/youtube/myman.mp4" type="video/mp4">
          </video>
        </a>

        <a class="yt-video-card" href="/watch?id=projectorvideo" aria-label="Watch Projector Video">
          <video preload="metadata" muted poster="/assets/video-placeholder.svg">
            <source src="/assets/youtube/projectorvideo.mp4" type="video/mp4">
          </video>
        </a>

        <a class="yt-video-card" href="/watch?id=transition" aria-label="Watch Transition Video">
          <video preload="metadata" muted poster="/assets/video-placeholder.svg">
            <source src="/assets/youtube/transition.mp4" type="video/mp4">
          </video>
        </a>

        <a class="yt-video-card" href="/watch?id=trend" aria-label="Watch Trending Video">
          <video preload="metadata" muted poster="/assets/video-placeholder.svg">
            <source src="/assets/youtube/trend.mp4" type="video/mp4">
          </video>
        </a>

        <a class="yt-video-card" href="/watch?id=virat" aria-label="Watch Virat Kohli Highlights">
          <video preload="metadata" muted poster="/assets/video-placeholder.svg">
            <source src="/assets/youtube/virat.mp4" type="video/mp4">
          </video>
        </a>

        <a class="yt-video-card" href="/watch?id=angel" aria-label="Watch Angel">
          <video preload="metadata" muted poster="/assets/video-placeholder.svg">
            <source src="/assets/youtube/angel.mp4" type="video/mp4">
          </video>
        </a>
      </div>
    </main>
  </div>

</body>
</html>`);
}
