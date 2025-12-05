exports.AnimationCfgMgr = void 0;
var $frameEnum = require("./FrameEnum");
var o = (function () {
    function t() {}
    Object.defineProperty(t, "instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new t();
            }
            return this._instance;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.getEnemyAnimCfg = function (t) {
        var e = [];
        e.push(this.getEnemyStandCfg(t));
        e.push(this.getEnemyAtkCfg(t));
        e.push(this.getEnemyMovecfg(t));
        e.push(this.getEnemyDieCfg(t));
        return e;
    };
    t.prototype.getEnemyStandCfg = function (t) {
        var e = {
            actionName: "stand",
            frameNum: 9,
            bundleName: $frameEnum.Frame.EBundleName.GAME,
            spriteFrameNameHead: "Enemy" + t + "_stand_",
            path: "",
            frameEventIndexs: [],
            repairNum: !0
        };
        switch (t) {
            case 101:
            case 102:
                e.frameNum = 30;
                break;
            case 103:
            case 403:
            case 501:
            case 502:
            case 503:
            case 601:
            case 602:
            case 202:
            case 301:
            case 302:
                e.frameNum = 20;
                break;
            case 201:
            case 303:
            case 603:
                e.frameNum = 25;
                break;
            case 401:
            case 402:
                e.frameNum = 15;
        }
        return e;
    };
    t.prototype.getEnemyAtkCfg = function (t) {
        var e = {
            actionName: "atk",
            frameNum: 17,
            bundleName: $frameEnum.Frame.EBundleName.GAME,
            spriteFrameNameHead: "Enemy" + t + "_atk_",
            path: "",
            frameEventIndexs: [8],
            repairNum: !0
        };
        switch (t) {
            case 101:
                e.frameNum = 15;
                e.frameEventIndexs = [7];
                break;
            case 102:
                e.frameNum = 20;
                e.frameEventIndexs = [7];
            case 103:
                e.frameNum = 15;
                e.frameEventIndexs = [5];
                break;
            case 201:
                e.frameNum = 10;
                e.frameEventIndexs = [3];
                break;
            case 202:
                e.frameNum = 13;
                e.frameEventIndexs = [6];
                break;
            case 301:
                e.frameNum = 9;
                e.frameEventIndexs = [4];
                break;
            case 302:
                e.frameNum = 10;
                e.frameEventIndexs = [4];
                break;
            case 303:
                e.frameNum = 8;
                e.frameEventIndexs = [4];
                break;
            case 401:
                e.frameNum = 10;
                e.frameEventIndexs = [5];
                break;
            case 402:
                e.frameNum = 10;
                e.frameEventIndexs = [4];
                break;
            case 403:
                e.frameNum = 11;
                e.frameEventIndexs = [6];
                break;
            case 501:
                e.frameNum = 10;
                e.frameEventIndexs = [6];
                break;
            case 502:
                e.frameNum = 12;
                e.frameEventIndexs = [6];
                break;
            case 503:
            case 601:
                e.frameNum = 13;
                e.frameEventIndexs = [6];
                break;
            case 602:
                e.frameNum = 10;
                e.frameEventIndexs = [4];
                break;
            case 603:
                e.frameNum = 13;
                e.frameEventIndexs = [6];
        }
        return e;
    };
    t.prototype.getEnemyMovecfg = function (t) {
        var e = {
            actionName: "move",
            frameNum: 5,
            bundleName: $frameEnum.Frame.EBundleName.GAME,
            spriteFrameNameHead: "Enemy" + t + "_move_",
            path: "",
            frameEventIndexs: [],
            repairNum: !0
        };
        switch (t) {
            case 101:
            case 201:
            case 301:
            case 303:
            case 501:
            case 502:
            case 503:
            case 601:
            case 603:
                e.frameNum = 20;
                break;
            case 102:
            case 302:
            case 401:
            case 402:
            case 202:
            case 602:
                e.frameNum = 10;
                break;
            case 103:
                e.frameNum = 11;
                break;
            case 403:
                e.frameNum = 15;
        }
        return e;
    };
    t.prototype.getEnemyDieCfg = function (t) {
        var e = {
            actionName: "die",
            frameNum: 3,
            bundleName: $frameEnum.Frame.EBundleName.GAME,
            spriteFrameNameHead: "Enemy" + t + "_die_",
            path: "",
            frameEventIndexs: [],
            repairNum: !0
        };
        switch (t) {
            case 101:
                e.frameNum = 10;
                break;
            case 102:
                e.frameNum = 25;
                break;
            case 103:
            case 301:
            case 501:
            case 502:
            case 503:
            case 601:
                e.frameNum = 15;
                break;
            case 201:
                e.frameNum = 20;
                break;
            case 202:
            case 302:
            case 303:
            case 602:
                e.frameNum = 18;
                break;
            case 401:
            case 402:
                e.frameNum = 16;
                break;
            case 403:
            case 603:
                e.frameNum = 14;
        }
        return e;
    };
    t._instance = null;
    return t;
})();
exports.AnimationCfgMgr = o;
