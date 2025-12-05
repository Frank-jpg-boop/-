var i;
exports.SceneBase = void 0;
var $componentBase = require("./ComponentBase");
var $eventManager = require("./EventManager");
var $sceneManager = require("./SceneManager");
var $appProxy = require("./AppProxy");
var u = cc._decorator;
var p = u.ccclass;
var h =
    (u.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.bannerPosition = null;
            e.nativePosition = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onLoad = function () {
            t.prototype.onLoad.call(this);
            $sceneManager.SceneManager.instance.setCurScene(this);
            $eventManager.EventManager.instance.emit($appProxy.AppEvent.SCENE_CHANGED);
            var e = cc.view.getDesignResolutionSize();
            var n = this.node.getComponent(cc.Canvas);
            if (cc.winSize.width / cc.winSize.height < e.width / e.height) {
                n.fitWidth = !0;
                n.fitHeight = !1;
            } else {
                n.fitWidth = !1;
                n.fitHeight = !0;
            }
        };
        e.prototype.switchSceneUI = function (t) {
            if (void 0 === t) {
                t = 0;
            }
            for (var e = [], n = 1; n < arguments.length; n++) {
                e[n - 1] = arguments[n];
            }
        };
        return __decorate([p], e);
    })($componentBase.ComponentBase));
exports.SceneBase = h;
