import $eventManager from './EventManager';
import $campsiteRoomItem from './CampsiteRoomItem';
import $supportRewadItem from './SupportRewadItem';
export const ECampsiteEvent = {
  UPDATE_ROOM: 'UPDATE_ROOM'
};
let a = ECampsiteEvent;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.updateRoomView = function () {
  this.nRoomView.children.forEach(function (t) {
    t.getComponent($campsiteRoomItem.default).updateView();
  });
};
e.prototype.updateView = function () {
  this.updateRoomView();
};
e.prototype.initView = function () {
  this.nRoomView.children.forEach(function (t, e) {
    t.getComponent($campsiteRoomItem.default).initData(e + 1);
  });
};
e.prototype.onEnable = function () {
  this.updateView();
  this.supportRewadItem.updateView();
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(a.UPDATE_ROOM, this.updateRoomView, this);
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(a.UPDATE_ROOM, this.updateRoomView, this);
  this.initView();
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nRoomView = null;
  e.supportRewadItem = null;
  return e;
}
export default f;;
