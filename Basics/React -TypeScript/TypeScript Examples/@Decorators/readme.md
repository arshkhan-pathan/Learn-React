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
