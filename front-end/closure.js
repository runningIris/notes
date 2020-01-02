//闭包是指能够访问自由变量的函数。换句话说，闭包中定义的函数能够'记忆'它被创建的环境。
//注：自由变量是既不是在本地声明又不作为参数传递的一类变量。（译者注：如果一个作用域中使用的变量并不是在该作用域中声明的，那么这个变量对于该作用域来说就是自由变量）
function numberGenerator(){
	var num = 1;
	function checkNumber(){
		console.log(num);
	}
	num++;
	return checkNumber;
}
var number = numberGenerator();
number(); // 2


//rawnumberGenerator.js
//numberGenerator函数创建了一个局部自由变量num(一个数字)和checkNumber函数（一个可以在控制台打印num的函数）。 checkNumber函数没有自己的局部变量，但是，由于使用了闭包，它通过numberGenerator这个外部函数来访问(外部声明的)变量。因此，即使在numberGenerator函数被返回以后，checkNumber函数也可以使用numberGenerator中声明的变量 num 从而成功地在控制台记录日志。
                        
function sayHello(){
	var say = function(){
		console.log(hello);
	}
	var hello = 'Hello world!';
	return say;
}
var sayHelloClosure = sayHello();
sayHelloClosure(); // 'Hello world!'


// 在GitHub 上查看 rawsayHello
// 在这个例子中我们演示了一个闭包包含了外围函数中声明的全部局部变量。请注意，变量 hello 是在匿名函数之后定义的，但是该匿名函数仍然可以访问到 hello 这个变量。这是因为变量hello在创建这个函数的“作用域”时就已经被定义了，这使得它在匿名函数最终执行的时候是可用的。（不必担心，我会在本文的后面解释“作用域”是什么，现在暂时跳过它！）


// 执行上下文
// Execution Context
// ECMAScript规范使用它来追踪代码的执行。它可能是你的代码第一次执行或执行的流程进入函数主体时所在的全局上下文。


//global Execution Context
var x = 10;
function foo(){
	// Execution Context(foo)
	var y = 20; // free variable

	function bar(){
		//Execution Context(bar)
		var z = 15;
		var output = x+y+z;
		return output;
	}
	return bar;
}


// 执行上下文

// 在任意一个时间点，只有唯一一个执行上下文在运行之中。
// 这就是为什么JavaScript是‘单线程’的原因，意思就是一次只能处理一个请求。一般来说，浏览器会用‘栈’来保存这个执行上下文。栈是一种‘后进先出’（Last In First Out）的数据结构，即最后插入该栈的元素会最先从栈中被弹出（这是因为我们只能从栈的顶部插入或删除元素）。当前的执行上下文，或者说正在运行中的执行上下文永远在栈顶。
// 当运行中的上下文被完全执行以后，它会从栈顶弹出，使得下一个栈顶的项接替它成为正在运行的执行上下文。

// 一个执行上下文正在运行并不代表另一个执行上下文需要等待它完成运行之后才可以开始运行。 一个正在运行中的上下文暂停或中止，另一个上下文开始执行。暂停的上下文可能在稍后某一时间点从它中止的位置继续执行。一个新的执行上下文被创建并推入栈顶，成为当前的执行上下文，这就是执行上下文替代的机制。


var x = 10;
function foo(a){
	var b = 20;
	function bar(c){
		var d = 30;
		return boop(x+a+b+c+d);
	}
	function boop(e){ 
		return e*-1;
	}
	return bar;
}

var moan = foo(5); //closure


// The function below executes the function bar which was returned.
// when we executed the function foo in the line above. 
// The function bar invokes boop, at which point bar gets suspended and boop gets push 
// onto the top of the call track(see the screenshot below)


moar(15);

