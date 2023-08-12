const customInput = document.getElementById("customInput");

customInput.addEventListener("input", function () {
  if (this.value.length > 0) {
    this.classList.add("rtl");
  } else {
    this.classList.remove("rtl");
  }
});

const buttons = document.querySelectorAll(".tip__btn");

let tipAmount;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("selected"));
    customInput.value = "";
    this.classList.add("selected");
    tipAmount = parseFloat(this.textContent.slice(0, -1));

    handleError();
  });
});

function resetButtons() {
  buttons.forEach((btn) => btn.classList.remove("selected"));
  customInput.value = "";
}

customInput.addEventListener("input", () => {
  buttons.forEach((btn) => btn.classList.remove("selected"));
  tipAmount = customInput.value;
  handleError();
});

// Logic

// Get the bill amount
// Get the tip %
// Get the amount of people
// Show the tip amount / person
// Show the total / person

// Example
// Bill: 142.55 -- Tip: 15% -- Number of People: 5
// Calculation:
// 142.55 * 0.15 = 21.38
// 21.38 / 5 = 4.27 tip per person
// (142.55 * 1.15) / 5 = 32.79 total per person including the tip

const billAmount = document.querySelector(".bill__input");
const amountOfPeople = document.querySelector(".number-people__input");

const tipAmountPerPersonText = document.querySelector(".tip__amount");
const totalAmountPerPersonText = document.querySelector(".total__amount");

function tipAmountPerPerson() {
  return ((billAmount.value * tipAmount) / 100 / amountOfPeople.value).toFixed(
    2
  );
}

function totalPerPerson() {
  let tipAmountTotal = tipAmount / 100 + 1;
  return ((billAmount.value * tipAmountTotal) / amountOfPeople.value).toFixed(
    2
  );
}

function handleError() {
  if (billAmount.value != "" && amountOfPeople.value != "") {
    showData();
  } else if (billAmount.value != "" && amountOfPeople.value == "") {
    showError();
  }
}

function showError() {
  document.querySelector(".error__hint__text").classList.remove("hidden");
  document
    .querySelector(".number-people__input__container")
    .classList.add("error__hint__border");
}

function removeError() {
  document.querySelector(".error__hint__text").classList.add("hidden");
  document
    .querySelector(".number-people__input__container")
    .classList.remove("error__hint__border");
}

function showData() {
  tipAmountPerPersonText.textContent = "$" + tipAmountPerPerson();
  totalAmountPerPersonText.textContent = "$" + totalPerPerson();
}

document.querySelector(".reset__btn").addEventListener("click", () => {
  removeError();
  billAmount.value = "";
  resetButtons();
  amountOfPeople.value = "";
  tipAmountPerPersonText.textContent = "$0.00";
  totalAmountPerPersonText.textContent = "$0.00";
});

amountOfPeople.addEventListener("input", () => {
  removeError();
});
