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
  budgetDisplay(e){
   e.preventDefault();
   if(budgetInput.value){
    budgetNum.innerHTML = `${budgetInput.value}`;
    budgetInput.value = "";
    this.displayBalance();
   } else return;
  }
  expenseDisplay(e){
   e.preventDefault();
   if(expenseInput.value && expenseAmount.value){
    let object={}
    expenseNum.innerHTML = expenseAmount.value;
    object.title = expenseInput.value
    object.value = expenseNum.textContent;
    object.itemID = itemID;
    object.itemED = itemED;
    itemList.push(object)
    this.expenseFormDisplay.push(itemList);
    this.displayBalance();
    expenseAmount.value = "" ;
    expenseInput.value = "" ;
   } else return
  }
   totalExpense(){
    let total = 0;
    if (itemList.length > 0){
     total = itemList.reduce((x, y) => {
      x += Number(y.value);
      return x;
     }, 0);
    }
    expenseNum.innerHTML = total;
    return total;
   }
}
