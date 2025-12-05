var i;
var $mathUtil = require("./MathUtil");
var $battleUtil = require("./BattleUtil");
var c = cc._decorator;
var l = c.ccclass;
var u = c.property;
var p = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.gameCamera = null;
        e.uiCamera = null;
        e.cameraMoveSpeed = 0.03;
        e.curPos = new cc.Vec2();
        e.targetPos = new cc.Vec2();
        e._targetOffsetPos = new cc.Vec2();
        e.nTarget = null;
        e.nVisibleRegion = null;
        e.cameraMaxX = 0;
        e.cameraMinX = 0;
        e.cameraMaxY = 0;
        e.cameraMinY = 0;
        e.minGameCameraZoom = 0.6;
        e.maxGameCameraZoom = 1.5;
        e._isLookAting = !1;
        e._isInit = !1;
        e._touchMoved = !1;
        e._isShaking = !1;
        return e;
    }
    __extends(e, t);
    e.prototype.onLoad = function () {
        this._isInit = !1;
    };
    e.prototype.setVisibleRegion = function (t) {
        this.nVisibleRegion = t;
        this.updateBorder();
    };
    e.prototype.setFollowTarget = function (t, e) {
        if (void 0 === e) {
            e = cc.v2();
        }
        this.nTarget = t;
        this._targetOffsetPos = e;
    };
    e.prototype.isFollowTarget = function (t) {
        return this.nTarget == t;
    };
    e.prototype.initData = function (t) {
        this.gameCamera.getComponent(cc.Widget).updateAlignment();
        var e = this.node.convertToNodeSpaceAR(t);
        if (e.x < this.cameraMinX) {
            e.x = this.cameraMinX;
        }
        if (e.x > this.cameraMaxX) {
            e.x = this.cameraMaxX;
        }
        if (e.y < this.cameraMinY) {
            e.y = this.cameraMinY;
        }
        if (e.y > this.cameraMaxY) {
            e.y = this.cameraMaxY;
        }
        this.curPos = e;
        this.targetPos = this.curPos;
        this.gameCamera.node.setPosition(this.targetPos);
        this._isInit = !0;
    };
    e.prototype.onDestroy = function () {};
    e.prototype.update = function () {
        var t = this;
        if (t._isInit && !this._isLookAting && !this._isShaking) {
            if (this.nTarget && cc.isValid(this.nTarget) && cc.isValid(this.nTarget.parent)) {
                var e = t.nTarget.parent.convertToWorldSpaceAR(t.nTarget.getPosition());
                var n = t.gameCamera.node.parent.convertToNodeSpaceAR(e);
                n.addSelf(t._targetOffsetPos);
                this.setPos(n);
            }
            t.curPos = new cc.Vec2(
                $mathUtil.MathUtil.lerp(t.curPos.x, t.targetPos.x, t.cameraMoveSpeed),
                $mathUtil.MathUtil.lerp(t.curPos.y, t.targetPos.y, t.cameraMoveSpeed)
            );
            if (Math.abs(t.curPos.x - t.targetPos.x) <= 0.01 && Math.abs(t.curPos.y - t.targetPos.y) <= 0.01) {
                t.curPos.x = t.targetPos.x;
                t.curPos.y = t.targetPos.y;
            }
            t.gameCamera.node.setPosition(t.curPos);
        }
    };
    e.prototype.setPos = function (t) {
        if (this._isInit) {
            if (t.x < this.cameraMinX) {
                t.x = this.cameraMinX;
            }
            if (t.x > this.cameraMaxX) {
                t.x = this.cameraMaxX;
            }
            if (t.y < this.cameraMinY) {
                t.y = this.cameraMinY;
            }
            if (t.y > this.cameraMaxY) {
                t.y = this.cameraMaxY;
            }
            this.targetPos = t;
        }
    };
    e.prototype.lookAtPos = function (t, e, n, i) {
        var o = this;
        if (void 0 === i) {
            i = !0;
        }
        if (this._isInit) {
            var r = this.gameCamera.node.parent.convertToNodeSpaceAR(cc.v2(t.x, t.y));
            if (r.x < this.cameraMinX) {
                r.x = this.cameraMinX;
            }
            if (r.x > this.cameraMaxX) {
                r.x = this.cameraMaxX;
            }
            if (r.y < this.cameraMinY) {
                r.y = this.cameraMinY;
            }
            if (r.y > this.cameraMaxY) {
                r.y = this.cameraMaxY;
            }
            if (cc.Vec2.distance(r, this.curPos) < 10) {
                if (n) {
                    n();
                }
            } else {
                this._isLookAting = !0;
                this.targetPos = r;
                this.curPos = r;
                cc.tween(this.gameCamera.node)
                    .to(
                        e,
                        {
                            position: cc.v3(r.x, r.y, 0)
                        },
                        {
                            easing: "sineOut"
                        }
                    )
                    .call(function () {
                        if (i) {
                            o._isLookAting = !1;
                        }
                        if (n) {
                            n();
                        }
                    })
                    .start();
            }
        }
    };
    e.prototype.shakeCamera = function (t) {
        var e = this;
        if (!this._isShaking) {
            this._isShaking = !0;
            cc.Tween.stopAllByTarget(this.gameCamera.node);
            var n = this.gameCamera.node.getPosition();
            var i = $battleUtil.BattleUtil.randomRangeInt(3, 6);
            var o = $battleUtil.BattleUtil.randomRangeInt(4, 8);
            var r = n.x + i;
            var a = n.y + o;
            cc.tween(this.gameCamera.node)
                .to(
                    t,
                    {
                        x: r,
                        y: a
                    },
                    {
                        easing: "bounceOut"
                    }
                )
                .call(function () {
                    e.gameCamera.node.x = n.x;
                    e.gameCamera.node.y = n.y;
                    e._isShaking = !1;
                })
                .start();
        }
    };
    e.prototype.tweenChangeRatio = function (t, e, n) {
        cc.tween(this.gameCamera)
            .to(
                e,
                {
                    zoomRatio: t
                },
                {
                    easing: "sineOut"
                }
            )
            .call(function () {
                if (n) {
                    n();
                }
            })
            .start();
    };
    e.prototype.setLookAtState = function (t) {
        this._isLookAting = t;
    };
    e.prototype.changeMapScale = function (t) {
        var e = this.minGameCameraZoom + (this.maxGameCameraZoom - this.minGameCameraZoom) * t;
        this.gameCamera.zoomRatio = e;
        this.updateBorder();
        this.setPos(this.targetPos);
    };
    e.prototype.updateBorder = function () {
        var t = this;
        var e = t.gameCamera.zoomRatio;
        t.cameraMinX =
            (-t.nVisibleRegion.width / 2) * t.nVisibleRegion.scaleX + (t.gameCamera.node.width / 2) * (1 / e);
        t.cameraMinY =
            (-t.nVisibleRegion.height / 2) * t.nVisibleRegion.scaleY + (t.gameCamera.node.height / 2) * (1 / e);
        t.cameraMaxX = (t.nVisibleRegion.width / 2) * t.nVisibleRegion.scaleX - (t.gameCamera.node.width / 2) * (1 / e);
        t.cameraMaxY =
            (t.nVisibleRegion.height / 2) * t.nVisibleRegion.scaleY - (t.gameCamera.node.height / 2) * (1 / e);
    };
    e.prototype.uiWorldPosToGameWorldPos = function (t) {
        var e = this.uiCamera.getWorldToScreenPoint(t);
        var n = this.gameCamera.getScreenToWorldPoint(e);
        return cc.v2(n);
    };
    e.prototype.gameWorldPosToUiWorldPos = function (t) {
        var e = this.gameCamera.getWorldToScreenPoint(t);
        var n = this.uiCamera.getScreenToWorldPoint(e);
        return cc.v2(n);
    };
    __decorate([u(cc.Camera)], e.prototype, "gameCamera", void 0);
    __decorate([u(cc.Camera)], e.prototype, "uiCamera", void 0);
    __decorate(
        [
            u({
                type: cc.Float,
                tooltip: "摄像机平滑参数"
            })
        ],
        e.prototype,
        "cameraMoveSpeed",
        void 0
    );
    return __decorate([l], e);
})(cc.Component);
exports.default = p;
