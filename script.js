const buttonsContainer = document.querySelector(".buttons-container");
const displayText = document.querySelector(".display-text");
const OPERATORS = "+-/*"
const NUMBERS = "0987654321"
let displayedNum = "";
let storedNum = null;
let shouldClearDisplay = false;
let currentOperator;
let calculatorIsShowingResult = false;


function updateStoredNum(num) {
    storedNum = Number(num);
}

function resetCalculator() {
    displayedNum = ""
    storedNum = null;
    shouldClearDisplay = false;
    currentOperator = null;
    calculatorIsShowingResult = false;
}
function clear() {
    resetCalculator();
    updateDisplay();
}

function updateDisplay() {
    displayText.textContent = displayedNum;
}

function clearDisplay() {
    displayedNum = "";
    shouldClearDisplay = false;
    updateDisplay();
}

function operate(operator, a, b) {
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

    return result;
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
    console.log(`calculated: ${storedNum} ${currentOperator} ${displayedNum} = `);
    return operate(currentOperator, storedNum, Number(displayedNum));
}

function displayResult(result) {
    displayedNum = String(result);
    updateDisplay();
}

function handleNumber(num) {
    if(shouldClearDisplay) {
        clearDisplay();
    }

    if(calculatorIsShowingResult) {
        resetCalculator();
    }

    displayedNum += num;
    updateDisplay();
    console.log(`current stored num ${storedNum}`);
}

function handleOperator(operator) {

    if(storedNum !== null && !calculatorIsShowingResult) {
        const result = calculateResult();
        updateStoredNum(result);
        displayResult(result);
    } else {
        updateStoredNum(displayedNum);
        calculatorIsShowingResult = false;
    }
    
    currentOperator = operator;
    shouldClearDisplay = true;
    console.log(`operator pressed: ${currentOperator}`);
    console.log(`current stored num ${storedNum}`);
}

function handleEquals() {
    if (storedNum === null) {
        return;
    }

    const result = calculateResult();
    updateStoredNum(result);
    displayResult(result);

    shouldClearDisplay = true;
    calculatorIsShowingResult = true;
    
    console.log(`current stored num ${storedNum}`);
    console.log(`current displayeed num ${displayedNum}`);
}

function handleButtonClick(event) {
    if(event.target.tagName !== "BUTTON") return;
    
    const buttonText = event.target.textContent;
    
    if (NUMBERS.includes(buttonText)) {
        handleNumber(buttonText);
    } else if (buttonText== 'clear') {
        clear()
    } else if (OPERATORS.includes(buttonText)) {
        handleOperator(buttonText);
    } else if (buttonText === "=") {
        handleEquals()
    }
}

buttonsContainer.addEventListener("click", handleButtonClick);


