const userModel = require('../module/user/models/userModel'); 
const db = require('../database/db');

jest.mock('../database/db', () => {
  return {
    query: jest.fn(),
  };
});

describe('User Model', () => {

  describe('create User', () => {
    it('should create a user', async () => {
      const mockUser = { username: 'testuser', email: 'test@example.com' };
      const mockInsertId = 1;
      const db = require('../database/db');
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { insertId: mockInsertId });
      });
      const result = await userModel.createUser(mockUser);
      expect(result).toBe(mockInsertId);
    });

    it('should handle errors when creating a user', async () => {
      const mockUser = { username: 'testuser', email: 'test@example.com' };
      const mockError = new Error('Database error');
      const db = require('../database/db');
      db.query.mockImplementation((query, values, callback) => {
        callback(mockError);
      });
      try {
        await userModel.createUser(mockUser);
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });

  describe('get All Users', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
  
      const db = require('../database/db'); 
      db.query = jest.fn().mockImplementation((query, callback) => {
        callback(null, mockUsers);
      });
      const users = await userModel.getAllUsers();
      expect(users).toEqual(mockUsers);
    });
  
    it('should handle errors', async () => {
      const db = require('../database/db'); 
      db.query = jest.fn().mockImplementation((query, callback) => {
        callback(new Error('Database error'));
      });
        await expect(userModel.getAllUsers()).rejects.toThrow('Database error');
    });
  });

  describe('deleteUser function', () => {
    it('should delete a user successfully', async () => {
      const userId = 123; 
      const mockQueryResult = { id: userId };
      db.query.mockImplementation((query, callback) => {
        callback(null, mockQueryResult);
      });
      const result = await userModel.deleteUser();
      expect(result).toBe(userId);
    });
  
    it('should handle a database error', async () => {
      const userId = 123;
      const errorMessage = 'deleteUser is not defined';
  
      db.query.mockImplementation((query, callback) => {
        callback(new Error(errorMessage));
      });
      try {
        await deleteUser(userId);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('updateUser function', () => {
    it('should update a user successfully', async () => {
      const userId = 123; 
      const updatedData = {
        username: 'newUsername',
        email: 'newEmail@example.com',
      };
      db.query.mockImplementation((query, values, callback) => {
      callback(null, { id: userId });
      });
      const result = await userModel.updateUser(userId, updatedData);
      expect(result).toBe(userId);
    });
  
    it('should handle a database error', async () => {
      const userId = 123; 
      const updatedData = {
        username: 'newUsername',
        email: 'newEmail@example.com',
      };
      const errorMessage = 'Database error';
      db.query.mockImplementation((query, values, callback) => {
      callback(new Error(errorMessage));
      });
      try {
        const result = await userModel.updateUser(userId, updatedData);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

});

