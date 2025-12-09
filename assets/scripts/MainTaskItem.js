var i;
var $cfg = require("./Cfg");
var $flyItemAnimCtrl = require("./FlyItemAnimCtrl");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $nodeUtil = require("./NodeUtil");
var $itemDataProxy = require("./ItemDataProxy");
var $taskDataProxy = require("./TaskDataProxy");
var $homeEnum = require("./HomeEnum");
var m = cc._decorator;
var y = m.ccclass;
var _ = m.property;
var g = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lDesc = null;
        e.nComplete = null;
        e.nReward = null;
        e.nView = null;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        $eventManager.EventManager.instance.on($taskDataProxy.ETaskEvent.UPDATE_MAIN_TASK, this.updateView, this);
        this.updateView();
    };
    e.prototype.start = function () {};
    e.prototype.onDestroy = function () {
        $eventManager.EventManager.instance.off($taskDataProxy.ETaskEvent.UPDATE_MAIN_TASK, this.updateView, this);
    };
    e.prototype.onEnable = function () {
        if (this.nView.active) {
            this.nView.x = -160;
            cc.tween(this.nView)
                .to(
                    0.3,
                    {
                        x: 145
                    },
                    {
                        easing: "sineIn"
                    }
                )
                .start();
        }
    };
    e.prototype.updateView = function () {
        if ($taskDataProxy.taskDataProxy.isCompleteMainTask) {
            this.nView.active = !1;
        } else {
            this.nView.active = !0;
            var t = $taskDataProxy.taskDataProxy.curMainTaskData;
            var e = $cfg.default.instance.dataTask.getById(t.curTaskId);
            var n = t.curTaskCount;
            var i = t.curTaskMaxCount;
            var o =
                "<b><outline  color = black width = 2>" +
                e.des +
                "\n(<color = " +
                (n >= i ? "#00ff00" : "#ff0000") +
                ">" +
                Math.min(n, i) +
                "</c>/" +
                i +
                ")</outline></b>";
            this.lDesc.string = o;
            this.nComplete.active = n >= i;
            var r = e.reward.split("_").map(Number);
            var s = r[0];
            var c = r[1];
            this.nReward.getChildByName("Num").getComponent(cc.Label).string = c.toString();
            $resLoader.ResLoader.setSpritFrame(
                this.nReward.getChildByName("Icon").getComponent(cc.Sprite),
                $frameEnum.Frame.EBundleName.RES,
                $itemDataProxy.itemDataProxy.getItemIconPath(s)
            );
        }
    };
    e.prototype.onClickBtnThis = function () {
        var t = this;
        var e = $taskDataProxy.taskDataProxy.curMainTaskData;
        if (e.curTaskCount >= e.curTaskMaxCount) {
            $taskDataProxy.taskDataProxy.getMainTaskReward(function (e) {
                e.forEach(function (e) {
                    var n = Math.floor(Number(e.itemNum));
                    n = Math.min(n, 20);
                    var i = {
                        itemId: e.itemId,
                        itemNum: n,
                        layerType: 1,
                        isTop: !0,
                        startWorldPos: $nodeUtil.default.nodeWorldPos(t.nReward.getChildByName("Icon")),
                        onComplete: null
                    };
                    $eventManager.EventManager.instance.emit($flyItemAnimCtrl.EFlyItemAnimEvent.FLY_ITEM_ANIM, i);
                });
            });
        } else {
            var n = $cfg.default.instance.dataTask.getById(e.curTaskId);
            if (1 == n.goto) {
                $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 2);
            } else {
                if (2 == n.goto) {
                    $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 3);
                } else {
                    if (3 == n.goto) {
                        $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 1);
                    } else {
                        4 == n.goto && $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 0);
                    }
                }
            }
        }
    };
    __decorate([_(cc.RichText)], e.prototype, "lDesc", void 0);
    __decorate([_(cc.Node)], e.prototype, "nComplete", void 0);
    __decorate([_(cc.Node)], e.prototype, "nReward", void 0);
    __decorate([_(cc.Node)], e.prototype, "nView", void 0);
    return __decorate([y], e);
})(cc.Component);
exports.default = g;
