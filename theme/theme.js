// 外观：自动（跟随系统）、浅色、深色。选择存在访客自己的浏览器里；评论区 giscus 同步换配色。
(() => {
  const btn = document.getElementById('themeBtn'), menu = document.getElementById('themeMenu');
  if (!btn || !menu) return;
  const read = () => { try { return localStorage.getItem('theme') || 'auto'; } catch { return 'auto'; } };
  const giscusTheme = t => (t === 'auto' ? 'preferred_color_scheme' : t);

  function apply(t) {
    if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
    try { t === 'auto' ? localStorage.removeItem('theme') : localStorage.setItem('theme', t); } catch {}
    const icon = menu.querySelector(`[data-theme-set="${t}"] svg`);
    if (icon) btn.innerHTML = icon.outerHTML;
    menu.querySelectorAll('[data-theme-set]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.themeSet === t)));
    const frame = document.querySelector('iframe.giscus-frame');
    frame?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme(t) } } }, 'https://giscus.app');
  }

  const open = v => { menu.hidden = !v; btn.setAttribute('aria-expanded', String(v)); };
  btn.addEventListener('click', e => { e.stopPropagation(); open(menu.hidden); });
  menu.addEventListener('click', e => { const b = e.target.closest('[data-theme-set]'); if (b) { apply(b.dataset.themeSet); open(false); } });
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) open(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });

  // 评论区加载完成后按当前选择换一次配色（它默认只跟随系统）
  let synced = false;
  addEventListener('message', e => {
    if (e.origin === 'https://giscus.app' && !synced && read() !== 'auto') {
      synced = true;
      document.querySelector('iframe.giscus-frame')?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme(read()) } } }, 'https://giscus.app');
    }
  });
  apply(read());
})();
