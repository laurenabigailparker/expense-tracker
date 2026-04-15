// =====================================================
// step 1: main data
// =====================================================

let income = 0;

let expenses = [
  {
    name: "Rent",
    amount: 1200,
    category: "Bills",
  },
  {
    name: "Gas",
    amount: 150,
    category: "Gas",
  },
  {
    name: "Groceries",
    amount: 320,
    category: "Groceries",
  },
  {
    name: "Movies",
    amount: 45,
    category: "Fun",
  },
];

// =====================================================
// step 2: set income
// =====================================================

function setIncome() {
  let incomeInput = document.getElementById("income-input");
  let incomeValue = parseFloat(incomeInput.value);

  if (isNaN(incomeValue) || incomeValue < 0) {
    alert("Please enter a valid income amount.");
    return;
  }

  income = incomeValue;
  incomeInput.value = "";

  updateSummary();
}

// =====================================================
// step 3: add expense
// =====================================================

function addExpense() {
  let nameInput = document.getElementById("expense-name");
  let amountInput = document.getElementById("expense-amount");
  let categoryInput = document.getElementById("expense-category");

  let expenseName = nameInput.value;
  let expenseAmount = parseFloat(amountInput.value);
  let expenseCategory = categoryInput.value;

  if (expenseName.trim() === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }

  let newExpense = {
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
  };

  expenses.push(newExpense);

  nameInput.value = "";
  amountInput.value = "";

  renderExpenses();
}

// =====================================================
// step 4: render expenses
// =====================================================

function renderExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    let li = document.createElement("li");
    li.className = "expense-item";

    li.innerHTML =
      '<div class="expense-info">' +
      '<span class="expense-name">' + expenses[i].name + "</span>" +
      '<span class="expense-category">' + expenses[i].category + "</span>" +
      "</div>" +
      '<div class="expense-actions">' +
      '<span class="expense-amount">$' + expenses[i].amount.toFixed(2) + "</span>" +
      '<button class="btn-delete" onclick="deleteExpense(' + i + ')">Delete</button>' +
      "</div>";

    list.appendChild(li);
  }

  if (expenses.length === 0) {
    list.innerHTML = '<li class="empty-state">No expenses yet. Add one above!</li>';
  }

  updateSummary();
}

// =====================================================
// step 5: update summary + recommendations
// =====================================================

function updateSummary() {
  let incomeDisplay = document.getElementById("income-display");
  let expensesDisplay = document.getElementById("expenses-display");
  let remainingDisplay = document.getElementById("remaining-display");

  let needsDisplay = document.getElementById("needs-display");
  let funDisplay = document.getElementById("fun-display");
  let savingsDisplay = document.getElementById("savings-display");

  let actualNeedsDisplay = document.getElementById("actual-needs-display");
  let actualFunDisplay = document.getElementById("actual-fun-display");
  let actualSavingsDisplay = document.getElementById("actual-savings-display");

  let totalExpenses = 0;
  let actualNeeds = 0;
  let actualFun = 0;
  let actualSavings = 0;

  for (let i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i].amount;

    if (
      expenses[i].category === "Bills" ||
      expenses[i].category === "Gas" ||
      expenses[i].category === "Groceries"
    ) {
      actualNeeds += expenses[i].amount;
    }

    if (expenses[i].category === "Fun") {
      actualFun += expenses[i].amount;
    }

    if (expenses[i].category === "Savings") {
      actualSavings += expenses[i].amount;
    }
  }

  let remainingMoney = income - totalExpenses;

  // recommended 50 / 30 / 20
  let recommendedNeeds = income * 0.5;
  let recommendedFun = income * 0.3;
  let recommendedSavings = income * 0.2;

  incomeDisplay.textContent = "$" + income.toFixed(2);
  expensesDisplay.textContent = "$" + totalExpenses.toFixed(2);
  remainingDisplay.textContent = "$" + remainingMoney.toFixed(2);

  needsDisplay.textContent = "$" + recommendedNeeds.toFixed(2);
  funDisplay.textContent = "$" + recommendedFun.toFixed(2);
  savingsDisplay.textContent = "$" + recommendedSavings.toFixed(2);

  actualNeedsDisplay.textContent = "$" + actualNeeds.toFixed(2);
  actualFunDisplay.textContent = "$" + actualFun.toFixed(2);
  actualSavingsDisplay.textContent = "$" + actualSavings.toFixed(2);

  if (remainingMoney < 0) {
    remainingDisplay.style.color = "#a63d2f";
  } else {
    remainingDisplay.style.color = "#2f5a3d";
  }

  colorCompare(actualNeedsDisplay, actualNeeds, recommendedNeeds);
  colorCompare(actualFunDisplay, actualFun, recommendedFun);
  colorCompare(actualSavingsDisplay, actualSavings, recommendedSavings, true);
}

// =====================================================
// step 6: compare actual vs recommended
// for savings, higher is okay
// =====================================================

function colorCompare(element, actual, recommended, savingsMode = false) {
  if (savingsMode) {
    if (actual >= recommended) {
      element.style.color = "#2f5a3d";
    } else {
      element.style.color = "#a67c2f";
    }
    return;
  }

  if (actual > recommended) {
    element.style.color = "#a63d2f";
  } else {
    element.style.color = "#2f5a3d";
  }
}

// =====================================================
// step 7: delete expense
// =====================================================

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// run on page load
renderExpenses();


