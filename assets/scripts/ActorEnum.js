exports.ETeamType =
    exports.EPlayerEvent =
    exports.EActorEvent =
    exports.EActorHurtType =
    exports.EActorStateType =
    exports.EActorType =
        void 0;
(function (t) {
    t[(t.PLAYER = 1)] = "PLAYER";
    t[(t.ENEMY = 0)] = "ENEMY";
    t[(t.BOSS = 2)] = "BOSS";
})(exports.EActorType || (exports.EActorType = {}));
(function (t) {
    t[(t.IDLE = 0)] = "IDLE";
    t[(t.WALK = 1)] = "WALK";
    t[(t.ATTACK = 2)] = "ATTACK";
    t[(t.DEAD = 3)] = "DEAD";
    t[(t.READY = 4)] = "READY";
    t[(t.RETREAT = 5)] = "RETREAT";
    t[(t.HURT = 6)] = "HURT";
    t[(t.SKILL = 7)] = "SKILL";
    t[(t.STRIKE_FLY = 8)] = "STRIKE_FLY";
    t[(t.DIZZINESS = 9)] = "DIZZINESS";
    t[(t.FROZEN = 10)] = "FROZEN";
    t[(t.STOP = 11)] = "STOP";
    t[(t.EXTEND_1 = 12)] = "EXTEND_1";
    t[(t.EXTEND_2 = 13)] = "EXTEND_2";
})(exports.EActorStateType || (exports.EActorStateType = {}));
(function (t) {
    t[(t.COMMON_ATTACK = 1)] = "COMMON_ATTACK";
    t[(t.SKILL_HURT = 2)] = "SKILL_HURT";
})(exports.EActorHurtType || (exports.EActorHurtType = {}));
(function (t) {
    t.ACTOR_DEAD = "EActorEvent.ACTOR_DEAD";
    t.ACTOR_DEAD_REMOVE = "ACTOR_DEAD_REMOVE";
    t.COMMON_ATTACK = "EActorEvent.COMMON_ATTACK";
    t.BEFORE_BE_HURT = "EActorEvent.BEFORE_BE_HURT";
    t.BE_HURT = "EActorEvent.BE_HURT";
    t.HP_CHANGE = "EActorEvent.HP_CHANGE";
    t.SPEED_CHANGE = "EActorEvent.SPEED_CHANGE";
    t.BOSS_HP_CHANGE = "EActorEvent.BOSS_HP_CHANGE";
})(exports.EActorEvent || (exports.EActorEvent = {}));
(function (t) {
    t.PLAYER_MOVE = "EPlayerEvent.PLAYER_MOVE";
    t.PLAYER_PASS_DOOR = "EPlayerEvent.PLAYER_PASS_DOOR";
    t.PLAYER_CREATE_SKILL = "EPlayerEvent.PLAYER_CREATE_SKILL";
})(exports.EPlayerEvent || (exports.EPlayerEvent = {}));
(function (t) {
    t[(t.PLAYER = 0)] = "PLAYER";
    t[(t.ENEMY = 1)] = "ENEMY";
})(exports.ETeamType || (exports.ETeamType = {}));
