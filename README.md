# Hux

> Write your programs as arrays. Because we all wish we were writing LISP or Clojure instead.

```javascript
hx([map,
    x => x + 1,
    [1, 2, 3]]);
// ~> [2, 3, 4];
```

Hux is a declarative DSL for writing functional programs in javascript.
It is modeled after the hiccup library in Clojure to provide an easy to write/read/modify language for writing
transformations of data and views.

## What's in the box?

**Hux** provides a way to execute expressions, as well as a bunch of convenience functions for
constructing functional programs and working with data structures. It is broken into two pieces:

1. The *executor* function that takes in an array of the form `[func, parameter1, parameter2, ...]` and calls `func` with each parameter passed into, `func(parameter1, parameter2, ...)`. Example:
```javascript
const { hx } = require('hux'); // hx is the "executor"

const array = [someFunction, "parameter1", { parameter: 2 }];
hx(array); // executes the expression
```

From now on we'll call these arrays "H-Expressions". Any array who's first element matches `typeof element === 'function'` is treated as an H-Expression.

2. A library of functions for doing common things
```javascript
const { hx } = require('hux');
const { add, eq, ifelse, print, map } = require('hux/lib');

hx([ifelse, [eq, [add, 1, 2], [add, 2, 1]],
        [print, "Math works!"],
        [print, "WHO BROKE ADDITION?"]]); // ~> Logs "Math works!"

hx([map,
    [add, 2], // the `add` function is curried if only one argument is passed
    [1, 2, 3]]); // ~> [3, 4, 5]
```

## More about it

Functions used with **Hux** are regular ol' JavaScript functions.
```javascript
hx([x => x + 1, 1]) // same as `hx([inc, 1])` ~> 2
```

For instance, we could rewrite a simple version of one of the above examples like so:

```javascript
const { hx } = require('hux');

// if value is true, returns left expression or value; else, returns the right expression/value
const ifelse = (value, left, right) => value ? left : right;

// returns true if all arguments are equal; else false
const eq = (first, ...rest) => rest.every(el => el === first);

// adds all parameters together
const add = (first, ...rest) => 
    rest.length > 0 ? // if we have more than one number we're adding
        first + add(...rest) : // add the first to the sume of the rest
        first; // else return the first argument

const print = console.log.bind(console); // good ol' console.log as a function

// now use them in an expression
hx([ifelse, [eq, [add, 1, 2], [add, 2, 1]],
        [print, "Math works!"],
        [print, "WHO BROKE ADDITION?"]]);
```

## Plugins

The `hx` function can also take in an array of *plugins* (somewhat like macros) to modify the behavior of how H-Expressions are parsed. For instance, the above example `ifelse` written above actually evaluates both `print` expressions; this is because the executor evaluates H-Expressions recursively. This allows us to treat parameters as values only in our functions. In the case of control-flow, we don't want this behavior, so instead we should use a plugin:

```javascript
const { hx } = require('hux');
const { print } = require('hux/lib');

const ifelse = Symbol('ifelse');
const IfElsePlugin = {
    predicate(f) { // predicate(f, ...args) returns true/false if plugin matches expression
        return f === ifelse
    },
    executor(hx, ...expr) { // hx is the `hx` executor function with all plugins already applied
        const [
            _f, // === ifelse
            predicate, // first argument; should evaluate to a truth-y or false-y value
            left, // expression to evaluate if predicate is true
            right // expression to evaluate if predicate is false
        ] = expr; 
        // evaluate the predicate; if truthy, evaluate the left; else, evaluate the right
        return hx(predicate) ? hx(left) : hx(right);
    }
}

hx([ifelse, true,
        [print, "Will print"],
        [print, "Won't print"]], [IfElsePlugin]);
```

## Use cases

Use with `react-hyperscript` and `hyperscript-helpers` to provide a hiccup-like DSL for creating dynamic JavaScript apps:

```javascript
import h from 'react-hyperscript';
import { str, ifelse } from '../../../lib.js';
import { hx } from '../../../';

const { div, p, button } = require('hyperscript-helpers')(h);

export function App({ name, toggledOn, onClick }) {
    return hx(
        [div, [
            [p, [str, "Hello, ", name, "!"]], // string concatenation
            [p, [button, { onClick }, "Toggle"]],
            [p, [ifelse, toggledOn,
                    "I'm toggled on!",
                    "I'm toggled off!"]]]]);
}
```

## To dos

- [ ] Add more functional constructs (threading/piping, etc.) to `lib`
- [ ] Finish tests for `lib`
- [ ] Document all of `lib`
- [ ] Add tests for `hx`


## Prior art

Of course, after writing this I found that I wasn't the only one with such an idea. Here's some other projects that do something similar:

1. https://github.com/geoffreyabdallah/s-expressions
2. https://www.npmjs.com/package/ljspjs
3. https://www.npmjs.com/package/frisk
4. https://github.com/robbrit/xjson
5. https://www.npmjs.com/package/react-no-jsx
