export const LONG_PRESS = 'longpress';
export const TriggerWay = {
  Immediately: 1,
  AfterLoosing: 2,
  Duration: 3,
};
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
const u = s.menu;
e.prototype.isComplateLongPress = function () {
  return this._isComplateLongPress;
};
e.prototype.trigger = function () {
  cc.Component.EventHandler.emitEvents(this.longPressEvents, this);
  this.node.emit(exports.LONG_PRESS, this);
};
e.prototype.onPressAccomplished = function () {
  if (this.trggerWay === o.Immediately) {
    this.trigger();
  } else {
    if (this.trggerWay === o.AfterLoosing) {
      this.hasAccomplished = !0;
    }
  }
  this._isComplateLongPress = !0;
};
e.prototype.update = function (t) {
  if (this._isComplateLongPress && this.trggerWay == o.Duration) {
    this.durationTime -= t;
    if (this.durationTime <= 0) {
      this.trigger();
      this.durationTime = this.trggerDelayTime;
    }
  }
};
e.prototype.onTouchCancel = function () {
  if (this.hasAccomplished) {
    this.hasAccomplished = !1;
    this.trigger();
  }
  this._isComplateLongPress = !1;
  this.unscheduleAllCallbacks();
};
e.prototype.onTouchEnd = function () {
  if (this.hasAccomplished) {
    this.hasAccomplished = !1;
    this.trigger();
  }
  this._isComplateLongPress = !1;
  this.unscheduleAllCallbacks();
};
e.prototype.onTouchStart = function () {
  this.durationTime = 0;
  this.hasAccomplished = !1;
  this._isComplateLongPress = !1;
  this.scheduleOnce(this.onPressAccomplished.bind(this), this.triggerTime);
};
e.prototype.unregisterNodeEvent = function () {
  this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
};
e.prototype.registerNodeEvent = function () {
  this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
};
e.prototype.onDisable = function () {
  this._isComplateLongPress = !1;
  this.unregisterNodeEvent();
  this.unscheduleAllCallbacks();
};
e.prototype.onEnable = function () {
  this._isComplateLongPress = !1;
  this.registerNodeEvent();
  this.unscheduleAllCallbacks();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.triggerTime = 2;
  e.trggerDelayTime = 0.05;
  e.trggerWay = o.Immediately;
  e.longPressEvents = [];
  e.hasAccomplished = !1;
  e._isComplateLongPress = !1;
  e.durationTime = 0;
  return e;
}
export default p;;
