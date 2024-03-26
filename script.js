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

// Update display and variable holding display value
const updateDisplay = (currDisplayText, btnText, currDisplayValue) => {
  if (currDisplayText === "0") currDisplayText = "";
  display.textContent = currDisplayText + btnText;
  currDisplayValue = +display.textContent;
};

const display = document.querySelector(".display");
const btnsContainer = document.querySelector(".btns-container");
let currDisplayValue = 0;

btnsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    updateDisplay(display.textContent, e.target.textContent, currDisplayValue);
  }
});
