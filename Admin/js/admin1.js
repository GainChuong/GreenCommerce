document.addEventListener('DOMContentLoaded', () => {
  // Navigation Logic
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));

      const targetId = item.getAttribute('data-target');
      item.classList.add('active');
      document.getElementById(targetId).classList.add('active');
      
      // Render charts if clicking dashboard
      if(targetId === 'dashboard-sec') {
        renderCharts();
      }
    });
  });

  // Tab Logic inside sections
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetGroup = e.target.getAttribute('data-group');
      const targetId = e.target.getAttribute('data-tab');
      
      // Reset buttons and contents in this group
      document.querySelectorAll(`.tab-btn[data-group="${targetGroup}"]`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.tab-content[data-group="${targetGroup}"]`).forEach(c => c.classList.remove('active'));
      
      e.target.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- MOCK DATA & RENDER FUNCTIONS ---

  // 1. Users (Combined with Designer Approvals)
  const users = [
    { id: 'U01', name: 'Nguyễn Văn A', role: 'Buyer', status: 'Active', portfolio: '-' },
    { id: 'U02', name: 'Trần Thị B', role: 'Designer', status: 'Active', portfolio: 'behance.net/tranb' },
    { id: 'U03', name: 'Lê Văn C', role: 'Buyer', status: 'Locked', portfolio: '-' }
  ];
  
  const pendingDesigners = [
    { id: 'S01', name: 'Phạm D', requestedAt: '2026-06-01', status: 'Pending', portfolio: 'phamdesign.com' },
    { id: 'S02', name: 'Hoàng E', requestedAt: '2026-06-03', status: 'Pending', portfolio: 'instagram.com/hoang_eco' }
  ];

  function renderUsers() {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    users.forEach((user, index) => {
      const badgeClass = user.status === 'Active' ? 'badge-accent' : 'badge-danger';
      const actionBtn = user.status === 'Active' ? 
        `<button class="btn btn-sm btn-outline" onclick="toggleUserStatus(${index})">Lock</button>` :
        `<button class="btn btn-sm btn-primary" onclick="toggleUserStatus(${index})">Unlock</button>`;
      
      tbody.innerHTML += `
        <tr>
          <td><span class="metric-text">${user.id}</span></td>
          <td>${user.name}</td>
          <td><span class="badge badge-default">${user.role}</span></td>
          <td><span class="badge ${badgeClass}">${user.status}</span></td>
          <td>${actionBtn}</td>
        </tr>
      `;
    });
  }

  function renderPendingDesigners() {
    const tbody = document.getElementById('shops-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    pendingDesigners.forEach((req, index) => {
      if (req.status !== 'Pending') return;
      tbody.innerHTML += `
        <tr>
          <td><span class="metric-text">${req.id}</span></td>
          <td>${req.name}</td>
          <td><a href="https://${req.portfolio}" target="_blank" style="color:var(--emerald-green)">${req.portfolio}</a></td>
          <td>${req.requestedAt}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="handleDesignerReq(${index}, 'Approved')">Approve</button>
            <button class="btn btn-sm btn-danger" style="margin-left:8px;" onclick="handleDesignerReq(${index}, 'Rejected')">Reject</button>
          </td>
        </tr>
      `;
    });
  }

  window.toggleUserStatus = (index) => {
    users[index].status = users[index].status === 'Active' ? 'Locked' : 'Active';
    renderUsers();
  };
  
  window.handleDesignerReq = (index, status) => {
    pendingDesigners[index].status = status;
    if(status === 'Approved') {
      users.push({
        id: 'U' + (users.length + 1).toString().padStart(2, '0'),
        name: pendingDesigners[index].name,
        role: 'Designer',
        status: 'Active',
        portfolio: pendingDesigners[index].portfolio
      });
      renderUsers();
    }
    renderPendingDesigners();
  };

  // 2. Moderation (Products & Donations)
  const products = [
    { id: 'P102', name: 'Upcycled Denim Jacket', type: 'Product', status: 'Active' },
    { id: 'P105', name: 'Vintage Silk Scarf', type: 'Product', status: 'Reported' }
  ];
  const donations = [
    { id: 'D01', title: '5kg of old T-shirts', user: 'Nguyễn Văn A', status: 'Flagged Spam' }
  ];

  function renderProducts() {
    const tbody = document.getElementById('products-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    products.forEach((prod, index) => {
      const badgeClass = prod.status === 'Active' ? 'badge-accent' : 'badge-danger';
      const hideBtn = prod.status === 'Hidden' ? 
        `<button class="btn btn-sm btn-primary" onclick="toggleProduct(${index})">Unhide</button>` :
        `<button class="btn btn-sm btn-danger" onclick="toggleProduct(${index})">Hide</button>`;

      tbody.innerHTML += `
        <tr>
          <td><span class="metric-text">${prod.id}</span></td>
          <td>${prod.name}</td>
          <td><span class="badge ${badgeClass}">${prod.status}</span></td>
          <td>${hideBtn}</td>
        </tr>
      `;
    });
  }

  function renderDonations() {
    const tbody = document.getElementById('donations-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    donations.forEach((item, index) => {
      tbody.innerHTML += `
        <tr>
          <td><span class="metric-text">${item.id}</span></td>
          <td>${item.title}</td>
          <td>${item.user}</td>
          <td><span class="badge badge-danger">${item.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="removeDonation(${index})">Delete Post</button>
            <button class="btn btn-sm btn-primary" style="margin-left:8px;" onclick="approveDonation(${index})">Mark Safe</button>
          </td>
        </tr>
      `;
    });
  }

  window.toggleProduct = (index) => {
    products[index].status = products[index].status === 'Hidden' ? 'Active' : 'Hidden';
    renderProducts();
  };
  window.removeDonation = (index) => {
    donations.splice(index, 1);
    renderDonations();
  };
  window.approveDonation = (index) => {
    donations[index].status = 'Safe';
    renderDonations();
  };

  // 3. GreenCoin System
  document.getElementById('save-greencoin-btn')?.addEventListener('click', () => {
    alert('GreenCoin exchange rates updated successfully!');
  });
  document.getElementById('create-campaign-btn')?.addEventListener('click', () => {
    alert('New Bonus Campaign created!');
  });

  // 4. Categories & Env Projects
  const categories = [
    { id: 'C1', name: 'Denim Reimagined', itemsCount: 120 },
    { id: 'C2', name: 'Vintage Dresses', itemsCount: 85 }
  ];
  const envProjects = [
    { id: 'PRJ1', name: 'Rừng ngập mặn Cần Giờ', partner: 'SaveVietnam', fund: '15,000,000 VND' }
  ];

  function renderCategories() {
    const tbody = document.getElementById('categories-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    categories.forEach((cat, index) => {
      tbody.innerHTML += `
        <tr>
          <td><span class="metric-text">${cat.id}</span></td>
          <td><strong>${cat.name}</strong></td>
          <td>${cat.itemsCount} items</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="editCategory(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" style="margin-left:8px;" onclick="deleteCategory(${index})">Delete</button>
          </td>
        </tr>
      `;
    });
  }

  window.editCategory = (index) => {
    const newName = prompt("Edit category name:", categories[index].name);
    if(newName) {
      categories[index].name = newName;
      renderCategories();
    }
  };
  window.deleteCategory = (index) => {
    categories.splice(index, 1);
    renderCategories();
  };

  function renderProjects() {
    const tbody = document.getElementById('projects-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    envProjects.forEach((prj) => {
      tbody.innerHTML += `
        <tr>
          <td><span class="metric-text">${prj.id}</span></td>
          <td><strong>${prj.name}</strong></td>
          <td>${prj.partner}</td>
          <td>${prj.fund}</td>
        </tr>
      `;
    });
  }

  // Initial Renders
  renderUsers();
  renderPendingDesigners();
  renderProducts();
  renderDonations();
  renderCategories();
  renderProjects();

  // CHARTS (Dashboard)
  let chartsRendered = false;
  function renderCharts() {
    if(chartsRendered) return;
    if(typeof Chart === 'undefined') return;

    const ctxImpact = document.getElementById('impactChart').getContext('2d');
    new Chart(ctxImpact, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'CO₂ Saved (kg)',
          data: [150, 220, 310, 450, 600, 850],
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Water Saved (L) / 10',
          data: [300, 420, 500, 650, 780, 950],
          borderColor: '#10B981',
          borderDash: [5, 5],
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    const ctxReused = document.getElementById('reusedChart').getContext('2d');
    new Chart(ctxReused, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Clothes Reused (kg)',
          data: [50, 75, 120, 180, 250, 320],
          backgroundColor: '#84CC16',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    chartsRendered = true;
  }
  
  // Render charts immediately if dashboard is active initially
  if(document.getElementById('dashboard-sec').classList.contains('active')) {
    setTimeout(renderCharts, 500); // Wait for Chart.js to load
  }
});
