"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
exports.ifelse = _1.ifelse;
exports.when = _1.when;
const curry1 = (f) => (x, ...xs) => (xs.length ? f(x, ...xs) : (...ys) => (f(x, ...ys)));
exports.id = x => x;
exports.eq = (x, ...xs) => xs.every(y => x === y);
exports.deepEq = () => { throw new Error('not implemented'); };
exports.not = x => !x;
exports.and = (...xs) => xs.every(exports.id);
exports.or = (...xs) => !xs.some(exports.not);
exports.gr = curry1((...xs) => xs.every((x, i, arr) => !i || x > arr[i - 1]));
exports.lt = curry1((...xs) => xs.every((x, i, arr) => !i || x < arr[i - 1]));
exports.grEq = curry1((...xs) => xs.every((x, i, arr) => !i || x >= arr[i - 1]));
exports.ltEq = curry1((...xs) => xs.every((x, i, arr) => !i || x <= arr[i - 1]));
exports.list = (...xs) => xs.length ? [...xs] : [];
exports.hd = exports.id;
exports.tail = (_x, ...xs) => xs;
exports.cons = (x, xs) => [x, ...xs];
exports.length = (xs) => xs.length;
exports.map = (f, xs) => (xs.map(x => f(x)));
exports.reduce = (f, xs) => xs.reduce((x, acc) => f(x, acc));
exports.filter = (f, xs) => xs.filter(x => f(x));
exports._add = (x, ...xs) => xs.length ? x + exports._add.apply(null, xs) : x;
exports._mul = (x, ...xs) => xs.length ? x * exports._mul.apply(null, xs) : x;
exports._div = (x, ...xs) => xs.length ? x / exports._div.apply(null, xs) : x;
exports.add = curry1(exports._add);
exports.mul = curry1(exports._mul);
exports.div = curry1(exports._div);
exports.inc = x => exports._add(x, 1);
exports.dec = x => exports._add(x, -1);
exports.sqr = x => exports._mul(x, x);
exports.str = (...xs) => xs.join('');
exports.join = (x, y) => y.join(x);
exports.upper = x => x.toUpperCase();
exports.lower = x => x.toLowerCase();
exports.print = (...xs) => console.log.apply(console, xs);
// module.exports = {
//     id,
//     list, map, reduce, filter, join,
//     add, mul, div, inc, dec, sqr,
//     str, upper, lower, print,
//     ifelse, when,
//     eq, deepEq, not, and, or, gr, lt, grEq, ltEq,
// };
