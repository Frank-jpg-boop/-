var i;
var $randomUtil = require("./RandomUtil");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $simplyCollisionDetector = require("./SimplyCollisionDetector");
var $simplyVec2 = require("./SimplyVec2");
var $bulletBase = require("./BulletBase");
var p = cc._decorator;
var h = p.ccclass;
var f =
    (p.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._bulletType = 0;
            e._onRemoveFunc = null;
            e._groundY = 0;
            e._hurt = null;
            e._isOpenKeepMove = !1;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.onShoot = function (t, e) {
            var n = this;
            this._hurt = this._owner.getHurt();
            this._isOpenKeepMove = !1;
            this._bulletType = e.bulletType;
            this._onRemoveFunc = e.onRemove;
            var i = this.node.getPosition();
            var o = t.sub(i).len();
            if (o < 30) {
                this.checkCollision();
                return void this.remove();
            }
            switch (e.bulletType) {
                case 2:
                    var r = e.time ? e.time : o / this.owner.cfg.edgeSpe;
                    this.tweenTo(i, t, r, !0, null);
                    break;
                case 3:
                    this._groundY = e.groundY;
                    r = e.time ? e.time : o / this.owner.cfg.edgeSpe;
                    var s = i,
                        c = i.add(t).mul(0.5),
                        l = Math.max(t.y, i.y),
                        u = cc.v2(
                            c.x - this._owner.dirX * $randomUtil.RandomUtil.randomInt(0, 50),
                            l + $randomUtil.RandomUtil.randomInt(100, 200)
                        );
                    this.bezierTo(
                        s,
                        u,
                        t,
                        r,
                        !0,
                        function () {
                            n.checkCollision();
                            if (n._isRemove || null == e.groundY) {
                                //
                            } else {
                                n._isOpenKeepMove = !0;
                            }
                        },
                        "",
                        null,
                        null == e.groundY
                    );
            }
        };
        e.prototype.onUpdate = function (t) {
            if (2 == this._bulletType) {
                this.checkCollision();
            }
            if (this._isOpenKeepMove) {
                this.keepMove(t);
            }
        };
        e.prototype.keepMove = function (t) {
            var e = (this.node.angle * Math.PI) / 180;
            var n = cc.v2(Math.cos(e), Math.sin(e));
            if (n.y >= 0 || this.node.y <= this._groundY) {
                this.remove();
            } else {
                var i = n.mul(2 * this.owner.cfg.edgeSpe * t);
                var o = this.node.getPosition().add(i);
                this.node.setPosition(o);
                if (o.y <= this._groundY) {
                    this.remove();
                }
            }
        };
        e.prototype.checkCollision = function () {
            for (
                var t = this.node.getPosition(),
                    e = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(t.x, t.y),
                    n = $gridAreaDivisionMgr.default.instance.getAreaObjectList(
                        e.key,
                        $gridAreaDivisionMgr.E_AreaObjectType.PLAYER
                    ),
                    i = this.node.convertToWorldSpaceAR(cc.v2()),
                    o = 0;
                o < n.length;
                o++
            ) {
                var r = n[o];
                if (
                    !r.isDead() &&
                    $simplyCollisionDetector.default.isCollisionPointToRect(
                        new $simplyVec2.default(i.x, i.y),
                        r.hurtColliderRect
                    )
                ) {
                    r.beHurt(this._hurt);
                    this.remove();
                    break;
                }
            }
        };
        e.prototype.onRemove = function () {
            if (this._onRemoveFunc) {
                this._onRemoveFunc(this.node.getPosition());
            }
            t.prototype.onRemove.call(this);
        };
        return __decorate([h], e);
    })($bulletBase.default));
exports.default = f;
