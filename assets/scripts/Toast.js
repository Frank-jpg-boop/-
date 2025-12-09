exports.Toast = void 0;
var $appBase = require("./AppBase");
var o = (function () {
    function t() {
        this._bgColor = cc.color(255, 255, 255, 180);
        this._textColor = cc.color(0, 0, 0, 255);
        this._fontSize = 30;
        this.bgNode = null;
        this.duration = 0;
        this.textNode = null;
    }
    t.makeText = function (e, n, o) {
        if (null == e) {
            if (null == this.parentNode) {
                this.parentNode = new cc.Node("Toast");
                this.parentNode.width = $appBase.rootNode.width;
                this.parentNode.height = $appBase.rootNode.height;
                $appBase.rootNode.addChild(this.parentNode, 999);
            }
            e = this.parentNode;
        }
        var r = new t();
        r.duration = o;
        r.init(e, n);
        return r;
    };
    t.prototype.setFontSize = function (t) {
        this._fontSize = t;
        this.textNode.getComponent(cc.Label).fontSize = t;
        return this;
    };
    t.prototype.setBgColor = function (t) {
        this._bgColor = t;
        this.bgNode.color = this._bgColor;
        return this;
    };
    t.prototype.setTextColor = function (t) {
        this._textColor = t;
        this.textNode.color = this._textColor;
        return this;
    };
    t.prototype.setGravity = function (e) {
        if (e == t.CENTER) {
            this.bgNode.y = 0;
        } else {
            if (e == t.TOP) {
                this.bgNode.y = (this.bgNode.parent.height / 5) * 2;
            } else {
                e == t.BOTTOM && (this.bgNode.y = (-this.bgNode.parent.height / 5) * 2);
            }
        }
        return this;
    };
    t.prototype.show = function () {
        this.bgNode.opacity = 255;
        cc.tween(this.bgNode)
            .by(this.duration / 2, {
                x: 0,
                y: 0
            })
            .to(this.duration / 2, {
                opacity: 0
            })
            .call(function (t) {
                t.destroy();
            })
            .start();
        return this;
    };
    t.prototype.init = function (t, e) {
        var n = t.width;
        this.bgNode = new cc.Node();
        this.textNode = new cc.Node();
        this.textNode.color = this._textColor;
        var i = this.textNode.addComponent(cc.Label);
        i.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        i.verticalAlign = cc.Label.VerticalAlign.CENTER;
        i.fontSize = this._fontSize;
        i.string = e;
        if (e.length * i.fontSize > (3 * n) / 5) {
            this.textNode.width = (3 * n) / 5;
            i.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        } else {
            this.textNode.width = e.length * i.fontSize;
        }
        var o = 1 + ~~((e.length * i.fontSize) / ((3 * n) / 5));
        this.textNode.height = i.fontSize * o;
        var r = this.bgNode.addComponent(cc.Graphics);
        r.arc(-this.textNode.width / 2, 0, this.textNode.height / 2 + 20, 0.5 * Math.PI, 1.5 * Math.PI, !0);
        r.lineTo(this.textNode.width / 2, -(this.textNode.height / 2 + 20));
        r.arc(this.textNode.width / 2, 0, this.textNode.height / 2 + 20, 1.5 * Math.PI, 0.5 * Math.PI, !0);
        r.lineTo(-this.textNode.width / 2, this.textNode.height / 2 + 20);
        r.fillColor = this._bgColor;
        r.fill();
        this.textNode.parent = this.bgNode;
        this.bgNode.opacity = 0;
        this.bgNode.parent = t;
    };
    t.CENTER = 0;
    t.TOP = 1;
    t.BOTTOM = 2;
    t.LENGTH_SHORT = 2;
    t.LENGTH_LONG = 3.5;
    t.parentNode = null;
    return t;
})();
exports.Toast = o;
