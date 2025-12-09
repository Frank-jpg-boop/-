let i;
exports.Logger = exports.LoggerLevel = void 0;
(function (t) {
  t[(t.OFF = 0)] = "OFF";
  t[(t.ERROR = 1)] = "ERROR";
  t[(t.WARN = 2)] = "WARN";
  t[(t.INFO = 3)] = "INFO";
  t[(t.DEBUG = 4)] = "DEBUG";
  t[(t.ALL = 5)] = "ALL";
})((i = exports.LoggerLevel || (exports.LoggerLevel = {})));
(function (t) {
  const e = "[ZS]";
  const n = 0;

  function r() {
    for (const t = [], r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    if (n === i.ALL) {
      console.log.apply(console, __spreadArrays([e], t));
    }
  }

  function a() {
    for (const t = [], r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    if (n >= i.DEBUG) {
      console.debug.apply(console, __spreadArrays([e], t));
    }
  }

  function s() {
    for (const t = [], r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    if (n >= i.INFO) {
      console.info.apply(console, __spreadArrays([e], t));
    }
  }

  function c() {
    for (const t = [], r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    if (n >= i.WARN) {
      console.warn.apply(console, __spreadArrays([e], t));
    }
  }

  function l() {
    for (const t = [], r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    if (n >= i.ERROR) {
      console.error.apply(console, __spreadArrays([e], t));
    }
  }
  t.setLoggerLevel = function (t) {
    n = t;
  };
  t.log = r;
  t.debug = a;
  t.info = s;
  t.warn = c;
  t.error = l;
  t.v = function () {
    for (const t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    r.apply(void 0, t);
  };
  t.d = function () {
    for (const t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    a.apply(void 0, t);
  };
  t.i = function () {
    for (const t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    s.apply(void 0, t);
  };
  t.w = function () {
    for (const t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    c.apply(void 0, t);
  };
  t.e = function () {
    for (const t = [], e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    l.apply(void 0, t);
  };
  t.realtimeDebug = function () {};
  t.realtimeInfo = function () {};
  t.realtimeWarn = function () {};
  t.realtimeError = function () {};
  t.setRealtimeFilterMsg = function () {};
  t.addRealtimeFilterMsg = function () {};
})(exports.Logger || (exports.Logger = {}));
