// Unified Navbar Component for StudyXpert
class UnifiedNavbar {
  constructor(options = {}) {
    this.container = options.container || 'navbar-container';
    this.isLoggedIn = options.isLoggedIn || false;
    this.user = options.user || null;
    this.render();
  }

  getNavItems() {
    return [
      { name: 'Home', href: '/static-pages/index.html', },
      { name: 'About', href: '/static-pages/about.html', },
      { name: 'Storage', href: '/static-pages/storage.html',  },
      { name: 'Posts', href: '/static-pages/posts.html', },
      { name: 'Internships', href: '/static-pages/internships.html',  },
      { name: 'Jobs', href: '/static-pages/jobs.html', },
      { name: 'Competitions', href: '/static-pages/competitions.html', },
      { name: 'Leadership', href: '/static-pages/leadership.html',  },
      { name: 'Research', href: '/',  }
    ];
  }

  getInitials(name) {
    if (!name) return '';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  createNavbarHTML() {
    const navItems = this.getNavItems();
    const navLinks = navItems.map(item => `
      <a href="${item.href}" class="nav-link flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
        <span>${item.icon}</span>
        <span>${item.name}</span>
      </a>
    `).join('');

    return `
      <nav class="border-b bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex items-center mr-6">
                <a href="/" class="flex items-center space-x-2">
                  <img src="" alt="StudyXpert Logo" width="45" height="45" class="rounded-full object-cover shadow-sm">
                  <span class="text-xl font-bold text-gray-900">
                    Study<span class="text-purple-600">X</span>pert
                  </span>
                </a>
              </div>

              <div class="hidden sm:ml-6 sm:flex sm:space-x-1">
                ${navLinks}
              </div>
            </div>

            <div class="flex items-center">
              ${this.isLoggedIn ? this.getLoggedInUserHTML() : this.getLoginButtonHTML()}
            </div>

            <div class="sm:hidden flex items-center">
              <button class="h-8 w-8 text-gray-700" onclick="toggleMobileMenu()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="sm:hidden hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            ${navItems.map(item => `
              <a href="${item.href}" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                ${item.icon} ${item.name}
              </a>
            `).join('')}
          </div>
        </div>
      </nav>
    `;
  }

  getLoggedInUserHTML() {
    const initials = this.getInitials(this.user?.name || '');
    return `
      <div class="relative">
        <button onclick="toggleProfileDropdown()" class="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm hover:bg-purple-700 transition-colors">
          ${initials}
        </button>
        
        <div id="profile-dropdown" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 hidden">
          <div class="py-1">
            <a href="/frontend/user_storage.html" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </a>
            <button onclick="handleLogout()" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getLoginButtonHTML() {
    return `
      <a href="/frontend/login.html" class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
        Login
      </a>
    `;
  }

  render() {
    const container = document.getElementById(this.container);
    if (container) {
      container.innerHTML = this.createNavbarHTML();
    }
  }
}

// Global functions for navbar interactions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
}
window.toggleMobileMenu = toggleMobileMenu;

function toggleProfileDropdown() {
  const dropdown = document.getElementById('profile-dropdown');
  dropdown.classList.toggle('hidden');
}
window.toggleProfileDropdown = toggleProfileDropdown;

function handleLogout() {
  localStorage.removeItem('loggedInUser');
  window.location.reload();
}
window.handleLogout = handleLogout;

// Initialize navbar on page load
document.addEventListener('DOMContentLoaded', function() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;
  
  new UnifiedNavbar({
    container: 'navbar-container',
    isLoggedIn: !!user,
    user: user
  });
});
