e.get = function (t) {
  return this.queue.find(function (e) {
    return e.key === t;
  });
};
e.has = function (t) {
  return this.keys.has(t);
};
e.isEmpty = function () {
  return Boolean(0 === this.queue.length);
};
e.next = function () {
  const t = this.queue.shift();
  this.keys.delete(t.key);
  return t;
};
e.set = function (t, e) {
  const n = Number(e);
  if (isNaN(n)) {
    throw new TypeError('"priority" must be a number');
  }
  if (this.keys.has(t)) {
    this.queue.map(function (e) {
      if (e.key === t) {
        Object.assign(e, {
          priority: n,
        });
      }
      return e;
    });
  } else {
    this.keys.add(t);
    this.queue.push({
      key: t,
      priority: n,
    });
  }
  this.sort();
  return this.queue.length;
};
e.sort = function () {
  this.queue.sort(function (t, e) {
    return t.priority - e.priority;
  });
};
const e = t.prototype;
function t() {
  this.keys = new Set();
  this.queue = [];
}
const n = t;
export default n;