每个执行上下文都有用于跟踪代码执行进程的各种状态的组件。包括：
- 代码执行状态： 任何需要开始运行，暂停和恢复执行上下文相关代码执行的状态
- 函数： 上下文中正在执行的函数对象（正在执行的上下文是脚本或模块的情况下可能是null）
- Realm： 一系列内部对象，一个ECMAScript全局环境，所有在全局环境的作用域内加载的ECMAScript代码，和其他相关的状态及资源。
- 词法环境： 用于解决此执行上下文内代码所做的标识符引用。
			明确声明了它解决了这个执行上下文内的代码中的“标识符引用”。 “标识符”可以说是变量。
			由于我们最初的目的就是弄清楚它是如何做到在一个函数（或“上下文”）返回后还能神奇地访问变量。				
- 变量环境： 一种词法环境，该词法环境的环境记录保留了变量声明时在执行上下文中创建的绑定关系。

		从技术上来说，变量环境和词法环境都是用来实现闭包的，但为了简单起见，我们将这二者归纳为“环境”。
		想了解关于词法环境和变量环境的区别的更详尽的解释，可以参看 Alex Rauschmayer 博士这篇非常棒的文章。


###词法环境：

定义： 词法环境是一个基于ECMAScript代码的词法嵌套结构来定义特定变量和函数标识符的关联的规范类型。
词法环境由一个环境记录和一个可能为空的对外部词法环境的引用构成。
通常，一个词法环境会与ECMAScript代码的一些特定语法结构相关联，
例如： FunctionDeclaration（函数声明）， BlockStatement（块语句），TryStatement（Try语句）的catch clause（catch子句）。
每当此类代码执行时，都会创建一个新的词法环境。

- “用于定义标识符的关联”： 词法环境目的就是在代码中管理数据（即标识符）。
它给标识符赋予了含义。
比如当我们写出这样一行代码"log(x/10)"，如果我们没有给变量x赋予一些含义（声明变量x），那么这个变量（或者说标识符）x就是毫无意义的。词法环境就通过它的环境记录（参见下文）提供了这个含义（或"关联"）。

- “词法环境包含一个环境记录” ：环境记录保存了所有存在于该词法环境中的标识符及其绑定的记录。
每一个词法环境都有它自己的环境记录。

- “词法嵌套结构”： 这是最有趣的部分，它大致说明了一个内部环境引用了包围它的外部环境，
同时，这个外部环境还可以有它自己的外部环境。
结果就是，一个环境可以作为外部环境服务于多个内部环境。全局环境是唯一一个没有外部环境的词法环境。

LexicalEnviroment = {
	EnvironmentRecord: {
		// Identifier bindings go here
	},
	// Reference to the outer environment
	outer: <>
}


- "每当查看此类代码时，就会创建一个新的词法环境"：每次一个外围函数被调用时，就会创建一个新的词法环境。
边注：函数并不是创建词法环境的唯一途径。其他途径包括：块语句或 catch 子句。

作用域链
var x = 10;
function foo(){
	var y = 20; // free variable
	function bar(){
		var z = 15; //free variable
		return x+y+z;
	}
	return bar;
}
在这个作用域链，或者说与函数相关联的环境链，在函数被创建时就被保存在函数对象中。
换句话说，它被静态地定义在源代码内部。（也被称为“词法作用域”。）

动态作用域 vs. 静态作用域

动态作用域的语言“基于栈来实现”，意思就是函数的局部变量和参数都储存在栈中。因此，程序堆栈的运行状态决定你引用的是什么变量。

静态作用域是指当创建上下文时，被引用的变量就被记录在其中。也就是说，这个程序的源代码结构决定你指向的是什么变量。

rawstaticvsdynamic1.js
var x = 10;
function foo(){
	var y = x + 5;
	return y;
}
function bar(){
	var x = 2;
	return foo();
}
function main(){
	foo(); // Static scope: 15; Dynamic scope: 15
	bar(); // Static scope: 15; Dynamic scope: 7
	return 0;
}

当调用函数bar的时候，静态作用域和动态作用域返回了不同的值。

