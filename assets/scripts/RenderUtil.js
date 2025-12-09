export const RenderUtil = void 0;
t.flipY = function (t, e) {
  for (const n = t.length, i = new Uint8Array(n), o = 0, r = n - e; o < n; o += e, r -= e) {
    for (const a = 0; a < e; a++) {
      i[o + a] = t[r + a];
    }
  }
  return i;
};
t.getPixelsData = function (t, e) {
  if (void 0 === e) {
    e = !0;
  }
  if (!cc.isValid(t)) {
    return null;
  }
  const n = Math.floor(t.width);
  const i = Math.floor(t.height);
  const o = new cc.Node();
  o.parent = t;
  const r = o.addComponent(cc.Camera);
  r.clearFlags |= cc.Camera.ClearFlags.COLOR;
  r.backgroundColor = cc.color(0, 0, 0, 0);
  r.zoomRatio = cc.winSize.height / i;
  const a = new cc.RenderTexture();
  a.initWithSize(n, i, cc.RenderTexture.DepthStencilFormat.RB_FMT_S8);
  r.targetTexture = a;
  r.render(t);
  const s = a.readPixels();
  a.destroy();
  o.destroy();
  if (e) {
    for (
      const c = s.length, l = 4 * n, u = new Uint8Array(c), p = 0, h = c - l;
      p < c;
      p += l, h -= l
    ) {
      for (const f = 0; f < l; f++) {
        u[p + f] = s[h + f];
      }
    }
    return u;
  }
  return s;
};
t.renderWithMaterial = function (t, e, n) {
  if (e instanceof cc.Material) {
    n = e;
    e = new cc.RenderTexture();
  }
  const i = new cc.Node();
  i.setParent(cc.Canvas.instance.node);
  const o = i.addComponent(cc.Sprite);
  o.sizeMode = cc.Sprite.SizeMode.RAW;
  o.trim = !1;
  o.spriteFrame = new cc.SpriteFrame(t);
  const r = t.width;
  const a = t.height;
  e.initWithSize(r, a);
  if (n instanceof cc.Material) {
    o.setMaterial(0, n);
  }
  const s = new cc.Node();
  s.setParent(i);
  const c = s.addComponent(cc.Camera);
  c.clearFlags |= cc.Camera.ClearFlags.COLOR;
  c.backgroundColor = cc.color(0, 0, 0, 0);
  c.zoomRatio = cc.winSize.height / a;
  c.targetTexture = e;
  c.render(i);
  s.destroy();
  i.destroy();
  return e;
};
t.getRenderTexture = function (t, e) {
  if (!cc.isValid(t)) {
    return null;
  }
  if (e && e instanceof cc.RenderTexture) {
    //
  } else {
    e = new cc.RenderTexture();
  }
  const n = Math.floor(t.width);
  const i = Math.floor(t.height);
  e.initWithSize(n, i);
  const o = new cc.Node();
  o.parent = t;
  const r = o.addComponent(cc.Camera);
  r.clearFlags |= cc.Camera.ClearFlags.COLOR;
  r.backgroundColor = cc.color(0, 0, 0, 0);
  r.zoomRatio = cc.winSize.height / i;
  r.targetTexture = e;
  r.render(t);
  o.destroy();
  return e;
};
function t() {}
const i = t;
export const RenderUtil = i;
