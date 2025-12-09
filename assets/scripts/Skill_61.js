var i;
exports.Skill_61 = void 0;
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $randomUtil = require("./RandomUtil");
var $util = require("./Util");
var $battleMgr = require("./BattleMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $battleEnum = require("./BattleEnum");
var $actorMgr = require("./ActorMgr");
var d = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.onInit = function () {
        $eventManager.EventManager.instance.on($battleEnum.EBattleEvent.IMP_KILL_ENEMY, this.onImpKillEnemy, this);
        t.prototype.onInit.call(this);
    };
    e.prototype.onUpdate = function (t) {
        if (this.skillCD > 0) {
            this.skillCD -= t;
            return void (this.skillCD <= 0 && (this.skillCD = 0));
        }
        if (this.checkSummon()) {
            this.summonImp();
        }
    };
    e.prototype.checkSummon = function () {
        return !this._owner.isDead() && !this._owner.isSlide;
    };
    e.prototype.summonImp = function () {
        var t = this;
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_LuXiangDai");
        this.enterCD();
        for (
            var e = this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_1).value,
                n = $battleMgr.default.instance.getCurScene(),
                i = function (e) {
                    var i = o._owner.pathPos;
                    if ("" != o._owner.pathLineId && !o._owner.isSlide) {
                        var r = n.level.path.getLine(o._owner.pathLineId);
                        if (0 != r.dir.x) {
                            var a = $randomUtil.RandomUtil.randomInt(-50, 50);
                            i.x += a;
                            if (i.x >= r.maxX) {
                                i.x = r.maxX - $randomUtil.RandomUtil.randomInt(0, 50);
                            }
                            if (i.x <= r.minX) {
                                i.x = r.minX + $randomUtil.RandomUtil.randomInt(0, 50);
                            }
                        }
                    }
                    $util.default.delay(
                        0.1 * e,
                        function () {
                            if (n && t) {
                                $actorMgr.default.instance.createActor({
                                    id: n.getCreateActorId(),
                                    cfgId: 1,
                                    camp: $actorEnum.ETeamType.PLAYER,
                                    parent: n.actorParent,
                                    prefabName: "Imp",
                                    initPos: i,
                                    actorClass: "Imp",
                                    onCreated: function (e) {
                                        if (t._owner.isDead()) {
                                            e.remove();
                                        }
                                    },
                                    initParam: {
                                        ownerSkill: t
                                    }
                                });
                            }
                        },
                        o
                    );
                },
                o = this,
                a = 0;
            a < e;
            a++
        ) {
            i(a);
        }
    };
    e.prototype.onImpKillEnemy = function (t) {
        var e = this;
        if (Math.random() < this.getAttribute($attrEnum.E_SkillAttrType.EXTRA_ATTR_7).value) {
            var n = $battleMgr.default.instance.getCurScene();
            $actorMgr.default.instance.createActor({
                id: n.getCreateActorId(),
                cfgId: 1,
                camp: $actorEnum.ETeamType.PLAYER,
                parent: n.actorParent,
                prefabName: "Imp",
                initPos: t,
                actorClass: "Imp",
                onCreated: function (t) {
                    if (e._owner.isDead()) {
                        t.remove();
                    }
                },
                initParam: {
                    ownerSkill: this
                }
            });
        }
    };
    e.prototype.onRemove = function () {
        $eventManager.EventManager.instance.off($battleEnum.EBattleEvent.IMP_KILL_ENEMY, this.onImpKillEnemy, this);
        t.prototype.onRemove.call(this);
    };
    return e;
})(require("./SkillBase").SkillBase);
exports.Skill_61 = d;