在静态作用域中，bar的返回值是基于函数foo创建时x的值，这是因为源代码的静态和词法环境的结构导致x是10而最终结果是15；

而另一方面，动态作用域给了我们一个运行时追踪变量定义的栈———— 因此，
由于我们使用的x在运行时被动态地定义，所以它的值取决于x在当前作用域的实际的定义。函数bar 在运行时将x = 2 推入栈顶，从而使得foo返回7。

var myVar = 100;
function foo(){
	console.log(myVar);
}
foo(); //  Static scope: 100; Dynamic scope: 100 	
(function(){
	var myVar = 50;;
	foo(); //  Static scope: 100; Dynamic scope: 100 	
})();
// Higher-order function
(function(arg){
	var myVar = 1500;
	arg(); // Static scope: 100; Dynamic scope: 1500;
})(foo);

在 GitHub 上查看 rawstaticvsdynamic2.js

类似地，在以上的动态作用域的例子中， 变量myVar 是通过被调用的函数中（动态定义）的myVar来解析的，而相对静止作用域来说，myVar解析为在创建时即储存于两个立即调用函数（IIFE， Immediately Invoked Function Expression）的作用域中的变量。

动态作用域通常会导致一些歧义。它没有明确自由变量会从哪个作用域被解析。

闭包//???

每个函数都有一个执行上下文，
它包含一个在函数中能够赋予变量含义的环境和一个对其父环境的引用。//??
对父环境的引用使得它父环境中的所有变量可以用于内部函数，
无论内部函数是在创建它们（这些变量）的作用域以外还是以内调用的。

因此，这看起来就像是函数会“记得这个环境（或者说作用域），因为字面上来看函数能够引用环境（和环境中定义的变量）”

rawnesting2.js

var x = 10;
function foo(){
	var y = 20; //free variable
	function bar(){
		var z = 15; //free variable
		return x+y+z;
	}
	return bar;
}
var test = foo();
test(); // 45

基于我们对环境如何运作的理解，我们可以说，在上述例子中环境的定义看起来就像是以下代码中这样的（注意，这只是伪代码而已）：

GlobalEnvironment = {
	EnvironmentRecord: {
		// built-in identifiers

		Array: '<func>',
		Object: '<func>',

		// ect...
		// custom identifiers

		x: 10
	}
	outer: null
};
fooEnvironment = {
	EnvironmentRecord: {
		y: 20,
		bar: '<func>'
	},
	outer: GlobalEnvironment
};
barEnvironment = {
	EnvironmentRecord: {
		z: 15
	}
	outer: fooEnvironment
}

当我们调用函数test，我们得到的值是45，它也是调用函数bar的返回值（因为foo返回函数bar）。即使foo已经返回了值，但是bar仍然可以访问自由变量y, 因为bar通过外部环境引用y，这个外部环境即foo的环境！ bar还可以访问全局变量x, 因为foo的环境通向全局变量。这叫做“作用域链查找”。

为了实现闭包，我们不能经由一个动态的栈来存储变量（不能使用动态作用域）。
原因是，这（使用动态作用域）意味着当一个函数返回时，变量将会从栈中弹出并且不再可用——这与我们最初定义的闭包相互矛盾。
真正的情况应该正相反，闭包中父上下文的数据储存于“堆”（heap, 一种数据结构）中，它允许数据在调用的函数返回（也就是在执行上下文在执行调用的栈中弹出）以后仍然能够保留。

Example 1： 
我们在for-loop中尝试将其中的计数变量和其他函数想关联：
var result = [];
for(var i = 0; i < 5; i++){
	result[i] = (function(x){
		console.log(x);
	})(i);
}

