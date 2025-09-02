document.addEventListener("DOMContentLoaded", () => {
  const counterValueElement = document.getElementById("counter-value");
  const incrementButton = document.getElementById("increment-btn");
  const decrementButton = document.getElementById("decrement-btn");
  // const resetButton = document.getElementById('reset-btn');
  let count = 0;

  function updateCounterDisplay() {
    counterValueElement.textContent = count;

    // Mengubah warna berdasarkan nilai
    if (count > 0) {
      counterValueElement.style.color = "#28a745";
    } else if (count < 0) {
      counterValueElement.style.color = "#dc3545";
    } else {
      counterValueElement.style.color = "#007bff";
    }
  }

  // (+)
  incrementButton.addEventListener("click", () => {
    count++;
    updateCounterDisplay();
  });

  // (-)
  decrementButton.addEventListener("click", () => {
    count--;
    updateCounterDisplay();
  });

  updateCounterDisplay();
});
