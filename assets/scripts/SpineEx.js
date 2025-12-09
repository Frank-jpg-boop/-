sp &&
  sp.Skeleton &&
  ((sp.SkeletonData.copy = function (t) {
    if (!t) {
      return null;
    }
    const e = new sp.SkeletonData();
    cc.js.mixin(e, t);
    const n = Date.now();
    e._uuid = t._uuid + "_" + n + "_copy";
    for (const i = e.textureNames, o = [], r = 0; r < i.length; r++) {
      e.atlasText = e.atlasText.replace(i[r], "copy_" + i[r]);
      o.push("copy_" + i[r]);
    }
    e.textureNames = o;
    if (e.init) {
      e.init();
    }
    return e;
  }),
  (sp.Skeleton.prototype.updateRegion = function (t, e) {
    const n = this.findSlot(t);
    if (null != n) {
      const i = n.getAttachment();
      if (null != i) {
        const o = new sp.SkeletonTexture({
          width: e.width,
          height: e.height,
        });
        o.setRealTexture(e);
        const r = new sp.spine.TextureAtlasRegion();
        r.width = e.width;
        r.height = e.height;
        r.originalWidth = e.width;
        r.originalHeight = e.height;
        r.rotate = !1;
        r.u = 0;
        r.v = 0;
        r.u2 = 1;
        r.v2 = 1;
        r.texture = o;
        r.renderObject = r;
        i.region = r;
        i.width = e.width;
        i.height = e.height;
        if (i instanceof sp.spine.MeshAttachment) {
          i.updateUVs();
        } else {
          i.setRegion(r);
          i.updateOffset();
        }
      }
    }
  }));
