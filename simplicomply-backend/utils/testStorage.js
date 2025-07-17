const fs = require('fs');
const path = require('path');

class TestStorage {
  constructor() {
    this.dataPath = path.join(__dirname, '../data');
    this.usersFile = path.join(this.dataPath, 'users.json');
    this.init();
  }

  init() {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }

    // Initialize users file if it doesn't exist
    if (!fs.existsSync(this.usersFile)) {
      fs.writeFileSync(this.usersFile, JSON.stringify([], null, 2));
    }
  }

  // Read users from file
  getUsers() {
    try {
      const data = fs.readFileSync(this.usersFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  // Write users to file
  saveUsers(users) {
    try {
      fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving users:', error);
      return false;
    }
  }

  // Find user by ID
  findUserById(id) {
    const users = this.getUsers();
    return users.find(user => user._id === id);
  }

  // Find user by email
  findUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email === email.toLowerCase());
  }

  // Create new user
  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      _id: this.generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  // Update user
  updateUser(id, updateData) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user._id === id);
    
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.saveUsers(users);
    return users[userIndex];
  }

  // Delete user (soft delete)
  deleteUser(id) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user._id === id);
    
    if (userIndex === -1) {
      return false;
    }

    users[userIndex].isActive = false;
    users[userIndex].email = `deleted_${Date.now()}_${users[userIndex].email}`;
    users[userIndex].updatedAt = new Date().toISOString();
    
    this.saveUsers(users);
    return true;
  }

  // Generate simple ID
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Clear all data (for testing)
  clearAll() {
    fs.writeFileSync(this.usersFile, JSON.stringify([], null, 2));
  }
}

module.exports = new TestStorage();
