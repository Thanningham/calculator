let firstNum = 0;
let secondNum = 0;
let operator;

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    let result = 0;
    
    if(operator === "+") {
        result = add(a ,b);
    }

    if(operator === "-") {
        result = subtract(a ,b);
    }

    if(operator === "/") {
        result = divide(a ,b);
    }

    if(operator === "*") {
        result = multiply(a ,b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}