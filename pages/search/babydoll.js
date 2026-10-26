
export const access = "public";

export default async function (req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Who is Babydoll?</title>
  <link rel="stylesheet" href="/theme.css">
</head>
<body class="babydoll-search-page">


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
        value="who is babydoll"
        readonly
        aria-label="Search query"
      >

      <a href="/" class="bd-search-icon bd-home-cross" aria-label="Go to homepage" title="Home">×</a>
      <span class="bd-search-divider"></span>
      <button type="button" class="bd-search-icon" aria-label="Voice search">♩</button>
      <button type="button" class="bd-search-icon" aria-label="Search by image">▧</button>
      <button type="button" class="bd-search-icon" aria-label="Search">⌕</button>
    </div>
  </div>

  <div class="bd-header-right">
    <button class="apps-btn" type="button" aria-label="Google apps">
      <span class="dots"></span>
    </button>

    <button class="bd-profile" type="button" aria-label="Profile">
      <img src="/assets/cat.svg" alt="Cat profile">
    </button>
  </div>
</header>


  <main class="page google-results">

    <div class="results-tabs">
      <span class="active">All</span>
      <span>Images</span>
      <span>Videos</span>
      <span>More</span>
    </div>

    <div class="result-count">About 1 result</div>

    <section class="answer-glow">
      <div class="answer-card">

        <div class="result-url">
          babydoll.google · Personalized search
        </div>

        <h1>Who is Babydoll? </h1>
<p>
  Wait... you don't know her? 😏
  It's a girl whose name is Sowjanya, born on October 27, 2004,
  a B.Tech graduate from SVECW, Bhimavaram.
  One of a kind, impossible to replace! 💖
</p>
      </div>
    </section>

    <div class="result-divider"></div>

    <section class="image-results">
      <div class="image-results-title">Images</div>

      <div class="image-grid">
        <img src="/assets/babydoll/1.jpg" alt="Babydoll photo 1">
        <img src="/assets/babydoll/2.jpg" alt="Babydoll photo 2">
        <img src="/assets/babydoll/3.jpg" alt="Babydoll photo 3">
        <img src="/assets/babydoll/5.jpg" alt="Babydoll photo 5">
        <img src="/assets/babydoll/6.jpg" alt="Babydoll photo 6">
        <img src="/assets/babydoll/7.jpg" alt="Babydoll photo 7">
        <img src="/assets/babydoll/8.jpg" alt="Babydoll photo 8">
        <img src="/assets/babydoll/9.jpeg" alt="Babydoll photo 9">
      </div>
    </section>

  </main>

  <script src="/site.js"></script>

</body>
</html>`);
}
