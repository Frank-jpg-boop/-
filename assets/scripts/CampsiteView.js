var i;
exports.ECampsiteEvent = void 0;
var a;
var $eventManager = require("./EventManager");
var $campsiteRoomItem = require("./CampsiteRoomItem");
var $supportRewadItem = require("./SupportRewadItem");
var u = cc._decorator;
var p = u.ccclass;
var h = u.property;
!(function (t) {
    t.UPDATE_ROOM = "UPDATE_ROOM";
})((a = exports.ECampsiteEvent || (exports.ECampsiteEvent = {})));
var f = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nRoomView = null;
        e.supportRewadItem = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on(a.UPDATE_ROOM, this.updateRoomView, this);
        this.initView();
    };
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off(a.UPDATE_ROOM, this.updateRoomView, this);
    };
    e.prototype.onEnable = function () {
        this.updateView();
        this.supportRewadItem.updateView();
    };
    e.prototype.initView = function () {
        this.nRoomView.children.forEach(function (t, e) {
            t.getComponent($campsiteRoomItem.default).initData(e + 1);
        });
    };
    e.prototype.updateView = function () {
        this.updateRoomView();
    };
    e.prototype.updateRoomView = function () {
        this.nRoomView.children.forEach(function (t) {
            t.getComponent($campsiteRoomItem.default).updateView();
        });
    };
    __decorate([h(cc.Node)], e.prototype, "nRoomView", void 0);
    __decorate([h($supportRewadItem.default)], e.prototype, "supportRewadItem", void 0);
    return __decorate([p], e);
})(cc.Component);
exports.default = f;
