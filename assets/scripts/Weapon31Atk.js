var i;
var $spAnimEffect = require("./SpAnimEffect");
var s = cc._decorator;
var c = s.ccclass;
var l =
    (s.property,
    (function (t) {
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._onEvent = null;
            return e;
        }
        __extends(e, t);
        e.prototype.onInit = function () {
            t.prototype.onInit.call(this);
        };
        e.prototype.play = function (t, e) {
            this._onEvent = t;
            this.playDefaultAnim("atk", 1, !1, function () {
                if (e) {
                    e();
                }
            });
        };
        e.prototype.onDefaultAnimFrameEvent = function (t, e) {
            if ("atk" == e && this._onEvent) {
                this._onEvent();
            }
        };
        return __decorate([c], e);
    })($spAnimEffect.default));
exports.default = l;
