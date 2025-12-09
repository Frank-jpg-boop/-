var i;
var $popupBase = require("./PopupBase");
var $globalPopupMgr = require("./GlobalPopupMgr");
var $battleMgr = require("./BattleMgr");
var $actorMgr = require("./ActorMgr");
var $levelBattleData = require("./LevelBattleData");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.sp = null;
        e.lDesc = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        if (0 == $levelBattleData.levelBattleData.rescue) {
            this.lDesc.string = "天台中没有幸存者";
        } else {
            this.lDesc.string = "天台还有" + $levelBattleData.levelBattleData.rescue + "名幸存者等你！\n是否独自撤离?";
        }
        var t = $battleMgr.default.instance.getCurScene();
        var e = cc.director
            .getScene()
            .getChildByName("Canvas")
            .getChildByName("PhotoGameCamera")
            .getComponent(cc.Camera);
        e.zoomRatio = 8;
        var n = t.level.playerExitPos;
        n.y += 50;
        e.node.setPosition(n);
        var i = new cc.RenderTexture();
        i.initWithSize(this.sp.node.width, this.sp.node.height, cc.RenderTexture.DepthStencilFormat.RB_FMT_S8);
        var o = new cc.SpriteFrame(i);
        this.sp.spriteFrame = o;
        e.targetTexture = i;
        e.node.active = !0;
    };
    e.prototype.onHide = function () {
        var t = cc.director
            .getScene()
            .getChildByName("Canvas")
            .getChildByName("PhotoGameCamera")
            .getComponent(cc.Camera);
        t.targetTexture = null;
        t.node.active = !1;
    };
    e.prototype.onClickBtnCancel = function () {
        $battleMgr.default.instance.getCurScene().resume();
        this.removeUI();
    };
    e.prototype.onClickBtnOk = function () {
        var t = $battleMgr.default.instance.getCurScene();
        if (t) {
            var e = $actorMgr.default.instance.getActor(t.playerId);
            if (!e || e.isDead()) {
                return void $globalPopupMgr.default.instance.showTips("玩家已死亡，无法撤离");
            }
            this.removeUI();
            $battleMgr.default.instance.getCurScene().scheduleWin();
        }
    };
    __decorate([f(cc.Sprite)], e.prototype, "sp", void 0);
    __decorate([f(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([h], e);
})($popupBase.PopupBase);
exports.default = d;
