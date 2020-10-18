let container = document.querySelector('.container');
let displayVal = '0';
let firstNumber = null;
let operator = null;
let secondNumber = '0';
let newOp = '';
let num = 0;
wrote = [];
const display = document.querySelector('.display');

let allButtons = ['clear', 'delete', 'percentage', 'divide'
    , 'nine', 'eight', 'seven', 'multiply'
    , 'six', 'five', 'four', 'plus'
    , 'three', 'two', 'one', 'minus'
    , 'zero', 'decimal', 'sign', 'equal'];

let buttonText = ['AC', 'DEL', '%', '/', '9', '8', '7', '*', '6', '5', '4', '+',
    '3', '2', '1', '-', '0', '.', '+/-', '='];

const operands = ["+", "-", "*", "/"];

for (let i = 0; i < 20; i++) {

    let button = document.createElement('button');
    button.classList.add(String(allButtons[i]));
    button.style['grid-area'] = String(allButtons[i]);
    button.setAttribute("key", `${buttonText[i]}`);
    button.innerHTML = buttonText[i];

    container.appendChild(button);
}

window.addEventListener('keydown', function (e) {

    e.preventDefault();

    if (e.key === "Enter") {
        let key = document.querySelector(`button[key='=']`);
        key.click();

    } else if (buttonText.includes(e.key)) {
        let key = document.querySelector(`button[key='${e.key}']`);
        key.click();

    } else if (e.key === "Backspace") {
        let key = document.querySelector(`button[key='AC']`);
        key.click();
    } else if (e.key === "Delete") {
        let key = document.querySelector(`button[key='DEL']`);
        key.click();
    }

});

const buttons = document.querySelectorAll('button');

function show() {

    if (displayVal === 'BOOOOM!') {
        display.innerHTML = 'BOOOOM!';
    } else if (!isNaN(displayVal) && !isNaN(display.innerHTML)) {
        write = [...String(parseFloat(displayVal))];
        display.innerHTML = write.join('');
        if (write.includes('.')) {
            num = write.indexOf('.')
        } else {
            num = write.length;
        }


        if (write.length > 13 && num <= 13) {
            displayVal = String(round(write.join(''), Math.abs(13 - num)));
            display.innerHTML = displayVal;

        } else if ((write.length > 13) && num > 13) {
            displayVal = String(parseFloat(write.join('')).toExponential(1));
            display.innerHTML = displayVal;

        }

        if (isNaN(display.innerHTML)) {
            display.innerHTML = Infinity;
        }
    }
}

function round(num, decis) {


    return +(Math.round(num + "e+" + decis) + "e-" + decis);

}

show();

mathArray = [];
calcObj = {};
let firstArray = [];
let b = 0;

Object.size = function (obj) {
    let size = 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) size++
    }
    return size;
}

function calculate(e) {

    let btns = e.target.innerHTML;
    if ((btns >= 0 || btns === '.' || btns === "DEL") && firstNumber === null) {

        if (btns >= 0) {

            firstArray.push(btns);

        } else if (btns === '.' && !firstArray.includes('.')) {
            firstArray.push(btns);

        }

        if (btns === "DEL") {
            firstArray.pop();
        }
        if (firstArray.length === 0) {
            displayVal = '0';
            show();

        } else {

            displayVal = firstArray.join('');
            show();
        }

    } else if ((operands.includes(btns)) && operator === null) {
        firstNumber = parseFloat(display.innerHTML);
        mathArray.push(firstNumber);


        operator = btns;
        mathArray.push(operator);

        firstArray = [];
    }

    if (btns === "%") {
        displayVal = display.innerHTML / 100;
        firstArray = [...String(displayVal)];
        show();
    }

    if (btns === "=" && mathArray.length == 2) {
        displayVal = operate(mathArray[0], mathArray[1], parseFloat(display.innerHTML));
        firstArray = [...String(displayVal)];
        mathArray.splice(0);
        show();
    }


    if (btns === "AC") {
        clearCalc();

    } else if (btns === "+/-") {
        signCalc();
    }

    if (mathArray.length >= 2) {
        outputCalc();
    }

}

function clearCalc() {
    displayVal = '0';
    display.innerHTML = displayVal;
    show();
    firstArray.splice(0);
    mathArray = [];
}

function signCalc() {
    if (displayVal !== Infinity) {
        displayVal = displayVal * - 1;
        firstArray = [...String(displayVal)];
        show();
    }
}

function outputCalc() {

    if (isNaN(mathArray[0]) && (mathArray[2] == undefined)) {
        mathArray[0] = 0;
    }

    const calc = mathArray.map((item) => {
        return item;
    });

    if (calc.length == 4) {
        if (isNaN(calc[2])) {
            calc[2] = calc[0];
        }
        mathArray[0] = operate(calc[0], calc[1], calc[2]);
        mathArray[1] = calc[3];
        calc.splice(0)
        mathArray.splice(2);

        displayVal = String(mathArray[0]);
        show();
    }

    firstNumber = null;
    operator = null;
}

function operate(a, op, b) {

    if (op == '/') {
        if (b == 0) {
            return "BOOOOM!";

        } else {
            return a / b;
        }
    } else if (op == "*") {
        return a * b;

    } else if (op == "+") {
        return a + b;
    } else if (op == "-") {
        return a - b;
    }
}



buttons.forEach(btn => btn.addEventListener('click', calculate));






