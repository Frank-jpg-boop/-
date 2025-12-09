exports.ETeamType =
  exports.EPlayerEvent =
  exports.EActorEvent =
  exports.EActorHurtType =
  exports.EActorStateType =
  exports.EActorType =
    void 0;
exports.EActorType = {
  PLAYER: 1,
  ENEMY: 0,
  BOSS: 2
};
exports.EActorStateType = {
  IDLE: 0,
  WALK: 1,
  ATTACK: 2,
  DEAD: 3,
  READY: 4,
  RETREAT: 5,
  HURT: 6,
  SKILL: 7,
  STRIKE_FLY: 8,
  DIZZINESS: 9,
  FROZEN: 10,
  STOP: 11,
  EXTEND_1: 12,
  EXTEND_2: 13
};
exports.EActorHurtType = {
  COMMON_ATTACK: 1,
  SKILL_HURT: 2
};
exports.EActorEvent = {
  ACTOR_DEAD: 'EActorEvent.ACTOR_DEAD',
  ACTOR_DEAD_REMOVE: 'ACTOR_DEAD_REMOVE',
  COMMON_ATTACK: 'EActorEvent.COMMON_ATTACK',
  BEFORE_BE_HURT: 'EActorEvent.BEFORE_BE_HURT',
  BE_HURT: 'EActorEvent.BE_HURT',
  HP_CHANGE: 'EActorEvent.HP_CHANGE',
  SPEED_CHANGE: 'EActorEvent.SPEED_CHANGE',
  BOSS_HP_CHANGE: 'EActorEvent.BOSS_HP_CHANGE'
};
exports.EPlayerEvent = {
  PLAYER_MOVE: 'EPlayerEvent.PLAYER_MOVE',
  PLAYER_PASS_DOOR: 'EPlayerEvent.PLAYER_PASS_DOOR',
  PLAYER_CREATE_SKILL: 'EPlayerEvent.PLAYER_CREATE_SKILL'
};
exports.ETeamType = {
  PLAYER: 0,
  ENEMY: 1
};
