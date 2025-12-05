var i;
var $frameEnum = require("./FrameEnum");
var $popupManager = require("./PopupManager");
var $queue = require("./Queue");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.popupQueue = new $queue.default();
            e.curPopupName = "";
            e.curPopupOption = null;
            e.isOpening = !1;
            return e;
        }
        var n;
        __extends(e, t);
        n = e;
        e.prototype.onLoad = function () {
            this.init();
        };
        e.prototype.init = function () {
            this.popupQueue = new $queue.default();
        };
        e.prototype.pushPopup = function (t, e, i, o, r, s) {
            if (void 0 === r) {
                r = $frameEnum.Frame.EBundleName.HOME;
            }
            if (void 0 === s) {
                s = 0;
            }
            if (-1 == n.keys.indexOf(t)) {
                this.popupQueue.enqueue({
                    name: t,
                    path: e,
                    param: i,
                    once: o,
                    bundleName: r,
                    delay: s
                });
                n.keys.push(t);
            }
        };
        e.prototype.update = function () {
            if (this.isOpening) {
                if ($popupManager.PopupManager.instance.has(this.curPopupName)) {
                    this.isOpening = !1;
                }
            } else if ("" != this.curPopupName) {
                if ($popupManager.PopupManager.instance.has(this.curPopupName)) {
                    //
                } else {
                    if (this.curPopupOption.once) {
                        //
                    } else {
                        n.keys.splice(n.keys.indexOf(this.curPopupName), 1);
                    }
                    this.curPopupName = "";
                    this.curPopupOption = null;
                }
            } else if (this.popupQueue.size() > 0) {
                var t = this.popupQueue.dequeue();
                this.curPopupName = t.name;
                this.curPopupOption = t;
                this.isOpening = !0;
                this.scheduleOnce(function () {
                    $popupManager.PopupManager.instance.show({
                        bundleName: t.bundleName,
                        path: t.path,
                        params: t.param,
                        keep: !0
                    });
                }, t.delay);
            }
        };
        e.keys = [];
        return (n = __decorate([u], e));
    })(cc.Component));
exports.default = p;
