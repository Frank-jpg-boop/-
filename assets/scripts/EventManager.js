exports.EventManager = void 0;
t._instance = null;
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == t._instance) {
      t._instance = new cc.EventTarget();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {}
const i = t;
exports.EventManager = i;
