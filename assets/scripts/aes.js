let n;
let i;
const o =
  o ||
  (function (t) {
    const e = {};
    const n = (e.lib = {});
    const i = function () {};
    const o = (n.Base = {
      extend: function (t) {
        i.prototype = this;
        const e = new i();
        if (t) {
          e.mixIn(t);
        }
        if (e.hasOwnProperty('init')) {
          //
        } else {
          e.init = function () {
            e.$super.init.apply(this, arguments);
          };
        }
        e.init.prototype = e;
        e.$super = this;
        return e;
      },
      create: function () {
        const t = this.extend();
        t.init.apply(t, arguments);
        return t;
      },
      init: function () {},
      mixIn: function (t) {
        for (let e in t)
          if (t.hasOwnProperty(e)) {
            this[e] = t[e];
          }
        if (t.hasOwnProperty('toString')) {
          this.toString = t.toString;
        }
      },
      clone: function () {
        return this.init.prototype.extend(this);
      },
    });
    const r = (n.WordArray = o.extend({
      init: function (t, e) {
        t = this.words = t || [];
        if (null != e) {
          this.sigBytes = e;
        } else {
          this.sigBytes = 4 * t.length;
        }
      },
      toString: function (t) {
        return (t || s).stringify(this);
      },
      concat: function (t) {
        const e = this.words;
        const n = t.words;
        const i = this.sigBytes;
        t = t.sigBytes;
        this.clamp();
        if (i % 4) {
          for (const o = 0; o < t; o++) {
            e[(i + o) >>> 2] |=
              ((n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << (24 - ((i + o) % 4) * 8);
          }
        } else if (65535 < n.length) {
          for (o = 0; o < t; o += 4) {
            e[(i + o) >>> 2] = n[o >>> 2];
          }
        } else {
          e.push.apply(e, n);
        }
        this.sigBytes += t;
        return this;
      },
      clamp: function () {
        const e = this.words;
        const n = this.sigBytes;
        e[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8);
        e.length = t.ceil(n / 4);
      },
      clone: function () {
        const t = o.clone.call(this);
        t.words = this.words.slice(0);
        return t;
      },
      random: function (e) {
        for (const n = [], i = 0; i < e; i += 4) {
          n.push((4294967296 * t.random()) | 0);
        }
        return new r.init(n, e);
      },
    }));
    const a = (e.enc = {});
    const s = (a.Hex = {
      stringify: function (t) {
        const e = t.words;
        t = t.sigBytes;
        for (const n = [], i = 0; i < t; i++) {
          const o = (e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
          n.push((o >>> 4).toString(16));
          n.push((15 & o).toString(16));
        }
        return n.join('');
      },
      parse: function (t) {
        for (const e = t.length, n = [], i = 0; i < e; i += 2) {
          n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }
        return new r.init(n, e / 2);
      },
    });
    const c = (a.Latin1 = {
      stringify: function (t) {
        const e = t.words;
        t = t.sigBytes;
        for (const n = [], i = 0; i < t; i++) {
          n.push(String.fromCharCode((e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255));
        }
        return n.join('');
      },
      parse: function (t) {
        for (const e = t.length, n = [], i = 0; i < e; i++) {
          n[i >>> 2] |= (255 & t.charCodeAt(i)) << (24 - (i % 4) * 8);
        }
        return new r.init(n, e);
      },
    });
    const l = (a.Utf8 = {
      stringify: function (t) {
        try {
          return decodeURIComponent(escape(c.stringify(t)));
        } catch (t) {
          throw Error('Malformed UTF-8 data');
        }
      },
      parse: function (t) {
        return c.parse(unescape(encodeURIComponent(t)));
      },
    });
    const u = (n.BufferedBlockAlgorithm = o.extend({
      reset: function () {
        this._data = new r.init();
        this._nDataBytes = 0;
      },
      _append: function (t) {
        if ('string' == typeof t) {
          t = l.parse(t);
        }
        this._data.concat(t);
        this._nDataBytes += t.sigBytes;
      },
      _process: function (e) {
        const n = this._data;
        const i = n.words;
        const o = n.sigBytes;
        const a = this.blockSize;
        const s = o / (4 * a);
        e = (s = e ? t.ceil(s) : t.max((0 | s) - this._minBufferSize, 0)) * a;
        o = t.min(4 * e, o);
        if (e) {
          for (const c = 0; c < e; c += a) {
            this._doProcessBlock(i, c);
          }
          c = i.splice(0, e);
          n.sigBytes -= o;
        }
        return new r.init(c, o);
      },
      clone: function () {
        const t = o.clone.call(this);
        t._data = this._data.clone();
        return t;
      },
      _minBufferSize: 0,
    }));
    n.Hasher = u.extend({
      cfg: o.extend(),
      init: function (t) {
        this.cfg = this.cfg.extend(t);
        this.reset();
      },
      reset: function () {
        u.reset.call(this);
        this._doReset();
      },
      update: function (t) {
        this._append(t);
        this._process();
        return this;
      },
      finalize: function (t) {
        if (t) {
          this._append(t);
        }
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (t) {
        return function (e, n) {
          return new t.init(n).finalize(e);
        };
      },
      _createHmacHelper: function (t) {
        return function (e, n) {
          return new p.HMAC.init(t, n).finalize(e);
        };
      },
    });
    const p = (e.algo = {});
    return e;
  })(Math);
i = (n = o).lib.WordArray;
n.enc.Base64 = {
  stringify: function (t) {
    const e = t.words;
    const n = t.sigBytes;
    const i = this._map;
    t.clamp();
    t = [];
    for (const o = 0; o < n; o += 3) {
      for (
        const r =
            (((e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
            (((e[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) << 8) |
            ((e[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
          a = 0;
        4 > a && o + 0.75 * a < n;
        a++
      ) {
        t.push(i.charAt((r >>> (6 * (3 - a))) & 63));
      }
    }
    if ((e = i.charAt(64))) {
      for (; t.length % 4; ) {
        t.push(e);
      }
    }
    return t.join('');
  },
  parse: function (t) {
    const e = t.length;
    const n = this._map;
    if ((o = n.charAt(64)) && -1 != (o = t.indexOf(o))) {
      e = o;
    }
    for (const o = [], r = 0, a = 0; a < e; a++) {
      if (a % 4) {
        const s = n.indexOf(t.charAt(a - 1)) << ((a % 4) * 2);
        const c = n.indexOf(t.charAt(a)) >>> (6 - (a % 4) * 2);
        o[r >>> 2] |= (s | c) << (24 - (r % 4) * 8);
        r++;
      }
    }
    return i.create(o, r);
  },
  _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
};
(function (t) {
  function e(t, e, n, i, o, r, a) {
    return (((t = t + ((e & n) | (~e & i)) + o + a) << r) | (t >>> (32 - r))) + e;
  }

  function n(t, e, n, i, o, r, a) {
    return (((t = t + ((e & i) | (n & ~i)) + o + a) << r) | (t >>> (32 - r))) + e;
  }

  function i(t, e, n, i, o, r, a) {
    return (((t = t + (e ^ n ^ i) + o + a) << r) | (t >>> (32 - r))) + e;
  }

  function r(t, e, n, i, o, r, a) {
    return (((t = t + (n ^ (e | ~i)) + o + a) << r) | (t >>> (32 - r))) + e;
  }
  for (
    const a = o, s = (l = a.lib).WordArray, c = l.Hasher, l = a.algo, u = [], p = 0;
    64 > p;
    p++
  ) {
    u[p] = (4294967296 * t.abs(t.sin(p + 1))) | 0;
  }
  l = l.MD5 = c.extend({
    _doReset: function () {
      this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    _doProcessBlock: function (t, o) {
      for (const a = 0; 16 > a; a++) {
        const s = t[(c = o + a)];
        t[c] = (16711935 & ((s << 8) | (s >>> 24))) | (4278255360 & ((s << 24) | (s >>> 8)));
      }
      a = this._hash.words;
      const c = t[o + 0];
      const l = ((s = t[o + 1]), t[o + 2]);
      const p = t[o + 3];
      const h = t[o + 4];
      const f = t[o + 5];
      const d = t[o + 6];
      const m = t[o + 7];
      const y = t[o + 8];
      const _ = t[o + 9];
      const g = t[o + 10];
      const v = t[o + 11];
      const b = t[o + 12];
      const E = t[o + 13];
      const S = t[o + 14];
      const P = t[o + 15];
      const A = e((A = a[0]), (M = a[1]), (C = a[2]), (w = a[3]), c, 7, u[0]);
      const w = e(w, A, M, C, s, 12, u[1]);
      const C = e(C, w, A, M, l, 17, u[2]);
      const M = e(M, C, w, A, p, 22, u[3]);
      A = e(A, M, C, w, h, 7, u[4]);
      w = e(w, A, M, C, f, 12, u[5]);
      C = e(C, w, A, M, d, 17, u[6]);
      M = e(M, C, w, A, m, 22, u[7]);
      A = e(A, M, C, w, y, 7, u[8]);
      w = e(w, A, M, C, _, 12, u[9]);
      C = e(C, w, A, M, g, 17, u[10]);
      M = e(M, C, w, A, v, 22, u[11]);
      A = e(A, M, C, w, b, 7, u[12]);
      w = e(w, A, M, C, E, 12, u[13]);
      C = e(C, w, A, M, S, 17, u[14]);
      A = n(A, (M = e(M, C, w, A, P, 22, u[15])), C, w, s, 5, u[16]);
      w = n(w, A, M, C, d, 9, u[17]);
      C = n(C, w, A, M, v, 14, u[18]);
      M = n(M, C, w, A, c, 20, u[19]);
      A = n(A, M, C, w, f, 5, u[20]);
      w = n(w, A, M, C, g, 9, u[21]);
      C = n(C, w, A, M, P, 14, u[22]);
      M = n(M, C, w, A, h, 20, u[23]);
      A = n(A, M, C, w, _, 5, u[24]);
      w = n(w, A, M, C, S, 9, u[25]);
      C = n(C, w, A, M, p, 14, u[26]);
      M = n(M, C, w, A, y, 20, u[27]);
      A = n(A, M, C, w, E, 5, u[28]);
      w = n(w, A, M, C, l, 9, u[29]);
      C = n(C, w, A, M, m, 14, u[30]);
      A = i(A, (M = n(M, C, w, A, b, 20, u[31])), C, w, f, 4, u[32]);
      w = i(w, A, M, C, y, 11, u[33]);
      C = i(C, w, A, M, v, 16, u[34]);
      M = i(M, C, w, A, S, 23, u[35]);
      A = i(A, M, C, w, s, 4, u[36]);
      w = i(w, A, M, C, h, 11, u[37]);
      C = i(C, w, A, M, m, 16, u[38]);
      M = i(M, C, w, A, g, 23, u[39]);
      A = i(A, M, C, w, E, 4, u[40]);
      w = i(w, A, M, C, c, 11, u[41]);
      C = i(C, w, A, M, p, 16, u[42]);
      M = i(M, C, w, A, d, 23, u[43]);
      A = i(A, M, C, w, _, 4, u[44]);
      w = i(w, A, M, C, b, 11, u[45]);
      C = i(C, w, A, M, P, 16, u[46]);
      A = r(A, (M = i(M, C, w, A, l, 23, u[47])), C, w, c, 6, u[48]);
      w = r(w, A, M, C, m, 10, u[49]);
      C = r(C, w, A, M, S, 15, u[50]);
      M = r(M, C, w, A, f, 21, u[51]);
      A = r(A, M, C, w, b, 6, u[52]);
      w = r(w, A, M, C, p, 10, u[53]);
      C = r(C, w, A, M, g, 15, u[54]);
      M = r(M, C, w, A, s, 21, u[55]);
      A = r(A, M, C, w, y, 6, u[56]);
      w = r(w, A, M, C, P, 10, u[57]);
      C = r(C, w, A, M, d, 15, u[58]);
      M = r(M, C, w, A, E, 21, u[59]);
      A = r(A, M, C, w, h, 6, u[60]);
      w = r(w, A, M, C, v, 10, u[61]);
      C = r(C, w, A, M, l, 15, u[62]);
      M = r(M, C, w, A, _, 21, u[63]);
      a[0] = (a[0] + A) | 0;
      a[1] = (a[1] + M) | 0;
      a[2] = (a[2] + C) | 0;
      a[3] = (a[3] + w) | 0;
    },
    _doFinalize: function () {
      const e = this._data;
      const n = e.words;
      const i = 8 * this._nDataBytes;
      const o = 8 * e.sigBytes;
      n[o >>> 5] |= 128 << (24 - (o % 32));
      const r = t.floor(i / 4294967296);
      n[15 + (((o + 64) >>> 9) << 4)] =
        (16711935 & ((r << 8) | (r >>> 24))) | (4278255360 & ((r << 24) | (r >>> 8)));
      n[14 + (((o + 64) >>> 9) << 4)] =
        (16711935 & ((i << 8) | (i >>> 24))) | (4278255360 & ((i << 24) | (i >>> 8)));
      e.sigBytes = 4 * (n.length + 1);
      this._process();
      n = (e = this._hash).words;
      for (i = 0; 4 > i; i++) {
        o = n[i];
        n[i] = (16711935 & ((o << 8) | (o >>> 24))) | (4278255360 & ((o << 24) | (o >>> 8)));
      }
      return e;
    },
    clone: function () {
      const t = c.clone.call(this);
      t._hash = this._hash.clone();
      return t;
    },
  });
  a.MD5 = c._createHelper(l);
  a.HmacMD5 = c._createHmacHelper(l);
})(Math);
(function () {
  let t;
  const e = o;
  const n = (t = e.lib).Base;
  const i = t.WordArray;
  const r = ((t = e.algo).EvpKDF = n.extend({
    cfg: n.extend({
      keySize: 4,
      hasher: t.MD5,
      iterations: 1,
    }),
    init: function (t) {
      this.cfg = this.cfg.extend(t);
    },
    compute: function (t, e) {
      for (
        const n = (s = this.cfg).hasher.create(),
          o = i.create(),
          r = o.words,
          a = s.keySize,
          s = s.iterations;
        r.length < a;
      ) {
        if (c) {
          n.update(c);
        }
        const c = n.update(t).finalize(e);
        n.reset();
        for (const l = 1; l < s; l++) {
          c = n.finalize(c);
          n.reset();
        }
        o.concat(c);
      }
      o.sigBytes = 4 * a;
      return o;
    },
  }));
  e.EvpKDF = function (t, e, n) {
    return r.create(n).compute(t, e);
  };
})();
if (o.lib.Cipher) {
  //
} else {
  (function () {
    const t = (f = o).lib;
    const e = t.Base;
    const n = t.WordArray;
    const i = t.BufferedBlockAlgorithm;
    const r = f.enc.Base64;
    const a = f.algo.EvpKDF;
    const s = (t.Cipher = i.extend({
      cfg: e.extend(),
      createEncryptor: function (t, e) {
        return this.create(this._ENC_XFORM_MODE, t, e);
      },
      createDecryptor: function (t, e) {
        return this.create(this._DEC_XFORM_MODE, t, e);
      },
      init: function (t, e, n) {
        this.cfg = this.cfg.extend(n);
        this._xformMode = t;
        this._key = e;
        this.reset();
      },
      reset: function () {
        i.reset.call(this);
        this._doReset();
      },
      process: function (t) {
        this._append(t);
        return this._process();
      },
      finalize: function (t) {
        if (t) {
          this._append(t);
        }
        return this._doFinalize();
      },
      keySize: 4,
      ivSize: 4,
      _ENC_XFORM_MODE: 1,
      _DEC_XFORM_MODE: 2,
      _createHelper: function (t) {
        return {
          encrypt: function (e, n, i) {
            return ('string' == typeof n ? d : h).encrypt(t, e, n, i);
          },
          decrypt: function (e, n, i) {
            return ('string' == typeof n ? d : h).decrypt(t, e, n, i);
          },
        };
      },
    }));
    t.StreamCipher = s.extend({
      _doFinalize: function () {
        return this._process(!0);
      },
      blockSize: 1,
    });
    const c = (f.mode = {});
    const l = function (t, e, n) {
      const i = this._iv;
      if (i) {
        this._iv = void 0;
      } else {
        i = this._prevBlock;
      }
      for (const o = 0; o < n; o++) {
        t[e + o] ^= i[o];
      }
    };
    const u = (t.BlockCipherMode = e.extend({
      createEncryptor: function (t, e) {
        return this.Encryptor.create(t, e);
      },
      createDecryptor: function (t, e) {
        return this.Decryptor.create(t, e);
      },
      init: function (t, e) {
        this._cipher = t;
        this._iv = e;
      },
    })).extend();
    u.Encryptor = u.extend({
      processBlock: function (t, e) {
        const n = this._cipher;
        const i = n.blockSize;
        l.call(this, t, e, i);
        n.encryptBlock(t, e);
        this._prevBlock = t.slice(e, e + i);
      },
    });
    u.Decryptor = u.extend({
      processBlock: function (t, e) {
        const n = this._cipher;
        const i = n.blockSize;
        const o = t.slice(e, e + i);
        n.decryptBlock(t, e);
        l.call(this, t, e, i);
        this._prevBlock = o;
      },
    });
    c = c.CBC = u;
    u = (f.pad = {}).Pkcs7 = {
      pad: function (t, e) {
        for (
          let i,
            o = ((i = (i = 4 * e) - (t.sigBytes % i)) << 24) | (i << 16) | (i << 8) | i,
            r = [],
            a = 0;
          a < i;
          a += 4
        ) {
          r.push(o);
        }
        i = n.create(r, i);
        t.concat(i);
      },
      unpad: function (t) {
        t.sigBytes -= 255 & t.words[(t.sigBytes - 1) >>> 2];
      },
    };
    t.BlockCipher = s.extend({
      cfg: s.cfg.extend({
        mode: c,
        padding: u,
      }),
      reset: function () {
        s.reset.call(this);
        const t = (e = this.cfg).iv;
        const e = e.mode;
        if (this._xformMode == this._ENC_XFORM_MODE) {
          const n = e.createEncryptor;
        } else {
          n = e.createDecryptor;
          this._minBufferSize = 1;
        }
        this._mode = n.call(e, this, t && t.words);
      },
      _doProcessBlock: function (t, e) {
        this._mode.processBlock(t, e);
      },
      _doFinalize: function () {
        const t = this.cfg.padding;
        if (this._xformMode == this._ENC_XFORM_MODE) {
          t.pad(this._data, this.blockSize);
          const e = this._process(!0);
        } else {
          e = this._process(!0);
          t.unpad(e);
        }
        return e;
      },
      blockSize: 4,
    });
    const p = (t.CipherParams = e.extend({
      init: function (t) {
        this.mixIn(t);
      },
      toString: function (t) {
        return (t || this.formatter).stringify(this);
      },
    }));
    const h =
      ((c = (f.format = {}).OpenSSL =
        {
          stringify: function (t) {
            const e = t.ciphertext;
            return (
              (t = t.salt) ? n.create([1398893684, 1701076831]).concat(t).concat(e) : e
            ).toString(r);
          },
          parse: function (t) {
            const e = (t = r.parse(t)).words;
            if (1398893684 == e[0] && 1701076831 == e[1]) {
              const i = n.create(e.slice(2, 4));
              e.splice(0, 4);
              t.sigBytes -= 16;
            }
            return p.create({
              ciphertext: t,
              salt: i,
            });
          },
        }),
      (t.SerializableCipher = e.extend({
        cfg: e.extend({
          format: c,
        }),
        encrypt: function (t, e, n, i) {
          i = this.cfg.extend(i);
          const o = t.createEncryptor(n, i);
          e = o.finalize(e);
          o = o.cfg;
          return p.create({
            ciphertext: e,
            key: n,
            iv: o.iv,
            algorithm: t,
            mode: o.mode,
            padding: o.padding,
            blockSize: t.blockSize,
            formatter: i.format,
          });
        },
        decrypt: function (t, e, n, i) {
          i = this.cfg.extend(i);
          e = this._parse(e, i.format);
          return t.createDecryptor(n, i).finalize(e.ciphertext);
        },
        _parse: function (t, e) {
          if ('string' == typeof t) {
            return e.parse(t, this);
          } else {
            return t;
          }
        },
      })));
    const f = ((f.kdf = {}).OpenSSL = {
      execute: function (t, e, i, o) {
        if (o) {
          //
        } else {
          o = n.random(8);
        }
        t = a
          .create({
            keySize: e + i,
          })
          .compute(t, o);
        i = n.create(t.words.slice(e), 4 * i);
        t.sigBytes = 4 * e;
        return p.create({
          key: t,
          iv: i,
          salt: o,
        });
      },
    });
    const d = (t.PasswordBasedCipher = h.extend({
      cfg: h.cfg.extend({
        kdf: f,
      }),
      encrypt: function (t, e, n, i) {
        n = (i = this.cfg.extend(i)).kdf.execute(n, t.keySize, t.ivSize);
        i.iv = n.iv;
        (t = h.encrypt.call(this, t, e, n.key, i)).mixIn(n);
        return t;
      },
      decrypt: function (t, e, n, i) {
        i = this.cfg.extend(i);
        e = this._parse(e, i.format);
        n = i.kdf.execute(n, t.keySize, t.ivSize, e.salt);
        i.iv = n.iv;
        return h.decrypt.call(this, t, e, n.key, i);
      },
    }));
  })();
}
(function () {
  for (
    const t = o,
      e = t.lib.BlockCipher,
      n = t.algo,
      i = [],
      r = [],
      a = [],
      s = [],
      c = [],
      l = [],
      u = [],
      p = [],
      h = [],
      f = [],
      d = [],
      m = 0;
    256 > m;
    m++
  ) {
    if (128 > m) {
      d[m] = m << 1;
    } else {
      d[m] = (m << 1) ^ 283;
    }
  }
  const y = 0;
  const _ = 0;
  for (m = 0; 256 > m; m++) {
    const g = ((g = _ ^ (_ << 1) ^ (_ << 2) ^ (_ << 3) ^ (_ << 4)) >>> 8) ^ (255 & g) ^ 99;
    i[y] = g;
    r[g] = y;
    const v = d[y];
    const b = d[v];
    const E = d[b];
    const S = (257 * d[g]) ^ (16843008 * g);
    a[y] = (S << 24) | (S >>> 8);
    s[y] = (S << 16) | (S >>> 16);
    c[y] = (S << 8) | (S >>> 24);
    l[y] = S;
    S = (16843009 * E) ^ (65537 * b) ^ (257 * v) ^ (16843008 * y);
    u[g] = (S << 24) | (S >>> 8);
    p[g] = (S << 16) | (S >>> 16);
    h[g] = (S << 8) | (S >>> 24);
    f[g] = S;
    if (y) {
      y = v ^ d[d[d[E ^ v]]];
      _ ^= d[d[_]];
    } else {
      y = _ = 1;
    }
  }
  const P = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
  n = n.AES = e.extend({
    _doReset: function () {
      for (
        const t = (n = this._key).words,
          e = n.sigBytes / 4,
          n = 4 * ((this._nRounds = e + 6) + 1),
          o = (this._keySchedule = []),
          r = 0;
        r < n;
        r++
      ) {
        if (r < e) {
          o[r] = t[r];
        } else {
          const a = o[r - 1];
          if (r % e) {
            if (6 < e && 4 == r % e) {
              a =
                (i[a >>> 24] << 24) |
                (i[(a >>> 16) & 255] << 16) |
                (i[(a >>> 8) & 255] << 8) |
                i[255 & a];
            }
          } else {
            a =
              (i[(a = (a << 8) | (a >>> 24)) >>> 24] << 24) |
              (i[(a >>> 16) & 255] << 16) |
              (i[(a >>> 8) & 255] << 8) |
              i[255 & a];
            a ^= P[(r / e) | 0] << 24;
          }
          o[r] = o[r - e] ^ a;
        }
      }
      t = this._invKeySchedule = [];
      for (e = 0; e < n; e++) {
        r = n - e;
        if (e % 4) {
          a = o[r];
        } else {
          a = o[r - 4];
        }
        if (4 > e || 4 >= r) {
          t[e] = a;
        } else {
          t[e] = u[i[a >>> 24]] ^ p[i[(a >>> 16) & 255]] ^ h[i[(a >>> 8) & 255]] ^ f[i[255 & a]];
        }
      }
    },
    encryptBlock: function (t, e) {
      this._doCryptBlock(t, e, this._keySchedule, a, s, c, l, i);
    },
    decryptBlock: function (t, e) {
      const n = t[e + 1];
      t[e + 1] = t[e + 3];
      t[e + 3] = n;
      this._doCryptBlock(t, e, this._invKeySchedule, u, p, h, f, r);
      n = t[e + 1];
      t[e + 1] = t[e + 3];
      t[e + 3] = n;
    },
    _doCryptBlock: function (t, e, n, i, o, r, a, s) {
      for (
        const c = this._nRounds,
          l = t[e] ^ n[0],
          u = t[e + 1] ^ n[1],
          p = t[e + 2] ^ n[2],
          h = t[e + 3] ^ n[3],
          f = 4,
          d = 1;
        d < c;
        d++
      ) {
        const m = i[l >>> 24] ^ o[(u >>> 16) & 255] ^ r[(p >>> 8) & 255] ^ a[255 & h] ^ n[f++];
        const y = i[u >>> 24] ^ o[(p >>> 16) & 255] ^ r[(h >>> 8) & 255] ^ a[255 & l] ^ n[f++];
        const _ = i[p >>> 24] ^ o[(h >>> 16) & 255] ^ r[(l >>> 8) & 255] ^ a[255 & u] ^ n[f++];
        h = i[h >>> 24] ^ o[(l >>> 16) & 255] ^ r[(u >>> 8) & 255] ^ a[255 & p] ^ n[f++];
        l = m;
        u = y;
        p = _;
      }
      m =
        ((s[l >>> 24] << 24) |
          (s[(u >>> 16) & 255] << 16) |
          (s[(p >>> 8) & 255] << 8) |
          s[255 & h]) ^
        n[f++];
      y =
        ((s[u >>> 24] << 24) |
          (s[(p >>> 16) & 255] << 16) |
          (s[(h >>> 8) & 255] << 8) |
          s[255 & l]) ^
        n[f++];
      _ =
        ((s[p >>> 24] << 24) |
          (s[(h >>> 16) & 255] << 16) |
          (s[(l >>> 8) & 255] << 8) |
          s[255 & u]) ^
        n[f++];
      h =
        ((s[h >>> 24] << 24) |
          (s[(l >>> 16) & 255] << 16) |
          (s[(u >>> 8) & 255] << 8) |
          s[255 & p]) ^
        n[f++];
      t[e] = m;
      t[e + 1] = y;
      t[e + 2] = _;
      t[e + 3] = h;
    },
    keySize: 8,
  });
  t.AES = e._createHelper(n);
})();
o.pad.Iso10126 = {
  pad: function (t, e) {
    const n = (n = 4 * e) - (t.sigBytes % n);
    t.concat(o.lib.WordArray.random(n - 1)).concat(o.lib.WordArray.create([n << 24], 1));
  },
  unpad: function (t) {
    t.sigBytes -= 255 & t.words[(t.sigBytes - 1) >>> 2];
  },
};
window.CryptoJS = o;
