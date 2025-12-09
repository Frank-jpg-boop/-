var i;
var $popupBase = require("./PopupBase");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lTitle = null;
        e.nInputView = null;
        e._onClickOk = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function (t) {
        this.lTitle.string = t.title;
        for (var e = t.inputDatas.length - this.nInputView.childrenCount; e > 0; ) {
            var n = cc.instantiate(this.nInputView.children[0]);
            this.nInputView.addChild(n);
            e--;
        }
        this.nInputView.children.forEach(function (e, n) {
            e.active = t.inputDatas.length > n;
            if (e.active) {
                var i = t.inputDatas[n];
                e.getChildByName("Title").getComponent(cc.Label).string = i.title;
            }
        });
        this._onClickOk = t.onClickOk;
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    e.prototype.onClickBtnOk = function () {
        var t = this.nInputView.children.map(function (t) {
            return t.getChildByName("EditBox").getComponent(cc.EditBox).string;
        });
        if (this._onClickOk) {
            this._onClickOk(t);
        }
        this.removeUI();
    };
    __decorate([l(cc.Label)], e.prototype, "lTitle", void 0);
    __decorate([l(cc.Node)], e.prototype, "nInputView", void 0);
    return __decorate([c], e);
})($popupBase.PopupBase);
exports.default = u;
