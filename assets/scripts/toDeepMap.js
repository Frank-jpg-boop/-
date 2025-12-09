module.exports = function t(e) {
    var n = new Map();
    Object.keys(e).forEach(function (i) {
        var o = e[i];
        if (null !== o && "object" == typeof o && !Array.isArray(o)) {
            return n.set(i, t(o));
        }
        if (
            !(function (t) {
                var e = Number(t);
                return !(isNaN(e) || e <= 0);
            })(o)
        ) {
            throw new Error('Could not add node at key "' + i + "\", make sure it's a valid node", o);
        }
        return n.set(i, Number(o));
    });
    return n;
};
