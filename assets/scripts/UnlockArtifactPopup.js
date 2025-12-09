var i;
var $cfg = require("./Cfg");
var $eventManager = require("./EventManager");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $popupBase = require("./PopupBase");
var $homeEnum = require("./HomeEnum");
var h = cc._decorator;
var f = h.ccclass;
var d = h.property;
var m = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lName = null;
        e.lDesc = null;
        e.spIcon = null;
        e.nSkillView = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        var e = this;
        var n = $cfg.default.instance.dataSkill.getById(t.skillId);
        this.lName.string = n.name;
        this.lDesc.string = n.info;
        $resLoader.ResLoader.setSpritFrame(this.spIcon, $frameEnum.Frame.EBundleName.GAME, "textures/skill/" + n.icon);
        n.showReward.split("|").forEach(function (t, n) {
            var i = t.split("_").map(Number);
            var o = i[0];
            var r = i[1];
            var s = e.nSkillView.children[n];
            if (s) {
                var u = $cfg.default.instance.dataChoose.getById(r);
                $resLoader.ResLoader.setSpritFrame(
                    s.getChildByName("Quality").getComponent(cc.Sprite),
                    $frameEnum.Frame.EBundleName.RES,
                    "textures/atlas/quality/quality_skill_ex_" + u.rare
                );
                for (var p = [], h = /\|([^|]+)\|/g, f = void 0; null != (f = h.exec(u.info)); ) {
                    p.push(f[1]);
                }
                var d = u.info;
                p.forEach(function (t) {
                    var e = t.replace("%", "");
                    d = d.replace("|" + t + "|", t.includes("%") ? 100 * Number(u[e]) + "%" : "" + u[e]);
                });
                s.getChildByName("Desc").getComponent(cc.Label).string = d;
                if (0 == o) {
                    s.getChildByName("Lock").getChildByName("LockLv").getComponent(cc.Label).string = "";
                } else {
                    s.getChildByName("Lock").getChildByName("LockLv").getComponent(cc.Label).string =
                        "法器" + o + "级解锁";
                }
            }
        });
    };
    e.prototype.onHide = function () {
        $eventManager.EventManager.instance.emit($homeEnum.EHomeEvent.GOTO_PAGE, 3);
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    __decorate([d(cc.Label)], e.prototype, "lName", void 0);
    __decorate([d(cc.Label)], e.prototype, "lDesc", void 0);
    __decorate([d(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([d(cc.Node)], e.prototype, "nSkillView", void 0);
    return __decorate([f], e);
})($popupBase.PopupBase);
exports.default = m;
