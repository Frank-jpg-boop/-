var i;
exports.PlayerWalkState = void 0;
var $audioUtil = require("./AudioUtil");
var $eventManager = require("./EventManager");
var $mathUtil = require("./MathUtil");
var $frameEnum = require("./FrameEnum");
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var y = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._isPlayLadderAudio = !1;
        n._stateType = $actorEnum.EActorStateType.WALK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._isPlayLadderAudio = !1;
        $eventManager.EventManager.instance.on(
            $actorEnum.EActorEvent.SPEED_CHANGE + this._context.unitId,
            this.onSpeedChange,
            this
        );
        this.playAnim();
        $audioUtil.AudioUtil.playEffect("sounds/lmtw_yx_Footsteps", $frameEnum.Frame.EBundleName.RES, !0);
    };
    e.prototype.playAnim = function () {
        var t =
            this._context.getAttribute($attrEnum.E_AttrType.SPEED).value /
            this._context.getAttribute($attrEnum.E_AttrType.SPEED).baseValue;
        t = Math.min(t, 2);
        this._context.spAnimCtrl.playAnim("run", t, !0);
    };
    e.prototype.onSpeedChange = function () {
        this.playAnim();
    };
    e.prototype.update = function (t) {
        if (this._context.moveDir && !this._context.isSlide) {
            var e = $mathUtil.MathUtil.vec2Fixed(this._context.node.getPosition());
            var n = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
            var i = $mathUtil.MathUtil.vec2Fixed(this._context.moveDir.mul(n * t));
            var o = e.add(i);
            if (1 == Math.abs(this._context.moveDir.x)) {
                this._isPlayLadderAudio = !1;
                $audioUtil.AudioUtil.stopEffect("lmtw_yx_ClimbUpLadder");
                if ("" != this._context.moveTargetPointId) {
                    var u = $battleMgr.default.instance
                        .getCurScene()
                        .level.path.getPoint(this._context.moveTargetPointId);
                    o.y = u.pos.y;
                }
            } else {
                if (
                    1 == Math.abs(this._context.moveDir.y) &&
                    (this._isPlayLadderAudio ||
                        ((this._isPlayLadderAudio = !0),
                        $audioUtil.AudioUtil.playEffect(
                            "sounds/lmtw_yx_ClimbUpLadder",
                            $frameEnum.Frame.EBundleName.RES,
                            !0
                        )),
                    "" != this._context.moveTargetPointId)
                ) {
                    u = $battleMgr.default.instance.getCurScene().level.path.getPoint(this._context.moveTargetPointId);
                    o.x = u.pos.x;
                }
            }
            if (
                "" != this._context.moveTargetPointId &&
                (u = $battleMgr.default.instance.getCurScene().level.path.getPoint(this._context.moveTargetPointId))
            ) {
                var p = $battleMgr.default.instance.getCurScene().level.getRoomById(u.roomId);
                if (p && p.isUnlock && !p.isOpenLight && u.pos.sub(e).magSqr() <= 22500) {
                    p.openLight();
                }
            }
            if (this.checkDoorWallCollision(o)) {
                return;
            }
            $eventManager.EventManager.instance.emit(
                $actorEnum.EPlayerEvent.PLAYER_MOVE,
                Math.abs(o.x - e.x) + Math.abs(o.y - e.y)
            );
            this._context.setPos(o, !0);
            if (o.x != e.x) {
                this._context.setDirX(o.x > e.x);
            }
        }
    };
    e.prototype.checkDoorWallCollision = function (t) {
        var e = this._context.getTempCollisionIds($gridAreaDivisionMgr.E_AreaObjectType.DOOR);
        if (e.length <= 0) {
            return !1;
        }
        for (var n = this._context.node.parent.convertToWorldSpaceAR(t), i = 0, o = e; i < o.length; i++) {
            var r = o[i];
            var a = $unitMgr.UnitMgr.instance.getUnit(r);
            if (a && a.state == $door.EDoorState.CLOSE && a.checkWallCollision(n)) {
                return !0;
            }
        }
        return !1;
    };
    e.prototype.end = function () {
        $eventManager.EventManager.instance.off(
            $actorEnum.EActorEvent.SPEED_CHANGE + this._context.unitId,
            this.onSpeedChange,
            this
        );
        $audioUtil.AudioUtil.stopEffect("lmtw_yx_ClimbUpLadder");
        $audioUtil.AudioUtil.stopEffect("lmtw_yx_Footsteps");
        this._isPlayLadderAudio = !1;
    };
    return e;
})($state.State);
exports.PlayerWalkState = y;
