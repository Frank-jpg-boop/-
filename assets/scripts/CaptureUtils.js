var i = (function () {
    function t() {}
    t._capture = function (e, n) {
        var i = t.getCamera();
        var o = i.node;
        var r = new cc.RenderTexture();
        r.initWithSize(n.width, n.height, cc.gfx.RB_FMT_S8);
        o.setPosition(n.x, n.y);
        o.parent = e;
        i.orthoSize = n.height / 2;
        i.targetTexture = r;
        i.render(e);
        i.targetTexture = null;
        o.parent = null;
        return r;
    };
    t._getNodeInfo = function (e) {
        var n = t._tmpInfo;
        var i = e.getWorldMatrix(t._tmpMat4).getScale(t._tmpVec3);
        n.scaleX = i.x;
        n.scaleY = i.y;
        n.scaleZ = i.z;
        if (e == cc.director.getScene()) {
            var o = cc.view._visibleRect;
            n.anchorX = n.anchorY = 0;
            n.width = o.width;
            n.height = o.height;
        } else {
            n.anchorX = e.anchorX;
            n.anchorY = e.anchorY;
            n.width = e.width;
            n.height = e.height;
        }
        return n;
    };
    t.getCamera = function () {
        var e = t._camera;
        if (e) {
            //
        } else {
            (e = t._camera = new cc.Node("CaptureUtils").addComponent(cc.Camera)).alignWithScreen = !1;
            e.ortho = !0;
            e.nearClip = 0;
        }
        return e;
    };
    t.getCanvas = function () {
        return t._canvas || (t._canvas = document.createElement("canvas"));
    };
    t.capture = function (t, e) {
        var n = new cc.SpriteFrame();
        n.setTexture(this.getRenderTexture(t, e));
        n.setFlipY(!0);
        return n;
    };
    t.getImgUrl = function (t, e) {
        return this.toImgUrl(this.getRenderTexture(t, e));
    };
    t.getRenderTexture = function (e, n) {
        var i;
        if (void 0 === e) {
            e = cc.Canvas.instance.node || cc.director.getScene();
        }
        if (void 0 === n) {
            n = {};
        }
        i = t._getNodeInfo(e);
        if (void 0 === n.width) {
            n.width = e.width * i.scaleX;
        }
        if (void 0 === n.height) {
            n.height = e.height * i.scaleY;
        }
        if (void 0 === n.x) {
            n.x = (0.5 - e.anchorX) * e.width;
        }
        if (void 0 === n.y) {
            n.y = (0.5 - e.anchorY) * e.height;
        }
        return t._capture(e, n);
    };
    t.toImgUrl = function (e) {
        var n;
        var i = e.width;
        var o = e.height;
        if (cc.sys.isNative) {
            var r = e.readPixels();
            var a = jsb.fileUtils.getWritablePath() + "tmpImg.png";
            jsb.saveImageData(r, i, o, a);
            n = a;
        } else {
            var s = t.getCanvas();
            var c = s.getContext("2d");
            var l = s.toTempFilePathSync;
            var u = ((r = e.readPixels()), 4 * i);
            var p = 0;
            s.width = i;
            for (s.height = o; p < o; ) {
                for (var h = o - 1 - p, f = c.createImageData(i, 1), d = h * i * 4, m = 0; m < u; m++) {
                    f.data[m] = r[d + m];
                }
                c.putImageData(f, 0, p++);
            }
            if ("function" == typeof l) {
                n = l.call(s, {});
            } else {
                n = s.toDataURL("image/png");
            }
            c.clearRect(0, 0, i, o);
        }
        return n;
    };
    t._tmpMat4 = cc.mat4();
    t._tmpVec3 = cc.v3();
    t._tmpInfo = {};
    return t;
})();
exports.default = i;
