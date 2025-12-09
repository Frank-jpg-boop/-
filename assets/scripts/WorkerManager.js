export const WorkerManager = void 0;
t._instance = null;
t.prototype.postMessage = function (t, e) {
  const n = this;
  if (null == this._worker) {
    if (null == e) {
      return Promise.reject({
        errCode: -1,
        errMsg: '不支持的平台',
      });
    } else {
      return void (
        null == e ||
        e({
          errCode: -1,
          errMsg: '不支持的平台',
        })
      );
    }
  }
  if (t.type) {
    const i = t.type + '_' + this._msgId;
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
    console.error('请先定义type字段');
  }
};
t.prototype._createWorker = function () {
  const t = this;
  if (null != this._worker) {
    this._worker.terminate();
  }
  this._worker = yzll.createWorker('workers/index.js', {
    useExperimentalWorker: !0,
  });
  if (null != this._worker) {
    if (this._worker.onProcessKilled) {
      this._worker.onProcessKilled(function () {
        t._createWorker();
      });
    }
    this._worker.onMessage(function (e) {
      let n;
      let i;
      const o = e.msgId;
      const r = e.data;
      if (null === (i = (n = t._tasks)[o]) || void 0 === i) {
        //
      } else {
        i.call(n, null, r);
      }
    });
  }
};
Object.defineProperty(t.prototype, 'isSupport', {
  get: function () {
    return null != this._worker;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._worker = null;
  this._tasks = {};
  this._msgId = 0;
  this._createWorker();
}
const i = t;
export const WorkerManager = i;
