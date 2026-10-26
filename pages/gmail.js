
export const access = "public";

export default async function (req, res) {
  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Gmail - Inbox</title>
  <link rel="stylesheet" href="/theme.css">

  <style>
    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #202124;
      background: #f6f8fc;
    }

    .gmail-app {
      min-height: 100vh;
      background: #f6f8fc;
    }

    /* TOP BAR */
    .gmail-topbar {
      position: sticky;
      top: 0;
      z-index: 20;
      min-height: 80px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 14px;
      background: #f6f8fc;
    }

    .gmail-menu,
    .gmail-top-icon {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: #444746;
      font-size: 21px;
      cursor: pointer;
      text-decoration: none;
    }

    .gmail-menu:hover,
    .gmail-top-icon:hover {
      background: #e8eaed;
    }

    /* HOME BUTTON */
    .gmail-home {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      min-height: 36px;
      padding: 0 13px;
      border: 1px solid #dadce0;
      border-radius: 20px;
      background: #fff;
      color: #3c4043;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      transition: background .2s ease;
    }

    .gmail-home:hover {
      background: #e8f0fe;
    }

    /* GMAIL LOGO */
    .gmail-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      width: 125px;
      color: #5f6368;
      font-size: 23px;
      font-weight: 400;
      letter-spacing: -0.7px;
      text-decoration: none;
    }

    .gmail-logo img {
      display: block;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      object-fit: contain;
    }

    /* SEARCH */
    .gmail-search {
      height: 50px;
      max-width: 720px;
      flex: 1;
      min-width: 100px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 17px;
      border-radius: 28px;
      background: #eaf1fb;
    }

    .gmail-search-icon {
      font-size: 23px;
      color: #444746;
    }

    .gmail-search input {
      width: 100%;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: #202124;
      font-size: 15px;
    }

    .gmail-search input::placeholder {
      color: #555b63;
    }

    .gmail-search-submit {
      border: 0;
      background: transparent;
      color: #444746;
      font-size: 20px;
      cursor: pointer;
    }

    .gmail-top-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .gmail-avatar {
      display: block;
      width: 36px;
      height: 36px;
      margin-left: 5px;
      overflow: hidden;
      border-radius: 50%;
      background: white;
      text-decoration: none;
    }

    .gmail-avatar img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      border-radius: 50%;
    }

    /* SIDEBAR */
    .gmail-layout {
      display: flex;
      gap: 18px;
      padding: 0 16px 20px 0;
    }

    .gmail-sidebar {
      flex: 0 0 255px;
      width: 255px;
      min-height: calc(100vh - 80px);
      padding: 5px 12px 20px 0;
      transition: width .2s ease, flex-basis .2s ease;
    }

    .gmail-compose {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 145px;
      height: 58px;
      margin: 0 0 18px 8px;
      padding: 0 20px;
      border-radius: 18px;
      background: #c2e7ff;
      color: #001d35;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0 1px 2px #00000010;
    }

    .gmail-compose:hover {
      box-shadow: 0 2px 6px #00000020;
    }

    .gmail-compose-icon {
      font-size: 23px;
    }

    .gmail-side-link {
      display: flex;
      align-items: center;
      gap: 17px;
      height: 42px;
      padding: 0 16px 0 25px;
      margin: 2px 0;
      border-radius: 0 22px 22px 0;
      color: #303134;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }

    .gmail-side-link:hover {
      background: #e9eef6;
    }

    .gmail-side-link.active {
      background: #d3e3fd;
      color: #0842a0;
      font-weight: 700;
    }

    .gmail-side-icon {
      width: 19px;
      flex-shrink: 0;
      text-align: center;
      font-size: 18px;
    }

    .gmail-side-count {
      margin-left: auto;
      font-size: 12px;
    }

    .gmail-section-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 17px 10px 25px;
      font-size: 14px;
      font-weight: 700;
    }

    .gmail-add-label {
      border: 0;
      background: transparent;
      color: #444746;
      font-size: 22px;
      cursor: pointer;
    }

    /* INBOX */
    .gmail-main {
      flex: 1;
      min-width: 0;
      min-height: calc(100vh - 100px);
      overflow: hidden;
      border-radius: 18px;
      background: #fff;
    }

    .gmail-toolbar {
      height: 56px;
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 0 20px;
      border-bottom: 1px solid #f0f0f0;
    }

    .gmail-toolbar-button {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: #5f6368;
      font-size: 19px;
      cursor: pointer;
    }

    .gmail-toolbar-button:hover {
      background: #f1f3f4;
    }

    .gmail-checkbox {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      accent-color: #0b57d0;
      cursor: pointer;
    }

    .gmail-mail-count {
      margin-left: auto;
      color: #5f6368;
      font-size: 12px;
      white-space: nowrap;
    }

    .gmail-tabs {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      height: 58px;
      padding: 0 12px;
      border-bottom: 1px solid #e8eaed;
    }

    .gmail-tab {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 17px;
      border: 0;
      border-bottom: 3px solid transparent;
      background: transparent;
      color: #5f6368;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
    }

    .gmail-tab.active {
      color: #0b57d0;
      border-bottom-color: #0b57d0;
      font-weight: 600;
    }

    .gmail-tab-icon {
      font-size: 18px;
    }

    .gmail-mail-row {
      min-height: 62px;
      display: grid;
      grid-template-columns: 24px 24px minmax(125px, 185px) minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      padding: 0 18px;
      border-bottom: 1px solid #f1f3f4;
      background: #fff;
      color: #202124;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
    }

    .gmail-mail-row:hover {
      position: relative;
      z-index: 1;
      box-shadow: 0 1px 4px #00000025;
    }

    .gmail-mail-row.unread {
      background: #f2f6fc;
      font-weight: 700;
    }

    .gmail-star {
      border: 0;
      padding: 0;
      background: transparent;
      color: #a0a4a9;
      font-size: 20px;
      cursor: pointer;
    }

    .gmail-star.starred {
      color: #fbbc04;
    }

    .gmail-sender {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .gmail-subject {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }

    .gmail-preview {
      color: #5f6368;
      font-weight: 400;
    }

    .gmail-date {
      padding-left: 10px;
      color: #5f6368;
      font-size: 12px;
      white-space: nowrap;
    }

    .gmail-mail-row.unread .gmail-date {
      color: #202124;
      font-weight: 700;
    }

    .gmail-empty-message {
      display: none;
      padding: 35px 20px;
      color: #5f6368;
      text-align: center;
    }

    /* COLLAPSED SIDEBAR */
    .gmail-app.sidebar-collapsed .gmail-sidebar {
      flex-basis: 76px;
      width: 76px;
    }

    .gmail-app.sidebar-collapsed .gmail-compose {
      width: 52px;
      padding: 0;
      justify-content: center;
      font-size: 0;
    }

    .gmail-app.sidebar-collapsed .gmail-side-link {
      justify-content: center;
      gap: 0;
      padding: 0;
      border-radius: 0 18px 18px 0;
      font-size: 0;
    }

    .gmail-app.sidebar-collapsed .gmail-side-count,
    .gmail-app.sidebar-collapsed .gmail-section-label {
      display: none;
    }

    /* TABLET */
    @media (max-width: 1100px) {
      .gmail-topbar {
        gap: 10px;
        padding: 0 14px;
      }

      .gmail-home {
        padding: 0 10px;
      }

      .gmail-logo {
        width: 105px;
      }

      .gmail-sidebar {
        flex-basis: 205px;
        width: 205px;
      }

      .gmail-mail-row {
        grid-template-columns: 22px 22px minmax(90px, 135px) minmax(0, 1fr) auto;
        gap: 7px;
        padding: 0 10px;
      }
    }

    /* MOBILE */
    @media (max-width: 700px) {
      .gmail-topbar {
        min-height: 68px;
        height: auto;
        flex-wrap: wrap;
        padding: 10px 12px;
        gap: 8px;
      }

      .gmail-home {
        min-height: 32px;
        padding: 0 9px;
        font-size: 12px;
      }

      .gmail-logo {
        width: auto;
        font-size: 19px;
        gap: 5px;
      }

      .gmail-logo img {
        width: 26px;
        height: 26px;
      }

      .gmail-search {
        order: 5;
        flex-basis: 100%;
        max-width: none;
        height: 44px;
      }

      .gmail-top-actions {
        gap: 1px;
      }

      .gmail-top-icon {
        width: 32px;
        height: 32px;
      }

      .gmail-layout {
        gap: 8px;
        padding: 0 6px 12px 0;
      }

      .gmail-sidebar {
        flex: 0 0 58px;
        width: 58px;
        padding-right: 0;
      }

      .gmail-compose {
        width: 45px;
        height: 48px;
        padding: 0;
        margin-left: 6px;
        justify-content: center;
        font-size: 0;
        border-radius: 15px;
      }

      .gmail-compose-icon {
        font-size: 23px;
      }

      .gmail-side-link {
        justify-content: center;
        gap: 0;
        padding: 0;
        border-radius: 0 18px 18px 0;
        font-size: 0;
      }

      .gmail-side-count,
      .gmail-section-label {
        display: none;
      }

      .gmail-main {
        border-radius: 14px;
      }

      .gmail-tabs {
        padding: 0 3px;
      }

      .gmail-tab {
        justify-content: center;
        gap: 5px;
        padding: 0 4px;
        font-size: 12px;
      }

      .gmail-mail-row {
        grid-template-columns: 20px 20px minmax(0, 1fr) auto;
        gap: 5px;
        padding: 9px 7px;
      }

      .gmail-sender {
        grid-column: 3;
        align-self: end;
      }

      .gmail-subject {
        grid-column: 3;
        grid-row: 2;
        white-space: normal;
        line-height: 1.4;
      }

      .gmail-date {
        grid-column: 4;
        grid-row: 1;
        align-self: start;
        padding: 0;
        font-size: 11px;
      }

      .gmail-mail-row .gmail-checkbox {
        grid-row: 1 / span 2;
      }

      .gmail-star {
        grid-row: 1 / span 2;
      }
    }
  </style>
</head>

<body>
<div class="gmail-app" id="gmailApp">

  <header class="gmail-topbar">
    <button class="gmail-menu" id="gmailMenu" aria-label="Toggle sidebar">☰</button>

    <a class="gmail-home" href="/" title="Go to home page">
      <span aria-hidden="true">⌂</span>
      <span>Home</span>
    </a>

    <a class="gmail-logo" href="/gmail" aria-label="Gmail home">
      <img
        src="https://www.gstatic.com/images/branding/product/1x/gmail_48dp.png"
        alt=""
      >
      <span>Gmail</span>
    </a>

    <form class="gmail-search" id="gmailSearchForm">
      <span class="gmail-search-icon">⌕</span>
      <input
        id="gmailSearchInput"
        type="search"
        placeholder="Search mail"
        aria-label="Search mail"
      >
      <button class="gmail-search-submit" type="submit" aria-label="Search">☷</button>
    </form>

    <div class="gmail-top-actions">
      <button class="gmail-top-icon" title="Help" aria-label="Help">?</button>
      <button class="gmail-top-icon" title="Settings" aria-label="Settings">⚙</button>
      <button class="gmail-top-icon" title="Google apps" aria-label="Google apps">⠿</button>

      <a class="gmail-avatar" href="/gmail" aria-label="Your account">
        <img src="/assets/cat.svg" alt="Your cat profile">
      </a>
    </div>
  </header>

  <div class="gmail-layout">
    <aside class="gmail-sidebar" aria-label="Mail navigation">

      <a href="#" class="gmail-compose" id="composeButton">
        <span class="gmail-compose-icon">✎</span>
        <span>Compose</span>
      </a>

      <a class="gmail-side-link active" href="/gmail" data-filter="inbox">
        <span class="gmail-side-icon">▣</span>
        <span>Inbox</span>
        <small class="gmail-side-count">2</small>
      </a>

      <a class="gmail-side-link" href="#starred" data-filter="starred">
        <span class="gmail-side-icon">☆</span>
        <span>Starred</span>
      </a>

      <a class="gmail-side-link" href="#snoozed" data-filter="snoozed">
        <span class="gmail-side-icon">◷</span>
        <span>Snoozed</span>
      </a>

      <a class="gmail-side-link" href="#sent" data-filter="sent">
        <span class="gmail-side-icon">➤</span>
        <span>Sent</span>
      </a>

      <a class="gmail-side-link" href="#drafts" data-filter="drafts">
        <span class="gmail-side-icon">▤</span>
        <span>Drafts</span>
      </a>

      <a class="gmail-side-link" href="#purchases" data-filter="purchases">
        <span class="gmail-side-icon">▢</span>
        <span>Purchases</span>
      </a>

      <div class="gmail-section-label">
        <span>Labels</span>
        <button class="gmail-add-label" aria-label="Add label">+</button>
      </div>

      <a class="gmail-side-link" href="#more" id="moreButton">
        <span class="gmail-side-icon">⌄</span>
        <span>More</span>
      </a>
    </aside>

    <main class="gmail-main">
      <div class="gmail-toolbar">
        <input type="checkbox" class="gmail-checkbox" id="selectAll" aria-label="Select all emails">
        <button class="gmail-toolbar-button" id="refreshButton" title="Refresh" aria-label="Refresh">↻</button>
        <button class="gmail-toolbar-button" id="moreActionsButton" title="More actions" aria-label="More actions">⋮</button>
        <span class="gmail-mail-count" id="mailCount">1–3 of 3</span>
      </div>

      <div class="gmail-tabs" role="tablist">
        <button class="gmail-tab active" data-category="primary" role="tab">
          <span class="gmail-tab-icon">▣</span><span>Primary</span>
        </button>
        <button class="gmail-tab" data-category="promotions" role="tab">
          <span class="gmail-tab-icon">◇</span><span>Promotions</span>
        </button>
        <button class="gmail-tab" data-category="social" role="tab">
          <span class="gmail-tab-icon">♧</span><span>Social</span>
        </button>
      </div>

      <section class="gmail-inbox" id="gmailInbox" aria-label="Inbox emails">

        <a class="gmail-mail-row unread"
           href="/gmail/email/capgemini"
           data-category="primary"
           data-sender="Capgemini"
           data-subject="Congratulations! You have been selected"
           data-preview="We will update you shortly about the remaining process."
           data-starred="false">

          <input type="checkbox" class="gmail-checkbox mail-select" aria-label="Select Capgemini email">
          <button class="gmail-star" type="button" aria-label="Star email">☆</button>
          <strong class="gmail-sender">Capgemini</strong>

          <span class="gmail-subject">
            Congratulations! You have been selected
            <span class="gmail-preview"> — We will update you shortly about the remaining process.</span>
          </span>

          <span class="gmail-date">10:24 AM</span>
        </a>

        <a class="gmail-mail-row unread"
           href="/gmail/email/signin"
           data-category="primary"
           data-sender="Google Account"
           data-subject="New sign-in to your account"
           data-preview="A sign-in to your Google Account was detected. Review this activity if it wasn't you."
           data-starred="false">

          <input type="checkbox" class="gmail-checkbox mail-select" aria-label="Select sign-in notification">
          <button class="gmail-star" type="button" aria-label="Star email">☆</button>
          <strong class="gmail-sender">Google Account</strong>

          <span class="gmail-subject">
            New sign-in to your account
            <span class="gmail-preview"> — A sign-in to your Google Account was detected. Review this activity if it wasn't you.</span>
          </span>

          <span class="gmail-date">9:18 AM</span>
        </a>

        <a class="gmail-mail-row"
           href="#google-security"
           data-category="primary"
           data-sender="Google"
           data-subject="Security notification"
           data-preview="Check your account activity and security settings."
           data-starred="false">

          <input type="checkbox" class="gmail-checkbox mail-select" aria-label="Select Google security email">
          <button class="gmail-star" type="button" aria-label="Star email">☆</button>
          <strong class="gmail-sender">Google</strong>

          <span class="gmail-subject">
            Security notification
            <span class="gmail-preview"> — Check your account activity and security settings.</span>
          </span>

          <span class="gmail-date">Yesterday</span>
        </a>

      </section>

      <div class="gmail-empty-message" id="emptyMessage">No emails found.</div>
    </main>
  </div>
</div>

<script>
(() => {
  const app = document.getElementById("gmailApp");
  const rows = Array.from(document.querySelectorAll(".gmail-mail-row"));
  const tabs = Array.from(document.querySelectorAll(".gmail-tab"));
  const sideLinks = Array.from(document.querySelectorAll(".gmail-side-link"));
  const searchInput = document.getElementById("gmailSearchInput");
  const searchForm = document.getElementById("gmailSearchForm");
  const emptyMessage = document.getElementById("emptyMessage");
  const mailCount = document.getElementById("mailCount");
  const selectAll = document.getElementById("selectAll");

  let activeCategory = "primary";
  let activeFilter = "inbox";
  let searchTerm = "";

  document.getElementById("gmailMenu").addEventListener("click", () => {
    app.classList.toggle("sidebar-collapsed");
  });

  function renderEmails() {
    let visibleCount = 0;

    rows.forEach((row) => {
      const sender = row.dataset.sender.toLowerCase();
      const subject = row.dataset.subject.toLowerCase();
      const preview = row.dataset.preview.toLowerCase();

      let visible;

      if (activeFilter === "inbox") {
        visible = row.dataset.category === activeCategory;
      } else if (activeFilter === "starred") {
        visible = row.dataset.starred === "true";
      } else {
        visible = false;
      }

      if (searchTerm) {
        visible =
          sender.includes(searchTerm) ||
          subject.includes(searchTerm) ||
          preview.includes(searchTerm);
      }

      row.style.display = visible ? "grid" : "none";

      if (visible) visibleCount++;
    });

    emptyMessage.style.display = visibleCount === 0 ? "block" : "none";

    mailCount.textContent = visibleCount
      ? "1–" + visibleCount + " of " + visibleCount
      : "0 of 0";
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      activeCategory = tab.dataset.category;
      activeFilter = "inbox";

      sideLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.filter === "inbox");
      });

      renderEmails();
    });
  });

  sideLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const filter = link.dataset.filter;
      if (!filter) return;

      event.preventDefault();
      activeFilter = filter;

      sideLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      tabs.forEach((tab) => tab.classList.remove("active"));

      renderEmails();
    });
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchTerm = searchInput.value.trim().toLowerCase();
    renderEmails();
  });

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    renderEmails();
  });

  document.getElementById("refreshButton").addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    activeFilter = "inbox";
    activeCategory = "primary";

    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.category === "primary");
    });

    sideLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.filter === "inbox");
    });

    renderEmails();
  });

  selectAll.addEventListener("change", () => {
    document.querySelectorAll(".mail-select").forEach((checkbox) => {
      const row = checkbox.closest(".gmail-mail-row");
      if (row.style.display !== "none") {
        checkbox.checked = selectAll.checked;
      }
    });
  });

  document.querySelectorAll(".gmail-star").forEach((star) => {
    star.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const row = star.closest(".gmail-mail-row");
      const starred = row.dataset.starred !== "true";

      row.dataset.starred = String(starred);
      star.classList.toggle("starred", starred);
      star.textContent = starred ? "★" : "☆";
      star.setAttribute("aria-label", starred ? "Unstar email" : "Star email");

      renderEmails();
    });
  });

  document.getElementById("composeButton").addEventListener("click", (event) => {
    event.preventDefault();
    alert("Compose is a demo and is not connected to a real mailbox.");
  });

  document.querySelector(".gmail-add-label").addEventListener("click", () => {
    alert("Custom labels are not connected yet.");
  });

  document.getElementById("moreButton").addEventListener("click", (event) => {
    event.preventDefault();
    alert("Additional folders can be added here.");
  });

  document.getElementById("moreActionsButton").addEventListener("click", () => {
    alert("Select an email to use additional actions.");
  });

  renderEmails();
})();
</script>

<script src="/site.js"></script>
</body>
</html>`);
}
