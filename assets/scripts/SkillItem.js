var i;
var $cfg = require("./Cfg");
var $audioUtil = require("./AudioUtil");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $skillMgr = require("./SkillMgr");
var p = cc._decorator;
var h = p.ccclass;
var f = p.property;
var d = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.spIcon = null;
        e.lName = null;
        e.lDesc = null;
        e._cfgSkill = null;
        e._onClickComplete = null;
        return e;
    }
    __extends(e, t);
    e.prototype.updateData = function (t, e, n) {
        this._cfgSkill = $cfg.default.instance.dataSkill.getById(t);
        $resLoader.ResLoader.setSpritFrame(
            this.spIcon,
            $frameEnum.Frame.EBundleName.GAME,
            "textures/skill/" + this._cfgSkill.icon
        );
        this.lName.string = this._cfgSkill.name;
        this.lDesc.string = this._cfgSkill.info;
        this._onClickComplete = e;
        this.node.getComponent(cc.Button).interactable = !1;
        this.openAnim(n);
    };
    e.prototype.openAnim = function (t) {
        var e = this.node.getSiblingIndex();
        cc.tween(this.node)
            .delay(0.15 * e)
            .call(function () {
                $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_ChooseSkills");
            })
            .to(
                0.2,
                {
                    scale: 1,
                    opacity: 255
                },
                {
                    easing: "backOut"
                }
            )
            .call(function () {
                if (t) {
                    t();
                }
            })
            .start();
    };
    e.prototype.closeAnim = function (t, e) {
        this.node.getComponent(cc.Button).interactable = !1;
        if (t) {
            if (e) {
                e();
            }
        } else {
            cc.tween(this.node)
                .to(0.2, {
                    scale: 0.5,
                    opacity: 0
                })
                .call(function () {
                    if (e) {
                        e();
                    }
                })
                .start();
        }
    };
    e.prototype.onClickThis = function () {
        $skillMgr.SkillMgr.instance.selectSkill(this._cfgSkill.id);
        if (this._onClickComplete) {
            this._onClickComplete(this.node);
        }
    };
    __decorate([f(cc.Sprite)], e.prototype, "spIcon", void 0);
    __decorate([f(cc.Label)], e.prototype, "lName", void 0);
    __decorate([f(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([h], e);
})(cc.Component);
exports.default = d;
