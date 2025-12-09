import $frameEnum from './FrameEnum';
import $eventManager from './EventManager';
exports.AppBase = exports.topNode = exports.rootNode = void 0;
const r = {};
t.offHide = function (t) {
  cc.game.off(cc.game.EVENT_HIDE, t);
};
t.onHide = function (t) {
  cc.game.on(cc.game.EVENT_HIDE, t);
};
t.offShow = function (t) {
  cc.game.off(cc.game.EVENT_SHOW, t);
};
t.onShow = function (t) {
  cc.game.on(cc.game.EVENT_SHOW, t);
};
t.appBaseInit = !1;
t.getRoot = function () {
  if (null != exports.rootNode) {
    return Promise.resolve(exports.rootNode);
  } else {
    return new Promise(function (t) {
      const e = null;
      e = setInterval(function () {
        if (null != exports.rootNode) {
          if (e) {
            clearInterval(e);
          }
          t(exports.rootNode);
        }
      }, 100);
    });
  }
};
t.init = function () {
  if (!this.appBaseInit) {
    const t = cc.view.getVisibleSize();
    exports.rootNode = new cc.Node("Root");
    exports.rootNode.width = t.width;
    exports.rootNode.height = t.height;
    exports.rootNode.x = t.width / 2;
    exports.rootNode.y = t.height / 2;
    cc.director.getScene().addChild(exports.rootNode);
    cc.game.addPersistRootNode(exports.rootNode);
    exports.topNode = new cc.Node("Top");
    exports.topNode.width = t.width;
    exports.topNode.height = t.height;
    exports.topNode.x = t.width / 2;
    exports.topNode.y = t.height / 2;
    cc.director.getScene().addChild(exports.topNode);
    cc.game.addPersistRootNode(exports.topNode);
    exports.topNode.on(
      cc.Node.EventType.TOUCH_START,
      function (t) {
        $eventManager.EventManager.instance.emit(
          $frameEnum.Frame.EGlobalEvent.SCENE_TOUCH_START,
          t,
        );
      },
      exports.topNode,
    );
    const e = exports.topNode;
    if (e._touchListener) {
      e._touchListener.setSwallowTouches(!1);
    }
    this.appBaseInit = !0;
  }
};
t.getSystemInfoSync = function () {
  return r;
};
function t() {}
const a = t;
exports.AppBase = a;
