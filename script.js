const budgetButton = document.querySelector(".first-button");
const expenseButton = document.querySelector(".second-button");

const editButton = document.querySelector(".edit");
const deleteButton = document.querySelector(".delete");

const budgetInput = document.querySelector(".budget");
const expenseInput = document.querySelector(".expenses-name");
const expenseAmount = document.querySelector(".expenses-amount");
const balanceValue = document.querySelector(".balance-value");
const expenseValue = document.querySelector(".expense-value");

const expenseFormSpace = document.querySelector(".expenseForm");
const budgetNum = document.getElementById("budget-number");
const expenseNum = document.getElementById("expenses");
const balanceNum = document.getElementById("balance");

let itemList = [];
let itemID = 0;
let itemED = 0;

class budgetApp {
  constructor() {
    budgetButton.addEventListener("click", this.budgetDisplay.bind(this))
  }
}
