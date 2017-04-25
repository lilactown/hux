export interface HuxPlugin {
    predicate: (f: any) => boolean;
    executor: (exec: Function, f: any, ...args: any[]) => any;
}
export interface HuxFn {
    (...args: any[]): any;
}
export declare const ifelse: symbol;
export declare const when: symbol;
export declare function executor(expr: any, plugins?: HuxPlugin[]): any;
