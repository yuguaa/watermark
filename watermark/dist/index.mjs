var tt = Object.defineProperty;
var et = (n, t, e) => t in n ? tt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var N = (n, t, e) => et(n, typeof t != "symbol" ? t + "" : t, e);
function nt(n) {
  return n.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function ot(n) {
  return Object.keys(n).map((t) => `${nt(t)}: ${n[t]};`).join(" ");
}
function it() {
  return window.devicePixelRatio || 1;
}
function O(n, t) {
  for (let e in t)
    t[e] instanceof Object && e in n && Object.assign(t[e], O(n[e], t[e]));
  return Object.assign(n || {}, t), n;
}
function D(n) {
  return /[\u4e00-\u9fa5]/.test(n);
}
const G = (n) => D(n) ? 4 : 3;
function at(n) {
  return D(n), 2;
}
function L(n, t, e = 1, o = !1) {
  const a = document.createElement("canvas"), l = a.getContext("2d"), s = n * e, i = t * e;
  return a.setAttribute("width", `${s}px`), a.setAttribute("height", `${i}px`), o && (l.fillStyle = `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
    Math.random() * 255
  )}, ${Math.random()})`, l.fillRect(0, 0, a.width, a.height)), l.save(), [l, a, s, i];
}
function st(n, t, e, o, a, l, s, i, p, f = !1) {
  const [c, h, r, b] = L(o, a, e, f);
  if (n instanceof HTMLImageElement)
    c.drawImage(n, 0, 0, r, b);
  else {
    const { color: m, fontSize: g, fontStyle: d, fontWeight: u, fontFamily: J, textAlign: Q } = l, Y = Number(g) * e;
    c.font = `${d} normal ${u} ${Y}px/${a}px ${J}`, c.fillStyle = m, c.textAlign = Q, c.textBaseline = "top";
    const I = Array.isArray(n) ? n : [n];
    I == null || I.forEach((j, V) => {
      c.fillText(
        j,
        r / 2,
        V * (Y + G() * e) + at(j)
      );
    });
  }
  const M = Math.PI / 180 * Number(t), R = Math.max(o, a), [$, K, w] = L(R, R, e, f);
  $.translate(w / 2, w / 2), $.rotate(M), r > 0 && b > 0 && $.drawImage(h, -r / 2, -b / 2);
  function U(m, g) {
    const d = m * Math.cos(M) - g * Math.sin(M), u = m * Math.sin(M) + g * Math.cos(M);
    return [d, u];
  }
  let S = 0, E = 0, y = 0, T = 0;
  const v = r / 2, A = b / 2;
  [
    [0 - v, 0 - A],
    [0 + v, 0 - A],
    [0 + v, 0 + A],
    [0 - v, 0 + A]
  ].forEach(([m, g]) => {
    const [d, u] = U(m, g);
    S = Math.min(S, d), E = Math.max(E, d), y = Math.min(y, u), T = Math.max(T, u);
  });
  const _ = S + w / 2, q = y + w / 2, x = E - S, k = T - y, z = s * e, C = i * e, F = (x + z) * 2, P = k + C, [B, Z] = L(F, P, void 0, f);
  function H(m = 0, g = 0) {
    B.globalAlpha = p, B.drawImage(K, _, q, x, k, m, g, x, k);
  }
  return H(), H(x + z, -k / 2 - C / 2), H(x + z, +k / 2 + C / 2), [Z.toDataURL(), F / e, P / e];
}
const W = class W {
  constructor(t) {
    if (this.options = O({ ...W.DEFAULT_WATERMARK_OPTIONS }, t), !this.options.container)
      throw new Error("container is required");
    if (!this.options.container instanceof HTMLElement)
      throw new Error("container must be a HTMLElement");
    getComputedStyle(this.options.container).position === "static" && (this.options.container.style.position = "relative"), this.markStyle = this.getMarkStyle(), this.watermarkMap = /* @__PURE__ */ new Map(), this.renderWatermark();
  }
  getMarkStyle() {
    const { zIndex: t, gap: e, offset: o } = this.options, [a, l] = e, s = a / 2, i = l / 2, p = (o == null ? void 0 : o[0]) || s, f = (o == null ? void 0 : o[1]) || i;
    let c = p - s, h = f - i;
    const r = {
      zIndex: t,
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      backgroundRepeat: "repeat",
      backgroundPosition: `${c > 0 ? c : 0}px ${h > 0 ? h : 0}px`
    };
    return c > 0 && (r.left = `${c}px`, r.width = `calc(100% - ${c}px)`), h > 0 && (r.top = `${h}px`, r.height = `calc(100% - ${h}px)`), r;
  }
  getMarkSize(t) {
    const { image: e, content: o, font: a = {}, width: l, height: s } = this.options;
    let i = 120, p = 64;
    if (!e && t.measureText) {
      t.font = `${Number(a.fontSize || 16)}px ${a.fontFamily || "Microsoft YaHei"}`;
      const f = Array.isArray(o) ? o : [o], c = f.map((h) => {
        const r = t.measureText(h);
        return [
          r.width,
          r.fontBoundingBoxAscent + r.fontBoundingBoxDescent + r.ideographicBaseline
        ];
      });
      i = Math.ceil(Math.max(...c.map((h) => h[0]))), p = Math.floor(Math.max(...c.map((h) => h[1]))) * f.length + (f.length - 1) * G();
    }
    return [l || i, s || p];
  }
  appendWatermark(t, e, o) {
    if (o) {
      const a = ot({
        ...this.markStyle,
        backgroundImage: `url('${t}')`,
        backgroundSize: `${Math.floor(e)}px`,
        visibility: "visible !important"
      });
      if (!this.watermarkMap.get(o)) {
        const s = document.createElement("div");
        this.watermarkMap.set(o, s);
        const i = globalThis.MutationObserver || globalThis.WebKitMutationObserver;
        if (i) {
          let p = new i(() => {
            (!o.contains(this.watermarkMap.get(o)) || s.getAttribute("style") !== a) && (this.removeWatermark(o), this.watermarkMap.delete(o), p.disconnect(), p = null, this.renderWatermark());
          });
          p.observe(o, {
            attributes: !0,
            // 观察目标节点的属性节点
            subtree: !0,
            // 观察目标节点的所有后代节点
            childList: !0
            // 观察目标节点的子节点
          });
        }
      }
      const l = this.watermarkMap.get(o);
      l.setAttribute("style", a), o.append(l);
    }
  }
  removeWatermark(t) {
    const e = this.watermarkMap.get(t);
    e && t && t.contains(e) && t.removeChild(e), this.watermarkMap.delete(t);
  }
  renderWatermark() {
    const e = document.createElement("canvas").getContext("2d");
    if (e) {
      const o = it(), [a, l] = this.getMarkSize(e), s = (i) => {
        const [p, f] = st(
          i,
          this.options.rotate,
          o,
          i.width || a,
          i.height || l,
          {
            color: this.options.font.color,
            fontSize: this.options.font.fontSize,
            fontStyle: this.options.font.fontStyle,
            fontWeight: this.options.font.fontWeight,
            fontFamily: this.options.font.fontFamily,
            textAlign: this.options.font.textAlign
          },
          this.options.gap[0],
          this.options.gap[1],
          this.options.globalAlpha,
          this.options.isDebug
        );
        this.appendWatermark(p, f, this.options.container);
      };
      if (this.options.image) {
        const i = new Image();
        i.onload = () => {
          s(i);
        }, i.onerror = () => {
          s(this.options.content);
        }, i.crossOrigin = "anonymous", i.referrerPolicy = "no-referrer", i.src = this.options.image;
      } else
        s(this.options.content);
    }
  }
  updateWatermark(t) {
    this.options = O({ ...this.options }, t), this.markStyle = this.getMarkStyle(), this.renderWatermark();
  }
};
N(W, "DEFAULT_WATERMARK_OPTIONS", {
  zIndex: 9,
  content: ["菠萝吹雪"],
  gap: [100, 100],
  offset: [0, 0],
  rotate: -22,
  globalAlpha: 0.15,
  isDebug: !1,
  // image: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original',
  font: {
    color: "#333",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    fontFamily: "sans-serif",
    textAlign: "center"
  }
});
let X = W;
export {
  X as default
};
