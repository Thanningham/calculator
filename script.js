const buttonsContainer = document.querySelector(".buttons-container");
const displayText = document.querySelector(".display-text");
const OPERATORS = "+-/*"
const NUMBERS = "0987654321"
const MAX_DISPLAY_LENGTH = 12;
const ERROR_MESSAGE = "Invalid";
let displayedNum = "";
let storedNum = null;
let shouldClearDisplay = false;
let currentOperator = null;
let calculatorIsShowingResult = false;
let previousButtonText = null;

function resetCalculator() {
    displayedNum = ""
    storedNum = null;
    shouldClearDisplay = false;
    currentOperator = null;
    calculatorIsShowingResult = false;
    previousButtonText = null;
}
function clear() {
    resetCalculator();
    updateDisplay();
}

function updateDisplay() {
    displayText.textContent = displayedNum;
}

function displayError() {
    displayText.textContent = ERROR_MESSAGE;
}

function clearDisplay() {
    displayedNum = "";
    shouldClearDisplay = false;
    updateDisplay();
}

function operate(operator, a, b) {

    switch (operator) {
        case "+":
            return add(a ,b);
        case "-": 
            return subtract(a ,b);
        case "/":
            return divide(a ,b);
        case "*":
            return multiply(a ,b);
        default:
            return 0;
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

function calculateResult() {
    return operate(currentOperator, storedNum, Number(displayedNum));
}

function calculateValidatedResult() {
    const result = Number(calculateResult().toFixed(8));

    if (!isResultValid(result)) {
        clear();
        displayError();
        return;
    }

    return result;
}

function isResultValid(result) {
    return Number.isFinite(result);
}

function displayResult(result) {
    displayedNum = String(result);
    updateDisplay();
}

function handleNumber(num) {
    if (shouldClearDisplay) {
        clearDisplay();
    }

    if (calculatorIsShowingResult) {
        resetCalculator();
    }

    if (displayedNum.length >= MAX_DISPLAY_LENGTH) {
        return;
    }

    if (displayedNum === "0") {
        displayedNum = num;
    } else {
        displayedNum += num;
    }

    updateDisplay();
}

function handleOperator(operator) {
    
    if (displayedNum === '') {
        return;
    }

    if (storedNum !== null && !calculatorIsShowingResult) {
        const result = calculateValidatedResult();
        
        if (result === undefined) {
            return;
        }

        storedNum = result;
        displayResult(result);
    } else {
        storedNum = Number(displayedNum);
        calculatorIsShowingResult = false;
    }
    
    currentOperator = operator;
    shouldClearDisplay = true
}

function handleEquals() {
    if (storedNum === null || currentOperator === null) {
        return;
    }

    const result = calculateValidatedResult();
    
    if (result === undefined) {
        return;
    }
    
    storedNum = result;
    displayResult(result);
    shouldClearDisplay = true;
    calculatorIsShowingResult = true;
}

function handleButtonClick(event) {
    if (event.target.tagName !== "BUTTON") return;
    const buttonText = event.target.textContent;
    
    if (NUMBERS.includes(buttonText)) {
        handleNumber(buttonText);
    } else if (buttonText === 'clear') {
        clear()
    } else if (OPERATORS.includes(buttonText)) {
        if (OPERATORS.includes(previousButtonText)) {
            currentOperator = buttonText;
            return;
        }
        handleOperator(buttonText);
    } else if (buttonText === "=") {
        if (previousButtonText === "=") {
            return;
        }
        handleEquals()
    } 

    previousButtonText = buttonText; 
}

buttonsContainer.addEventListener("click", handleButtonClick);


