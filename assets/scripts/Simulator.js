exports.Simulator = void 0;
var $agent = require("./Agent");
var $common = require("./Common");
var $kdtree = require("./Kdtree");
var a = (function () {
    function t() {
        this.agentId = 0;
        this.agentIdLst = [];
        this.aid2agent = Object.create(null);
        this.obstacles = [];
        this.kdTree = new $kdtree.KdTree();
        this.time = 0;
    }
    Object.defineProperty(t, "instance", {
        get: function () {
            if (t._inst) {
                //
            } else {
                t._inst = new t();
            }
            return t._inst;
        },
        enumerable: !1,
        configurable: !0
    });
    t.prototype.getAgent = function (t) {
        return this.aid2agent[this.agentIdLst[t]];
    };
    t.prototype.getAgentByAid = function (t) {
        return this.aid2agent[t];
    };
    t.prototype.getGlobalTime = function () {
        return this.time;
    };
    t.prototype.getNumAgents = function () {
        return this.agentIdLst.length;
    };
    t.prototype.getAgentAidByIdx = function (t) {
        return this.agentIdLst[t];
    };
    t.prototype.setAgentPrefVelocity = function (t, e) {
        this.aid2agent[t].prefVelocity_.copy(e);
    };
    t.prototype.getAgentPosition = function (t) {
        if (this.aid2agent[t]) {
            return this.aid2agent[t].position_;
        } else {
            return null;
        }
    };
    t.prototype.getAgentPrefVelocity = function (t) {
        return this.aid2agent[t].prefVelocity_;
    };
    t.prototype.getAgentVelocity = function (t) {
        return this.aid2agent[t].velocity_;
    };
    t.prototype.getAgentRadius = function (t) {
        return this.aid2agent[t].radius_;
    };
    t.prototype.getAgentOrcaLines = function (t) {
        return this.aid2agent[t].orcaLines_;
    };
    t.prototype.addAgent = function (t, e, n, o, r) {
        if (void 0 === e) {
            e = null;
        }
        if (void 0 === n) {
            n = null;
        }
        if (void 0 === o) {
            o = null;
        }
        if (void 0 === r) {
            r = null;
        }
        if (!this.defaultAgent) {
            throw new Error("no default agent");
        }
        var a = new $agent.Agent();
        a.position_.copy(t);
        a.maxNeighbors_ = this.defaultAgent.maxNeighbors_;
        a.maxSpeed_ = n || this.defaultAgent.maxSpeed_;
        a.neighborDist = this.defaultAgent.neighborDist;
        a.radius_ = e || this.defaultAgent.radius_;
        a.timeHorizon = this.defaultAgent.timeHorizon;
        a.timeHorizonObst = this.defaultAgent.timeHorizonObst;
        a.velocity_.copy(o || this.defaultAgent.velocity_);
        a.id = this.agentId++;
        if (r && r >= 0) {
            a.mass = r;
        }
        this.aid2agent[a.id] = a;
        this.agentIdLst.push(a.id);
        return a.id;
    };
    t.prototype.removeAgent = function (t) {
        if (this.hasAgent(t)) {
            var e = this.agentIdLst.indexOf(t);
            if (e >= 0) {
                this.agentIdLst[e] = this.agentIdLst[this.agentIdLst.length - 1];
                this.agentIdLst.length--;
            }
            delete this.aid2agent[t];
        }
    };
    t.prototype.hasAgent = function (t) {
        return !!this.aid2agent[t];
    };
    t.prototype.setAgentMass = function (t, e) {
        this.aid2agent[t].mass = e;
    };
    t.prototype.getAgentMass = function (t) {
        return this.aid2agent[t].mass;
    };
    t.prototype.setAgentRadius = function (t, e) {
        this.aid2agent[t].radius_ = e;
    };
    t.prototype.setAgentDefaults = function (t, e, n, o, r, a, s) {
        if (this.defaultAgent) {
            //
        } else {
            this.defaultAgent = new $agent.Agent();
        }
        this.defaultAgent.maxNeighbors_ = e;
        this.defaultAgent.maxSpeed_ = a;
        this.defaultAgent.neighborDist = t;
        this.defaultAgent.radius_ = r;
        this.defaultAgent.timeHorizon = n;
        this.defaultAgent.timeHorizonObst = o;
        this.defaultAgent.velocity_ = s;
    };
    t.prototype.run = function (t) {
        this.kdTree.buildAgentTree(this.getNumAgents());
        for (var e = this.agentIdLst.length, n = 0; n < e; n++) {
            this.aid2agent[this.agentIdLst[n]].computeNeighbors(this);
            this.aid2agent[this.agentIdLst[n]].computeNewVelocity(t);
        }
        for (n = 0; n < e; n++) {
            this.aid2agent[this.agentIdLst[n]].update(t);
        }
        this.time += t;
    };
    t.prototype.addObstacle = function (t) {
        if (t.length < 2) {
            return -1;
        }
        for (var e = this.obstacles.length, n = 0; n < t.length; ++n) {
            var i = new $common.Obstacle();
            i.point = t[n];
            if (0 != n) {
                i.previous = this.obstacles[this.obstacles.length - 1];
                i.previous.next = i;
            }
            if (n == t.length - 1) {
                i.next = this.obstacles[e];
                i.next.previous = i;
            }
            i.direction = $common.RVOMath.normalize(t[n == t.length - 1 ? 0 : n + 1].minus(t[n]));
            if (2 == t.length) {
                i.convex = !0;
            } else {
                i.convex =
                    $common.RVOMath.leftOf(t[0 == n ? t.length - 1 : n - 1], t[n], t[n == t.length - 1 ? 0 : n + 1]) >=
                    0;
            }
            i.id = this.obstacles.length;
            this.obstacles.push(i);
        }
        return e;
    };
    t.prototype.processObstacles = function () {
        this.kdTree.buildObstacleTree();
    };
    t.prototype.queryVisibility = function (t, e, n) {
        return this.kdTree.queryVisibility(t, e, n);
    };
    t.prototype.getObstacles = function () {
        return this.obstacles;
    };
    t.prototype.clear = function () {
        this.agentIdLst.length = 0;
        this.agentId = 0;
        this.aid2agent = Object.create(null);
        this.defaultAgent = null;
        this.kdTree = new $kdtree.KdTree();
        this.obstacles.length = 0;
    };
    return t;
})();
exports.Simulator = a;
