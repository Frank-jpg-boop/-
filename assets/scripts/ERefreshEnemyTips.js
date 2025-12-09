var i;
var $randomUtil = require("./RandomUtil");
var $battleMgr = require("./BattleMgr");
var $frameAnimEffect = require("./FrameAnimEffect");
var l = cc._decorator;
var u = l.ccclass;
var p =
    (l.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._owner = null;
            e._refreshPos = null;
            return e;
        }
        __extends(e, t);
        e.prototype.play = function (t, e) {
            this._owner = t;
            this._refreshPos = e.add(cc.v2(0, 50));
            var n = $battleMgr.default.instance.getCurScene();
            if (n) {
                var i = n.effectParent.convertToWorldSpaceAR(this._refreshPos);
                var o = n.cameraCtrl.gameWorldPosToUiWorldPos(i);
                var r = this.node.parent.convertToNodeSpaceAR(o);
                var c = n.cameraCtrl.gameWorldPosToUiWorldPos(this._owner.node.convertToWorldSpaceAR(cc.v2(0, 50)));
                var l = this.node.parent.convertToNodeSpaceAR(c);
                var u = r.sub(l).normalize();
                var p = l.add(u.mul($randomUtil.RandomUtil.randomInt(300, 330)));
                this.node.setPosition(p);
            }
            this.playOnceAllAnim(null, !0);
        };
        e.prototype.onUpdate = function () {};
        return __decorate([u], e);
    })($frameAnimEffect.default));
exports.default = p;
