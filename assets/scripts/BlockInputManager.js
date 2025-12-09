exports.BlockInputManager = void 0;
var $appBase = require("./AppBase");
var o = (function () {
    function t() {
        this.blockInputInit = !1;
        this._blockInputNode = null;
        this._popupBlockInputNum = 0;
        this._netBlockInputNum = 0;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "popupBlockInputNum", {
        get: function () {
            return this._popupBlockInputNum;
        },
        set: function (t) {
            this._popupBlockInputNum = t;
            if (null != this._blockInputNode) {
                this._blockInputNode.active = this._popupBlockInputNum + this._netBlockInputNum > 0;
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "netBlockInputNum", {
        get: function () {
            return this._netBlockInputNum;
        },
        set: function (t) {
            var e = this;
            this._netBlockInputNum = t;
            if (null != this._blockInputNode) {
                if (this._popupBlockInputNum + this._netBlockInputNum === 0) {
                    setTimeout(function () {
                        if (e._popupBlockInputNum + e._netBlockInputNum === 0) {
                            e._blockInputNode.active = !1;
                        }
                    }, 100);
                } else {
                    this._blockInputNode.active = !0;
                }
            }
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function () {
        if (!this.blockInputInit) {
            var t = (this._blockInputNode = new cc.Node("BlockInputNode"));
            t.width = $appBase.rootNode.width;
            t.height = $appBase.rootNode.height;
            t.addComponent(cc.BlockInputEvents);
            t.parent = $appBase.rootNode;
            t.zIndex = 9;
            t.active = !1;
            this.blockInputInit = !0;
        }
    };
    t._instance = null;
    return t;
})();
exports.BlockInputManager = o;
