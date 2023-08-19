## 1. Setting it up

1. Use `npm init` to set up the `package.json` file.

1. Use `npm install --saveDev lite-server` to install a dependency which will only affect the development environment.

1. Add `"start": "lite-server"` to the `"scripts"` key.

- And also add this key:

```json

"devDependencies": {

"lite-server": "^2.5.4"

}

```

1. Use `npm start` to start serving your website.

- Now the app will be automatically reloaded.

> Having both the `.js` and the `.ts` files open at the same time might generate errors due to conflicts in the IDE.

## 2. Core Types

- `number`

- `string`

- `boolean`

- Truthy and falsy values still exist...

- `object`

- Object types are inferred if you're creating one directly.

```ts
const person1 = {
  name: "Max", // inferred as `string`

  age: 30, // inferred as `number`
};

const person2: {
  name: string;

  age: number;
} = {
  name: "Max",

  age: 30,
};
```

- `Array`

```ts
let favoritActivities: string[];

favoritActivities = ["Sports"];

for (const hobby of favoriteActivities) {
  console.log(hobby.toUpperCase());
}
```

- `Tuple`: fixed-length and fixed-type array.

- Be careful with implicit tuples, they can be inferred as *union*s (`|`).

```ts
const role: [number, string] = [2, "author"];
```

- The `push()` method is an exception for types.

- `Enum`

- Considered to be a custom type.

```ts
enum Role {
  new = 5,

  old,
}
```

- `Any`

- Takes away the benefits of TS, it's basically JS now.

Use `typeof` to check types:

```ts

if (typeof  n1 === 'number') { ... }

```

### Literal Types

```ts
const eitherXOrY: "x" | "y" = "x";

const eitherXOrY: "x" | "y" = "z"; // error
```

### Type Aliases

```ts
type Combinable = number | string;
```

### Function Return Types and Void

`void` is exclusive to function return types.

```ts
function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log(num);
}

function printResult(num: number): undefined {
  console.log(num);

  return; // `undefined` return type
}
```

One `=` + one `!` includes both `null` and `undefined` => `!=`.

### Function Types and Callbacks

```ts
let combinedValues: Function; // won't have parameters and return values typed

let combinedValues: (a: number, b: number) => number;

combinedValues = add;
```

`void` means TS won't care about what you're returning.

### The `unknown` Type

The better choice over `any`.

```ts
let userInput: unknown;

let userName: string;

userInput = 5;

userInput = "Max";

if (typeof userInput === "string") {
  // `unknown` needs a check

  userName = userInput;
}
```

### The `Never` Type

This function returns a `never`:

```ts
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };

  // while (true) {}
}
```

## 3. TypeScript Compiler

### Watch Mode

```cmd

tsc file.ts --watch

```

What if you have more than 1 file? Use this to initiate a configuration for the project:

```cmd

tsc --init



tsc -w

```

### Including and Excluding Files

Add this to the end of `tsconfig.json`:

```json

"exclude": [

"analytics.ts",

"*.dev.ts",

"node_modules"

],

"include": [ // If in the config, you have to specify everything.

"app.ts",

],

"files": [ // Can't specify folders here.

"app.ts"

]

```

`"node_modules"` is automatically excluded actually.

### Setting a Compilation Target

1.  `target`: `es5` is the default &mdash; it doesn't have `let` and `const`.

1.  `lib`: The default contains the `dom` library for browsers for example.

```json

"lib": [

"dom",

"es6",

"dom.iterable",

"scripthost"

],

```

1.  `sourceMap`s: if `true`, will enable `.ts` files in the browser for debugging.

1.  `rootDir`: Typically, the `dist` folder will have the output and the `src` folder will have the TS files.

```json

"outDir": "./dist/",

"rootDir": "./src/",

```

1.  `removeComments` is a good option for memory optimization.

1.  `noEmit` won't compile to JS, so the workflow will be simpler.

1.  `downlevelIteration` will limit the iteration loops, which will output more robust code.

1.  `noEmitOnError` (default is `false`). Setting it to `true` will be safer and won't generate broken code.

