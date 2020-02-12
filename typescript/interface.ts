// interface

function printLabel(labelObject: { label: string }) {
  console.log(labelObject.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface labeledValue {
  label: string;
}
function printLabel1(labelObject: labeledValue) {
  console.log(labelObject.label);
}

// ?
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number;} {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: 'black' });

// readonly
interface Point{
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 3; // Error

// ReadonlyArray<T>
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[1] = 3; // Error
ro.push(5); // Error
a = ro; // Error
a = ro as number[]; // okay

// variables use const
// properties use readonly

let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any
}

createSquare({ width: 100, opacity: 0.5, colour: 'white', age: 1 });

// Function Types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
}

let mySearch2: SearchFunc = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}

// Indexable Types
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ['Bob', 'Freud'];
let myStr: string = myArray[0];

class Animal {
  name: string;
  constructor() {
    this.name = 'aa';
  }
}
class Dog extends Animal {
  breed: string;
  constructor() {
    super();
    this.breed = 'hh';
  }
}

// because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object
interface NotOkay {
  [x: string]: Animal;
  [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, the type of 'name' is not a subtype of the indexer
}

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number;    // ok, length is a number
  name: string;    // ok, name is a string
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'mallory'; // Error!

// Class Types

interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  constructor(h: number, m: number) { }
}

interface ClockInterface2 {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock2 implements ClockInterface2 {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {  }
}

// the constructor sits in the static side, it is not included in this check.
interface ClockConstructor {
  new (hour: number, minite: number): ClockInterface2;
}

interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface2 {
  return new ctor(hour, minute);
}

class DigitalClock extends Clock2 implements ClockInterface2 {
  constructor(h: number, m: number) { super(h, m); }
  tick() { console.log("beep beep"); }
}

class AnalogClock extends Clock2 implements ClockInterface2 {
  constructor(h: number, m: number) {
    super(h, m);
   }
  tick() { console.log('tick tock');}
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// Extending Interfaces
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

// Hybrid Types

interface Counter {
  (start: number): string; // constructor
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter;
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// Interfaces Extending Classes
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    private state: any;
    select() { }
}
