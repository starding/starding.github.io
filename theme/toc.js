// 文章目录：高亮当前读到的小节
(() => {
  const links = [...document.querySelectorAll('.toc a')];
  const heads = links.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  if (!heads.length) return;
  const mark = () => {
    let cur = heads[0];
    for (const h of heads) if (h.getBoundingClientRect().top < innerHeight * 0.3) cur = h;
    links.forEach(a => a.toggleAttribute('aria-current', decodeURIComponent(a.hash.slice(1)) === cur.id));
  };
  addEventListener('scroll', mark, { passive: true });
  mark();
})();
