const numberInput = document.querySelectorAll('.number');
const operatorInput = document.querySelectorAll('.operators');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');
const displayTop = document.querySelector('.top');
const displayBottom = document.querySelector('.bottom');


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
        return 'nah';
    } else {
        return a / b;
    }
};

function power(a, b){
    return a ** b;
};

function clearDisplay(){
    displayTop.innerHTML = '';
    displayBottom.innerHTML = '';
    operatorInput = undefined;
}

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    } else if (operator === '^') {
        return power(a, b);
    }
};

function append(number){
    displayBottom.innerHTML = displayBottom.innerHTML.toString() + number.toString();
};

numberInput.forEach(button => {
    button.addEventListener('click', () => {
        append(button.innerHTML);
    });
});

operatorInput.forEach(button => {
    button.addEventListener('click', () => {
        displayTop.innerHTML = displayBottom.innerHTML + ' ' + button.innerHTML.toString();
        displayBottom.innerHTML = '';
    });
});

equals.addEventListener('click', () => {
    const operator = displayTop.innerHTML.slice(-1)
    const a = displayTop.innerHTML.slice(0, -2);
    const b = displayBottom.innerHTML;
    displayTop.innerHTML = operate(operator, a, b);
    displayBottom.innerHTML = '';
});
