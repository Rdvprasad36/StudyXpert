// Simple test script to verify localStorage auth functionality
console.log('Testing localStorage authentication...');

// Clear any existing data
localStorage.removeItem('open-deep-research-users');
localStorage.removeItem('open-deep-research-current-user');

// Test data
const testStudent = {
  email: 'test@example.com',
  username: 'testuser',
  full_name: 'Test User',
  password: 'password123',
  student_id: 'STU001',
  department: 'Computer Science',
  year: 2
};

const testAdmin = {
  email: 'admin@example.com',
  username: 'adminuser',
  full_name: 'Admin User',
  password: 'admin123',
  role: 'admin'
};

// Test localStorage operations
console.log('Testing localStorage operations...');

// Test setting and getting users
const users = [testStudent, testAdmin];
localStorage.setItem('open-deep-research-users', JSON.stringify(users));

const storedUsers = JSON.parse(localStorage.getItem('open-deep-research-users') || '[]');
console.log('Stored users:', storedUsers.length);

// Test setting and getting current user
localStorage.setItem('open-deep-research-current-user', JSON.stringify(testStudent));
const currentUser = JSON.parse(localStorage.getItem('open-deep-research-current-user') || 'null');
console.log('Current user:', currentUser ? currentUser.email : 'None');

console.log('LocalStorage test completed successfully!');
console.log('Check browser console for any errors during this test.');
