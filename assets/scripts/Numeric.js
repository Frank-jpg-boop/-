var i = (function () {
    function t() {
        this.isFloor = !1;
        this.isCeil = !1;
        this._value = 0;
        this._baseValue = 0;
        this._addBaseValue = 0;
        this._percentAdd = 0;
        this._addValue = 0;
        this._multiplyValue = 1;
        this._getBaseValueFunc = null;
        this._getPercentAddFunc = null;
        var t = this;
        t._value = t._baseValue = t._addBaseValue = t._percentAdd = t._addValue = 0;
    }
    Object.defineProperty(t.prototype, "value", {
        get: function () {
            if (this._getBaseValueFunc || this._getPercentAddFunc) {
                this.update();
            }
            return this._value;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "baseValue", {
        get: function () {
            if (this._getBaseValueFunc) {
                return this._getBaseValueFunc();
            } else {
                return this._baseValue;
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "addBaseValue", {
        get: function () {
            return this._addBaseValue;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "rightBaseValue", {
        get: function () {
            return this.baseValue + this.addBaseValue;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "percentAdd", {
        get: function () {
            if (this._getPercentAddFunc) {
                return this._getPercentAddFunc();
            } else {
                return this._percentAdd;
            }
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "addValue", {
        get: function () {
            return this._addValue;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.setBaseGetValueFunc = function (t) {
        if (t) {
            this._getBaseValueFunc = t;
            this.update();
        }
    };
    t.prototype.setFixBase = function (t) {
        this._baseValue = t;
        this._getBaseValueFunc = null;
        this.update();
    };
    t.prototype.changeAddBaseValue = function (t) {
        this._addBaseValue += t;
        this.update();
    };
    t.prototype.changePercentAdd = function (t) {
        this._percentAdd += t;
        this._getPercentAddFunc = null;
        this.update();
    };
    t.prototype.setPercentAddGetValueFunc = function (t) {
        if (t) {
            this._getPercentAddFunc = t;
            this.update();
        }
    };
    t.prototype.changeAddValue = function (t) {
        this._addValue += t;
        this.update();
    };
    t.prototype.changeMultiplyValue = function (t, e) {
        if (void 0 === e) {
            e = !0;
        }
        if (t <= 0) {
            //
        } else {
            if (e) {
                this._multiplyValue *= t;
            } else {
                this._multiplyValue /= t;
            }
            this.update();
        }
    };
    t.prototype.update = function () {
        var t = this;
        var e = t.rightBaseValue * (1 + t.percentAdd / 100) * this._multiplyValue + t._addValue;
        if (t.isFloor) {
            t._value = Math.floor(e);
        } else {
            if (t.isCeil) {
                t._value = Math.ceil(e);
            } else {
                t._value = e;
            }
        }
    };
    t.prototype.clear = function () {
        this._getBaseValueFunc = null;
    };
    return t;
})();
exports.default = i;
