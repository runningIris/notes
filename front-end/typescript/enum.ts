// Enums

enum FileAccess {
    None,
    Read = 1 << 1, // 2
    Write = 1 << 2, // 4
    ReadWrite = Read | Write, // 6
    G = '123'.length
}

enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle,
    radius: number
}

let c: Circle = {
    kind: ShapeKind.Circle,
    radius: 100
};

enum E {
    X, Y, Z
}

function f(obj: { X: number }) {
    return obj.X;
}

f(E);

enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num < LogLevel.WARN) {
        console.log('Log level key is: ', key);
        console.log('Log level value is: ', num);
        console.log('Log Level message is: ', message);
    }
}

printImportant('ERROR', 'This is a message.');

enum Enum {
    A
}

let a = Enum.A;

let nameOfA = Enum[a]; // "A"

const enum ConstEnum {
    A = 1,
    B = A*2
}

//编译后销毁,和普通枚举会实际存在的变量不一样
const enum Directions {
    Up, Down, Left, Right
}

let directions = [
    Directions.Up,
    Directions.Down,
    Directions.Left,
    Directions.Right
];

// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 外部枚举
declare enum AmbientEnum {
    A = 1, B, C = 2
}

console.log(AmbientEnum.A);
