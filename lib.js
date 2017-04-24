const { ifelse, when } = require('./');
const e = require('./').executor;

const curry1 = (f) => 
    (x, ...xs) =>
        (xs.length ? f(x, ...xs) : (...ys) => (f(x, ...ys)));

const id = x => x;
const eq = (x, ...xs) => xs.every(y => x === y);
const deepEq = (x, ...xs) => { throw new Error('not implemented') };
const not = x => !x;
const and = (...xs) => xs.every(id);
const or = (...xs) => !xs.some(not);
const gr = curry1((...xs) => xs.every((x, i, arr) => !i || x > arr[i-1]));
const lt = curry1((...xs) => xs.every((x, i, arr) => !i || x < arr[i-1]));
const grEq = curry1((...xs) => xs.every((x, i, arr) => !i || x >= arr[i-1]));
const ltEq = curry1((...xs) => xs.every((x, i, arr) => !i || x <= arr[i-1]));
const list = (...xs) => xs.length ? [...xs] : [];
const hd = id;
const tail = (_x, ...xs) => xs;
const cons = (x, xs) => [x, ...xs];
const length = (xs) => xs.length;
const map = (f, xs) => (xs.map(x => f(x)));
const reduce = (f, xs) => xs.reduce((x, acc) => f(x, acc));
const filter = (f, xs) => xs.filter(x => f(x));
const _add = (x, ...xs) => xs.length ? x + _add(...xs) : x;
const _mul = (x, ...xs) => xs.length ? x * _mul(...xs) : x;
const _div = (x, ...xs) => xs.length ? x / _div(...xs) : x;
const add = curry1(_add);
const mul = curry1(_mul);
const div = curry1(_div);
const inc = x => _add(x, 1);
const dec = x => _add(x, -1);
const sqr = x => _mul(x, x);
const str = (...xs) => xs.join('');
const join = (x, y) => y.join(x);
const upper = x => x.toUpperCase();
const lower = x => x.toLowerCase();
const print = (...xs) => console.log(...xs);

module.exports = {
    id,
    list, map, reduce, filter, join,
    add, mul, div, inc, dec, sqr,
    str, upper, lower, print,
    ifelse, when,
    eq, deepEq, not, and, or, gr, lt, grEq, ltEq,
};
