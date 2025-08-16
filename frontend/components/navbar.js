function getInitials(name) {
  if (!name) return '';
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
}

function injectNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let profileHTML = '';
  if (loggedInUser) {
    const initials = getInitials(loggedInUser.name);
    profileHTML = '<li class="navbar__profile" title="' + loggedInUser.name + '" style="position: relative; display:flex; align-items:center; cursor:pointer;">' +
      '<div id="profileCircle" style="' +
      'width: 36px;' +
      'height: 36px;' +
      'border-radius: 50%;' +
      'background-color: #6c5ce7;' +
      'color: white;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'font-weight: bold;' +
      'font-size: 1rem;' +
      'user-select: none;' +
      '">' +
      initials +
      '</div>' +
      '<ul id="profileDropdown" style="' +
      'display: none;' +
      'position: absolute;' +
      'top: 44px;' +
      'right: 0;' +
      'background: white;' +
      'color: black;' +
      'list-style: none;' +
      'padding: 8px 0;' +
      'margin: 0;' +
      'border-radius: 6px;' +
      'box-shadow: 0 2px 8px rgba(0,0,0,0.15);' +
      'min-width: 120px;' +
      'z-index: 1000;' +
      '">' +
      '<li style="padding: 8px 16px; cursor: pointer;" id="profileLink">Profile</li>' +
      '<li style="padding: 8px 16px; cursor: pointer;" id="logoutLink">Logout</li>' +
      '</ul>' +
      '</li>';
  } else {
    profileHTML = '<li class="navbar__cta"><a href="login.html">Login</a></li>';
  }

  const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  const navbarHTML = 
  '<style>' +
  '.navbar {' +
  '  background-color: #121212;' +
  '  padding: 0.75rem 1.5rem;' +
  '  font-family: Arial, sans-serif;' +
  '  display: flex;' +
  '  justify-content: space-between;' +
  '  align-items: center;' +
  '  box-shadow: 0 2px 8px rgba(0,0,0,0.7);' +
  '  position: relative;' +
  '  z-index: 1000;' +
  '}' +
  '.navbar__logo {' +
  '  display: flex;' +
  '  align-items: center;' +
  '  gap: 0.75rem;' +
  '}' +
  '.navbar__logo img {' +
  '  width: 45px;' +
  '  height: 45px;' +
  '  border-radius: 50%;' +
  '  object-fit: cover;' +
  '  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);' +
  '  cursor: pointer;' +
  '}' +
  '.navbar__logo span {' +
  '  color: #f0f0f0;' +
  '  font-weight: 900;' +
  '  font-size: 1.9rem;' +
  '  font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;' +
  '  user-select: none;' +
  '}' +
  '.navbar__logo span .gray-x {' +
  '  color: #ddd;' +
  '}' +
  '.navbar__menu {' +
  '  list-style: none;' +
  '  display: flex;' +
  '  gap: 1.5rem;' +
  '  margin: 0;' +
  '  padding: 0;' +
  '  align-items: center;' +
  '}' +
  '.navbar__menu li a {' +
  '  color: #ccc;' +
  '  text-decoration: none;' +
  '  font-weight: 600;' +
  '  font-size: 1rem;' +
  '  padding: 6px 12px;' +
  '  border-radius: 6px;' +
  '  transition: background-color 0.3s ease, color 0.3s ease;' +
  '}' +
  '.navbar__menu li a:hover {' +
  '  color: #fff;' +
  '  background-color: #333;' +
  '  box-shadow: 0 0 8px #555;' +
  '  transition: color 0.3s ease, background-color 0.3s ease;' +
  '}' +
  '.navbar__menu li a.home-hover:hover {' +
  '  color: violet;' +
  '}' +
  '.navbar__profile {' +
  '  position: relative;' +
  '  display: flex;' +
  '  align-items: center;' +
  '  cursor: pointer;' +
  '}' +
  '#profileCircle {' +
  '  width: 36px;' +
  '  height: 36px;' +
  '  border-radius: 50%;' +
  '  background-color: #444;' +
  '  color: white;' +
  '  display: flex;' +
  '  align-items: center;' +
  '  justify-content: center;' +
  '  font-weight: bold;' +
  '  font-size: 1rem;' +
  '  user-select: none;' +
  '  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;' +
  '}' +
  '#profileCircle:hover {' +
  '  background-color: #888;' +
  '  color: #fff;' +
  '  transform: scale(1.1);' +
  '}' +
  '#profileDropdown {' +
  '  display: none;' +
  '  position: absolute;' +
  '  top: 44px;' +
  '  right: 0;' +
  '  background: #222;' +
  '  color: #eee;' +
  '  list-style: none;' +
  '  padding: 8px 0;' +
  '  margin: 0;' +
  '  border-radius: 6px;' +
  '  box-shadow: 0 2px 8px rgba(0,0,0,0.8);' +
  '  min-width: 140px;' +
  '  z-index: 1000;' +
  '}' +
  '#profileDropdown li {' +
  '  padding: 8px 16px;' +
  '  cursor: pointer;' +
  '  transition: background-color 0.3s ease;' +
  '}' +
  '#profileDropdown li:hover {' +
  '  background-color: #444;' +
  '}' +
  '</style>' +
  '<nav class="navbar navbar-' + pageName + '">' +
    '<div class="navbar__logo">' +
      '<img src="./components/logo.png" alt="Logo" />' +
      '<span>Study<span class="gray-x">X</span>pert</span>' +
    '</div>' +
    '<input type="checkbox" id="nav-toggle" class="navbar__toggle" />' +
    '<label for="nav-toggle" class="navbar__toggle-label">' +
      '<span></span>' +
      '<span></span>' +
      '<span></span>' +
    '</label>' +
    '<ul class="navbar__menu">' +
      '<li><a href="index.html" class="nav-link home-hover">Home</a></li>' +
      '<li><a href="aboutus.html" class="nav-link">About us</a></li>' +
      '<li><a href="admin_store.html" class="nav-link">Storage</a></li>' +
      '<li><a href="posts.html" class="nav-link">Posts</a></li>' +
      '<li><a href="internship.html" class="nav-link">Internships</a></li>' +
      '<li><a href="jobs.html" class="nav-link">Jobs</a></li>' +
      '<li><a href="competitions.html" class="nav-link">Competitions</a></li>' +
      '<li><a href="leadership.html" class="nav-link">Leadership</a></li>' +
      '<li><a href="http://localhost:3000" class="nav-link">My Research</a></li>' +
      profileHTML +
    '</ul>' +
  '</nav>';
 

  navbarContainer.innerHTML = navbarHTML;

  // Remove old protected links alert logic

  // Add global login check for all links except login.html
  const allLinks = navbarContainer.querySelectorAll('a.nav-link, a.protected-link');
  allLinks.forEach(link => {
    link.style.transition = 'color 0.3s ease, background-color 0.3s ease';
    link.addEventListener('mouseenter', () => {
      link.style.color = '#00008B';  // deep blue
      link.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      link.style.borderRadius = '4px';
    });
    link.addEventListener('mouseleave', () => {
      link.style.color = '';
      link.style.backgroundColor = '';
      link.style.borderRadius = '';
    });
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!loggedInUser && href && href !== 'login.html' && href !== '' && !href.startsWith('#')) {
        e.preventDefault();
        // Show temporary message "login first" for 2 seconds
        let existingToast = document.getElementById('login-toast-message');
        if (!existingToast) {
          const toast = document.createElement('div');
          toast.id = 'login-toast-message';
          toast.textContent = 'Please login first';
          toast.style.position = 'fixed';
          toast.style.top = '20px';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';
          toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
          toast.style.color = 'white';
          toast.style.padding = '10px 20px';
          toast.style.borderRadius = '8px';
          toast.style.zIndex = '10000';
          toast.style.fontSize = '16px';
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.remove();
          }, 2000);
        }
      }
    });
  });

  if (loggedInUser) {
    const profileCircle = document.getElementById('profileCircle');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');

    profileCircle.style.transition = 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease';
    profileCircle.addEventListener('mouseenter', () => {
      profileCircle.style.backgroundColor = '#00b894';
      profileCircle.style.color = '#fff';
      profileCircle.style.transform = 'scale(1.1)';
    });
    profileCircle.addEventListener('mouseleave', () => {
      profileCircle.style.backgroundColor = '#6c5ce7';
      profileCircle.style.color = 'white';
      profileCircle.style.transform = 'scale(1)';
    });

    profileCircle.addEventListener('click', () => {
      if (profileDropdown.style.display === 'none') {
        profileDropdown.style.display = 'block';
      } else {
        profileDropdown.style.display = 'none';
      }
    });

    profileLink.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });

    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      injectNavbar();
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
      if (!profileCircle.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.style.display = 'none';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', injectNavbar);
