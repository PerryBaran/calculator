const numberInput = document.querySelectorAll('.number');
const operatorInput = document.querySelectorAll('.operators');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');
const changeSign = document.querySelector('.changeSign');
const swap = document.querySelector('.swap')
const displayTop = document.querySelector('.top');
const displayBottom = document.querySelector('.bottom');
const container = document.querySelector('.mainContainer');

var currentNumber = '';
var savedNumber = '';
var currentOperator = '';

function add(a, b) {
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    if (b === 0){
        return "nope";
    } else {
        return a / b;
    }
};

function power(a, b){
    if (a < 0 && b > 0 && b < 1) {
        return "nope";
    } else {
        return a ** b;
    }
};

function root(a, b){
    if (b < 0) {
        return "nope";
    } else {
        return b ** (1/a);
    }
};

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x') {
        return multiply(a, b);
    } else if (operator === '÷') {
        return divide(a, b);
    } else if (operator === '^') {
        return power(a, b);
    } else if (operator === '√') {
        return root(a, b);
    } else if (operator === '') {
        return currentNumber;
    }
};

function equateDisplay() {
    minusOne();
    if (currentOperator === '') {
        savedNumber = currentNumber.toString();
    } else {
        savedNumber = operate(currentOperator, Number(savedNumber), Number(currentNumber));
    }
    if (savedNumber.toString().includes('Infinity')) {
        savedNumber = "too big"
    } else if (savedNumber === '-0') {
        savedNumber = '0'
    }
    currentNumber = '';
    currentOperator = '';
    updateDisplay();
};

function append(number){
    currentNumber = currentNumber.toString() + number.toString();
    updateDisplay();
};

function chooseOperator(operator) {
    if (currentNumber === '' && savedNumber === '') {
        if (operator === '√' || operator === '^') {
            savedNumber = '2';
        } else if (operator === '÷' || operator === 'x') {
            savedNumber = '1';
        } else {
            savedNumber = '0';
        }
    } else if (currentNumber === '') {
    } else if (currentOperator !== '') {
        equateDisplay();
    }
    else {
        savedNumber = currentNumber.toString();
    }
    currentNumber = '';
    currentOperator = operator;
};

function clearDisplay(){
    currentNumber = '';
    savedNumber = '';
    currentOperator = '';
    updateDisplay();
};

function deleteLast(){
    if (currentNumber === '') {
        currentOperator = '';
    } else {
        currentNumber = currentNumber.toString().slice(0, -1);
    }
    updateDisplay();
};

function change(){
    if (currentNumber.charAt(0) !== '-') {
        currentNumber = '-' + currentNumber.toString();
    } else {
        currentNumber = currentNumber.substring(1);
    }
    updateDisplay(); 
};

function swapNumbers(){
    var holdNumber = currentNumber;
    currentNumber = savedNumber;
    savedNumber = holdNumber;
    updateDisplay();
};

function notANumber () {
    if (isNaN(savedNumber)) {
        clearDisplay();
    }
};

function updateDisplay(){
    if (currentNumber.toString().length <= 13) {
        displayBottom.innerHTML = currentNumber;
    } else if (Number(currentNumber) > 999999999999) {
        displayBottom.innerHTML = Number(currentNumber).toExponential(7);    
    } else {
        displayBottom.innerHTML = currentNumber.toString().slice(0, 13);
    }
    displayTop.innerHTML = savedNumber + ' ' + currentOperator;
};

function minusOne(operator){
    if (currentNumber === '-') {
        if (operator === '√') {
            currentNumber = '-2';
        } else if (operator === '+' || operator === '-') {
            currentNumber = '0';
        } else {
            currentNumber = '-1';
        }
    }
};

numberInput.forEach(button => {
    button.addEventListener('click', () => {
        notANumber();
        if (currentNumber.toString().includes('.') && button.innerHTML === '.'){
        } else if (currentNumber.toString().length < 13) {
            append(button.innerHTML);
        }
    });
});

operatorInput.forEach(button => {
    button.addEventListener('click', (e) => {
        notANumber();
        minusOne(button.innerHTML);
        chooseOperator(button.innerHTML);
        updateDisplay();
    });
});

equals.addEventListener('click', () => {
    notANumber();
    equateDisplay();
});

clear.addEventListener('click', () => {
    clearDisplay();
});

del.addEventListener('click', () => {
    notANumber();
    deleteLast();
});

changeSign.addEventListener('click', () => {
    notANumber();
    change();
});

swap.addEventListener('click', () => {
    notANumber();
    swapNumbers();
})

window.addEventListener('keydown', function(e) {
    const input = document.querySelector(`button[data-key="${e.keyCode}"`);
    e.preventDefault();
    if(!input) return;
    input.click();
});

container.addEventListener('mouseover', function(e) {
    const inputID = e.target.id;
    const shortcut = document.querySelector('.shortcut');
    if (!inputID) {
        shortcut.innerHTML = '';
    } else if (inputID === 'CLEAR') {
        shortcut.innerHTML = 'SPACE';
    } else if (inputID === 'SWAP') {
        shortcut.innerHTML = 'TAB';
    } else if (inputID === 'DEL') {
        shortcut.innerHTML = 'BACKSPACE';
    } else if (inputID === '=') {
        shortcut.innerHTML = 'ENTER';
    } else if (inputID === '±') {
        shortcut.innerHTML = 'ALT';
    } else if (inputID === '^') {
        shortcut.innerHTML = 'SHIFT';
    } else if (inputID === '√') {
        shortcut.innerHTML = 'CTRL';
    } else if (inputID === 'x') {
        shortcut.innerHTML = 'NUMPAD *'
    } else if (inputID === '÷') {
        shortcut.innerHTML = 'NUMPAD /'
    } else {
        shortcut.innerHTML = 'NUMPAD ' + inputID;
    }
});