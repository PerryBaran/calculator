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
}

function remainder(a, b){
    return a % b;
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
    } else if (operator === '%') {
        return remainder(a, b);
    }
};

console.log(remainder(20, 9))