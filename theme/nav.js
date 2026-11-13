// 返回图标：从本站页面进来就退回原处；直接打开、或从另一种语言版本切换过来时，回到对应列表（链接本身的地址）。
// 精简顶栏：页头滚出视野后，往上滚时出现、往下滚时收起；回到页头位置时隐藏。
(() => {
  const back = document.getElementById('backBtn');
  if (back) {
    back.addEventListener('click', e => {
      let ref = null;
      try { ref = new URL(document.referrer); } catch {}
      const alt = document.querySelector('.lang-btn')?.pathname;
      if (ref && ref.origin === location.origin && ref.pathname !== location.pathname && ref.pathname !== alt && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  }
  const bar = document.getElementById('minibar'), head = document.querySelector('.appbar');
  if (!bar || !head) return;
  let last = scrollY, shown = false;
  const set = v => { if (v === shown) return; shown = v; bar.classList.toggle('show', v); bar.inert = !v; document.documentElement.classList.toggle('mini-on', v); };
  addEventListener('scroll', () => {
    const y = scrollY, dy = y - last;
    if (y < head.offsetHeight) set(false);
    else if (dy < -4) set(true);
    else if (dy > 4) set(false);
    last = y;
  }, { passive: true });
})();
