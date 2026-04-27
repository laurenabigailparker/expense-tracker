let income = Number(localStorage.getItem("income")) || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveData() {
  localStorage.setItem("income", income);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function setIncome() {
  const incomeInput = document.getElementById("income-input");
  const value = Number(incomeInput.value);

  if (value <= 0) {
    alert("Please enter a valid monthly income.");
    return;
  }

  income = value;
  incomeInput.value = "";

  saveData();
  updateUI();
}

function addExpense() {
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const dateInput = document.getElementById("expense-date");
  const categoryInput = document.getElementById("expense-category");

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value || "No date";
  const category = categoryInput.value;

  if (!name || amount <= 0) {
    alert("Please enter an expense name and valid amount.");
    return;
  }

  expenses.push({
    id: Date.now(),
    name,
    amount,
    date,
    category,
  });

  nameInput.value = "";
  amountInput.value = "";
  dateInput.value = "";

  saveData();
  updateUI();
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  saveData();
  updateUI();
}

function clearExpenses() {
  expenses = [];
  saveData();
  updateUI();
}

function updateUI() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = income - totalExpenses;

  const needsBudget = income * 0.5;
  const funBudget = income * 0.3;
  const savingsBudget = income * 0.2;

  const actualNeeds = expenses
    .filter((expense) =>
      ["Bills", "Gas", "Groceries"].includes(expense.category)
    )
    .reduce((sum, expense) => sum + expense.amount, 0);

  const actualFun = expenses
    .filter((expense) => expense.category === "Fun")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const actualSavings = expenses
    .filter((expense) => expense.category === "Savings")
    .reduce((sum, expense) => sum + expense.amount, 0);

  document.getElementById("income-display").textContent = formatMoney(income);
  document.getElementById("expenses-display").textContent = formatMoney(totalExpenses);
  document.getElementById("remaining-display").textContent = formatMoney(remaining);

  document.getElementById("needs-display").textContent = formatMoney(needsBudget);
  document.getElementById("fun-display").textContent = formatMoney(funBudget);
  document.getElementById("savings-display").textContent = formatMoney(savingsBudget);

  document.getElementById("actual-needs-display").textContent = formatMoney(actualNeeds);
  document.getElementById("actual-fun-display").textContent = formatMoney(actualFun);
  document.getElementById("actual-savings-display").textContent = formatMoney(actualSavings);

  const expenseList = document.getElementById("expense-list");
  const emptyMessage = document.getElementById("empty-message");

  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  expenses.forEach((expense) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${expense.name}</strong>
        <p>${expense.category} • ${expense.date}</p>
      </div>

      <div class="expense-actions">
        <span>${formatMoney(expense.amount)}</span>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
      </div>
    `;

    expenseList.appendChild(li);
  });
}

updateUI();


