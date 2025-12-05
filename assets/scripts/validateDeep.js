module.exports = function t(e) {
    if (!(e instanceof Map)) {
        throw new Error("Invalid graph: Expected Map instead found " + typeof e);
    }
    e.forEach(function (e, n) {
        if ("object" == typeof e && e instanceof Map) {
            t(e);
        } else if ("number" != typeof e || e <= 0) {
            throw new Error("Values must be numbers greater than 0. Found value " + e + " at " + n);
        }
    });
};
