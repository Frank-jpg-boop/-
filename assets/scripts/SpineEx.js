sp &&
    sp.Skeleton &&
    ((sp.SkeletonData.copy = function (t) {
        if (!t) {
            return null;
        }
        var e = new sp.SkeletonData();
        cc.js.mixin(e, t);
        var n = Date.now();
        e._uuid = t._uuid + "_" + n + "_copy";
        for (var i = e.textureNames, o = [], r = 0; r < i.length; r++) {
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
        var n = this.findSlot(t);
        if (null != n) {
            var i = n.getAttachment();
            if (null != i) {
                var o = new sp.SkeletonTexture({
                    width: e.width,
                    height: e.height
                });
                o.setRealTexture(e);
                var r = new sp.spine.TextureAtlasRegion();
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
