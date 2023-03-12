"use strict";

// DOM Elements
const billAmount = document.getElementById("billInput");
const tips = document.getElementById("tips");
const tipInput = document.getElementById("tipInput");
const peopleAmount = document.getElementById("peopleInput");
const personTipEl = document.getElementById("tipPerPerson");
const personTotalEl = document.getElementById("totalPerPerson");
const btnReset = document.getElementById("btnReset");
const tipErrorMsg = document.querySelector(".error-message--tip");
const billErrorMsg = document.querySelector(".error-message--bill");
const peopleNumErrorMsg = document.querySelector(".error-message--people");

// Code Variables
let tipPercent;

// Event Listeners
billAmount.addEventListener("input", calculation);
tips.addEventListener("click", handleClick);
tipInput.addEventListener("input", handleInput);
peopleAmount.addEventListener("input", calculation);
btnReset.addEventListener("click", clearInputs);

// Event Handlers

// Tip Click Handler
function handleClick(e) {
  if (e.target.classList.contains("tip")) {
    const tip = e.target;
    const siblings = tip.closest(".tips").querySelectorAll(".tip");

    siblings.forEach((el) => {
      if (el !== tip) el.classList.remove("tip--active");
    });
    if (tipInput.value) tipInput.value = "";
    tip.classList.add("tip--active");
    tipPercent = parseFloat(e.target.textContent);
    calculation();
  }
}

// Tip Input Handler
function handleInput() {
  if (tipInput.value !== "" && Number(tipInput.value) <= 0) {
    setError(tipErrorMsg, tipInput);
  } else {
    removeError(tipErrorMsg, tipInput);
  }

  if (Number(tipInput.value) > 0) {
    tipPercent = parseFloat(tipInput.value);
    calculation();
  }
}

// Calculation
function calculation() {
  if (billAmount.value !== "" && Number(billAmount.value) <= 0) {
    setError(billErrorMsg, billAmount);
  } else {
    removeError(billErrorMsg, billAmount);
  }

  if (
    (peopleAmount.value !== "" && Number(peopleAmount.value) < 1) ||
    !Number.isInteger(+peopleAmount.value)
  ) {
    setError(peopleNumErrorMsg, peopleAmount);
  } else {
    removeError(peopleNumErrorMsg, peopleAmount);
  }

  const bill = Number(billAmount.value);
  const tip = tipPercent / 100;
  const people = Number(peopleAmount.value);

  if (bill > 0 && tipPercent && people >= 1 && Number.isInteger(people)) {
    const tipPerPerson = (bill * tip) / people;
    const totalPerPerson = (bill + bill * tip) / people;

    personTipEl.textContent = `$${tipPerPerson.toFixed(2)}`;
    personTotalEl.textContent = `$${totalPerPerson.toFixed(2)}`;

    btnReset.disabled = false;
  }
}

// Clear Inputs
function clearInputs() {
  billAmount.value = "";
  tipInput.value = "";
  peopleAmount.value = "";
  tipPercent = "";
  personTipEl.textContent = "$0.00";
  personTotalEl.textContent = "$0.00";
  tips
    .querySelectorAll(".tip")
    .forEach((el) => el.classList.remove("tip--active"));
  btnReset.disabled = true;
}

// Input Limitations
function limitKeypress(event, value, maxLength) {
  if (value != undefined && value.toString().length >= maxLength) {
    event.preventDefault();
  }
}

// Setting & Removing Error Messages & Outlines
function setError(msg, element) {
  msg.classList.add("show");
  element.style.setProperty("outline", "3px solid #e07152");
}
function removeError(msg, element) {
  msg.classList.remove("show");
  element.style.removeProperty("outline", "3px solid #e07152");
}
