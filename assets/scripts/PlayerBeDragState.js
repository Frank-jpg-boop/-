var i;
exports.PlayerBeDragState = void 0;
var $animUtils = require("./AnimUtils");
var $state = require("./State");
var $effectMgr = require("./EffectMgr");
var $frameAnimEffect = require("./FrameAnimEffect");
var $actorEnum = require("./ActorEnum");
var u = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._dragCount = 0;
        n._effect = null;
        n._targetPos = cc.v2();
        n._stateType = $actorEnum.EActorStateType.EXTEND_1;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t, e) {
        var n = this;
        this._targetPos = t;
        this._dragCount = e;
        cc.Tween.stopAllByTarget(this._context.node);
        this._context.fixedZIndex = cc.macro.MIN_ZINDEX;
        cc.tween(this._context.node)
            .to(
                0.15,
                {
                    x: t.x,
                    y: t.y
                },
                {
                    easing: "sineIn"
                }
            )
            .call(function () {
                n._context.setPos(t);
                n._context.updatePathData();
                $animUtils.AnimUtil.swingLRAnimDuration(n._context.node.getChildByName("Body"), 4, 0.1, 0.2);
            })
            .start();
        this._context.spAnimCtrl.playAnim("bide", 1, !0);
        $effectMgr.default.instance.createEffect({
            parent: this._context.node,
            prefabName: "EBeDrag",
            initPos: cc.v2(0, this._context.rightHeight + 30),
            effectClass: $frameAnimEffect.default,
            onCreated: function (t) {
                if (n._context.curState == $actorEnum.EActorStateType.EXTEND_1) {
                    t.playOnceAllAnim(null, !1);
                    n._effect = t;
                } else {
                    t.remove();
                }
            }
        });
    };
    e.prototype.subDrag = function () {
        this._dragCount--;
        if (this._dragCount <= 0) {
            this._context.changeState($actorEnum.EActorStateType.IDLE);
        }
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {
        var t = this._context.node.getChildByName("Body");
        cc.Tween.stopAllByTarget(t);
        t.x = 0;
        if (this._effect) {
            this._effect.remove();
            this._effect = null;
        }
        this._context.fixedZIndex = 0;
        this._context.setPos(this._targetPos);
        this._context.updatePathData();
    };
    return e;
})($state.State);
exports.PlayerBeDragState = u;
