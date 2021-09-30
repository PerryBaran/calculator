const numberInput = document.querySelectorAll('.number');
const operatorInput = document.querySelectorAll('.operators');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');
const changeSign = document.querySelector('.changeSign');
const displayTop = document.querySelector('.top');
const displayBottom = document.querySelector('.bottom');

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
        return "Don't even try it";
    } else {
        return a / b;
    }
};

function power(a, b){
    return a ** b;
};

function root(a, b){
    return b ** (1/a);
}

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
    if (currentOperator === '') {
        savedNumber = currentNumber.toString();
        currentNumber = '';
    } else {
        savedNumber = operate(currentOperator, Number(savedNumber), Number(currentNumber));
        currentNumber = '';
    }
    if (savedNumber.toString().includes('Infinity')) {
        savedNumber = 'Too big for me to calculate'
    }
    currentOperator = '';
    updateDisplay();
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
        currentNumber = currentNumber.slice(0, -1);
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
}

function notANumber () {
    if (isNaN(savedNumber)) {
        clearDisplay();
    }
}

function append(number){
    currentNumber = currentNumber.toString() + number.toString();
    updateDisplay();
};

function updateDisplay(){
    displayBottom.innerHTML = currentNumber;
    displayTop.innerHTML = savedNumber + ' ' + currentOperator;
}

numberInput.forEach(button => {
    button.addEventListener('click', () => {
        notANumber();
        if (currentNumber.includes('.') && button.innerHTML === '.'){
        } else if (currentNumber.length < 13) {
        append(button.innerHTML);
        }
    });
});

operatorInput.forEach(button => {
    button.addEventListener('click', () => {
        notANumber();
        if (currentNumber === '' && savedNumber === '' && button.innerHTML === '√') {
            savedNumber = '2';
        } else if (currentNumber === '' && savedNumber === '') {
            savedNumber = '0';
        } else if (currentNumber === '') {
        } else if (currentOperator !== '') {
            equateDisplay();
        }
        else {
            savedNumber = currentNumber.toString();
        }
        currentNumber = '';
        currentOperator = button.innerHTML;

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
    deleteLast();
});

changeSign.addEventListener('click', () => {
    change();
});