import $sqlUtil from './SqlUtil';
import $globalPopupMgr from './GlobalPopupMgr';
import $userCenterMgr from './UserCenterMgr';
import $userDataProxy from './UserDataProxy';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.onClickBtnCopy = function () {
  mm.platform.copyToClipboard(
    this._code,
    function () {
      $globalPopupMgr.default.instance.showTips("复制成功");
    },
    function () {
      $globalPopupMgr.default.instance.showTips("复制失败");
    },
  );
  $userCenterMgr.UserCenterMgr.instance.zbActiveApply(this._code, this._code);
};
e.prototype.initView = function () {
  this._code = $sqlUtil.SqlUtil.getLocalUserData(
    $userDataProxy.userDataProxy.codeKey,
    "",
  );
  this.lUid.string = "ID: " + this._code;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.lUid = null;
  e._code = "";
  return e;
}
exports.default = f;
