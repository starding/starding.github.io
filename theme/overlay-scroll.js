// 浮在内容上的细滚动条：原生滚动条隐藏（样式表里），这里为正在滚动的页面或区域画一个滑块。
// 滚动或鼠标靠近右边缘时出现，停下 1 秒后淡出；滑块可以拖动。不占内容的宽度。
const thumbs = new Map();
const docEl = document.scrollingElement || document.documentElement;

function rectOf(el) {
  return el === docEl ? { top: 0, left: 0, width: innerWidth, height: innerHeight } : el.getBoundingClientRect();
}

function thumbFor(el) {
  let t = thumbs.get(el);
  if (t) return t;
  const node = document.createElement('div');
  node.className = 'oscroll';
  document.body.appendChild(node);
  t = { node, timer: 0, drag: null };
  thumbs.set(el, t);
  node.addEventListener('pointerdown', e => {
    t.drag = { y: e.clientY, top: el.scrollTop };
    node.setPointerCapture(e.pointerId);
    node.classList.add('on', 'drag');
    e.preventDefault();
  });
  node.addEventListener('pointermove', e => {
    if (!t.drag) return;
    const range = el.clientHeight - node.offsetHeight;
    if (range > 0) el.scrollTop = t.drag.top + (e.clientY - t.drag.y) * (el.scrollHeight - el.clientHeight) / range;
  });
  const end = () => { t.drag = null; node.classList.remove('drag'); show(el); };
  node.addEventListener('pointerup', end);
  node.addEventListener('pointercancel', end);
  return t;
}

function place(el) {
  const t = thumbFor(el);
  const { scrollHeight: sh, clientHeight: ch, scrollTop: st } = el;
  if (!el.isConnected || sh <= ch + 1) { t.node.classList.remove('on'); return false; }
  const r = rectOf(el);
  const h = Math.max(32, (ch * ch) / sh);
  t.node.style.height = `${h}px`;
  t.node.style.transform = `translate(${r.left + r.width - 8}px, ${r.top + (st / (sh - ch)) * (ch - h)}px)`;
  return true;
}

function show(el) {
  const t = thumbFor(el);
  if (!place(el)) return;
  t.node.classList.add('on');
  clearTimeout(t.timer);
  t.timer = setTimeout(() => { if (!t.drag) t.node.classList.remove('on'); }, 1000);
}

// 滚动事件不冒泡，在捕获阶段统一接住页面与各个区域的滚动
document.addEventListener('scroll', e => show(e.target === document ? docEl : e.target), { capture: true, passive: true });

// 鼠标靠近可滚动区域的右边缘时显出滑块
addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  for (let el = e.target; el && el.nodeType === 1; el = el.parentElement) {
    const scrollable = el === docEl || (el.scrollHeight > el.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(el).overflowY));
    if (!scrollable) continue;
    const r = rectOf(el);
    if (r.left + r.width - e.clientX < 16) show(el);
    return;
  }
  if (innerWidth - e.clientX < 16) show(docEl);
}, { passive: true });

addEventListener('resize', () => { for (const el of thumbs.keys()) place(el); });

// 区域被界面重绘移除后，清掉它的滑块
setInterval(() => {
  for (const [el, t] of thumbs) if (!el.isConnected) { t.node.remove(); thumbs.delete(el); }
}, 5000);
