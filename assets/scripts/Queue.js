t.prototype.toString = function () {
  if (this.isEmpty()) {
    return '';
  }
  for (
    const t = '' + this.itemMap.get(this.lowestCount), e = this.lowestCount + 1;
    e < this.count;
    e++
  ) {
    t = t + ',' + this.itemMap.get(e);
  }
  return t;
};
t.prototype.clear = function () {
  this.itemMap.clear();
  this.count = 0;
  this.lowestCount = 0;
};
t.prototype.size = function () {
  return this.itemMap.size;
};
t.prototype.isEmpty = function () {
  return 0 === this.itemMap.size;
};
t.prototype.peek = function () {
  if (!this.isEmpty()) {
    return this.itemMap.get(this.lowestCount);
  }
};
t.prototype.dequeue = function () {
  if (!this.isEmpty()) {
    const t = this.itemMap.get(this.lowestCount);
    this.itemMap.delete(this.lowestCount);
    this.lowestCount++;
    return t;
  }
};
t.prototype.enqueue = function (t) {
  this.itemMap.set(this.count, t);
  this.count++;
};
function t() {
  this.count = 0;
  this.lowestCount = 0;
  this.itemMap = null;
  this.count = 0;
  this.lowestCount = 0;
  this.itemMap = new Map();
}
const i = t;
export default i;
