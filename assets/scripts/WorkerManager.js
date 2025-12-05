exports.WorkerManager = void 0;
var i = (function () {
    function t() {
        this._worker = null;
        this._tasks = {};
        this._msgId = 0;
        this._createWorker();
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == t._instance) {
                t._instance = new t();
            }
            return t._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperty(t.prototype, "isSupport", {
        get: function () {
            return null != this._worker;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype._createWorker = function () {
        var t = this;
        if (null != this._worker) {
            this._worker.terminate();
        }
        this._worker = yzll.createWorker("workers/index.js", {
            useExperimentalWorker: !0
        });
        if (null != this._worker) {
            if (this._worker.onProcessKilled) {
                this._worker.onProcessKilled(function () {
                    t._createWorker();
                });
            }
            this._worker.onMessage(function (e) {
                var n;
                var i;
                var o = e.msgId;
                var r = e.data;
                if (null === (i = (n = t._tasks)[o]) || void 0 === i) {
                    //
                } else {
                    i.call(n, null, r);
                }
            });
        }
    };
    t.prototype.postMessage = function (t, e) {
        var n = this;
        if (null == this._worker) {
            if (null == e) {
                return Promise.reject({
                    errCode: -1,
                    errMsg: "不支持的平台"
                });
            } else {
                return void (
                    null == e ||
                    e({
                        errCode: -1,
                        errMsg: "不支持的平台"
                    })
                );
            }
        }
        if (t.type) {
            var i = t.type + "_" + this._msgId;
            this._msgId++;
            if (null == e) {
                return new Promise(function (e, o) {
                    n._tasks[i] = function (t, n) {
                        if (t) {
                            o(t);
                        } else {
                            e(n);
                        }
                    };
                    t.msgId = i;
                    n._worker.postMessage(t);
                });
            }
            this._tasks[i] = e;
            t.msgId = i;
            this._worker.postMessage(t);
        } else {
            console.error("请先定义type字段");
        }
    };
    t._instance = null;
    return t;
})();
exports.WorkerManager = i;
