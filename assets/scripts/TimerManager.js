import $logger from './Logger';
export const TimerManager = void 0;
const o = function () {
  this.interval = 0;
  this.dt = 0;
  this.repeat = 0;
  this.callback = null;
  this.pause = !1;
  this.check = !0;
};
t._instance = null;
t.prototype.runTimer = function (t, e) {
  let n;
  let i;
  if (1 === t.repeat) {
    this._timer.splice(e, 1);
    return void (null === (n = t.callback) || void 0 === n || n.call(t.target));
  }
  if (null === (i = t.callback) || void 0 === i) {
    //
  } else {
    i.call(t.target);
  }
  t.dt = t.interval;
  if (0 !== t.repeat) {
    t.repeat--;
  }
};
t.prototype._update = function () {
  let t;
  if (!this._pause) {
    const e = this._timer.length;
    if (0 !== e) {
      for (const n = cc.director.getDeltaTime(), i = null, o = e - 1; o >= 0; o--) {
        if (
          !(i = this._timer[o]).check ||
          (null === (t = i.target) || void 0 === t ? void 0 : t.node)
        ) {
          if (i.pause) {
            //
          } else {
            i.dt -= n;
            if (i.dt <= 0) {
              this.runTimer(i, o);
            }
          }
        } else {
          this._timer.splice(o, 1);
        }
      }
    }
  }
};
t.prototype.unscheduleAll = function () {
  this._timer.length = 0;
};
t.prototype.unschedule = function (t) {
  const e = this._timer.findIndex(function (e) {
    return e.callback === t;
  });
  if (-1 !== e) {
    this._timer.splice(e, 1);
  } else {
    $logger.Logger.warn('该定时器不存在或已销毁');
  }
};
t.prototype.resumeAll = function () {
  this._pause = !1;
};
t.prototype.resume = function (t) {
  const e = this._timer.find(function (e) {
    return e.callback === t;
  });
  if (e) {
    e.pause = !1;
  } else {
    $logger.Logger.warn('该定时器不存在或已销毁');
  }
};
t.prototype.pauseAll = function () {
  this._pause = !0;
};
t.prototype.pause = function (t) {
  const e = this._timer.find(function (e) {
    return e.callback === t;
  });
  if (e) {
    e.pause = !0;
  } else {
    $logger.Logger.warn('该定时器不存在或已销毁');
  }
};
t.prototype.schedule = function (t, e, n, i, r) {
  if (void 0 === n) {
    n = 0;
  }
  if (void 0 === i) {
    i = 0;
  }
  if (void 0 === r) {
    r = 0;
  }
  const a = this._timer.findIndex(function (e) {
    return e.callback === t;
  });
  const s = this._timer[a];
  if (-1 === a) {
    if (1 == i && n + r < 0) {
      return void (null == t || t.call(e));
    }
    s = new o();
    this._timer.push(s);
    s.callback = t;
  }
  s.target = e;
  s.interval = n;
  s.repeat = i;
  s.dt = n + r;
  s.check = e instanceof cc.Component;
  if (s.dt < 0) {
    this.runTimer(s, a);
  }
};
t.prototype.scheduleOnce = function (t, e, n) {
  if (void 0 === n) {
    n = 0;
  }
  const i = this._timer.find(function (e) {
    return e.callback === t;
  });
  if (i) {
    //
  } else {
    i = new o();
    this._timer.push(i);
    i.callback = t;
  }
  i.target = e;
  i.repeat = 1;
  i.dt = n;
  i.check = e instanceof cc.Component;
};
t.prototype.hasSchedule = function (t) {
  return (
    null !=
    this._timer.find(function (e) {
      return e.callback === t;
    })
  );
};
Object.defineProperty(t, 'instance', {
  get: function () {
    if (null == this._instance) {
      this._instance = new t();
    }
    return this._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this._timer = [];
  this._pause = !1;
  cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this._update, this);
}
const r = t;
export const TimerManager = r;
