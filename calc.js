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
        return "Don't even try it";
    } else {
        return a / b;
    }
};

function power(a, b){
    return a ** b;
};

function equateDisplay() {
    const operator = displayTop.innerHTML.slice(-1);
    const a = Number(displayTop.innerHTML.slice(0, -2));
    const b = Number(displayBottom.innerHTML);
    displayTop.innerHTML = operate(operator, a, b);
    displayBottom.innerHTML = '';
    if (displayTop.innerHTML == 'Infinity') {
        displayTop.innerHTML = 'Too big for me'
    }
};

function clearDisplay(){
    displayTop.innerHTML = '';
    displayBottom.innerHTML = '';
};

function deleteLast(){
    if (displayBottom.innerHTML === '' && isNaN(displayTop.innerHTML.slice(-1))){
        displayTop.innerHTML = displayTop.innerHTML.slice(0, -2);
    } else {
        displayBottom.innerHTML = displayBottom.innerHTML.slice(0, -1);
    }
};

function notANumber () {
    if (displayTop.innerHTML == 'Too big for me' || displayTop.innerHTML == "Don't even try it"
        || displayTop.innerHTML == 'NaN' || displayTop.innerHTML == 'undefined') {
            displayTop.innerHTML = '';
            displayBottom.innerHTML = '';
        }
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
    } else if (operator === '') {
        return displayBottom.innerHTML
    }
};

function append(number){
    displayBottom.innerHTML = displayBottom.innerHTML.toString() + number.toString();
};

numberInput.forEach(button => {
    button.addEventListener('click', () => {
        notANumber();
        if (displayBottom.innerHTML.includes('.') && button.innerHTML === '.'){
        } else if (displayBottom.innerHTML.length < 13) {
        append(button.innerHTML);
        }
    });
});

operatorInput.forEach(button => {
    button.addEventListener('click', () => {
        notANumber();
        if ((displayTop.innerHTML === '' || displayTop.innerHTML.slice(-1) === '^')
            && (displayBottom.innerHTML === ''|| displayBottom.innerHTML === '-')
            && (button.innerHTML === '-')) {
            displayBottom.innerHTML = button.innerHTML;
        } else if ((displayTop.innerHTML === '')
            && (displayBottom.innerHTML === '' || displayBottom.innerHTML === '-')){
        } else if ((displayTop.innerHTML.slice(-1) === '+' || displayTop.innerHTML.slice(-1) === '-' 
            || displayTop.innerHTML.slice(-1) === 'x' || displayTop.innerHTML.slice(-1) === '/' || displayTop.innerHTML.slice(-1) === '^' )
            && (displayBottom.innerHTML === '' || displayBottom.innerHTML === '-')) {
                displayTop.innerHTML = displayTop.innerHTML.slice(0, -2) + ' ' + button.innerHTML;
        } else if ((displayTop.innerHTML.slice(-1) === '+' || displayTop.innerHTML.slice(-1) === '-' 
            || displayTop.innerHTML.slice(-1) === 'x' || displayTop.innerHTML.slice(-1) === '/' || displayTop.innerHTML.slice(-1) === '^' )
            && (displayBottom.innerHTML !== '' || displayBottom.innerHTML !== '-')) {
                equateDisplay()
                displayTop.innerHTML = displayTop.innerHTML + ' ' + button.innerHTML;
        } else if (displayTop.innerHTML !== ''){
            displayTop.innerHTML = displayTop.innerHTML + ' ' + button.innerHTML;  
        } else {
            displayTop.innerHTML = displayBottom.innerHTML + ' ' + button.innerHTML;
            displayBottom.innerHTML = '';
        }
    });
});

equals.addEventListener('click', () => {
    equateDisplay();
});

clear.addEventListener('click', () => {
    clearDisplay();
});

del.addEventListener('click', () => {
    deleteLast();
});