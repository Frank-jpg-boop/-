var i;
exports.CustomButton = void 0;
var $audioManager = require("./AudioManager");
var $componentBase = require("./ComponentBase");
var $eventManager = require("./EventManager");
var $appProxy = require("./AppProxy");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
var f = u.menu;
var d = u.requireComponent;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.btnAudio = !0;
        e.lastEvent = !0;
        e.clip = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        t.prototype.onLoad.call(this);
        this.node.on("click", this.onClick, this);
    };
    e.prototype.onClick = function () {
        if (this.btnAudio) {
            if (null != this.clip) {
                $audioManager.AudioManager.instance.playEffect(this.clip);
            } else {
                $eventManager.EventManager.instance.emit($appProxy.AppEvent.AUDIO_CLICK);
            }
        }
    };
    __decorate([h()], e.prototype, "btnAudio", void 0);
    __decorate([h()], e.prototype, "lastEvent", void 0);
    __decorate(
        [
            h({
                type: cc.AudioClip,
                tooltip: "点击音效",
                visible: function () {
                    return this.btnAudio;
                }
            })
        ],
        e.prototype,
        "clip",
        void 0
    );
    return __decorate([p, f("自定义组件/按钮"), d(cc.Button)], e);
})($componentBase.ComponentBase);
exports.CustomButton = m;
