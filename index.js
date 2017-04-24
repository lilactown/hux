const ifelse = Symbol('ifelse');
const when = Symbol('when');
const _ifelse = (executor, predicate, left, right) => executor(predicate) ? executor(left) : executor(right);
const _when = (executor, predicate, ...exprs) => executor(predicate) ? exprs.map(executor)[exprs.length-1] : null;

// const ExamplePlugin = {
//     predicate: (f) => Array.isArray(f),
//     executor: (_exec, f, ...args) => _exec([_exec(f), ...args.map(x => _exec(x))]),
// };

function executor(expr, plugins) {
    if (Array.isArray(expr)) {
        const _exec = (x) => executor(x, plugins);
        const [f, ...args] = expr;

        // Check plugins
        if (plugins) {
            const matchedPlugin = plugins.find(plugin => plugin.predicate(f))
            if (matchedPlugin) {
                return matchedPlugin.executor(_exec, f, ...args);
            }
        }

        if (typeof f === 'function') {
            return f(...args.map(_exec));
        }
        if (Array.isArray(f)) {
            const evaledF = _exec(f, plugins);
            return _exec([evaledF, ...args.map(_exec)], plugins);
        }
        if (f === ifelse) {
            return _ifelse(_exec, ...args);
        }
        if (f === when) {
            return _when(_exec, ...args);
        }
    }
    return expr;
}

module.exports = {
    executor,
    ifelse,
    when,
};