1.  `strict` is the same as setting up all of the options below it (inside the strict block).

1.  `noImplicitAny`

- Sometimes it isn't possible for TypeScript to infer types...

1.  `strictNullChecks`

- `document.querySelector('button')!` might be `null` at some point. And that's why we add the `!`.

1.  `strictFunctionTypes`

1.  `strictBindCallApply`: this is related to binding the `this` keyword.

```ts
function clickHandler(message: string) {
  console.log("Clicked! " + message);
}

if (button) {
  button.addEventListener(
    "click",

    clickHandler.bind(null, "Youre welcome")
  );
}
```

1.  `Additional Checks` increase code quality.

## 4. Debugging with VS Code

Extensions:

1. ESLint

1. npm

1. Prettier

1. Debugger for Chrome

- Enable the `sourceMap` option inside `tsconfig.json`.

- Press <kbd>F5</kbd> and choose Chrome to start an anonymous debugging session.

- You can even place breakpoints.

### Other Resources

- [`tsconfig.json` Docs][tsconfig_docs]

- [TS Compileer Docs][tscompiler_docs]

- [VS Code TS Debugging Docs][vscode_ts_debugging]

[tscompiler_docs]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[tsconfig_docs]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
[vscode_ts_debugging]: https://code.visualstudio.com/docs/typescript/typescript-debugging

## 5. TypeScript & Modern JavaScript

> Using Next-Gen JS Syntax

[Checking which features work where][language_features].

[language_features]: https://kangax.github.io/compat-table/es6/

### Why use `let` instead of `var`?

The difference is the scope.

- `var` has global and function scope.

- Declaring a `var` inside an `if` block, for example, also creates a `var` globally in JS.

- TS would complain anyway...

- `let` only has block scope.

- It's only available in the block you wrote or in lower level ones.

### Copying Objects with the Spread Operator

```ts
const person = {
  name: "Max",

  age: 30,
};

const copiedPerson = { ...person }; // a different object, not a pointer
```

### Rest Parameters (Spread Operator)

An unlimited amount of parameters.

```ts
const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addNumbers = add(5, 10, 2, 3.7);
```

### Array and Object Destructuring

Similar to Python...

```ts
const [hobby1, hobby2, ...remainingHobbies] = hobbies; // doesn't change the original, just copies

const { firstname: userName, age } = person; // the names have to be the properties
```

## Classes & Interfaces

```ts
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department("Accounting");
```

### Constructors and the `this` Keyword

The rule of thumb is that `describe` below will call on the immediate object and not necessarily on the correct one.

```ts
class Department {
  private name: string;

  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);

    console.log(this.employees);
  }
}

const accounting = new Department("Accounting");

const accoutingCopy = { describe: accounting.describe };

accountingCopy.describe(); // will cause an error, has to add a `name` property to `accountingCopy` and a `this` parameter to `describe`

accounting.addEmployee("Max");

accounting.addEmployee("Manu");

accounting.printEmployeeInformation();
```

### Shorthand Initialization

```ts

constructor(private  id: string, public  name: string) {...}

```

Now you don't even need to mention the property outside the constructor, it will be automatically done for you.

### `readonly` modifier

The `readonly` modifier means that it won't change later.

```ts

constructor (private  readonly  id: string, ...) {...}

```

### Inheritance

The class receives the superclass' constructor by default, unless you add one.

```ts
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");

    this.admins = admins;
  }
}
```

### The `protected` modifier

The property won't be accessible from outside, but it will be accessible from other subclasses.

### Getters and Setters

```ts

get  mostRecentReport() {

return  this.lastReport;

}



set  mostRecentReport(value: string) {

this.addReport(value);

}

```

### Static Methods

Just place the `static` keyword in front of the method:

```ts

static  createEmployee() {}

```

### Abstract Classes

Simply add the `abstract` keyword:

```ts

abstract  describe(): void {}

```

You can also have `abstract` classes and properties. You cannot have a `private abstract` method.

### Singletons and Private Constructors

Add the `private` keyword in front of the constructor:

