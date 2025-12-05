exports.RenderUtil = void 0;
var i = (function () {
    function t() {}
    t.getRenderTexture = function (t, e) {
        if (!cc.isValid(t)) {
            return null;
        }
        if (e && e instanceof cc.RenderTexture) {
            //
        } else {
            e = new cc.RenderTexture();
        }
        var n = Math.floor(t.width);
        var i = Math.floor(t.height);
        e.initWithSize(n, i);
        var o = new cc.Node();
        o.parent = t;
        var r = o.addComponent(cc.Camera);
        r.clearFlags |= cc.Camera.ClearFlags.COLOR;
        r.backgroundColor = cc.color(0, 0, 0, 0);
        r.zoomRatio = cc.winSize.height / i;
        r.targetTexture = e;
        r.render(t);
        o.destroy();
        return e;
    };
    t.renderWithMaterial = function (t, e, n) {
        if (e instanceof cc.Material) {
            n = e;
            e = new cc.RenderTexture();
        }
        var i = new cc.Node();
        i.setParent(cc.Canvas.instance.node);
        var o = i.addComponent(cc.Sprite);
        o.sizeMode = cc.Sprite.SizeMode.RAW;
        o.trim = !1;
        o.spriteFrame = new cc.SpriteFrame(t);
        var r = t.width;
        var a = t.height;
        e.initWithSize(r, a);
        if (n instanceof cc.Material) {
            o.setMaterial(0, n);
        }
        var s = new cc.Node();
        s.setParent(i);
        var c = s.addComponent(cc.Camera);
        c.clearFlags |= cc.Camera.ClearFlags.COLOR;
        c.backgroundColor = cc.color(0, 0, 0, 0);
        c.zoomRatio = cc.winSize.height / a;
        c.targetTexture = e;
        c.render(i);
        s.destroy();
        i.destroy();
        return e;
    };
    t.getPixelsData = function (t, e) {
        if (void 0 === e) {
            e = !0;
        }
        if (!cc.isValid(t)) {
            return null;
        }
        var n = Math.floor(t.width);
        var i = Math.floor(t.height);
        var o = new cc.Node();
        o.parent = t;
        var r = o.addComponent(cc.Camera);
        r.clearFlags |= cc.Camera.ClearFlags.COLOR;
        r.backgroundColor = cc.color(0, 0, 0, 0);
        r.zoomRatio = cc.winSize.height / i;
        var a = new cc.RenderTexture();
        a.initWithSize(n, i, cc.RenderTexture.DepthStencilFormat.RB_FMT_S8);
        r.targetTexture = a;
        r.render(t);
        var s = a.readPixels();
        a.destroy();
        o.destroy();
        if (e) {
            for (var c = s.length, l = 4 * n, u = new Uint8Array(c), p = 0, h = c - l; p < c; p += l, h -= l) {
                for (var f = 0; f < l; f++) {
                    u[p + f] = s[h + f];
                }
            }
            return u;
        }
        return s;
    };
    t.flipY = function (t, e) {
        for (var n = t.length, i = new Uint8Array(n), o = 0, r = n - e; o < n; o += e, r -= e) {
            for (var a = 0; a < e; a++) {
                i[o + a] = t[r + a];
            }
        }
        return i;
    };
    return t;
})();
exports.RenderUtil = i;
