let income = Number(localStorage.getItem("income")) || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

function saveData() {
  localStorage.setItem("income", income);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function formatMoney(num) {
  return `$${num.toFixed(2)}`;
}

function setIncome() {
  const input = document.getElementById("income-input");
  const value = Number(input.value);

  if (value <= 0) return alert("Enter valid income");

  income = value;
  input.value = "";

  saveData();
  updateUI();
}

function addExpense() {
  const name = document.getElementById("expense-name").value.trim();
  const amount = Number(document.getElementById("expense-amount").value);
  const date = document.getElementById("expense-date").value || "No date";
  const category = document.getElementById("expense-category").value;

  if (!name || amount <= 0) return alert("Fill all fields");

  expenses.push({
    id: Date.now(),
    name,
    amount,
    date,
    category,
  });

  saveData();
  updateUI();
}

function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  saveData();
  updateUI();
}

function clearExpenses() {
  expenses = [];
  saveData();
  updateUI();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

function updateChart() {
  const totals = {};

  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  const max = Math.max(...Object.values(totals), 1);

  ["Bills", "Gas", "Groceries", "Savings", "Fun", "Other"].forEach((cat) => {
    const val = totals[cat] || 0;
    const height = (val / max) * 180 + 10;

    const el = document.getElementById(`bar-${cat.toLowerCase()}`);
    if (el) el.style.height = height + "px";
  });
}

function updateUI() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  document.getElementById("income-display").textContent = formatMoney(income);
  document.getElementById("expenses-display").textContent = formatMoney(total);
  document.getElementById("remaining-display").textContent = formatMoney(income - total);

  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenses.forEach((e) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${e.name}</strong>
        <p>${e.category} • ${e.date}</p>
      </div>
      <div class="expense-actions">
        <span>${formatMoney(e.amount)}</span>
        <button onclick="deleteExpense(${e.id})">X</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateChart();
}

updateUI();