```ts
class AccountingDepartment extends Department {
  private static instance: AccountingDepartment;

  private constructor() {}

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this;
    } else {
      this.instance = AccountingDepartment("d2", []);

      return this.instance;
    }
  }
}
```

### Interfaces

You don't need to implement a class for the `interface`. An object literal also works:

```ts
interface Person {
  name: string;

  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Max",

  age: 30,

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};
```

We could use the `type` keyword above, but then we wouldn't be able to implement it in a class.

#### Using Interfaces with Classes

You can inherit from only 1 class, but you can implement multiple interfaces.

```ts

class  Person  implements  Greetable {

...

}

```

#### Readonly with Interfaces

You cannot add `public` or `private`, but `readonly` does work.

```ts
interface Greetable {
  readonly name: string;
}
```

#### Extending Interfaces

```ts
interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}
```

#### Interfaces as Function Types

```ts
// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}
```

#### Optional Properties and Methods with Interfaces

```ts

interface  Named {

readonly  name: string;

outputName?: string;

}



class  Person  implements  Greetable {

name?: string;



...

}

```

This also works for parameters.

#### Compiling Interfaces to JavaScript

They are _not_ translated to JS. There is no translation.

## 6. Advanced Typing Concepts

### Intersection Types

```ts
type Admin = {
  name: string;

  privileges: string[];
};

type Employee = {
  name: string;

  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",

  privileges: ["create-server"],

  startDate: new Date(),
};
```

You could also use interfaces with `extends` to achieve the same effect. Intersection types also work with union types.

### Type Guards

Two Options:

- `in`

- `instanceof`

```ts
function add(a: Combinable, b: Combinable) {
  // this type checking functions are called typeGuards
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name: " + emp); // `typeof emp.privileges` won't work

  if ("privileges" in emp) {
    // JS feature

    console.log("Privileges: " + emp.privileges);
  }
}

class Car {
  drive() {}
}

class Truck {
  drive() {}

  loadCargo() {}
}

type Vehicle = Car | Type;

const v1 = new Car();

const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  if (vehicle instanceof Truck) {
  }
}
```

### Discriminated Unions

```ts
interface Bird {
  type: "bird"; // literal type

  flyingSpeed: number;
}

interface Horse {
  type: "horse";

  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  // typeof won't work because interfaces are not compiled

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;

      break;

    case "horse":
      speed = animal.runningSpeed;

      break;
  }

  console.log("Moving with speed: " + speed);
}
```

### Type Casting

```ts
const userInputElement = <HTMLInputElement>(
  document.getElementById("user-input")!
);

// or

const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;
```

The `!` tells TS that it will never be `null`.

### Index Properties

"I don't know how many properties I'll have."

```ts
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",

  username: "Must start with a captial character",
};
```

### Function Overloads

```ts
// Overloading return and parameter types

function add(a: string): string;

function add(a: string, b: string): string;

function add(a: number, b: number): number;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

// Can't call string methods on `Combinable` because TS isn't sure it's a string.

const result = add("Max", "Schwarz");

// const result = add('Max', 'Schwarz') as string; // one solution
```

### Optional Chaining

Same as null-aware chaining in Dart.

```ts
const fetchedUserData = {
  id: "u1",

  name: "Max",

  job: {
    title: "CEO",

    description: "My own company",
  },
};

console.log(fetchedUserData.job && fetchedUserData.job.title); // The JS way

console.log(fetchedUserData?.job?.title);
```

### Nullish Coalescing

Null-aware asignment in Dart.

```ts
const userInput = null;

// const storedData = userInput || 'DEFAULT'; // will work weirdly if userInput is falsy but non-null (`''`)

const storedData = userInput ?? "DEFAULT";
```

## Generics

```ts
const names: Array<string> = []; // array uses Array<T>, which needs to be specified

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});
```

### Creating a Generic Function

Almost the same thing as in Dart:

```ts
function merge<T, U>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: "Max" }, { age: 30 }); // without generics storing it in a variable will not have `name` or `age` available

console.log(mergeObj.age);
```

