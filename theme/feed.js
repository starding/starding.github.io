// 首页滚动加载：滚到底部附近时，从 feed.json 取出已按主题模板渲染好的卡片，每次接上 10 篇。
// 从文章按「返回」回到这里时，在页面画出来之前就恢复已经加载的篇数和滚动位置，避免先在顶部出现再跳下去。
// 本脚本紧跟在卡片列表后面同步执行（不延迟），卡片数据存在当前标签页的会话存储里。
(() => {
  const feed = document.getElementById('feed'), mark = document.getElementById('feed-more');
  if (!feed || !mark) return;
  const KEY = `feed:${location.pathname}`, CARDS = `feed-cards:${mark.dataset.src}`;
  // 滚动位置由这里负责：浏览器自己的恢复只认得最初的 10 篇，会把位置截短
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const read = k => { try { return JSON.parse(sessionStorage.getItem(k) || 'null'); } catch { return null; } };
  const write = (k, v) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} };
  let cards = read(CARDS), next = +mark.dataset.from, busy = false;
  const load = async () => (cards ??= await fetch(mark.dataset.src).then(r => r.json()).then(c => (write(CARDS, c), c)).catch(() => []));
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) more(); }, { rootMargin: '600px 0px' });
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

  // 离开页面前记下加载到哪、滚到哪
  const save = () => write(KEY, { next, y: scrollY });
  addEventListener('pagehide', save);
  feed.addEventListener('click', e => { if (e.target.closest('a')) save(); });

  // 只在「返回 / 前进」回到本页时恢复；正常打开首页从头开始
  const nav = performance.getEntriesByType('navigation')[0];
  const saved = nav?.type === 'back_forward' ? read(KEY) : null;
  const restore = () => { scrollTo(0, saved.y); requestAnimationFrame(() => scrollTo(0, saved.y)); };
  if (saved && saved.next > next && cards) {
    render(saved.next);           // 卡片已在会话存储里：同步接上，不等网络
    restore();
    addEventListener('DOMContentLoaded', restore, { once: true });
  } else if (saved && saved.next > next) {
    busy = true;
    load().then(() => { render(saved.next); busy = false; restore(); });
  } else if (saved) {
    restore();
    addEventListener('DOMContentLoaded', restore, { once: true });
  }
  if (mark.isConnected) io.observe(mark);
})();
