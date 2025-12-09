t.setSpineBoneActive = function (t, e) {
  const n = this;
  if (null != t) {
    if (t.children.length <= 0) {
      //
    } else {
      t.children.forEach(function (t) {
        n.setSpineBoneActive(t, e);
      });
    }
    t.active = e;
  }
};
t.setSpriteGrayMaterial = function (t) {
  let e;
  if (null === (e = t.getComponent(cc.Sprite)) || void 0 === e) {
    //
  } else {
    e.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
  }
};
t.setSpriteNormalMaterial = function (t) {
  let e;
  if (null === (e = t.getComponent(cc.Sprite)) || void 0 === e) {
    //
  } else {
    e.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
  }
};
t.addToggleListener = function (t, e, n, i, o) {
  const r = t.getComponent(cc.Toggle) || t.addComponent(cc.Toggle);
  const a = new cc.Component.EventHandler();
  a.component = e;
  a.handler = n;
  a.target = i;
  a.customEventData = o;
  r.clickEvents.splice(0, r.clickEvents.length);
  r.clickEvents.push(a);
};
t.addButtonListener = function (t, e, n, i, o) {
  const r = t.getComponent(cc.Button) || t.addComponent(cc.Button);
  const a = new cc.Component.EventHandler();
  a.component = e;
  a.handler = n;
  a.target = i;
  a.customEventData = o;
  r.clickEvents.splice(0, r.clickEvents.length);
  r.clickEvents.push(a);
};
t.setGroup = function (t, e) {
  t.group = e;
  if (t.children.length > 0) {
    for (const n = 0; n < t.children.length; n++) {
      const i = t.children[n];
      this.setGroup(i, e);
    }
  }
};
t.nodeParentChangeLocalPos = function (e, n) {
  const i = t.nodeWorldPos(e);
  return t.nodeLocalPos(n, i);
};
t.nodeLocalPos = function (t, e) {
  return t.convertToNodeSpaceAR(e);
};
t.nodeWorldPos = function (t) {
  return t.convertToWorldSpaceAR(cc.v2());
};
function t() {}
const i = t;
exports.default = i;
