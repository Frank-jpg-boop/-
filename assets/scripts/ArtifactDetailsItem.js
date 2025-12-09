var i;
var $cfg = require("./Cfg");
var $resLoader = require("./ResLoader");
var $frameEnum = require("./FrameEnum");
var $playerDataProxy = require("./PlayerDataProxy");
var u = cc._decorator;
var p = u.ccclass;
var h =
    (u.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._skillData = null;
            e._artifactData = null;
            return e;
        }
        __extends(e, t);
        e.prototype.ininArtifactDetailsItem = function (t, e) {
            this._skillData = t;
            this._artifactData = e;
            var n = $cfg.default.instance.dataChoose.getById(t.chooseId);
            var i = this.node.getChildByName("greadImg");
            var o = this.node.getChildByName("icon");
            var r = this.node.getChildByName("des");
            $resLoader.ResLoader.loadAsset({
                path: "textures/public/pic_wuping_di_" + n.rare,
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.HOME
            })
                .then(function (t) {
                    i.getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function (t) {
                    console.log("error:", t);
                });
            $resLoader.ResLoader.loadAsset({
                path: "textures/skill/" + this._artifactData.icon,
                type: cc.SpriteFrame,
                bundleName: $frameEnum.Frame.EBundleName.GAME
            })
                .then(function (t) {
                    o.getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function (t) {
                    console.log("error:", t);
                });
            r.getComponent(cc.Label).string = this.getEffectDes(n);
            return this.updateArtifactLv();
        };
        e.prototype.getEffectDes = function (t) {
            for (var e, n = [], i = /\|([^|]+)\|/g; null != (e = i.exec(t.info)); ) {
                n.push(e[1]);
            }
            var o = t.info;
            n.forEach(function (e) {
                var n = e.replace("%", "");
                o = o.replace("|" + e + "|", e.includes("%") ? 100 * Number(t[n]) + "%" : "" + t[n]);
            });
            return o;
        };
        e.prototype.updateArtifactLv = function () {
            if (!this._artifactData) {
                return !0;
            }
            var t = !1;
            var e = this.node.getChildByName("lockMask");
            if ($playerDataProxy.playerDataProxy.getArtifactLv(this._artifactData.id) >= this._skillData.unlockLv) {
                e.active = !1;
                t = !0;
            } else {
                e.active = !0;
                e.getChildByName("unlockTips").getComponent(cc.Label).string =
                    "等级" + this._skillData.unlockLv + "解锁";
            }
            return t;
        };
        e.prototype.getIsUnlock = function () {
            return $playerDataProxy.playerDataProxy.getArtifactLv(this._artifactData.id) >= this._skillData.unlockLv;
        };
        return __decorate([p], e);
    })(cc.Component));
exports.default = h;
