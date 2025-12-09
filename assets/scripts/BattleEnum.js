exports.EBattleEvent =
    exports.EHurtSourceType =
    exports.EHurtType =
    exports.EBattlePopHurtType =
    exports.EBattlePopupNumType =
    exports.EBattleSceneType =
        void 0;
(exports.EBattleSceneType || (exports.EBattleSceneType = {})).LEVEL = "LEVEL";
(function (t) {
    t[(t.COMMON_HURT = 1)] = "COMMON_HURT";
    t[(t.PLAYER_HURT = 2)] = "PLAYER_HURT";
    t[(t.CRIT = 3)] = "CRIT";
    t[(t.HEAL = 4)] = "HEAL";
})(exports.EBattlePopupNumType || (exports.EBattlePopupNumType = {}));
(function (t) {
    t[(t.COMMON = 1)] = "COMMON";
    t[(t.CRIT = 2)] = "CRIT";
    t[(t.RECOVER = 3)] = "RECOVER";
    t[(t.EVASION = 4)] = "EVASION";
})(exports.EBattlePopHurtType || (exports.EBattlePopHurtType = {}));
(function (t) {
    t[(t.PHYSICS = 1)] = "PHYSICS";
    t[(t.MAGIC = 2)] = "MAGIC";
    t[(t.REAL = 3)] = "REAL";
})(exports.EHurtType || (exports.EHurtType = {}));
(function (t) {
    t[(t.COMMON_ATTACK = 1)] = "COMMON_ATTACK";
    t[(t.SKILL_HURT = 2)] = "SKILL_HURT";
    t[(t.OTHER = 3)] = "OTHER";
})(exports.EHurtSourceType || (exports.EHurtSourceType = {}));
(function (t) {
    t.ADD_BUFF_EFFECT = "ADD_BUFF_EFFECT";
    t.PICKUP_FLY_ITEM = "PICKUP_FLY_ITEM";
    t.CONSUME_FLY_ITEM = "CONSUME_FLY_ITEM";
    t.ROOM_UNLOCK_INFORM = "ROOM_UNLOCK_INFORM";
    t.PLAYER_ROOM_ID_CHANGE_INFORM = "PLAYER_ROOM_ID_CHANGE";
    t.REWARD_PUT_IN_BAG_INFORM = "REWARD_PUT_IN_BAG_INFORM";
    t.REWARD_LEAVE_BAG_INFORM = "REWARD_LEAVE_BAG_INFORM";
    t.REVIVE_PLAYER = "REVIVE_PLAYER";
    t.SURVIVOR_UPDATE_INFORM = "SURVIVOR_UPDATE_INFORM";
    t.PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM = "PLAYER_ENTER_WAIT_FOR_RESCUE_INFORM";
    t.UPDATE_BAG_UI = "UPDATE_BAG_UI";
    t.GAEM_START_INFORM = "GAEM_START_INFORM";
    t.UPDATE_TASK_UI = "UPDATE_TASK_UI";
    t.WAVE_REFRESH_ENEMY_FINISH = "WAVE_REFRESH_ENEMY_FINISH";
    t.SET_NEXT_WAVE_ENEMY_UI = "SET_NEXT_WAVE_ENEMY_UI";
    t.IMP_KILL_ENEMY = "IMP_KILL_ENEMY";
    t.SET_FULL_BAG_UI = "SET_FULL_BAG_UI";
    t.SHOW_BOSS_HP = "SHOW_BOSS_HP";
    t.ROOM_ACTIVATE = "ROOM_ACTIVATE";
    t.TRIGGER_BOSS = "TRIGGER_BOSS";
    t.TRIGGER_BOSS_INFORM = "TRIGGER_BOSS_INFORM";
    t.TRIGGER_BOSS_END_INFORM = "TRIGGER_BOSS_End_INFORM";
    t.LOOKAT_BOSS = "LOOKAT_BOSS";
})(exports.EBattleEvent || (exports.EBattleEvent = {}));
