const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  return x / y;
};

const operate = (operator, x, y) => {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
};

// Update the visual of the callculator number, not the actual variable value
const updateDisplay = (value, displayToChange) => {
  displayToChange.textContent = value;
};

const equalBtn = document.querySelector(".equal");
const numsContainer = document.querySelector(".nums-container");
const opsContainer = document.querySelector(".ops-container");
const clearBtn = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");
const backspaceBtn = document.querySelector(".backspace");
const display = document.querySelector(".display");
let displayValue = "";
let operator = "";
let operand1 = null;
let operand2 = null;
let isStored1 = false;
let isResultShowing = false;

// User clicks on clear button
// Empties out all variables
// Resets display to 0
clearBtn.addEventListener("click", () => {
  displayValue = "";
  operator = "";
  operand1 = null;
  operand2 = null;
  isStored1 = false;
  isResultShowing = false;
  display.textContent = "0";
});

// user clicks on number
// get rid of 0 on display for our very first run
// show new number on display
// clicks another number, concat the string
// store into operand1 if operand1 is not filled
// store into operand2 if operand1 is already filled
numsContainer.addEventListener("click", (e) => {
  if (e.target.className === "number") {
    let btnText = e.target.textContent;

    if (btnText === "0" && display.textContent === "0") {
      return;
    }

    // Concat behavior throughout pressing numbers
    if (!isResultShowing) {
      // Initial calculator state
      if (!operand1) display.textContent = "";

      // If 0 is first value for second operand
      if (isStored1 && displayValue === "0") displayValue = "";
      // Update displayValue and display
      displayValue += btnText;
      updateDisplay(displayValue, display);

      // Change what variable we're storing depending on if operand1 has a value already
      if (!isStored1) operand1 = +displayValue;
      if (isStored1) operand2 = +displayValue;
    }

    // Reset everything if user hits button while result showing
    if (isResultShowing) {
      displayValue = btnText;
      display.textContent = displayValue;
      operator = "";
      operand1 = +displayValue;
      operand2 = null;
      isStored1 = false;
      isResultShowing = false;
    }
  }
});

// user clicks on operand
// we definitely have operand1 stored already, change the flag for operand1
// reset displayValue for when user inputs numbers again but don't update display
// this is used as a buffer whenever the user hits an operand
opsContainer.addEventListener("click", (e) => {
  if (e.target.className === "operator") {
    let btnText = e.target.textContent;

    // User hit operand without hitting number
    if (!operand1) {
      operand1 = 0;
    }

    // Affects number behavior if they want to continue with result value or not
    if (isResultShowing) isResultShowing = false;

    isStored1 = true;
    operator = btnText;
    displayValue = "";
  }
});

// User clicks on equal
// Perform saved operation on  operand1 and operand2
// Display results to user
// Save result to operand1 in case user wants to continue
equalBtn.addEventListener("click", () => {
  if (operator === "/" && operand2 === 0) {
    alert("Hey bozo, DON'T DO THAT! 😠");
    displayValue = "";
    operator = "";
    operand1 = null;
    operand2 = null;
    isStored1 = false;
    isResultShowing = false;
    display.textContent = "0";
    return;
  }

  displayValue = operate(operator, operand1, operand2).toString();
  updateDisplay(displayValue, display);
  operand1 = +displayValue;

  // Change flag so we know if user wants to input another number or continue
  isResultShowing = true;
});

// User clicks on decimal
// Concat to displayValue, then show to user
// Run a check to make sure displayValue doesn't already have a decimal
// Also want a check for if they start with .0, we show 0.0 and not .0
decimalBtn.addEventListener("click", (e) => {
  let btnText = e.target.textContent;

  if (!displayValue.includes(".")) {
    if (!operand1) displayValue = "0";

    if (isStored1 && displayValue === "") displayValue = "0";
    displayValue += btnText;
    updateDisplay(displayValue, display);
  }
});

backspaceBtn.addEventListener("click", () => {
  if (display.textContent === 0) return;

  if (display.textContent.length === 1) {
    display.textContent = "0";
  }

  if (display.textContent !== "0") {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    display.textContent = displayValue;
  }
});

// Keyboard
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "1":
      document.querySelector("#one").click();
      break;
    case "2":
      document.querySelector("#two").click();
      break;
    case "3":
      document.querySelector("#three").click();
      break;
    case "4":
      document.querySelector("#four").click();
      break;
    case "5":
      document.querySelector("#five").click();
      break;
    case "6":
      document.querySelector("#six").click();
      break;
    case "7":
      document.querySelector("#seven").click();
      break;
    case "8":
      document.querySelector("#eight").click();
      break;
    case "9":
      document.querySelector("#nine").click();
      break;
    case "0":
      document.querySelector("#zero").click();
      break;
    case "Backspace":
      document.querySelector(".backspace").click();
      break;
    case "Enter":
      document.querySelector(".equal").click();
    case "+":
      document.querySelector("#plus").click();
      break;
    case "-":
      document.querySelector("#minus").click();
      break;
    case "*":
      document.querySelector("#multiply").click();
      break;
    case "/":
      document.querySelector("#divide").click();
      break;
    case "Escape":
      document.querySelector(".clear").click();
      break;
    case ".":
      document.querySelector(".decimal").click();
      break;
  }
});
