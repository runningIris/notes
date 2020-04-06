// Generic
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");

output = identity("myString");

function loggingIdentity<T>(arg: T): T {
    console.log(arg.length); // error! doesn't have .length
    return arg
}

function loggingIdentity1<T>(arg: T[]): T {
    console.log(arg.length); // okay
    return arg[0];
}

// generic types
let myIdentity: <U>(arg: U) => U = identity;
let myIdentity1: { <T>(arg: T): T } = identity;

interface GenericIdentityFn {
    <T>(arg: T): T;
}

let myIdentity2: GenericIdentityFn = identity;

interface GenericIdentityFn1<T> {
    (arg: T): T;
}

let myIdentity3: GenericIdentityFn1<number> = identity;

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// Generic Constraints
interface Lengthwise {
    length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity2(3); // Error! number doesn't have the .length property
loggingIdentity2({ length: 10, value: 3 });
loggingIdentity2([3423, 321312, 333]);

// Using type parameters in generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, 'a');
getProperty(x, 'm'); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// using class types in generics
function create<T>(c: { new(): T }): T {
    return new c();
}

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
