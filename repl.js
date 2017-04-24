const repl = require('repl');
const e = require('./').executor;
const {
    id,
    list, map, reduce, filter, join,
    add, mul, div, inc, dec, sqr,
    str, upper, lower, print,
    ifelse, when,
    eq, deepEq, not, and, or, gr,
} = require('./lib');

function listEval(cmd, context, filename, cb) {
    cb(null, eval(`e(${cmd})`));
}

const server = repl.start({ prompt: ':: ', eval: listEval });
