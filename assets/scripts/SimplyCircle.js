import $simplyVec2 from './SimplyVec2';
Object.defineProperty(t.prototype, 'center', {
  get: function () {
    return new $simplyVec2.default(this.x, this.y);
  },
  enumerable: !1,
  configurable: !0,
});
function t(t, e, n) {
  this.x = 0;
  this.y = 0;
  this.radius = 0;
  this.x = t;
  this.y = e;
  this.radius = n;
}
const o = t;
export default o;
