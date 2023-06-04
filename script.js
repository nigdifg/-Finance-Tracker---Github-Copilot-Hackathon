document.addEventListener('DOMContentLoaded', () => {
    const balanceAmount = document.getElementById('balance-amount');
    const transactionList = document.getElementById('transaction-list');
    const transactionType = document.getElementById('transaction-type');
    const transactionAmount = document.getElementById('transaction-amount');
    const transactionDescription = document.getElementById('transaction-description');
    const addTransactionBtn = document.getElementById('add-transaction-btn');
  
    let transactions = [];
  
    function updateBalance() {
      const total = transactions.reduce((sum, transaction) => {
        if (transaction.type === 'income') {
          return sum + parseFloat(transaction.amount);
        } else {
          return sum - parseFloat(transaction.amount);
        }
      }, 0);
  
      balanceAmount.textContent = `$${total.toFixed(2)}`;
    }
  
    function renderTransactions() {
      transactionList.innerHTML = '';
  
      transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.classList.add('transaction-item');
        li.innerHTML = `
          <span class="type">${transaction.type}</span>
          <span class="amount">$${transaction.amount}</span>
          <span class="description">${transaction.description}</span>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        transactionList.appendChild(li);
      });
  
      const editButtons = document.querySelectorAll('.edit-btn');
      editButtons.forEach(button => {
        button.addEventListener('click', () => {
          const index = button.getAttribute('data-index');
          const transaction = transactions[index];
          transactionType.value = transaction.type;
          transactionAmount.value = transaction.amount;
          transactionDescription.value = transaction.description;
          addTransactionBtn.textContent = 'Update Transaction';
          addTransactionBtn.setAttribute('data-index', index);
        });
      });
  
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const index = button.getAttribute('data-index');
          transactions.splice(index, 1);
          renderTransactions();
          updateBalance();
        });
      });
    }
  
    function addTransaction() {
      const type = transactionType.value;
      const amount = parseFloat(transactionAmount.value);
      const description = transactionDescription.value;
  
      if (!type || !amount || !description) {
        return;
      }
  
      const index = addTransactionBtn.getAttribute('data-index');
      if (index) {
        // Update existing transaction
        transactions[index].type = type;
        transactions[index].amount = amount;
        transactions[index].description = description;
        addTransactionBtn.textContent = 'Add Transaction';
        addTransactionBtn.removeAttribute('data-index');
      } else {
        // Add new transaction
        const transaction = { type, amount, description };
        transactions.push(transaction);
      }
  
      transactionAmount.value = '';
      transactionDescription.value = '';
      renderTransactions();
      updateBalance();
    }
  
    addTransactionBtn.addEventListener('click', addTransaction);
  });
  