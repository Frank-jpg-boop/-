var i;
var $cfg = require("./Cfg");
var $flyItemAnimCtrl = require("./FlyItemAnimCtrl");
var $eventManager = require("./EventManager");
var $popupBase = require("./PopupBase");
var $nodeUtil = require("./NodeUtil");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $commonIconItem = require("./CommonIconItem");
var m = cc._decorator;
var y = m.ccclass;
var _ = m.property;
var g = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.nRewardView = null;
        e.pCommonItemIcon = null;
        e.nBtnClose = null;
        e._rewardDatas = [];
        e._onClose = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._rewardDatas = t.rewards;
        this._onClose = t.onClose;
    };
    e.prototype.onShow = function () {
        this.nBtnClose.active = !1;
        this.updateReward(this._rewardDatas);
    };
    e.prototype.updateReward = function (t) {
        return __awaiter(this, void 0, Promise, function () {
            var e;
            var n;
            var i;
            var o;
            var r;
            var a;
            return __generator(this, function (s) {
                switch (s.label) {
                    case 0:
                        for (
                            e = t.length > 4 ? 668 : 152 * t.length + 20 * (t.length - 1),
                                this.nRewardView.width = e,
                                n = t.length - this.nRewardView.childrenCount;
                            n > 0;

                        ) {
                            o = cc.instantiate(this.pCommonItemIcon);
                            this.nRewardView.addChild(o);
                            o.active = !1;
                            n--;
                        }
                        i = 0;
                        s.label = 1;
                    case 1:
                        if (i < this.nRewardView.childrenCount) {
                            return (
                                ((o = this.nRewardView.children[i]).active = i < t.length),
                                o.active
                                    ? ((r = t[i]),
                                      (a = o.getComponent($commonIconItem.default)).updateData({
                                          itemId: r.itemId,
                                          itemNum: r.itemNum
                                      }),
                                      [4, a.playShowAnim()])
                                    : [3, 3]
                            );
                        } else {
                            return [3, 4];
                        }
                    case 2:
                        s.sent();
                        this.nRewardView.getComponent(cc.Layout).updateLayout();
                        if (this.nRewardView.height > this.nRewardView.parent.height) {
                            this.nRewardView.parent.parent.getComponent(cc.ScrollView).scrollToBottom(0.2);
                        }
                        s.label = 3;
                    case 3:
                        ++i;
                        return [3, 1];
                    case 4:
                        this.nBtnClose.active = !0;
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    e.prototype.onHide = function () {
        if (this._onClose) {
            this._onClose();
        }
    };
    e.prototype.onClickBtnClose = function () {
        var t = this;
        this._rewardDatas.forEach(function (e) {
            var n = Math.floor(Number(e.itemNum));
            n = Math.min(n, 20);
            var i = {
                itemId: e.itemId,
                itemNum: n,
                layerType: 1,
                isTop: !0,
                startWorldPos: $nodeUtil.default.nodeWorldPos(t.node),
                onComplete: null
            };
            $eventManager.EventManager.instance.emit($flyItemAnimCtrl.EFlyItemAnimEvent.FLY_ITEM_ANIM, i);
        });
        var e = [];
        this._rewardDatas.forEach(function (t) {
            if (111 == $cfg.default.instance.dataItem.getById(t.itemId).type) {
                e.push(t.itemId);
            }
        });
        if (e.length > 0) {
            $globalPopupMgr.default.instance.showUnlockRemainsPopup(e);
        }
        this.removeUI();
    };
    __decorate([_(cc.Node)], e.prototype, "nRewardView", void 0);
    __decorate([_(cc.Prefab)], e.prototype, "pCommonItemIcon", void 0);
    __decorate([_(cc.Node)], e.prototype, "nBtnClose", void 0);
    return __decorate([y], e);
})($popupBase.PopupBase);
exports.default = g;
