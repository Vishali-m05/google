
export const access = "public";

export default async function (req, res) {
  const videos = {
    myman: {
      file: "myman.mp4",
      title: "My Man",
      description:
        "The editor came to know that we can fall in love with the same person over again and again."
    },

    projectorvideo: {
      file: "projectorvideo.mp4",
      title: "Projector Video",
      description:
        "This is made for the R22 CSE-B batch. When it was played on the projector, the editor cooked it well so that everyone had tears with a happy smile while watching it."
    },

    transition: {
      file: "transition.mp4",
      title: "Transition Video",
      description:
        "I think it was the first transition video for the editor. But all I see is the other video which was done with the editor's parents. I didn't have that video, so I'm posting this."
    },

    trend: {
      file: "trend.mp4",
      title: "Trending Video",
      description:
        "When the editor follows the trend personally, these kid of edits come into existence."
    },

    virat: {
      file: "virat.mp4",
      title: "Virat Kohli Highlights",
      description:
        "The editor said that the video was made after a long time and it is a special one."
    },

    angel: {
      file: "angel.mp4",
      title: "Angel",
      description:
        "The editor took the duty to make people fall for her again and again, as the song says. Literally, as per my personal review, I have watched it countless times."
    }
  };

  // Get the selected video ID from the URL
  let id = req.query?.id;

  if (!id && req.url) {
    try {
      id = new URL(
        req.url,
        "http://localhost"
      ).searchParams.get("id");
    } catch (error) {
      id = "myman";
    }
  }

  id = String(id || "myman");

  // Select the requested video
  const video = videos[id] || videos.myman;

  // Escape text safely before displaying it in HTML
  const safe = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${safe(video.title)} - YouTube</title>

  <link rel="stylesheet" href="/theme.css">

  <style>
    * {
      box-sizing: border-box;
    }

    body.watch-page {
      margin: 0;
      min-height: 100vh;
      background: #fff;
      color: #0f0f0f;
      font-family: Arial, Helvetica, sans-serif;
    }

    /* YouTube header */
    .watch-page .watch-header {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 0 24px;
      background: #fff;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .watch-page .watch-back {
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      display: grid;
      place-items: center;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: #202124;
      font-size: 26px;
      cursor: pointer;
    }

    .watch-page .watch-back:hover {
      background: #f2f2f2;
    }

    .watch-page .watch-logo {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #0f0f0f;
      text-decoration: none;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -1px;
      white-space: nowrap;
    }

    .watch-page .watch-logo-mark {
      width: 32px;
      height: 21px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: #ff0033;
      color: #fff;
      font-size: 14px;
      letter-spacing: 0;
    }

    .watch-page .watch-country {
      align-self: flex-start;
      margin: 3px 0 0 -2px;
      color: #606060;
      font-size: 10px;
      font-weight: 400;
    }

    /* Video left, description right */
    .watch-page .watch-content {
      display: grid;
      grid-template-columns: minmax(0, 1.7fr) minmax(260px, 1fr);
      gap: 24px;
      align-items: start;
      width: 100%;
      max-width: 1450px;
      margin: 28px auto 48px;
      padding: 0 24px;
    }

    .watch-page .watch-player {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border-radius: 12px;
      object-fit: contain;
    }

    /* Description only: no channel or extra profile details */
    .watch-page .watch-description {
      min-width: 0;
      padding: 20px;
      border-radius: 12px;
      background: #f2f2f2;
      color: #202124;
      font-size: 15px;
      line-height: 1.8;
      overflow-wrap: anywhere;
    }

    .watch-page .watch-description h2 {
      margin: 0 0 12px;
      font-size: 18px;
      line-height: 1.4;
      font-weight: 700;
    }

    .watch-page .watch-description p {
      margin: 0;
      white-space: pre-wrap;
    }

    /* Responsive layout */
    @media (max-width: 760px) {
      .watch-page .watch-header {
        padding: 0 12px;
        gap: 12px;
      }

      .watch-page .watch-content {
        grid-template-columns: minmax(0, 1fr);
        gap: 16px;
        margin: 16px auto 32px;
        padding: 0 12px;
      }

      .watch-page .watch-player {
        border-radius: 8px;
      }

      .watch-page .watch-description {
        padding: 16px;
      }
    }

    @media (max-width: 400px) {
      .watch-page .watch-header {
        padding: 0 8px;
        gap: 8px;
      }

      .watch-page .watch-logo {
        font-size: 19px;
      }
    }
  </style>
</head>

<body class="watch-page">

  <header class="watch-header">
    <button
      class="watch-back"
      type="button"
      onclick="history.back()"
      aria-label="Go back"
      title="Back"
    >←</button>

    <a class="watch-logo" href="/youtube" aria-label="YouTube Home">
      <span class="watch-logo-mark">▶</span>
      <span>YouTube</span>
      <sup class="watch-country">IN</sup>
    </a>
  </header>

  <main class="watch-content">

    <video
      class="watch-player"
      controls
      autoplay
      playsinline
      preload="metadata"
    >
      <source
        src="/assets/youtube/${encodeURIComponent(video.file)}"
        type="video/mp4"
      >
      Your browser does not support video playback.
    </video>

    <section class="watch-description">
      <h2>Description</h2>
      <p>${safe(video.description)}</p>
    </section>

  </main>

</body>
</html>`);
}
