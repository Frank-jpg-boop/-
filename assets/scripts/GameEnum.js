exports.Game = void 0;
(function (t) {
    (function (t) {
        t[(t.MAIN_UI = 0)] = "MAIN_UI";
        t[(t.BATTLE_UI = 1)] = "BATTLE_UI";
    })(t.EGameSceneUIType || (t.EGameSceneUIType = {}));
    (function (t) {
        t.ADD_DESK_REWARD = "ADD_DESK_REWARD";
        t.TT_SIDEBAR_REWARD = "TT_SIDEBAR_REWARD";
        t.WIN_SUB_HEIGHT_RATE = "WIN_SUB_HEIGHT_RATE";
        t.LOSE_ADD_HEIGHT_RATE = "LOSE_ADD_HEIGHT_RATE";
        t.POWER_FULL_NOT_POPUP = "POWER_FULL_NOT_POPUP";
        t.SHOW_GENTLE_TIPS = "SHOW_GENTLE_TIPS";
        t.SUBSCRIPT_OFF = "SUBSCRIPT_OFF";
    })(t.EDailyRefreshDataKey || (t.EDailyRefreshDataKey = {}));
    if (t.EPermanentNumberKey) {
        //
    } else {
        t.EPermanentNumberKey = {};
    }
    (t.EGameEvent || (t.EGameEvent = {})).SCENE_UI_SWITCH = "EGameEvent.SCENE_UI_SWITCH";
})(exports.Game || (exports.Game = {}));
