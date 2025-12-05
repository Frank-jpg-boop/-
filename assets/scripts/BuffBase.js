var i = (function () {
    function t() {
        this._buffData = null;
        this.singleDatas = [];
        this.isInit = !1;
        this.isRemove = !1;
        this._effects = null;
    }
    Object.defineProperty(t.prototype, "data", {
        get: function () {
            return this._buffData;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "buffType", {
        get: function () {
            return this._buffData.buffType;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "isDebuff", {
        get: function () {
            return this._buffData.isDebuff;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "buffCount", {
        get: function () {
            return this.singleDatas.length;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.init = function (t) {
        this._buffData = t;
        this.singleDatas = [];
        this.onInit();
        this.isRemove = !1;
        this.isInit = !0;
        this._effects = [];
    };
    t.prototype.onInit = function () {};
    t.prototype.bindEffect = function (t) {
        this._effects.push(t);
    };
    t.prototype.trigger = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
        if (this._buffData.duration > 0) {
            this.singleDatas.push({
                index: this.singleDatas.length,
                duration: this._buffData.duration,
                param: t
            });
        }
        this.onTrigger.apply(this, t);
    };
    t.prototype.onTrigger = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
    };
    t.prototype.again = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
        if (this._buffData.duration > 0) {
            if (this._buffData.isSuperposition) {
                this.singleDatas.push({
                    index: this.singleDatas.length,
                    duration: this._buffData.duration,
                    param: t
                });
            } else {
                this.singleDatas[0].duration = this._buffData.duration;
            }
        }
        this.onAgain.apply(this, t);
    };
    t.prototype.onAgain = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
    };
    t.prototype.update = function (t) {
        if (this.isInit && !this.isRemove) {
            if (this._buffData.duration > 0) {
                for (var e = 0; e < this.singleDatas.length; ++e) {
                    var n = this.singleDatas[e];
                    n.duration -= t;
                    if (
                        n.duration <= 0 &&
                        (this.singleDatas.splice(e, 1),
                        --e,
                        this.onSingleRemove.apply(this, n.param),
                        this.singleDatas.length <= 0)
                    ) {
                        return void this.remove(!0, !0);
                    }
                }
            }
            this.onUpdate(t);
        }
    };
    t.prototype.onUpdate = function () {};
    t.prototype.onSingleRemove = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
        }
    };
    t.prototype.remove = function (t, e) {
        if (void 0 === t) {
            t = !0;
        }
        if (void 0 === e) {
            e = !1;
        }
        if (this.isRemove) {
            //
        } else {
            if (this._effects.length > 0) {
                if (t) {
                    this._effects.forEach(function (t) {
                        if (t.hasAnimInDefault && t.hasAnimInDefault("end")) {
                            t.playDefaultAnim("end", 1, !1, function () {
                                t.remove();
                            });
                        } else {
                            t.remove();
                        }
                    });
                } else {
                    this._effects.forEach(function (t) {
                        t.remove();
                    });
                }
                this._effects = [];
            }
            this.isRemove = !0;
            this._buffData.parentActor.buff.deleteBuffMap(this._buffData.buffId);
            this.onRemove();
            if (this._buffData.onRemove) {
                this._buffData.onRemove(this._buffData.agentActor, this._buffData.parentActor, e);
            }
        }
    };
    t.prototype.onRemove = function () {};
    return t;
})();
exports.default = i;
