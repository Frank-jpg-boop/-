var i;
var $popupBase = require("./PopupBase");
var s = cc._decorator;
var c = s.ccclass;
var l = s.property;
var u = (function (t) {
    function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        e.lDesc = null;
        return e;
    }
    __extends(e, t);
    e.prototype.init = function () {
        var t = yzll.gameConfig.gameName;
        this.lDesc.string =
            "《" +
            t +
            "游戏软件》游戏权益声明\n\n       本游戏的一切合法权益均归湖南原子力量网络科技有限公司所有。任何未经许可的扒包、复制、修改、传播或其他侵犯游戏合法权益的行为，均属于侵权行为。任何未经许可将游戏内容、素材或其他相关游戏资料用于商业用途、未经授权的二次创作或其他任何侵犯游戏合法权益的行为，都须承担相应的法律责任，我公司保留随时追诉的权利。\n       您，如发现此游戏名称不是《" +
            t +
            "》，或者下载到破解版本。请立即通过湖南原子力量网络科技有限公司的邮箱：sszkadr@qq.com进行举报，我们在核实后将提供红包或者游戏内资产奖励，我们也将采取必要的法律手段维护自己的合法权益。\n       您的支持是我们最大的动力，保护知识产权，让我们全心全意创造更好的游戏！\n       原子力量法务部 2025年1月1日\n";
    };
    e.prototype.onClickBtnClose = function () {
        this.removeUI();
    };
    __decorate([l(cc.Label)], e.prototype, "lDesc", void 0);
    return __decorate([c], e);
})($popupBase.PopupBase);
exports.default = u;
