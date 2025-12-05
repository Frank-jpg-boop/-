var i;
var $cfg = require("./Cfg");
var $list = require("./List");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.mMyList = null;
        e.mStageName = null;
        e.mSelectBg = null;
        e.mBtnShed = null;
        e.mBtnEnemy = null;
        e._stage = 0;
        e._dropTips = [];
        e._isDropTips = !0;
        e._enemyDatas = [];
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this._stage = t.stage;
    };
    e.prototype.onShow = function () {
        var t = $cfg.default.instance.dataStage.getById(this._stage);
        this.mStageName.string = "" + t.name;
        this.setList();
    };
    e.prototype.setList = function () {
        var t = $cfg.default.instance.dataStage.getById(this._stage);
        if (this._isDropTips) {
            this._dropTips = t.dropTip.split("|").map(Number);
            this.mMyList.numItems = this._dropTips.length;
        } else {
            this._enemyDatas = [];
            this._enemyDatas = t.monsterTip.split("|").map(Number);
            this.mMyList.numItems = this._enemyDatas.length;
        }
    };
    e.prototype.onUpdateItem = function (t, e) {
        var n = t.getChildByName("greadImg");
        var i = t.getChildByName("icon");
        var o = t.getChildByName("des");
        var r = t.getChildByName("name");
        if (this._isDropTips) {
            var s = this._dropTips[e];
            var u = $cfg.default.instance.dataReward.getById(s);
            if (!u) {
                return void console.log("配置有问题:", s);
            }
            $resLoader.ResLoader.loadAsset({
                path: "textures/public/pic_wuping_di_" + u.rare,
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.HOME
            })
                .then(function (t) {
                    n.getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function (t) {
                    console.log("error:", t);
                });
            $resLoader.ResLoader.loadAsset({
                path: "textures/atlas/item_scene/" + u.spr,
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.RES
            })
                .then(function (t) {
                    i.getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function (t) {
                    console.log("error:", t);
                });
            o.getComponent(cc.Label).string = u.info.replace("|val|", u.changeID.toString());
            r.getComponent(cc.Label).string = u.name;
        } else {
            var p = this._enemyDatas[e];
            var h = $cfg.default.instance.dataEnemy.getById(p);
            o.getComponent(cc.Label).string = h.info;
            r.getComponent(cc.Label).string = h.name;
            $resLoader.ResLoader.loadAsset({
                path: "textures/public/pic_wuping_di_" + (h.isBoss + 2),
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.HOME
            })
                .then(function (t) {
                    n.getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function (t) {
                    console.log("error:", t);
                });
            $resLoader.ResLoader.loadAsset({
                path: "textures/enemy_head/" + h.UIFace,
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.GAME
            })
                .then(function (t) {
                    i.getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function (t) {
                    console.log("error:", t);
                });
        }
    };
    e.prototype.onBtnShed = function (t) {
        if (this._isDropTips) {
            //
        } else {
            this.mSelectBg.x = t.target.x;
            this.mBtnShed.getChildByName("lab").color = cc.color(255, 255, 255);
            this.mBtnEnemy.getChildByName("lab").color = new cc.Color().fromHEX("#959C7B");
            this._isDropTips = !0;
            this.setList();
        }
    };
    e.prototype.onBtnEnemy = function (t) {
        if (this._isDropTips) {
            this.mSelectBg.x = t.target.x;
            this.mBtnEnemy.getChildByName("lab").color = cc.color(255, 255, 255);
            this.mBtnShed.getChildByName("lab").color = new cc.Color().fromHEX("#959C7B");
            this._isDropTips = !1;
            this.setList();
        }
    };
    __decorate([f($list.default)], e.prototype, "mMyList", void 0);
    __decorate([f(cc.Label)], e.prototype, "mStageName", void 0);
    __decorate([f(cc.Node)], e.prototype, "mSelectBg", void 0);
    __decorate([f(cc.Node)], e.prototype, "mBtnShed", void 0);
    __decorate([f(cc.Node)], e.prototype, "mBtnEnemy", void 0);
    return __decorate([h], e);
})($popupBase.PopupBase);
exports.default = d;
