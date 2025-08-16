// Universal Navbar Loader for StudyXpert Static Pages
(function() {
  'use strict';

  // Load the unified navbar script
  function loadNavbarScript() {
    const script = document.createElement('script');
    script.src = '/open-deep-research/public/components/unified-navbar.js';
    script.onload = function() {
      // Initialize navbar after script loads
      const loggedInUser = localStorage.getItem('loggedInUser');
      const user = loggedInUser ? JSON.parse(loggedInUser) : null;
      
      new UnifiedNavbar({
        container: 'navbar-container',
        isLoggedIn: !!user,
        user: user
      });
    };
    document.head.appendChild(script);
  }

  // Create navbar container if it doesn't exist
  function createNavbarContainer() {
    let navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
      navbarContainer = document.createElement('div');
      navbarContainer.id = 'navbar-container';
      document.body.insertBefore(navbarContainer, document.body.firstChild);
    }
  }

  // Initialize navbar on page load
  document.addEventListener('DOMContentLoaded', function() {
    createNavbarContainer();
    loadNavbarScript();
  });
})();
