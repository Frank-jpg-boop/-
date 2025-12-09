import $mathUtil from './MathUtil';
import $gridAreaDivisionMgr from './GridAreaDivisionMgr';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u =
  (c.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e._areaKeys = [];
      e._areaType = $gridAreaDivisionMgr.E_AreaObjectType.DEFAULT;
      e._colliderType = $gridAreaDivisionMgr.E_AreaColliderType.POINT;
      e._colliderNode = null;
      e._unifyPos = cc.v2(0, 0);
      e._isInitAreaObject = !1;
      e._unifyNode = null;
      return e;
    }
    Object.defineProperty(e.prototype, "areaType", {
      get: function () {
        return this._areaType;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "areaKeys", {
      get: function () {
        return this._areaKeys;
      },
      enumerable: !1,
      configurable: !0,
    });
    Object.defineProperty(e.prototype, "unifyPos", {
      get: function () {
        return this._unifyPos.clone();
      },
      enumerable: !1,
      configurable: !0,
    });
    e.prototype.onLoad = function () {
      this._unifyNode = cc.director
        .getScene()
        .getChildByName("Canvas")
        .getChildByName("GameLayer");
    };
    e.prototype.initAreaObject = function (t, e) {
      this._areaType = t;
      this._colliderType = e;
      switch (this._colliderType) {
        case $gridAreaDivisionMgr.E_AreaColliderType.POINT:
          if (!(n = this.node.getChildByName("AreaColliderPoint"))) {
            return void cc.error("AreaColliderPoint not found");
          }
          this._colliderNode = n;
          break;
        case $gridAreaDivisionMgr.E_AreaColliderType.RECT:
          let n;
          if (!(n = this.node.getChildByName("AreaColliderRect"))) {
            return void cc.error("AreaColliderRect not found");
          }
          this._colliderNode = n;
      }
      this._isInitAreaObject = !0;
      this.updateAreaKey();
    };
    e.prototype.updateAreaKey = function () {
      if (this._isInitAreaObject) {
        switch (this._colliderType) {
          case $gridAreaDivisionMgr.E_AreaColliderType.POINT:
            this.updateAreakeyPoint();
            break;
          case $gridAreaDivisionMgr.E_AreaColliderType.RECT:
            this.updateAreakeyRect();
        }
      }
    };
    e.prototype.setPos = function (t) {
      $mathUtil.MathUtil.vec2Fixed(t);
      this.node.setPosition(t);
      this.updateUnifyPos();
    };
    e.prototype.updateUnifyPos = function () {
      const t = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
      const e = this._unifyNode.convertToNodeSpaceAR(t);
      $mathUtil.MathUtil.vec2Fixed(e);
      this._unifyPos = e;
    };
    e.prototype.updateAreakeyPoint = function () {
      const t = this;
      if (this._isInitAreaObject) {
        this._areaKeys.forEach(function (e) {
          $gridAreaDivisionMgr.default.instance.removeAreaObject(t, e);
        });
        this._areaKeys = [];
        const e = this.unifyPos.add(this._colliderNode.getPosition());
        const n = $gridAreaDivisionMgr.default.instance.insertAreaObject(
          this,
          "",
          e,
        );
        this._areaKeys.push(n);
      }
    };
    e.prototype.updateAreakeyRect = function () {
      const t = this;
      if (this._isInitAreaObject) {
        this._areaKeys.forEach(function (e) {
          $gridAreaDivisionMgr.default.instance.removeAreaObject(t, e);
        });
        this._areaKeys = [];
        for (
          const e = this.unifyPos.add(this._colliderNode.getPosition()), n = e.x - this._colliderNode.width * this._colliderNode.anchorX, i = n + this._colliderNode.width;
          ;
          n += $gridAreaDivisionMgr.default.instance.gridSize
        ) {
          if (n > i) {
            n = i;
          }
          for (
            const o =
                      e.y - this._colliderNode.height * this._colliderNode.anchorY,
                  r = o + this._colliderNode.height;
            ;
            o += $gridAreaDivisionMgr.default.instance.gridSize
          ) {
            if (o > r) {
              o = r;
            }
            const a = $gridAreaDivisionMgr.default.instance.getAreaKeyInfo(
              n,
              o,
            ).key;
            if (!this._areaKeys.includes(a)) {
              const c = $gridAreaDivisionMgr.default.instance.insertAreaObject(
                this,
                "",
                cc.v2(n, o),
              );
              this._areaKeys.push(c);
            }
            if (o >= r) {
              break;
            }
          }
          if (n >= i) {
            break;
          }
        }
      }
    };
    e.prototype.removeAllAreaKey = function () {
      const t = this;
      if (this._isInitAreaObject) {
        this._areaKeys.forEach(function (e) {
          $gridAreaDivisionMgr.default.instance.removeAreaObject(t, e);
        });
        this._areaKeys = [];
      }
    };
  })(cc.Component));
exports.default = u;
