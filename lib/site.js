export function esc(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function shell({title="Babydoll Google",page="home"}){
return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="/theme.css"></head><body data-page="${esc(page)}"><div id="app"></div><script src="/app.js" defer></script></body></html>`;
}