exports.AppBase = exports.topNode = exports.rootNode = void 0;
var $frameEnum = require("./FrameEnum");
var $eventManager = require("./EventManager");
var r = {};
var a = (function () {
    function t() {}
    t.getSystemInfoSync = function () {
        return r;
    };
    t.init = function () {
        if (!this.appBaseInit) {
            var t = cc.view.getVisibleSize();
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
                    $eventManager.EventManager.instance.emit($frameEnum.Frame.EGlobalEvent.SCENE_TOUCH_START, t);
                },
                exports.topNode
            );
            var e = exports.topNode;
            if (e._touchListener) {
                e._touchListener.setSwallowTouches(!1);
            }
            this.appBaseInit = !0;
        }
    };
    t.getRoot = function () {
        if (null != exports.rootNode) {
            return Promise.resolve(exports.rootNode);
        } else {
            return new Promise(function (t) {
                var e = null;
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
    t.appBaseInit = !1;
    t.onShow = function (t) {
        cc.game.on(cc.game.EVENT_SHOW, t);
    };
    t.offShow = function (t) {
        cc.game.off(cc.game.EVENT_SHOW, t);
    };
    t.onHide = function (t) {
        cc.game.on(cc.game.EVENT_HIDE, t);
    };
    t.offHide = function (t) {
        cc.game.off(cc.game.EVENT_HIDE, t);
    };
    return t;
})();
exports.AppBase = a;
