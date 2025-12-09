var i = (function () {
    function t() {}
    t.nodeWorldPos = function (t) {
        return t.convertToWorldSpaceAR(cc.v2());
    };
    t.nodeLocalPos = function (t, e) {
        return t.convertToNodeSpaceAR(e);
    };
    t.nodeParentChangeLocalPos = function (e, n) {
        var i = t.nodeWorldPos(e);
        return t.nodeLocalPos(n, i);
    };
    t.setGroup = function (t, e) {
        t.group = e;
        if (t.children.length > 0) {
            for (var n = 0; n < t.children.length; n++) {
                var i = t.children[n];
                this.setGroup(i, e);
            }
        }
    };
    t.addButtonListener = function (t, e, n, i, o) {
        var r = t.getComponent(cc.Button) || t.addComponent(cc.Button);
        var a = new cc.Component.EventHandler();
        a.component = e;
        a.handler = n;
        a.target = i;
        a.customEventData = o;
        r.clickEvents.splice(0, r.clickEvents.length);
        r.clickEvents.push(a);
    };
    t.addToggleListener = function (t, e, n, i, o) {
        var r = t.getComponent(cc.Toggle) || t.addComponent(cc.Toggle);
        var a = new cc.Component.EventHandler();
        a.component = e;
        a.handler = n;
        a.target = i;
        a.customEventData = o;
        r.clickEvents.splice(0, r.clickEvents.length);
        r.clickEvents.push(a);
    };
    t.setSpriteNormalMaterial = function (t) {
        var e;
        if (null === (e = t.getComponent(cc.Sprite)) || void 0 === e) {
            //
        } else {
            e.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
    };
    t.setSpriteGrayMaterial = function (t) {
        var e;
        if (null === (e = t.getComponent(cc.Sprite)) || void 0 === e) {
            //
        } else {
            e.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
    };
    t.setSpineBoneActive = function (t, e) {
        var n = this;
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
    return t;
})();
exports.default = i;