### Working with Constraints

Really similar to Dart again:

```ts
function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

// With constraints to the generic types, you can't pass 30 anymore

const mergeObj = merge({ name: "Max" }, 30); // How would you access the 30 then?
```

### The `keyof` Constraint

```ts
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,

  key: U
) {
  return obj[key];
}
```

### Generic Classes

```ts
class Storage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}
```

### Generic Utility Types

```ts
interface CourseGoal {
  title: string;

  description: string;

  completeUntil: Date;
}

function createCourseGoal(
  title: string,

  description: string,

  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // properties are going to be completed

  courseGoal.title = title;

  courseGoal.description = description;

  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;

  // return {title: title, description: description, date: date}
}

const names: Readonly<string> = ["Max", "Anna"];

name.push("Manu"); // error, not allowed
```

### Generic vs Union Types

```ts

(string | number | boolean)[] // array with strings, numbers and booleans

// !=

string[] | number[] | boolean[] // array of only string, only numbers or only booleans

```

Generics are more flexible with the types, while unions are more flexible.

## Decorators

> **Metaprogramming**

> Don't forget to enable `experimentalDecorators` in the `tsconfig.json`.

### Class Decorator

The decorator runs when TS finds the constructor definition, not necessarily when it is used.

```ts
function Logger(constructor: Function) {
  console.log("Logging...");

  console.log(constructor);
}

@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object");
  }
}

const person = new Person();

console.log(person);
```

### Decorator Factory

```ts
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);

    console.log(constructor);
  };
}

@Logger("Logging Person") // needs to execute
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object");
  }
}
```

Using decorators for HTML templates:

```ts
function WithTemplate(template: string, hookId: string) {
  return function (constructor: Function) {
    const hookEl = document.getElementById(hookId);

    const p = new constructor(); // Now we can access the object itself.

    if (hookEl) {
      hookEl.innerHTML = template;

      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h2>My Person Object</h2>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object");
  }
}
```

Anyone could import this decorator function to render HTML on their class.

This is basically how Angular uses decorators.

> You can add more than 1 decorator to a class. They are executed bottom-up.

### Other Places Where You Can Add Decorators

Other places where you can add decorators:

- Properties

- Accessors (`set`)

- Methods

- Parameters

Examine the documentation to check which parameters they should have.

### When do decorators execute?

They all execute when a class is defined, instance-wise.

### Returning (and changing) a Class in a Class Decorator

A `class` is nothing more than a constructor function in the end:

```ts
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: Function
  ) {
    return class extends constructor {
      constructor(..._: any[]) {
        super();

        const hookEl = document.getElementById(hookId);

        const p = new constructor(); // Now we can access the object itself.

        if (hookEl) {
          hookEl.innerHTML = template;

          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}
```

### Other Decorator Types

Only decorators on methods and accessors can return something.

#### Creating an "Autobind" Decorator

A method is just a function with a property as a value.

```ts
function Autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true,

    enumerable: false,

    get() {
      const boundFn = originalMethod.bind(this);

      return boundFn;
    },
  };

  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

p.showMessage();

const button = document.querySelector("button");

// The `this` keyword with event listeners... you have to bind stuff without an autobind decorator.

// button.addEventListener('click', p.showMessage.bind(p));

button.addEventListener("click", p.showMessage);
```

### Decorators for validation

```ts
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],

    [propName]: ["required"],
  };
}

function PositiveNumber() {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],

    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    return true;
  }

  let isValied = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];

          break;

        case "positive":
          isValid = isValid && obj[prop] > 0;

          break;
      }
    }
  }

  return isValid;
}

class Course {
  @Required title: string;

  @PositiveNumber price: number;

  constructor(t: string, p: number) {
    this.title = t;

    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault(); // preventing "No HTTP requests"

  const title = document.getElementById("title") as HTMLInputElement;

  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;

  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");

    return;
  }
});
```

```html
<form>
  <input type="text" placeholder="Course title" id="title" />

  <input type="text" placeholder="Course price" id="price" />

  <button type="submit">Save</button>
</form>
```

