exports.Global = void 0;
(function (t) {
    (function (t) {
        t.USER_CODE = "USER_CODE";
        t.USER_UID = "USER_UID";
        t.LOCAL_DATA = "LOCAL_DATA";
        t.MUSIC_SWITCH = "MUSIC_SWITCH";
        t.AUDIO_EFFECT_SWITCH = "AUDIO_EFFECT_SWITCH";
        t.VIBRATION_SWITCH = "VIBRATION_SWITCH";
        t.ZB_ACTIVE_GAME = "ZB_ACTIVE_GAME";
    })(t.ELocalDataKey || (t.ELocalDataKey = {}));
    (t.ELocalCustomDataKey || (t.ELocalCustomDataKey = {})).USER_SET = "USER_SET";
    (function (t) {
        t[(t.HOME = 0)] = "HOME";
        t[(t.GAME = 1)] = "GAME";
        t[(t.GAME_RESCUE = 2)] = "GAME_RESCUE";
    })(t.EBgmType || (t.EBgmType = {}));
})(exports.Global || (exports.Global = {}));
