var $myWScoket = require("./MyWScoket");
var o =
    (require("./base64").Base64,
    (function () {
        function t(t) {
            this._socket = new $myWScoket.default(t);
            this._socket.setSocketSink(this);
            this._name = t;
        }
        t.prototype.setSocketEngineSink = function (t) {
            this._socketEngineSink = t;
        };
        t.prototype.connect = function (t, e) {
            this.initValue();
            return 0 === this._socket.connect("ws://" + t + ":" + e);
        };
        t.prototype.connectUrl = function (t) {
            this.initValue();
            return 0 === this._socket.connect(t);
        };
        t.prototype.disconnect = function () {
            this.initValue();
            this._socket.disconnect();
        };
        t.prototype.send = function () {};
        t.prototype.isAlive = function () {
            return this._socket.isOpen();
        };
        t.prototype.initValue = function () {};
        t.prototype.onopen = function () {
            if (this._socketEngineSink) {
                this._socketEngineSink.onEventSocketOpen();
            }
        };
        t.prototype.onclose = function (t) {
            if (this._socketEngineSink) {
                this._socketEngineSink.onEventSocketClose(t);
            }
        };
        t.prototype.onerror = function (t) {
            if (this._socketEngineSink) {
                this._socketEngineSink.onEventSocketError(t);
            }
        };
        t.prototype.onmessage = function () {
            this._socketEngineSink;
        };
        return t;
    })());
exports.default = o;
