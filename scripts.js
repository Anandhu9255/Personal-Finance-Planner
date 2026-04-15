// ===============================
// Personal Finance Planner
// ===============================

// ---------- STATE ----------
let expenses = [];
let editId = null;
let budgets = {};
let selectedMonth = document.getElementById("mymonth").value;

// ---------- DOM ----------
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const dateInput = document.getElementById("dateInput");
const noteInput = document.getElementById("noteInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const recentExpenseContainer = document.getElementById(
  "recentExpenseContainer",
);
const clearAllBtn = document.querySelector(".clear-all-btn");
const budgetInput = document.getElementById("budgetInput");
const breakdownContainer = document.getElementById("breakdownContainer");
const warningDiv = document.querySelector(".warningDiv");

// ---------- LOAD FROM STORAGE ----------
const savedExpenses = localStorage.getItem("expenses");
if (savedExpenses) expenses = JSON.parse(savedExpenses);

const savedBudgets = localStorage.getItem("budgets");
if (savedBudgets) budgets = JSON.parse(savedBudgets);

// ---------- SAVE HELPERS ----------
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function saveBudgets() {
  localStorage.setItem("budgets", JSON.stringify(budgets));
}

// ---------- EVENT LISTENERS ----------
document.getElementById("mymonth").addEventListener("change", (e) => {
  selectedMonth = e.target.value;
  renderAll();
});

budgetInput.addEventListener("change", () => {
  budgets[selectedMonth] = Number(budgetInput.value) || 0;
  saveBudgets();
  renderAll();
});

addExpenseBtn.addEventListener("click", () => {
  if (!amountInput.value || !dateInput.value || !categoryInput.value) {
    alert("Amount, Date, and Category are required");
    return;
  }

  if (editId !== null) {
    expenses = expenses.filter((exp) => exp.id !== editId);
    editId = null;
    addExpenseBtn.innerText = "+ Add Expense";
    addExpenseBtn.style.backgroundColor = "";
  }

  expenses.push({
    id: Date.now(),
    amount: Number(amountInput.value),
    date: dateInput.value,
    category: categoryInput.value,
    note: noteInput.value,
    month: selectedMonth,
  });

  saveExpenses();
  clearInputs();
  renderAll();
});

clearAllBtn.addEventListener("click", () => {
  if (!confirm("Delete all expenses?")) return;
  expenses = [];
  editId = null;
  saveExpenses();
  clearInputs();
  renderAll();
});

// ---------- UI HELPERS ----------
function clearInputs() {
  amountInput.value = "";
  noteInput.value = "";
  dateInput.value = "";
  categoryInput.value = "";
}

// ---------- RENDER ----------
function renderAll() {
  const monthExpenses = expenses.filter((e) => e.month === selectedMonth);
  renderTopStats(monthExpenses);
  renderBreakdown(monthExpenses);
  renderRecentExpenses(monthExpenses);
  renderWarning(monthExpenses);
  budgetInput.value = budgets[selectedMonth] || "";
}

// ---------- TOP STATS ----------
function renderTopStats(monthExpenses) {
  const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const budget = budgets[selectedMonth] || 0;
  const remaining = budget - total;

  document.querySelector(".amountTS").innerText = `₹${total.toFixed(2)}`;
  document.querySelector(".amountRB").innerText = `₹${remaining.toFixed(2)}`;
}

// ---------- BREAKDOWN (BUDGET-BASED %) ----------
function renderBreakdown(monthExpenses) {
  breakdownContainer.innerHTML = "";

  if (!monthExpenses.length) return;

  const breakdown = {};
  monthExpenses.forEach((e) => {
    breakdown[e.category] = (breakdown[e.category] || 0) + e.amount;
  });

  const totalSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categories = Object.entries(breakdown);

  let usedPercent = 0;

  categories.forEach(([cat, amt], index) => {
    let percent;

    // LAST ITEM absorbs rounding error
    if (index === categories.length - 1) {
      percent = 100 - usedPercent;
    } else {
      percent = Math.floor((amt / totalSpent) * 100);
      usedPercent += percent;
    }

    breakdownContainer.innerHTML += `
      <div class="breakdown-item">
        <span>${cat}</span>
        <span>${percent}%  -  - - - -  ₹${amt.toFixed(2)}</span>
      </div>
    `;
  });
}

// ---------- RECENT EXPENSES ----------
function renderRecentExpenses(monthExpenses) {
  recentExpenseContainer.innerHTML = "";

  monthExpenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((expense) => {
      const row = document.createElement("div");
      row.className = "recent-expense-row";
      row.innerHTML = `
        <span>${expense.date}</span>
        <span>${expense.category}</span>
        <span>${expense.note || "-"}</span>
        <span>₹${expense.amount.toFixed(2)}</span>
        <div class="action-buttons">
          <button onclick="editExpense(${expense.id})">✏️</button>
          <button onclick="deleteExpense(${expense.id})">🗑️</button>
        </div>
      `;
      recentExpenseContainer.appendChild(row);
    });
}

// ---------- WARNING (BUDGET-BASED, CONSISTENT) ----------
function renderWarning(monthExpenses) {
  warningDiv.style.display = "none";
  warningDiv.innerText = "";

  const budget = budgets[selectedMonth] || 0;
  if (!budget || !monthExpenses.length) return;

  const totals = {};
  monthExpenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  const totalSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  let highestCategory = "";
  let highestPercent = 0;

  for (const [cat, amt] of Object.entries(totals)) {
    const percent = (amt / totalSpent) * 100;
    if (percent > highestPercent) {
      highestPercent = percent;
      highestCategory = cat;
    }
  }

  warningDiv.innerText = `⚠ Highest spending category: ${highestCategory} (${highestPercent.toFixed(0)}%)`;
  warningDiv.style.display = "block";
}
// ---------- ACTIONS ----------
function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;
  expenses = expenses.filter((e) => e.id !== id);
  saveExpenses();
  renderAll();
}

function editExpense(id) {
  const exp = expenses.find((e) => e.id === id);
  if (!exp) return;

  amountInput.value = exp.amount;
  categoryInput.value = exp.category;
  dateInput.value = exp.date;
  noteInput.value = exp.note;

  editId = id;
  addExpenseBtn.innerText = "Update Expense";
  addExpenseBtn.style.backgroundColor = "#f39c12";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- INIT ----------
renderAll();
