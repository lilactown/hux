"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifelse = Symbol('ifelse');
exports.when = Symbol('when');
const _ifelse = (executor, predicate, left, right) => executor(predicate) ? executor(left) : executor(right);
const _when = (executor, predicate, ...exprs) => executor(predicate) ? exprs.map(executor)[exprs.length - 1] : null;
// export function executor(expr: HExpression, plugins?: HuxPlugin[]);
function executor(expr, plugins) {
    if (Array.isArray(expr)) {
        const _exec = (x) => executor(x, plugins);
        const [f, ...args] = expr;
        // Check plugins
        if (plugins) {
            const matchedPlugin = plugins.find(plugin => plugin.predicate(f));
            if (matchedPlugin) {
                return matchedPlugin.executor(_exec, f, ...args);
            }
        }
        if (typeof f === 'function') {
            return f(...args.map(_exec));
        }
        if (Array.isArray(f)) {
            const evaledF = _exec(f);
            return _exec([evaledF, ...args.map(_exec)]);
        }
        if (f === exports.ifelse) {
            const [pred, left, right] = args;
            return _ifelse(_exec, pred, left, right);
        }
        if (f === exports.when) {
            const [pred, ...rest] = args;
            return _when(_exec, pred, rest);
        }
    }
    return expr;
}
exports.executor = executor;
