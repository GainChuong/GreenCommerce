document.addEventListener('DOMContentLoaded', () => {
  // Navigation Logic
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Remove active classes
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));

      // Add active class to clicked item
      const targetId = item.getAttribute('data-target');
      item.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- MOCK DATA & RENDER FUNCTIONS ---

  // 1. Users
  const users = [
    { id: 'U01', name: 'Nguyễn Văn A', role: 'Buyer', status: 'Active' },
    { id: 'U02', name: 'Trần Thị B', role: 'Designer', status: 'Active' },
    { id: 'U03', name: 'Lê Văn C', role: 'Buyer', status: 'Locked' }
  ];

  function renderUsers() {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    users.forEach((user, index) => {
      const tr = document.createElement('tr');
      const badgeClass = user.status === 'Active' ? 'badge-accent' : 'badge-danger';
      const actionBtn = user.status === 'Active' ? 
        `<button class="btn btn-outline" onclick="toggleUserStatus(${index})">Lock</button>` :
        `<button class="btn btn-primary" onclick="toggleUserStatus(${index})">Unlock</button>`;
      
      tr.innerHTML = `
        <td><span class="metric-text">${user.id}</span></td>
        <td>${user.name}</td>
        <td><span class="badge badge-default">${user.role}</span></td>
        <td><span class="badge ${badgeClass}">${user.status}</span></td>
        <td>${actionBtn}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.toggleUserStatus = function(index) {
    users[index].status = users[index].status === 'Active' ? 'Locked' : 'Active';
    renderUsers();
  };

  // 2. Shop Approvals (Designers)
  const shops = [
    { id: 'S01', designer: 'Phạm D', requestedAt: '2026-06-01', status: 'Pending' },
    { id: 'S02', designer: 'Hoàng E', requestedAt: '2026-06-03', status: 'Pending' }
  ];

  function renderShops() {
    const tbody = document.getElementById('shops-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    shops.forEach((shop, index) => {
      if (shop.status !== 'Pending') return;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="metric-text">${shop.id}</span></td>
        <td>${shop.designer}</td>
        <td>${shop.requestedAt}</td>
        <td><span class="badge badge-highlight">${shop.status}</span></td>
        <td>
          <button class="btn btn-primary" onclick="handleShop(${index}, 'Approved')">Approve</button>
          <button class="btn btn-danger" style="margin-left:8px;" onclick="handleShop(${index}, 'Rejected')">Reject</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.handleShop = function(index, newStatus) {
    shops[index].status = newStatus;
    renderShops();
  };

  // 3. Products Moderation
  const products = [
    { id: 'P102', name: 'Upcycled Denim Jacket', store: 'Eco Wear', status: 'Active' },
    { id: 'P105', name: 'Vintage Silk Scarf', store: 'Retro Chic', status: 'Reported' }
  ];

  function renderProducts() {
    const tbody = document.getElementById('products-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    products.forEach((prod, index) => {
      const badgeClass = prod.status === 'Active' ? 'badge-accent' : 'badge-danger';
      const tr = document.createElement('tr');
      const hideBtn = prod.status === 'Hidden' ? 
        `<button class="btn btn-primary" onclick="toggleProduct(${index})">Unhide</button>` :
        `<button class="btn btn-danger" onclick="toggleProduct(${index})">Hide</button>`;

      tr.innerHTML = `
        <td><span class="metric-text">${prod.id}</span></td>
        <td>${prod.name}</td>
        <td>${prod.store}</td>
        <td><span class="badge ${badgeClass}">${prod.status}</span></td>
        <td>${hideBtn}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.toggleProduct = function(index) {
    products[index].status = products[index].status === 'Hidden' ? 'Active' : 'Hidden';
    renderProducts();
  };

  // 4. Categories
  const categories = [
    { id: 'C1', name: 'Denim Reimagined', itemsCount: 120 },
    { id: 'C2', name: 'Vintage Dresses', itemsCount: 85 }
  ];

  function renderCategories() {
    const tbody = document.getElementById('categories-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    categories.forEach((cat, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="metric-text">${cat.id}</span></td>
        <td><strong>${cat.name}</strong></td>
        <td>${cat.itemsCount} items</td>
        <td>
          <button class="btn btn-outline" onclick="deleteCategory(${index})">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.deleteCategory = function(index) {
    categories.splice(index, 1);
    renderCategories();
  };

  document.getElementById('add-cat-btn')?.addEventListener('click', () => {
    const name = prompt("Enter new category name:");
    if (name) {
      categories.push({ id: 'C' + (categories.length + 1), name: name, itemsCount: 0 });
      renderCategories();
    }
  });

  // 5. Withdrawals
  const withdrawals = [
    { id: 'W01', designer: 'Phạm D', amount: '2,500,000 VND', status: 'Pending' },
    { id: 'W02', designer: 'Trần Thị B', amount: '1,200,000 VND', status: 'Pending' }
  ];

  function renderWithdrawals() {
    const tbody = document.getElementById('withdrawals-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    withdrawals.forEach((req, index) => {
      if (req.status !== 'Pending') return;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="metric-text">${req.id}</span></td>
        <td>${req.designer}</td>
        <td><strong>${req.amount}</strong></td>
        <td><span class="badge badge-highlight">${req.status}</span></td>
        <td>
           <button class="btn btn-primary" onclick="handleWithdrawal(${index}, 'Approved')">Approve</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.handleWithdrawal = function(index, newStatus) {
    withdrawals[index].status = newStatus;
    renderWithdrawals();
  };

  // Initial Renders
  renderUsers();
  renderShops();
  renderProducts();
  renderCategories();
  renderWithdrawals();

  // Settings Save Mock
  document.getElementById('save-settings-btn')?.addEventListener('click', () => {
    const fee = document.getElementById('platform-fee').value;
    alert('Platform fee updated to ' + fee + '% successfully!');
  });
});
