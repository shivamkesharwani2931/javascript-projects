// Select the HTML elements that JavaScript needs to update.
const counter = document.getElementById("counter");
const message = document.getElementById("message");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");

// Keep the current count in a JavaScript variable.
let count = 0;

// Update the number and helpful message shown on the page.
function updateCounter() {
  counter.textContent = count;

  if (count > 0) {
    message.textContent = "You're on the plus side!";
  } else if (count < 0) {
    message.textContent = "Below zero — keep exploring!";
  } else {
    message.textContent = "Back to zero. Fresh start!";
  }

  // Briefly animate the number whenever it changes.
  counter.classList.remove("bump");
  // Reading offsetWidth restarts the CSS animation.
  void counter.offsetWidth;
  counter.classList.add("bump");
}

// Add one whenever the Increase button is clicked.
increaseBtn.addEventListener("click", function () {
  count = count + 1;
  updateCounter();
});

// Subtract one whenever the Decrease button is clicked.
decreaseBtn.addEventListener("click", function () {
  count = count - 1;
  updateCounter();
});

// Return the counter to zero when Reset is clicked.
resetBtn.addEventListener("click", function () {
  count = 0;
  updateCounter();
});
