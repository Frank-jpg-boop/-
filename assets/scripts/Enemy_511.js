var i;
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $enemyBase = require("./EnemyBase");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isAttackSkill = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.playAnimAttack = function (t, e) {
            var n = this;
            this._isAttackSkill = Math.random() < Number(this._cfg.val1);
            this._spCtrl.playAnim(
                this._isAttackSkill ? "skill" : "atk",
                1,
                !1,
                function () {
                    n._attackCD = n._cfg.arkWait;
                    n._isAttackSkill = !1;
                    if (e) {
                        e();
                    }
                },
                function () {
                    if (t) {
                        t();
                    }
                }
            );
        };
        e.prototype.getHurt = function () {
            var t = this.getAttribute($attrEnum.E_AttrType.ATK).value;
            var e = Math.random() < this.getAttribute($attrEnum.E_AttrType.CRIT_RATE).value;
            if (e) {
                t *= this.getAttribute($attrEnum.E_AttrType.CRIT_HURT).value;
            }
            if (this._isAttackSkill) {
                t *= Number(this._cfg.val2);
            }
            return {
                damage: (t = Math.floor(t)),
                isCrit: e,
                attacker: this,
                hurtSource: $battleEnum.EHurtSourceType.COMMON_ATTACK,
                isNotInvincible: this._isAttackSkill
            };
        };
        return __decorate([u], e);
    })($enemyBase.default));
exports.default = p;