Example 2:
这个例子展示了没调用一次函数就会创建一个新的单独的闭包：
function main(num, obj){
	// This array variable. along with the 2 parameters passed in, 
	// are 'captured' by the nested function 'doSomething'
	var array = [1,2,3];
	function doSomething(i){
		num += i;
		array.push(num);
		console.log('num:' + num);
		console.log('array:' + array);
		console.log('obj.value:' + obj.value);
	}
	return doSomething;
}
var referenceObject = { value: 10 };

var foo = main(2, referenceObject);
var bar = main(6, referenceObject);
foo(2);

在这个例子中，可以看到每次调用函数main都会创建一个新的闭包，叫做foo和bar。
随后对每个闭包函数的调用更新了其中的变量，表明在main返回以后的很长一段时间，每个闭包中的变量仍然能够继续使用。

Example 3: 
function mysteriousCalculator(a, b){
	var mysteriousVariable = 3;
	return {
		add: function(){
			var result = a + b + mysteriousVariable;
			return toFixedTwoPlaces(result);
		},
		subtract: function(){
			var result = a - b - mysteriousVariable;
			return toFixedTwoPlaces(result);
		}
	}
}

function toFixedTwoPlace(value){
	return value.toFixed(2);
}

var myCalculator = mysteriousCalculator(1, 2)
myCalculator.add();
myCalculator.subtract();

可以观察到 mysteriousCalculator 在全局作用域中，并且它返回两个函数。
用伪代码分析，以上例子的环境看起来是这样子的：
GlobalEnvironment = {
	EnvironmentRecord: {
		// built-in identifiers

		Array: '<func>',
		Object: '<func>',

		// etc...

		// custom identifiers
		mysteriousCalculator: '<func>',
		toFixedTwoPlaces: '<func>',
	},
	outer: null,
};
mysteriousCalculatorEnvironment = {
	EnvironmentRecord: {
		a: 10.01,
		b: 2.01,
		mysteriousVariable: 3,
	}
	outer: GlobalEnvironment,
};
addEnvironment = {
	EnvironmentRecord: {
		result: 15.02
	},
	outer: mysteriousCalculatorEnvironment,
};
subtractEnvironment = {
	EnvironmentRecord: {
		result: 5.00
	}
	outer: mysteriousCalculatorEnvironment,
};

因为我们的add 和 subtract 函数引用了mysteriousCalculator 函数的环境，
这两个函数能够使用该环境中的变量来计算结果。

Example 4:

最后一个例子表明了闭包的一个非常重要的用途：
保留外部作用域对一个变量的私有引用（仅通过唯一途径例如某一个特定函数来访问一个变量）。

function secretPassword(){
	var password = 'xh38sk';
	return {
		guessPassword: function(guess){
			if(guess === password){
				return true;
			} else{
				return false;
			}
		}
	}
}
var passwordGame = secretPassword();
passwordGame.guessPassword('heyisthisit?'); //false
passwordGame.guessPassword('xh38sk'); //true

- 执行上下文
用于追踪代码的执行状态。在任意时间点，只能有唯一一个执行上下文对应正在执行的代码。
- 每个执行上下文都有一个词法环境。这个词法环境保持着标识符的绑定（即变量和与其相关联的变量），还可以引用它的外部环境。
- 每个环境能够访问的标识符集叫做“作用域”。 我们可以将这些作用域嵌套成为一个分级的环境链————就是我们引用它的外部环境。
- 每个函数都有一个执行上下文，它包括一个在函数中赋予变量含义的词法环境和对其父环境的引用。因为函数对环境的引用，使它看起来就像是函数“记住了”这个环境（作用域）一样。这就是一个闭包。
- 每当一个封闭的外部函数被调用时都会创建一个闭包。换句话说，内部函数不需要为了创建闭包而返回。
- 在JavaScript中，闭包是词法相关的，意思是它在源代码中由它的位置而静态地被定义。
- 闭包有很多实际应用案例。一个非常重要的途径就是保留外部作用域对一个变量的私有引用（仅通过唯一途径例如某一个特定函数来访问一个变量）。
