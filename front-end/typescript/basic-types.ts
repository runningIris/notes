// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
let sentence: string = `Hello, my age is ${decimal}, and my favorite color is ${color}`;

// Array
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// Tuple
// Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.
let x: [string, number];
x = ["hello", 10];

// Enum
// A helpful addition to the standard set of datatypes from JavaScript is the enum. As in languages like C#, an enum is a way of giving more friendly names to sets of numeric values.
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
enum Color {Red=1, Green, Blue}
let c: Color = Color.Green;

let colorName: string = Color[2];
console.log(colorName);
// Print: Green

// Any
let notSure: any = 4;
notSure.ifItExists(); // Okay, it might exist in runtime
notSure.toFixed(); // Okay, it might exist in runtime
notSure = 'maybe a string instead';
notSure = false;

let prettySure: Object = 4;
prettySure.toFixed(); // Error

let list: any[] = [1, true, 'free'];
list[1] = 100;

// Void
function warnUser(): void {
  console.log('this is my warning message.');
}

let u: undefined = undefined;
let n: null = null;

// Never
// The never type represents the type of values that never occur.
// For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns;
// Variables also acquire the type never when narrowed by any type guards that can never be true.
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error('Something failed');
}

function infiniteLoop(): never {
  while (true) {
  }
}

// Object
declare function create(o: object | null): void;

create({ props: 0 });
create(null);
create(42); // Error
create("string"); //Error
create(undefined); // Error

let someValue: any = "this is a string";
let strLength1: number = someValue.length;
let strLength2: number = (<string>someValue).length;
let strLength3: number = (someValue as string).length;
