import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $queue from './Queue';
import $spAnimCtrl from './SpAnimCtrl';
let i;
const p = cc._decorator;
const h = p.ccclass;
const f = p.property;
e.prototype.playHideAnim = function () {
  const t = this;
  cc.tween(this.node)
    .to(
      0.3,
      {
        x: 210,
      },
      {
        easing: 'sineOut',
      },
    )
    .delay(0.2)
    .call(function () {
      if (t._queueReward.size() > 0) {
        t.playShowAnim();
      } else {
        t._isPlaying = !1;
        t.node.active = !1;
      }
    })
    .start();
};
e.prototype.playShowAnim = function () {
  const t = this;
  this.node.x = 210;
  this._isPlaying = !0;
  this.node.active = !0;
  const e = this._queueReward.dequeue();
  const n = $cfg.default.instance.dataReward.getById(e);
  this.lName.string = n.name;
  this.lDesc.string = n.info.replace('|val|', n.changeID.toString());
  $resLoader.ResLoader.setSpritFrame(
    this.spIcon,
    $frameEnum.Frame.EBundleName.RES,
    'textures/atlas/item_scene/' + n.spr,
  );
  this.nBgView.children[0].active = 111 != n.type;
  this.nBgView.children[1].active = 111 == n.type;
  cc.tween(this.node)
    .to(
      0.4,
      {
        x: -210,
      },
      {
        easing: 'sineIn',
      },
    )
    .call(function () {
      if (111 == n.type) {
        t.spAnimCtrl.node.active = !0;
        t.spAnimCtrl.clearAnim();
        t.spAnimCtrl.playAnim('appear', 1, !1, function () {
          t.spAnimCtrl.node.active = !1;
        });
      }
    })
    .start();
  this.scheduleOnce(function () {
    t.playHideAnim();
  }, 1.5);
};
e.prototype.pushReward = function (t) {
  this._queueReward.enqueue(t);
  if (this._isPlaying) {
    //
  } else {
    this.playShowAnim();
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lName = null;
  e.lDesc = null;
  e.spIcon = null;
  e.nBgView = null;
  e.spAnimCtrl = null;
  e._queueReward = new $queue.default();
  e._isPlaying = !1;
  return e;
}
export default d;
