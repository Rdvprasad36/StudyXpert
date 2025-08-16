// Modern Navbar Component inspired by open-deep-research navbar.tsx with navbar.js navigation structure
function getInitials(name) {
  if (!name) return '';
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

function createNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isLoggedIn = !!loggedInUser;

  // Navigation items matching navbar.js structure
  const navItems = [
    { name: 'Home', href: 'index.html', icon: '🏠' },
    { name: 'About', href: 'aboutus.html', icon: 'ℹ️' },
    { name: 'Storage', href: 'admin_store.html', icon: '📁' },
    { name: 'Posts', href: 'posts.html', icon: '📝' },
    { name: 'Internships', href: 'internship.html', icon: '💼' },
    { name: 'Jobs', href: 'jobs.html', icon: '💼' },
    { name: 'Competitions', href: 'competitions.html', icon: '🏆' },
    { name: 'Leadership', href: 'leadership.html', icon: '👑' },
    { name: 'Research', href: 'http://localhost:3000', icon: '🔬', external: true }
  ];

  // Create navbar HTML
  const navbarHTML = `
    <nav class="navbar-modern">
      <div class="navbar-container">
        <!-- Logo Section -->
        <div class="navbar-logo">
          <img src="./components/logo.png" alt="StudyXpert Logo" />
          <span>Study<span class="logo-x">X</span>pert</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="navbar-nav">
          ${navItems.map(item => `
            <a href="${item.href}" ${item.external ? 'target="_blank"' : ''} class="nav-button">
              <span class="nav-icon">${item.icon}</span>
              ${item.name}
            </a>
          `).join('')}
        </div>

        <!-- User Profile Section -->
        <div class="navbar-profile">
          ${isLoggedIn ? `
            <div class="profile-dropdown-container">
              <button class="profile-button" id="profileBtn">
                <div class="profile-avatar">${getInitials(loggedInUser.name)}</div>
                <span class="profile-name">${loggedInUser.name}</span>
                <svg class="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
              </button>
              
              <div class="profile-dropdown" id="profileDropdown">
                <a href="profile.html" class="dropdown-item">
                  <span>👤</span> Profile
                </a>
                <a href="settings.html" class="dropdown-item">
                  <span>⚙️</span> Settings
                </a>
                <button class="dropdown-item logout-btn" onclick="handleLogout()">
                  <span>🚪</span> Logout
                </button>
              </div>
            </div>
          ` : `
            <a href="login.html" class="login-button">
              <span>🔑</span> Login
            </a>
          `}
        </div>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" id="mobileNav">
          ${navItems.map(item => `
            <a href="${item.href}" ${item.external ? 'target="_blank"' : ''} class="mobile-nav-item">
              <span class="mobile-nav-icon">${item.icon}</span>
              ${item.name}
            </a>
          `).join('')}
        </div>
      </div>
    </nav>
  `;

  // Inject navbar into container
  navbarContainer.innerHTML = navbarHTML;

  // Add event listeners
  document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
          profileDropdown.classList.add('hidden');
        }
      });
    }

    // Handle logout
    window.handleLogout = () => {
      localStorage.removeItem('loggedInUser');
      window.location.reload();
    };
  });
}

// Initialize navbar
document.addEventListener('DOMContentLoaded', createNavbar);
