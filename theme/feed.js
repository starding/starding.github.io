// 首页滚动加载：滚到底部附近时，从 feed.json 取出已按主题模板渲染好的卡片，每次接上 10 篇。
// 从文章按「返回」回到这里时，恢复已经加载的篇数和滚动位置（记在当前标签页的会话存储里）。
(() => {
  const feed = document.getElementById('feed'), mark = document.getElementById('feed-more');
  if (!feed || !mark) return;
  const KEY = `feed:${location.pathname}`;
  // 滚动位置由这里负责：浏览器自己的恢复只认得最初的 10 篇，会把位置截短
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  let cards = null, next = +mark.dataset.from, busy = false;
  const load = async () => (cards ??= await fetch(mark.dataset.src).then(r => r.json()).catch(() => []));
  function render(upto) {
    feed.insertAdjacentHTML('beforeend', cards.slice(next, upto).join('\n'));
    next = Math.max(next, upto);
    if (next >= cards.length) { io.disconnect(); mark.remove(); }
  }
  async function more() {
    if (busy) return;
    busy = true;
    await load();
    render(next + 10);
    busy = false;
  }
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) more(); }, { rootMargin: '600px 0px' });

  // 离开页面前记下加载到哪、滚到哪
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify({ next, y: scrollY })); } catch {} };
  addEventListener('pagehide', save);
  feed.addEventListener('click', e => { if (e.target.closest('a')) save(); });

  // 只在「返回 / 前进」回到本页时恢复；正常打开首页从头开始
  const nav = performance.getEntriesByType('navigation')[0];
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch {}
  if (nav?.type === 'back_forward' && saved && saved.next > next) {
    busy = true;
    load().then(() => {
      render(saved.next);
      busy = false;
      scrollTo(0, saved.y);
      requestAnimationFrame(() => scrollTo(0, saved.y));
      if (mark.isConnected) io.observe(mark);
    });
  } else {
    if (nav?.type === 'back_forward' && saved) scrollTo(0, saved.y);
    io.observe(mark);
  }
})();
