var i;
var o;
exports.redPointConf = exports.ERedPointPathName = void 0;
(function (t) {
    t[(t.GAME = 0)] = "GAME";
    t[(t.GAME_SHOP = 1)] = "GAME_SHOP";
    t[(t.GAME_BUILD = 2)] = "GAME_BUILD";
    t[(t.GAME_BATTLE = 3)] = "GAME_BATTLE";
    t[(t.GAME_BATTLE_EXPLORE = 301)] = "GAME_BATTLE_EXPLORE";
    t[(t.GAME_BATTLE_SURVIVE = 302)] = "GAME_BATTLE_SURVIVE";
    t[(t.GAME_BATTLE_SURVIVE_REWARD = 303)] = "GAME_BATTLE_SURVIVE_REWARD";
    t[(t.GAME_BATTLE_TASK = 304)] = "GAME_BATTLE_TASK";
    t[(t.GAME_BATTLE_SKIN = 305)] = "GAME_BATTLE_SKIN";
    t[(t.GAME_BATTLE_SEVENSIGN = 306)] = "GAME_BATTLE_SEVENSIGN";
    t[(t.GAME_SKILL = 4)] = "GAME_SKILL";
})((o = exports.ERedPointPathName || (exports.ERedPointPathName = {})));
exports.redPointConf =
    (((i = {})[o.GAME] = {
        path: "game"
    }),
    (i[o.GAME_SHOP] = {
        path: "game.shop"
    }),
    (i[o.GAME_BUILD] = {
        path: "game.build"
    }),
    (i[o.GAME_SKILL] = {
        path: "game.skill"
    }),
    (i[o.GAME_BATTLE] = {
        path: "game.battle"
    }),
    (i[o.GAME_BATTLE_EXPLORE] = {
        path: "game.battle.explore"
    }),
    (i[o.GAME_BATTLE_TASK] = {
        path: "game.battle.task"
    }),
    (i[o.GAME_BATTLE_SURVIVE] = {
        path: "game.battle.survive"
    }),
    (i[o.GAME_BATTLE_SURVIVE_REWARD] = {
        path: "game.battle.survive.reward"
    }),
    (i[o.GAME_BATTLE_SKIN] = {
        path: "game.battle.skin"
    }),
    (i[o.GAME_BATTLE_SEVENSIGN] = {
        path: "game.battle.sevensign"
    }),
    i);
