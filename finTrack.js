// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initButtons();
    initModals();
    initCharts();
    initFormValidation();
  });
  
  // Navigation
  function initNavigation() {
    // Highlight active page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'finance-dashboard.html';
    const navItems = document.querySelectorAll('.sidebar-nav li');
    
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === currentPage) {
        item.classList.add('active-nav-item');
      }
      
      // Add click handlers for navigation
      if (link) {
        link.addEventListener('click', function(e) {
          navItems.forEach(i => i.classList.remove('active-nav-item'));
          item.classList.add('active-nav-item');
        });
      }
    });
    
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('mobile-show');
      });
    }
  }
  
  // Button Functionality
  function initButtons() {
    // Add Account Button
    const addAccountBtn = document.querySelector('.add-account-btn');
    if (addAccountBtn) {
      addAccountBtn.addEventListener('click', function() {
        showModal('addAccountModal');
      });
    }
    
    // Create Budget Button
    const createBudgetBtn = document.querySelector('.create-budget-btn');
    if (createBudgetBtn) {
      createBudgetBtn.addEventListener('click', function() {
        showModal('createBudgetModal');
      });
    }
    
    // Export Button
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        alert('Export functionality will be implemented here');
      });
    });
    
    // All other buttons with data-action attribute
    document.querySelectorAll('[data-action]').forEach(button => {
      button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        switch(action) {
          case 'view-all':
            // Handle view all action
            break;
          case 'download':
            // Handle download action
            break;
          case 'share':
            // Handle share action
            break;
          default:
            console.log('Action:', action);
        }
      });
    });
  }
  
  // Modal System
  function initModals() {
    // Close modals when clicking X or backdrop
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
      el.addEventListener('click', function() {
        hideAllModals();
      });
    });
    
    // Prevent modal content from closing when clicking inside
    document.querySelectorAll('.modal-content').forEach(el => {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
    
    // Transaction details modal
    document.querySelectorAll('.transaction-row').forEach(row => {
      row.addEventListener('click', function() {
        const transactionId = this.getAttribute('data-transaction-id');
        showTransactionDetails(transactionId);
      });
    });
  }
  
  function showModal(modalId) {
    hideAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }
  
  function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden');
    });
    document.body.classList.remove('modal-open');
  }
  
  function showTransactionDetails(transactionId) {
    // In a real app, you would fetch transaction details from an API
    const modal = document.getElementById('transactionModal');
    const modalTitle = modal.querySelector('#modalTitle');
    const modalContent = modal.querySelector('#modalContent');
    
    // Example data - in reality you'd fetch this
    const transactionData = {
      '1': {
        title: 'Amazon Purchase',
        amount: '$125.60',
        date: 'Apr 12, 2025',
        category: 'Shopping',
        account: 'Credit Card',
        status: 'Completed',
        notes: 'Office supplies for home office'
      }
      // Add more transaction data as needed
    };
    
    const transaction = transactionData[transactionId] || {
      title: 'Transaction Details',
      amount: '$0.00',
      date: 'N/A',
      category: 'N/A',
      account: 'N/A',
      status: 'N/A',
      notes: 'No details available'
    };
    
    modalTitle.textContent = transaction.title;
    modalContent.innerHTML = `
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">Amount</p>
          <p class="font-medium">${transaction.amount}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Date</p>
          <p class="font-medium">${transaction.date}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Category</p>
          <p class="font-medium">${transaction.category}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Account</p>
          <p class="font-medium">${transaction.account}</p>
        </div>
      </div>
      <div class="mb-4">
        <p class="text-sm text-gray-500">Status</p>
        <span class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">${transaction.status}</span>
      </div>
      <div>
        <p class="text-sm text-gray-500">Notes</p>
        <p class="font-medium">${transaction.notes}</p>
      </div>
    `;
    
    showModal('transactionModal');
  }
  
  // Chart Initialization
  function initCharts() {
    // Initialize all Chart.js charts
    const charts = {
      accountBalancesChart: {
        type: 'bar',
        data: {
          labels: ['Checking', 'Savings', 'Credit Card', 'Investment'],
          datasets: [{
            label: 'Balance',
            data: [12456.78, 8235.42, -1256.35, 42750.34],
            backgroundColor: [
              '#3b82f6', '#8b5cf6', '#ef4444', '#10b981'
            ],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      },
      // Add other chart configurations
    };
    
    // Initialize each chart
    for (const [chartId, config] of Object.entries(charts)) {
      const ctx = document.getElementById(chartId);
      if (ctx) {
        new Chart(ctx.getContext('2d'), {
          type: config.type,
          data: config.data,
          options: config.options
        });
      }
    }
  }
  
  // Form Validation
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
          } else {
            input.classList.remove('border-red-500');
          }
        });
        
        if (isValid) {
          // Form is valid - submit or show success
          alert('Form submitted successfully!');
          form.reset();
        } else {
          alert('Please fill in all required fields');
        }
      });
    });
  }
  
  // Utility Functions
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }