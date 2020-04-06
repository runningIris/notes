// function type
let myAdd: (baseValue: number, increment: number) => number = function (x: number, y: number) {
    return x + y;
};

// Optional and default parameters
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right

//-----

function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result4 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result5 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result6 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result7 = buildName("Bob", "Adams");         // ah, just right

// Rest Parameters
function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + ' ' + restOfName.join(' ');
}

let employeeName = buildName3('Joseph', 'Samuel', 'Lucas', 'Mackinzie');

let buildNameFunc: (fname: string, ...rest: string[]) => string = buildName;

// this

interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardsPicker: function (this: Deck) {
        // lock this
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};

let cardPicker = deck.createCardsPicker();
let pickedCard = cardPicker();
alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit);

// this parameters in callbacks
interface UIElement {
    addClickListener(onClick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onclickBad(this: Handler, e: Event) {
        this.info = e.message;
    }
    onclickGood(this: void, e: Event) {
        this.info = e.message;
    };
}

let h = new Handler();
uiElement.addClickListener(h.onclickBad); // error!
uiElement.addClickListener(h.onclickGood); // okay

// overloads
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x: any): any {
    if (typeof x == 'object') {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == 'number') {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
let pickedCard2 = pickCard(15);
