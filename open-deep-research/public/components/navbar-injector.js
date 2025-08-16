// Navbar Injector for Static HTML Pages with Dark Mode & LocalStorage
(function() {
  'use strict';

  // Unified navbar HTML
  const navbarHTML = `
    <nav class="border-b bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center mr-6">
              <a href="/" class="flex items-center space-x-2">
                <img src="/logo.png" alt="StudyXpert Logo" width="45" height="45" class="rounded-full object-cover shadow-sm">
                <span class="text-xl font-bold text-gray-900">
                  Study<span class="text-purple-600">X</span>pert
                </span>
              </a>
            </div>

            <div class="hidden sm:ml-6 sm:flex sm:space-x-1">
              <a href="/static-pages/index.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>🏠</span>
                <span>Home</span>
              </a>
              <a href="/static-pages/about.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>ℹ️</span>
                <span>About</span>
              </a>
              <a href="/static-pages/storage.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>📁</span>
                <span>Storage</span>
              </a>
              <a href="/static-pages/posts.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>📝</span>
                <span>Posts</span>
              </a>
              <a href="/static-pages/internships.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>💼</span>
                <span>Internships</span>
              </a>
              <a href="/static-pages/jobs.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>💼</span>
                <span>Jobs</span>
              </a>
              <a href="/static-pages/competitions.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>🏆</span>
                <span>Competitions</span>
              </a>
              <a href="/static-pages/leadership.html" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>👑</span>
                <span>Leadership</span>
              </a>
              <a href="/" class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <span>🔬</span>
                <span>Research</span>
              </a>
            </div>
          </div>

          <div class="flex items-center">
            <div id="auth-section">
              <!-- Will be populated by JavaScript -->
            </div>
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
          <a href="/static-pages/index.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">🏠 Home</a>
          <a href="/static-pages/about.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">ℹ️ About</a>
          <a href="/static-pages/storage.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">📁 Storage</a>
          <a href="/static-pages/posts.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">📝 Posts</a>
          <a href="/static-pages/internships.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">💼 Internships</a>
          <a href="/static-pages/jobs.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">💼 Jobs</a>
          <a href="/static-pages/competitions.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">🏆 Competitions</a>
          <a href="/static-pages/leadership.html" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">👑 Leadership</a>
          <a href="/" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">🔬 Research</a>
        </div>
      </div>
    </nav>
  `;

  // Inject navbar at the top of body
  function injectNavbar() {
    const existingNavbar = document.getElementById('unified-navbar');
    if (existingNavbar) return;

    const navbarDiv = document.createElement('div');
    navbarDiv.id = 'unified-navbar';
    navbarDiv.innerHTML = navbarHTML;
    document.body.insertBefore(navbarDiv, document.body.firstChild);
  }

  // Update auth section based on login state
  function updateAuthSection() {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;

    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser);
        const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
        
        authSection.innerHTML = `
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
      } catch (error) {
        console.error('Error parsing user data:', error);
        authSection.innerHTML = `
          <a href="/frontend/login.html" class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
            Login
          </a>
        `;
      }
    } else {
      authSection.innerHTML = `
        <a href="/frontend/login.html" class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
          Login
        </a>
      `;
    }
  }

  // Global functions
  window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
  };

  window.toggleProfileDropdown = function() {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
  };

  window.handleLogout = function() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    window.location.reload();
  };

  // Initialize navbar
  document.addEventListener('DOMContentLoaded', function() {
    injectNavbar();
    updateAuthSection();
  });

  // Update navbar when storage changes (for login/logout)
  window.addEventListener('storage', function(e) {
    if (e.key === 'loggedInUser' || e.key === 'token') {
      updateAuthSection();
    }
  });
})();
