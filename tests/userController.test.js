const userController = require('../module/user/controllers/userController');
const userModel = require('../module/user/models/userModel'); 

jest.mock('../module/user/models/userModel', () => {
  return {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn()
  };
});

describe('User Controller', () => {

  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  describe('Create User', () => {

    it('should create a user', async () => {
      const req = {
        body: { username: 'testuser', email: 'test@example.com' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      let expectedData = {
        message:"User created",
        data:[1]
      }

      userModel.createUser.mockResolvedValue(1); 

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      
      expect(res.json).toHaveBeenCalledWith({ message: expectedData.message, data: expectedData.data });
    });

    it('should handle error when create user', async () => {
      const req = {
        body: { username: 'testuser', email: 'test@example.com' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      let expectedErrorData = {
        message:"User creation failed",
        data:[]
      }
      let error =new Error('Error create user')
      userModel.createUser.mockRejectedValue(error);
  
      await userController.createUser(req, res);
      expect(userModel.createUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message:expectedErrorData.message, data:expectedErrorData.data });
    });
  })
  
  // describe('Get All Users', () => {
    
  //   it('should get all users', async () => {
  //     const req = {};
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const testData = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
  //     let expectedData = {
  //       message:"Get User",
  //       data:testData
  //     }
  //     userModel.getAllUsers.mockResolvedValue(testData);
  
  //     await userController.getAllUsers(req, res);
  //     expect(userModel.getAllUsers).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ message:expectedData.message, data:expectedData.data });
  //   });
  
  //   it('should handle error when retrieving users', async () => {
  //     const req = {};
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     let expectedErrorData = {
  //       message:"Error retrieving users",
  //       data:[]
  //     }
  //     let error =new Error('Error retrieving users')
  //     userModel.getAllUsers.mockRejectedValue(error);
  
  //     await userController.getAllUsers(req, res);
  //     expect(userModel.getAllUsers).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ message:expectedErrorData.message, data:expectedErrorData.data });
  //   });
  // })

  // describe('Delete User', () => {

  //   it('should Update a user and return a success message', async () => {
  //     const req = {
  //       params:{userId:1}
  //     };
  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  //     let expectedData = {
  //       message:"User deleted",
  //       data:[1]
  //     }
  //     userModel.deleteUser.mockResolvedValue(expectedData.data);
  //     await userController.deleteUser(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ message: expectedData.message, data: expectedData.data });
  //   });
  
  //   it('should return a "User Not Found" message if the user does not exist', async () => {
  //     const req = {
  //       params:{userId:11}
  //     };
  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  //     let expectedData = {
  //       message:"User Not Found",
  //       data:[]
  //     }
  //     userModel.deleteUser.mockResolvedValue(null);
  //     await userController.deleteUser(req, res);
  
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ message: expectedData.message, data: expectedData.data });
  //   });
  
  //   it('should return a 500 status code if an error occurs', async () => {
  //     const req = {
  //       params:{userId:1}
  //     };
  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  //     let expectedErrorData = {
  //       message:"User deletion failed",
  //       data:[]
  //     }
  //     userModel.deleteUser.mockRejectedValue(new Error('Test error'));
  //     await userController.deleteUser(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ message: expectedErrorData.message, data: expectedErrorData.data });
  //   });
  // });

  // describe('Update User', () => {

  //   it('should update a user and return a success message', async () => {
  //     const req = {
  //       body: { username: 'new user', email: 'new@example.com' },
  //       params:{userId:1}
  //     };
  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  //     let expectedData = {
  //       message:"User updated",
  //       data:[1]
  //     }
  //     userModel.updateUser.mockResolvedValue(expectedData.data);
  //     await userController.updateUser(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ message: expectedData.message, data: expectedData.data });
  //   });
  
  //   it('should return a "User Not Found" message if the user does not exist', async () => {
  //     const req = {
  //       body: { username: 'new user', email: 'new@example.com' },
  //       params:{userId:11}
  //     };
  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  //     let expectedData = {
  //       message:"User Not Found",
  //       data:[]
  //     }
  //     userModel.updateUser.mockResolvedValue(null);
  //     await userController.updateUser(req, res);
  
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ message: expectedData.message, data: expectedData.data });
  //   });
  
  //   it('should return a 500 status code if an error occurs', async () => {
  //     const req = {
  //       body: { username: 'new user', email: 'new@example.com' },
  //       params:{userId:1}
  //     };
  //     const res = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  //     let expectedErrorData = {
  //       message:"User update failed",
  //       data:[]
  //     }
  //     userModel.updateUser.mockRejectedValue(new Error('Test error'));
  //     await userController.updateUser(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ message: expectedErrorData.message, data: expectedErrorData.data });
  //   });
  // });

});
