var i;
var $mathUtil = require("./MathUtil");
var $battleMgr = require("./BattleMgr");
var $areaObject = require("./AreaObject");
var $gridAreaDivisionMgr = require("./GridAreaDivisionMgr");
var $unitMgr = require("./UnitMgr");
var f = cc._decorator;
var d = f.ccclass;
var m =
    (f.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._isInit = !1;
            e._isRemove = !1;
            e._unitId = 0;
            e._pathPointId = "";
            e._pathLineId = "";
            e._initParam = null;
            e._roomId = 0;
            return e;
        }
        __extends(e, t);
        Object.defineProperty(e.prototype, "pathPointId", {
            get: function () {
                return this._pathPointId;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "pathLineId", {
            get: function () {
                return this._pathLineId;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "roomId", {
            get: function () {
                return this._roomId;
            },
            enumerable: !1,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "unitId", {
            get: function () {
                return this._unitId;
            },
            enumerable: !1,
            configurable: !0
        });
        e.prototype.init = function (t, e, n, i) {
            for (var o = [], r = 4; r < arguments.length; r++) {
                o[r - 4] = arguments[r];
            }
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function () {
                    this._unitId = t;
                    this._initParam = i;
                    this._isRemove = !1;
                    this.updateUnifyPos();
                    this.initAreaObject(e, n);
                    this.onInit();
                    this._isInit = !0;
                    return [2, Promise.resolve()];
                });
            });
        };
        e.prototype.onInit = function () {};
        e.prototype.setPos = function (e, n) {
            if (void 0 === n) {
                n = !0;
            }
            t.prototype.setPos.call(this, e);
            if (n) {
                this.updatePathData();
            }
        };
        e.prototype.updateUnifyPos = function () {
            this._unifyPos = this.node.getPosition();
        };
        e.prototype.update = function (t) {
            var e = $battleMgr.default.instance.getCurScene();
            if (this._isInit && !this._isRemove && e && e.isInit && e.isPlay) {
                this.onUpdate(t);
            }
        };
        e.prototype.onUpdate = function () {};
        e.prototype.updatePathData = function (t) {
            if (void 0 === t) {
                t = !0;
            }
            for (
                var e = $mathUtil.MathUtil.vec2Fixed(this.node.getPosition()),
                    n = $battleMgr.default.instance.getCurScene().level.path;
                ;

            ) {
                var i = n.findPathPointByPos(e);
                if ("" != i) {
                    this._pathPointId = i;
                    this._pathLineId = "";
                    break;
                }
                var o = n.findPathLineByPos(e);
                if ("" != o) {
                    this._pathLineId = o;
                    this._pathPointId = "";
                }
                break;
            }
            if (t) {
                this.updateRoomId();
            }
        };
        e.prototype.updateRoomId = function (t) {
            if (t) {
                this._roomId = t;
            } else {
                var e = $battleMgr.default.instance.getCurScene().level.path;
                if ("" != this._pathPointId) {
                    this._roomId = e.getPoint(this._pathPointId).roomId;
                }
                if ("" != this._pathLineId) {
                    this._roomId = e.getLine(this._pathLineId).roomId;
                }
            }
        };
        e.prototype.remove = function () {
            if (this._isRemove) {
                //
            } else {
                this._isRemove = !0;
                this.onRemove();
                this.node.destroy();
            }
        };
        e.prototype.onRemove = function () {
            var t = this;
            this._areaKeys.forEach(function (e) {
                $gridAreaDivisionMgr.default.instance.removeAreaObject(t, e);
            });
            this._areaKeys = [];
            $unitMgr.UnitMgr.instance.removeUnit(this._unitId);
        };
        return __decorate([d], e);
    })($areaObject.default));
exports.default = m;
