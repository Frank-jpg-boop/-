var n = (function () {
    function t() {
        this.keys = new Set();
        this.queue = [];
    }
    var e = t.prototype;
    e.sort = function () {
        this.queue.sort(function (t, e) {
            return t.priority - e.priority;
        });
    };
    e.set = function (t, e) {
        var n = Number(e);
        if (isNaN(n)) {
            throw new TypeError('"priority" must be a number');
        }
        if (this.keys.has(t)) {
            this.queue.map(function (e) {
                if (e.key === t) {
                    Object.assign(e, {
                        priority: n
                    });
                }
                return e;
            });
        } else {
            this.keys.add(t);
            this.queue.push({
                key: t,
                priority: n
            });
        }
        this.sort();
        return this.queue.length;
    };
    e.next = function () {
        var t = this.queue.shift();
        this.keys.delete(t.key);
        return t;
    };
    e.isEmpty = function () {
        return Boolean(0 === this.queue.length);
    };
    e.has = function (t) {
        return this.keys.has(t);
    };
    e.get = function (t) {
        return this.queue.find(function (e) {
            return e.key === t;
        });
    };
    return t;
})();
module.exports = n;
