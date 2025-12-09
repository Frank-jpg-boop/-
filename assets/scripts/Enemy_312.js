var i;
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $enemyBase = require("./EnemyBase");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isTurnHead = !1;
            return e;
        }
        __extends(e, t);
        e.prototype.onInit = function () {
            this._isTurnHead = !1;
            t.prototype.onInit.call(this);
        };
        e.prototype.playAnimSkill = function (t) {
            var e = this;
            this._spCtrl.playAnim("diaotou", 1, !1, function () {
                e.turnHead();
                if (t) {
                    t();
                }
            });
        };
        e.prototype.turnHead = function () {
            this._isTurnHead = !0;
            this._standAnimName = "stand_diaotou";
            this._atkAnimName = "atk_diaotou";
            this._moveAnimName = "move_diaotou";
            this.getAttribute($attrEnum.E_AttrType.SPEED).changeAddValue(Number(this._cfg.val2));
        };
        e.prototype.onBeHurt = function (e) {
            t.prototype.onBeHurt.call(this, e);
            if (!(this._hp <= 0)) {
                var n = this.getAttribute($attrEnum.E_AttrType.HP).value;
                if (!this._isTurnHead && this._hp / n <= Number(this._cfg.val1)) {
                    this.changeState($actorEnum.EActorStateType.SKILL);
                }
            }
        };
        return __decorate([u], e);
    })($enemyBase.default));
exports.default = p;
