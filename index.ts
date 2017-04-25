export interface HuxPlugin {
    predicate: (f: any) => boolean,
    executor: (exec: Function, f: any, ...args: any[]) => any,
}

interface HuxFn {
    (...args: any[]): any;
}

function isHuxFn(f): f is HuxFn {
    return typeof f === 'function';
}

// export interface HExpression {
//     0: HuxFn,
//     [index: number]: any,
// }

interface SimpleExecutor {
    (expr: any): any;
}

export const ifelse = Symbol('ifelse');
export const when = Symbol('when');
const _ifelse =
    (executor: SimpleExecutor, predicate: any, left?: any, right?: any) =>
        executor(predicate) ? executor(left) : executor(right);
const _when =
    (executor: SimpleExecutor, predicate: any, ...exprs: any[]) =>
        executor(predicate) ? exprs.map(executor)[exprs.length-1] : null;

export function executor(expr: any, plugins?: HuxPlugin[]) {
    if (Array.isArray(expr)) {
        const _exec: SimpleExecutor = (x) => executor(x, plugins);
        const [f, ...args] = expr;

        // Check plugins
        if (plugins) {
            // find the first matching plugin
            const matchedPlugin = plugins.find(plugin => plugin.predicate(f))
            if (matchedPlugin) {
                return matchedPlugin.executor(_exec, f, ...args);
            }
        }

        if (isHuxFn(f)) {
            return f(...args.map(_exec));
        }
        if (Array.isArray(f)) {
            const evaledF = _exec(f);
            return _exec([evaledF, ...args.map(_exec)]);
        }
        if (f === ifelse) {
            const [pred, left, right] = args;
            return _ifelse(_exec, pred, left, right);
        }
        if (f === when) {
            const [pred, ...rest] = args;
            return _when(_exec, pred, rest);
        }
    }
    return expr;
}
