var $commonUtil = require("./CommonUtil");
var o = (function () {
    function t(t) {
        this._name = t;
        this._isConn = !1;
        this._client = null;
    }
    t.prototype.conn = function (t) {
        var e = this;
        var n = null;
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            var o = cc.url.raw("resources/cacert.pem");
            if (cc.loader.md5Pipe) {
                o = cc.loader.md5Pipe.transformURL(o);
            }
            n = new WebSocket(t, null, o);
        } else {
            n = new WebSocket(t);
        }
        this._client = n;
        n.binaryType = "arraybuffer";
        n.onopen = function (t) {
            e._isConn = !0;
            e._socketSink.onopen(t);
        };
        n.onmessage = function (t) {
            if (t && t.data && t.data instanceof ArrayBuffer) {
                e._socketSink.onmessage(t.data);
            } else {
                $commonUtil.CommonUtil.print("onmessage error", t);
            }
        };
        n.onclose = function (t) {
            $commonUtil.CommonUtil.print("====ws断开连接！ name = ", e._name);
            e._isConn = !1;
            e._socketSink.onclose(t);
        };
        n.onerror = function (t) {
            $commonUtil.CommonUtil.print("====ws连接错误！ name = " + e._name, " code=" + t.errcode);
            e._isConn = !1;
            e._socketSink.onerror(t);
        };
        n.ontimeout = function () {
            $commonUtil.CommonUtil.print("ws连接超时---ontimeout");
        };
    };
    t.prototype.send = function (t) {
        try {
            if (this.isOpen()) {
                this._client.send(t);
            }
        } catch (t) {}
    };
    t.prototype.connect = function (t) {
        this.disconnect();
        this.conn(t);
        return 0;
    };
    t.prototype.disconnect = function () {
        if (this.isOpen()) {
            this._client.close();
        }
    };
    t.prototype.isOpen = function () {
        return !!this._client && this._isConn;
    };
    t.prototype.setSocketSink = function (t) {
        this._socketSink = t;
    };
    return t;
})();
exports.default = o;
