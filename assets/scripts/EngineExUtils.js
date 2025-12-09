exports.EngineExUtils = exports.headImgExt = void 0;
exports.headImgExt = ".head";
(function (t) {
    function e() {
        cc.assetManager.downloader.register(exports.headImgExt, function (t, e, n) {
            n(null, t);
        });
        cc.assetManager.parser.register(exports.headImgExt, o);
        cc.assetManager.factory.register(exports.headImgExt, i);
    }

    function i(t, e, n, i) {
        var o = null;
        var r = null;
        try {
            (o = new cc.Texture2D())._uuid = t;
            o._nativeUrl = t;
            o._nativeAsset = e;
        } catch (t) {
            r = t;
        }
        if (i) {
            i(r, o);
        }
    }

    function o(t, e, n) {
        var i = new Image();

        function o() {
            i.removeEventListener("load", o);
            i.removeEventListener("error", r);
            if (n) {
                n(null, i);
            }
        }

        function r() {
            i.removeEventListener("load", o);
            i.removeEventListener("error", r);
            if (n) {
                n(new Error(t));
            }
        }
        if ("file:" !== window.location.protocol) {
            i.crossOrigin = "anonymous";
        }
        i.addEventListener("load", o);
        i.addEventListener("error", r);
        i.src = t;
        return i;
    }
    t.all = function () {
        e();
    };
    t.registerHeadImgLoader = e;
})(exports.EngineExUtils || (exports.EngineExUtils = {}));
