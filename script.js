const budgetButton = document.querySelector(".first-button");
const expenseButton = document.querySelector(".second-button");

const editButton = document.querySelector(".edit");
const deleteButton = document.querySelector(".delete");

const budgetInput = document.querySelector(".budget");
const expenseInput = document.querySelector(".expenses-name");
const expenseAmount = document.querySelector(".expenses-amount");
const balanceValue = document.querySelector(".balance-value");
const expenseValue = document.querySelector(".expense-value");

const expenseContainer = document.querySelector(".expenseForm");
const budgetNum = document.getElementById("budget-number");
const expenseNum = document.getElementById("expenses");
const balanceNum = document.getElementById("balance");

let itemList = [];
let itemID = 0;
let itemED = 0;

class budgetApp {
  constructor() {
    budgetButton.addEventListener("click", this.budgetDisplay.bind(this));
    expenseButton.addEventListener("click", this.expenseDisplay.bind(this));
    expenseContainer.addEventListener("click", this.delExpense.bind(this));
    expenseContainer.addEventListener("click", this.editExpense.bind(this));
    this.totalExpense();
  }
  budgetDisplay(e) {
    e.preventDefault();
    if (budgetInput.value) {
      budgetNum.innerHTML = `${budgetInput.value}`;
      budgetInput.value = "";
      this.displayBalance();
    } else return;
  }
  expenseDisplay(e) {
    e.preventDefault();
    if (expenseInput.value && expenseAmount.value) {
      let object = {};
      expenseNum.innerHTML = expenseAmount.value;
      object.title = expenseInput.value;
      object.value = expenseNum.textContent;
      object.itemID = itemID;
      object.itemED = itemED;
      itemList.push(object);
      this.expenseFormDisplay(itemList);
      this.displayBalance();
      expenseAmount.value = "";
      expenseInput.value = "";
    } else return;
  }
  totalExpense() {
    let total = 0;
    if (itemList.length > 0) {
      total = itemList.reduce((x, y) => {
        x += Number(y.value);
        return x;
      }, 0);
    }
    expenseNum.innerHTML = total;
    return total;
  }

  displayBalance() {
    let expenseNum = this.totalExpense();
    let totalBalance = Number(budgetNum.innerHTML) - expenseNum;
    balanceNum.innerHTML = totalBalance;
    if (totalBalance > 0) {
      balanceValue.style.color = "#317b22";
    } else if (totalBalance < 0) {
      balanceValue.style.color = "#b80c09";
    } else {
      balanceValue.style.color = "#333333";
    }
  }
  expenseFormDisplay(expense) {
    expenseContainer.innerHTML = "";
    expense.forEach(function (index) {
      const html = `
      <div class="movements">
          <div class="form-title"> ${index.title.toUpperCase()}</div>
          <div class="form-value">$${Number(index.value)}</div>
          
          <div class="edit--delete">
            <i class="fa-solid fa-pen-to-square edit" data-id="${++index.itemED}"></i>
            <i class="fa-solid fa-trash delete" data-id="${++index.itemID}"></i>
          </div>
        </div>
      `;
      expenseContainer.insertAdjacentHTML("beforeend", html);
    });
  }

  delExpense(e) {
    const expenseEl = e.target.parentElement.parentElement;
    if (e.target.classList.contains("delete")) {
      itemList.some((exp) => {
        if (exp.itemID === Number(e.target.dataset.id)) {
          expenseContainer.removeChild(expenseEl);
          itemList.forEach((obsoleteItem) => {
            if (itemList.indexOf(exp) > -1) {
              itemList.splice(itemList.indexOf(exp), 1);
            }
          });
        }
      });
    }
    this.displayBalance();
    if (!e.target.classList.contains(".delete")) return;
  }

  editExpense(e) {
    const expenseEl = e.target.parentElement.parentElement;

    if (e.target.classList.contains("edit")) {
      itemList.some((exp) => {
        if (exp.itemID === Number(e.target.dataset.id)) {
          expenseContainer.removeChild(expenseEl);
          itemList.forEach((obsoleteItem) => {
            if (itemList.indexOf(exp) > -1) {
              // Show values
              expenseInput.value = exp.title;
              expenseAmount.value = exp.value;

              // Remove from list
              itemList.splice(itemList.indexOf(exp), 1);
              console.log(exp);
            }
          });
        }
      });
    }

    this.displayBalance();
    if (!e.target.classList.contains(".edit")) return;
  }
}

const app = new budgetApp()