### Decorator Libraries

- [typestack's `class-validator`][typestack_class_validator]

- Very nice to take a look at professional decorators.

- Angular has a lot of decorators we can import individually.

- NestJS uses decorators for the server side.

[typestack_class_validator]: https://github.com/typestack/class-validator

## Singletons

Just create a class with a `private constructor`.

## Drag and Drop

Use the `dragStart` event from the browser to deal with drag & drop. You also need to add the `draggable="true"` to the HTML element in order for the browser to prepare itself.

```ts

interface  Draggable {

dragStartHandler(event: DragEvent): void;

dragEndHandler(event: DragEvent): void;

}



interface  DragTarget {

dragOverHandler(event: DragEvent): void; // otherwise dropping won't be possible

dropHandler(event: DragEvent): void;

dragLeaveHandler(event: DragEvent): void;

}



...



@autobind

dragOverHandler(_: DragEvent) {

const  listEl = this.element.querySelector('ul')!;

event.preventDefault(); // otherwise dropping is not allowed

listEl.classList.add('droppable'); // this class changes the color of the background in the CSS

}



...



configure() {

this.element.addEventListener('dragover', this.dragOverHandler);

}

```

## Modules and Namespaces

3 options:

- Write different files and have TS compile them all to JS.

- Manual imports.

- Namespaces & File Bundling.

- Bundles multiple TS files into 1 JS files.

- Per-file or bundled compilation is possible (less imports to manage).

- ES6/Exports Modules

- JS already supports imports/exports.

- Per-file compilation but single `<script>` import.

- Bundling via third-party tools (e.g. Webpack) is possible.

### Working with Namespaces

```ts

namespace  App {

export  interface  X {...} // without `export` they wouldn't be available outside the file

```

Importing the `namespace` &mdash; the `///` are mandatory &mdash;:

```ts
/// <reference  path="drag-drop-interfaces.ts"  />

namespace App {
  // put your file code in the same namespace but now in this file
}
```

To bundle all the code into only one JS script, you can change `outFile` in the `tsconfig.json` and change the `module` key to `amd`.

### ES6 Modules

Only work in modern browsers, like Chrome and Firefox.

Importing/exporting exactly what you want.

You can use the `export` keyword without the `namespace` keyword.

```ts
import { Draggable } from "../models/drag-drop.js;"; // remember the `.js`
```

This is more in tune with modern JS and TS.

Use ES6+ on the `module` key of the `tsconfig.json`. The `outFile` key is no longer supported.

And you will need to take `defer` out and insert `module` into the `script` element:

```html
<script type="module" src="dist/app.js"></script>
```

#### Other Import Syntaxes

1. Importing a lot of stuff

```ts
import * as Validation from "../path";
```

1. Aliasing other files' names:

```ts
import { autobind as Autobind } from "../path";
```

1. If you have a file that only exports one thing:

```ts

export  default  class  A {

...

}



...



import  Cmp  from  '../path'; // Choose your own name

```

- This is bad for name conventions though...

#### How does code in modules execute?

If you have a `const` in one file being imported by multiple files, how often does it execute? Only once, when the first import requires it (thankfully).

#### More Resources on JS Modules

- [CommonJS vs AMD vs Require JS vs ES6 Modules][js_modules_overview]

- [MDN Docs on JS Modules][mdn_docs_js_modules]

[js_modules_overview]: https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b
[mdn_docs_js_modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

### Bundling with Webpack

> [Webpack's Official Page][webpack]

[webpack]: https://webpack.js.org/

If you use JS Modules, your code will still appear in different files, so the browser will have a ton of overhead to clear unfortunately.

#### What is Webpack?

Webpack is a bundling & build orchestration tool.

- Normal setup

- Multiple .ts files & imports (HTTP requests)

- Unoptimized code (not as small as possible)

- External development server needed.

- With Webpack

- Code bundles, less imports required

- Optimized (minified) code, less code to download

- More build steps can be added easily

#### Installing Webpack & Other Important Dependencies

```sh

npm install  --save-dev  webpack  webpack-cli  webpack-dev-server  typescript  ts-loader

```

| Package | Purpose |

| -------------------- | --------------------------------------------------------- | ------------- |

| `webpack` | The heart of bundling |

| `webpack-cli` | Running CLI commands with Webpack |

| `webpack-dev-server` | For refreshing the server with the custom | Webpack code. |

| `ts-loader` | How to convert TS code to JS with Webpack. |

| `typescript` | It's a good practice to install a copy of TS per project. |

#### Adding Entry and Output Configurations

1. Make sure `target` is at `es5` or `es6`.

1. `module` should be set to `es6`+.

1. Check your `outDir`.

1. Comment the `rootDir`.

1. Create a `webpack.config.js` file at the root of the project:

```js
const path = require("path");

module.exports = {
  entry: "./src/app.ts",

  output: {
    filename: "bundle.[contenthash].js",

    path: path.resolve(__dirname, "dist"),
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,

        use: "ts-loader",

        exclude: /node-modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
};
```

- `module.exports` is how you export in NodeJS.

1. Add to the `scripts`:

```json

"build": "webpack"

```

1. Run `npm run build`

#### Adding the `webpack-dev-server`

1. Simply replace the `start` key with `"webpack-dev-server"`.

1. Add to `module.exports -> output` `publicPath: 'dist'`.

1. Add to `module.exports` `mode: 'development'`.

#### Adding the Production Workflow

1. Create a `webpack.config.prod.js`

- Webpack doesn't care about this file, name it however you want.

1. Copy the dev configurations.

1. Alter `mode` to `'production'`.

1. Set `devtool` to `'none'`.

1. Run `npm install --save-dev clean-webpack-plugin`

1. Add at the bottom:

```ts

const  CleanPlugin = require('clean-webpack-plugin');



...



plugins: [

new  CleanPlugin.CleanWebpackPlugin()

]

```

1. Use on the `build` key: `"webpack --config webpack.config.prod.js"`

1. `npm run build`.

## 3rd Party Libraries

1. Normal libraries (JS) and using them with TS.

1. TS-specific libraries

### Normal Libraries

1. Lodash

```sh

npm -i --save-dev lodash

```

- TS won't understand it because `lodash` was only written for TS.

- Go to the [DefinitelyTyped][def_typed] repo for the declaration types of the modules (`.d.ts`). The TS docs teach you how to do that.

- You will need to install types for it:

```sh

npm install --save-dev @types/lodash

```

[def_typed]: https://github.com/DefinitelyTyped/DefinitelyTyped

### Using `declare` as a last resort

What if you have a global variable in your HTML `<script>`?

```ts
declare var GLOBAL: any;
```

### Class Transformer

(JSON serialized data from the server)

The `class-transformer` package does this conversion for us.

The same goes for the `class-validator` package.

## HTTP Requests to the Google Maps API

You could use the built-in `fetch`, but the `axios` package offers nicer support.

```ts
axios.get();
```

The response from the Google Maps API will be a nested JSON object.

You can also specify the type of the `get` response:

```ts

axios.get<{results: {geometry: {location: {lat: number, lng: number}}}[]}>(...);

```

Then:

1. Install Google Maps' SDK `<script>`

1. Use the global variable declaration to make TS aware of it:

```ts
declare var google: any;
```

1. Then use `const map = ...` with the coordinates above to place your item on the interactive Google Maps on your website.

1. Use `@types/googlemaps` to get typing support.

## Node.js + Express & TS

Node.js is not able to execute TS code on its own. Compiling the TS code to js and using the `node` CLI to execute it still works though. If you try to execute your TS code, it might work if you have JS-compatible code only.

Install both types:

```sh

npm install  --save-dev  @types/node

npm install  --save-dev  @types/express

```

```ts
import express from "express";

const app = express();

app.listen(3000);
```

### Todo API

```ts
import { Router } from "express";

const router = Router();

router.post("/");

router.get("/");

router.patch("/:id");
```

### Nest.js

It's a Node.js-like server-side framework for TS.
