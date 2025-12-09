import $redPointPathConfig from './RedPointPathConfig';
import $redPointNode from './RedPointNode';
t._instance = null;
t.prototype.setRedPointNum = function (t, e) {
  const n = this.findLastRedPoint(t);
  if (n) {
    n.setRedPointNum(e);
  }
};
t.prototype.unRegisterRedPointChange = function (t, e) {
  const n = this.findLastRedPoint(t);
  if (n) {
    n.delNumChangeFunc(e);
  }
};
t.prototype.registerRedPointChange = function (t, e, n) {
  const i = this.findLastRedPoint(t);
  if (i) {
    i.setNumChangeFunc(e, n);
  }
};
t.prototype.findLastRedPoint = function (t) {
  const e = $redPointPathConfig.redPointConf[t].path.split(".");
  if (
    1 == e.length &&
    e[0] !=
      $redPointPathConfig.redPointConf[
        $redPointPathConfig.ERedPointPathName.GAME
      ].path
  ) {
    console.error("error root node " + e[0]);
    return null;
  }
  for (const n = this.rootNode, o = 1, r = e.length; o < r; o++) {
    n && (n = n.getChild(e[o]));
    if (o == r - 1) {
      return n;
    }
  }
};
t.prototype.initRedPointTree = function () {
  for (let t in ((this.rootNode = new $redPointNode.default()),
  this.rootNode.init(
    $redPointPathConfig.redPointConf[
      $redPointPathConfig.ERedPointPathName.GAME
    ].path,
  ),
  $redPointPathConfig.ERedPointPathName)) {
    const e = this.rootNode;
    const n =
      $redPointPathConfig.redPointConf[
        Number($redPointPathConfig.ERedPointPathName[t])
      ].path.split(".");
    if (
      n[0] ==
      $redPointPathConfig.redPointConf[
        $redPointPathConfig.ERedPointPathName.GAME
      ].path
    ) {
      const r = n.length;
      if (r > 1) {
        for (const a = 1; a < r; a++) {
          if (e) {
            e = e.addChild(n[a]);
          }
        }
      }
    }
  }
};
Object.defineProperty(t, "instance", {
  get: function () {
    if (null == t._instance) {
      t._instance = new t();
    }
    return t._instance;
  },
  enumerable: !1,
  configurable: !0,
});
function t() {
  this.rootNode = null;
}
const r = t;
exports.default = r;
