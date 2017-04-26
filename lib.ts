export { ifelse, when, HuxFn } from './';

const curry1 = (f) => 
    (x, ...xs) =>
        (xs.length ? f(x, ...xs) : (...ys) => (f(x, ...ys)));

export const id = x => x;
export const eq = (x, ...xs) => xs.every(y => x === y);
export const deepEq = () => { throw new Error('not implemented') };
export const not = x => !x;
export const and = (...xs) => xs.every(id);
export const or = (...xs) => !xs.some(not);
export const gr = curry1((...xs) => xs.every((x, i, arr) => !i || x > arr[i-1]));
export const lt = curry1((...xs) => xs.every((x, i, arr) => !i || x < arr[i-1]));
export const grEq = curry1((...xs) => xs.every((x, i, arr) => !i || x >= arr[i-1]));
export const ltEq = curry1((...xs) => xs.every((x, i, arr) => !i || x <= arr[i-1]));
export const list = (...xs) => xs.length ? [...xs] : [];
export const hd = id;
export const tail = (_x, ...xs) => xs;
export const cons = (x, xs) => [x, ...xs];
export const length = (xs) => xs.length;
export const map = (f, xs) => (xs.map(x => f(x)));
export const reduce = (f, xs) => xs.reduce((x, acc) => f(x, acc));
export const filter = (f, xs) => xs.filter(x => f(x));
export const _add = (x, ...xs) => xs.length ? x + _add.apply(null, xs) : x;
export const _mul = (x, ...xs) => xs.length ? x * _mul.apply(null, xs) : x;
export const _div = (x, ...xs) => xs.length ? x / _div.apply(null, xs) : x;
export const add = curry1(_add);
export const mul = curry1(_mul);
export const div = curry1(_div);
export const inc = x => _add(x, 1);
export const dec = x => _add(x, -1);
export const sqr = x => _mul(x, x);
export const str = (...xs) => xs.join('');
export const join = (x, y) => y.join(x);
export const upper = x => x.toUpperCase();
export const lower = x => x.toLowerCase();
export const print = (...xs) => console.log.apply(console, xs);

// module.exports = {
//     id,
//     list, map, reduce, filter, join,
//     add, mul, div, inc, dec, sqr,
//     str, upper, lower, print,
//     ifelse, when,
//     eq, deepEq, not, and, or, gr, lt, grEq, ltEq,
// };
