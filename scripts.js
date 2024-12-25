// Function to append a value to the display
function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

// Event listener to add keydown event when the DOM content is loaded
document.addEventListener('keydown', KEYDWN);

// Function to clear the display
function clearDisplay() {
    document.getElementById("display").value = "";
}

// Function to delete the last character from the display
function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

// Function to handle keydown events
function KEYDWN(event) {
    // If the key is a number or an operator, append it to the display
    if (event.key == '0'|| event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || event.key == '5' 
        || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' || event.key == '+' 
        || event.key == '-' || event.key == '*' || event.key == '/' || event.key == '.'||event.key == '%') {
        appendToDisplay(event.key);
    }
    // If the key is Enter, calculate the result
    if (event.key === 'Enter') {
        calculateResult();
    }
    // If the key is Backspace, delete the last character
    if (event.key === 'Backspace') {
        deleteLast();
    }
}

// Function to calculate the result of the expression in the display
function calculateResult() {
    let x=document.getElementById("display").value;
    let display = document.getElementById("display");
    display.value = eval(display.value); // Evaluate the expression and set it as the display value
}