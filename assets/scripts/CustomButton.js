import $audioManager from './AudioManager';
import $componentBase from './ComponentBase';
import $eventManager from './EventManager';
import $appProxy from './AppProxy';
let i;
export const CustomButton = void 0;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
const f = u.menu;
const d = u.requireComponent;
e.prototype.onClick = function () {
  if (this.btnAudio) {
    if (null != this.clip) {
      $audioManager.AudioManager.instance.playEffect(this.clip);
    } else {
      $eventManager.EventManager.instance.emit($appProxy.AppEvent.AUDIO_CLICK);
    }
  }
};
e.prototype.onLoad = function () {
  t.prototype.onLoad.call(this);
  this.node.on('click', this.onClick, this);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.btnAudio = !0;
  e.lastEvent = !0;
  e.clip = null;
  return e;
}
export const CustomButton = m;
