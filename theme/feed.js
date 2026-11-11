// 首页滚动加载：滚到底部附近时，从 feed.json 取出已按主题模板渲染好的卡片，每次接上 10 篇
(() => {
  const feed = document.getElementById('feed'), mark = document.getElementById('feed-more');
  if (!feed || !mark) return;
  let cards = null, next = +mark.dataset.from, busy = false;
  async function more() {
    if (busy) return;
    busy = true;
    cards ??= await fetch(mark.dataset.src).then(r => r.json()).catch(() => []);
    feed.insertAdjacentHTML('beforeend', cards.slice(next, next + 10).join('\n'));
    next += 10;
    busy = false;
    if (next >= cards.length) { io.disconnect(); mark.remove(); }
  }
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) more(); }, { rootMargin: '600px 0px' });
  io.observe(mark);
})();
