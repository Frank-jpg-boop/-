var $frameEnum = require("./FrameEnum");
var o = 1;
var r = 2;
var a = 3;
var s = 4;
var c = 5;
var l = 6;
var u = 7;
var p = function () {
    this.m_header = [];
    this.m_values = [];
    this.push_back = function (t) {
        this.m_values.push(t);
    };
    this.setHeader = function (t) {
        this.m_header = t;
    };
    this.getSize = function () {
        return this.m_values.length;
    };
    this.getValueByKey = function (t) {
        for (var e = 0; e < this.m_header.length; ++e) {
            if (this.m_header[e] === t) {
                return this.m_values[e];
            }
        }
        return null;
    };
};
var h = (function () {
    function t() {
        this.m_content = [];
        this.m_header = [];
        this.Fields = null;
        this.strField = "";
        this.mStateType = o;
    }
    t.prototype.loadCsv = function (t, e, n) {
        if (void 0 === n) {
            n = $frameEnum.Frame.EBundleName.CONFIG;
        }
        var h = this;
        h.m_content.length = 0;
        h.m_header.length = 0;
        h.Fields = new p();
        h.strField = "";
        h.mStateType = o;
        cc.assetManager.loadBundle(n, function (n, i) {
            i.load(t, function (t, n) {
                if (t) {
                    console.log(" ----------------- 加载csv文件失败，请检查路径是否正确!");
                    return void cc.error(t.message, t);
                }
                if (-1 === (n = n.text).indexOf("\r\n")) {
                    n = n.replace(/\n/g, "\r\n");
                }
                for (var i = 0, f = n.length; i < f; ++i) {
                    var d = n[i];
                    switch (h.mStateType) {
                        case o:
                            if ('"' == d) {
                                h.mStateType = a;
                            } else {
                                if ("," == d) {
                                    h.Fields.push_back(""), (h.mStateType = s);
                                } else {
                                    if ("\r" == d || "\n" == d) {
                                        console.log("语法错误：有空行"), (h.mStateType = u);
                                    } else {
                                        (h.strField += d), (h.mStateType = r);
                                    }
                                }
                            }
                            break;
                        case r:
                            if ("," == d) {
                                h.Fields.push_back(h.strField);
                                h.strField = "";
                                h.mStateType = s;
                            } else {
                                if ("\r" == d) {
                                    h.Fields.push_back(h.strField), (h.mStateType = l);
                                } else {
                                    h.strField += d;
                                }
                            }
                            break;
                        case a:
                            if ('"' == d) {
                                h.mStateType = c;
                            } else {
                                h.strField += d;
                            }
                            break;
                        case s:
                            if ("," == d) {
                                h.Fields.push_back("");
                            } else {
                                if ('"' == d) {
                                    (h.strField = ""), (h.mStateType = a);
                                } else {
                                    if ("\r" == d) {
                                        h.Fields.push_back(""), (h.mStateType = l);
                                    } else {
                                        (h.strField += d), (h.mStateType = r);
                                    }
                                }
                            }
                            break;
                        case c:
                            if ("," == d) {
                                h.Fields.push_back(h.strField);
                                h.strField = "";
                                h.mStateType = s;
                            } else {
                                if ("\r" == d) {
                                    h.Fields.push_back(h.strField), (h.mStateType = l);
                                } else {
                                    if ('"' == d) {
                                        (h.strField += d), (h.mStateType = a);
                                    } else {
                                        console.log(
                                            '语法错误： 转义字符 " 不能完成转义 或 引号字段结尾引号没有紧贴字段分隔符'
                                        ),
                                            (h.mStateType = u);
                                    }
                                }
                            }
                            break;
                        case l:
                            if ("\n" == d) {
                                h.m_content.push(h.Fields);
                                h.Fields = new p();
                                h.strField = "";
                                h.mStateType = o;
                            } else {
                                console.log("语法错误： 行分隔用了回车 \\r。但未使用回车换行 \\r\\n ");
                                h.mStateType = u;
                            }
                    }
                }
                switch (h.mStateType) {
                    case o:
                        break;
                    case r:
                        h.Fields.push_back(h.strField);
                        h.m_content.push(h.Fields);
                        break;
                    case a:
                        console.log("语法错误： 引号字段未闭合");
                        break;
                    case s:
                        h.Fields.push_back("");
                        h.m_content.push(h.Fields);
                        break;
                    case c:
                        h.Fields.push_back(h.strField);
                        h.m_content.push(h.Fields);
                }
                h.setHeader();
                h.m_content = h.contentToJson(h.m_content);
                e(h.m_content);
            });
        });
    };
    t.prototype.contentToJson = function (t) {
        for (var e = [], n = 1; n < t.length; ++n) {
            for (var i = {}, o = t[n].m_header, r = t[n].m_values, a = 0; a < o.length; ++a) {
                for (var s = r[a]; s.indexOf("\\n") >= 0; ) {
                    s = s.replace("\\n", "\n");
                }
                i[o[a]] = s;
            }
            e.push(i);
        }
        return e;
    };
    t.prototype.setHeader = function () {
        this.m_header.length = 0;
        for (var t = 0; t < this.m_content[0].m_values.length; t++) {
            this.m_header.push(this.m_content[0].m_values[t]);
        }
        for (t = 0; t < this.m_content.length; t++) {
            this.m_content[t].setHeader(this.m_header);
        }
    };
    return t;
})();
exports.default = h;
