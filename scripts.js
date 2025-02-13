// Constants for calculator settings
const VALID_OPERATORS = ['+', '-', '*', '/', '%'];
const DECIMAL_PRECISION = 8;

// Function to safely append a value to the display
function appendToDisplay(value) {
    const display = document.getElementById("display");
    // Prevent multiple decimal points in a number
    if (value === '.' && display.value.split(/[-+*/%]/).pop().includes('.')) {
        return;
    }
    // Prevent consecutive operators
    if (VALID_OPERATORS.includes(value) &&
        VALID_OPERATORS.includes(display.value[display.value.length - 1])) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById("display").value = "";
}

// Function to delete the last character
function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

// Function to safely evaluate mathematical expressions
function safeEval(expression) {
    // Remove any characters that aren't numbers, operators, or decimal points
    const sanitizedExpr = expression.replace(/[^0-9+\-*/.%]/g, '');

    try {
        // Split the expression into numbers and operators
        const numbers = sanitizedExpr.split(/[-+*/%]/).map(Number);
        const operators = sanitizedExpr.split(/[0-9.]+/).filter(op => op !== '');

        // Validate the expression
        if (numbers.some(isNaN) || operators.some(op => !VALID_OPERATORS.includes(op))) {
            throw new Error('Invalid expression');
        }

        // Use Function constructor instead of eval for better security
        const result = new Function(`return ${sanitizedExpr}`)();

        // Check if result is valid
        if (!isFinite(result)) {
            throw new Error('Invalid result');
        }

        // Round to specified decimal places
        return Number(result.toFixed(DECIMAL_PRECISION));
    } catch (error) {
        console.error('Calculation error:', error);
        return 'Error';
    }
}

// Function to calculate the result
function calculateResult() {
    const display = document.getElementById("display");
    const result = safeEval(display.value);
    display.value = result;
}

// Enhanced keydown event handler
function handleKeyDown(event) {
    const key = event.key;

    // Handle numeric keys and operators
    if (/^[0-9.]$/.test(key) || VALID_OPERATORS.includes(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
    // Handle Enter key
    else if (key === 'Enter') {
        event.preventDefault();
        calculateResult();
    }
    // Handle Backspace key
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    // Handle Escape key
    else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
}

// Event listener setup
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyDown);
});