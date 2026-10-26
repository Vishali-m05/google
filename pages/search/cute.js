
export const access = "public";

export default async function (req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>How to look cute?</title>
  <link rel="stylesheet" href="/theme.css">
</head>

<body class="babydoll-search-page cute-search-page">

  <header class="bd-header">
    <a class="bd-google-logo" href="/" aria-label="Home">Google</a>

    <a class="bd-home-btn" href="/" aria-label="Go to homepage" title="Home">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5"></path>
        <path d="M5.5 9.5V21h13V9.5"></path>
        <path d="M9.5 21v-7h5v7"></path>
      </svg>
    </a>

    <div class="bd-search-wrap">
      <div class="bd-searchbox">
        <input
          type="text"
          value="How to look cute"
          readonly
          aria-label="Search query"
        >

        <a
          href="/"
          class="bd-search-icon bd-home-cross"
          aria-label="Go to homepage"
          title="Home"
        >×</a>

        <span class="bd-search-divider"></span>

        <button
          type="button"
          class="bd-search-icon"
          aria-label="Voice search"
        >♩</button>

        <button
          type="button"
          class="bd-search-icon"
          aria-label="Search by image"
        >▧</button>

        <button
          type="button"
          class="bd-search-icon"
          aria-label="Search"
        >⌕</button>
      </div>
    </div>

    <div class="bd-header-right">
      <button
        class="apps-btn"
        type="button"
        aria-label="Google apps"
      >
        <span class="dots"></span>
      </button>

      <button
        class="bd-profile"
        type="button"
        aria-label="Profile"
      >
        <img src="/assets/cat.svg" alt="Cat profile">
      </button>
    </div>
  </header>

  <nav class="google-search-tabs" aria-label="Search categories">
    <a class="active" href="/search/cute">All</a>
    <a href="/search/cute">Images</a>
    <a href="/search/cute">Videos</a>
    <a href="/search/cute">More⌄</a>
  </nav>

  <main class="google-results">
    <div class="result-count">About 1 result</div>

    <section class="answer-glow">
      <div class="answer-card">
        <div class="result-url">
          babydoll.google · Personalized search
        </div>

        <h1>How to look cute?</h1>

        <p>
          Follow these steps carefully 👇🏻<br><br>
          Step 1: Go to the mirror.<br>
          Step 2: Apply some powder to your face.<br>
          Step 3: Rub it with a wet tissue.<br><br>
          And now... you can see what cuteness
          actually looks like 🎀
        </p>
      </div>
    </section>

    <div class="result-divider"></div>

    <section class="image-results">
      <div class="image-results-title">Images</div>

      <div class="image-grid">
        <img src="/assets/cute/a.jpeg" alt="Cute photo a">
        <img src="/assets/cute/b.jpeg" alt="Cute photo b">
        <img src="/assets/cute/c.jpg" alt="Cute photo c">
        <img src="/assets/cute/d.png" alt="Cute photo d">
        <img src="/assets/cute/e.jpg" alt="Cute photo e">
        <img src="/assets/cute/f.jpg" alt="Cute photo f">
        <img src="/assets/cute/g.jpg" alt="Cute photo g">
        <img src="/assets/cute/h.jpg" alt="Cute photo h">
        <img src="/assets/cute/i.jpg" alt="Cute photo i">
        <img src="/assets/cute/j.jpg" alt="Cute photo j">
      </div>
    </section>
  </main>

  <script src="/site.js"></script>
</body>
</html>`);
}
