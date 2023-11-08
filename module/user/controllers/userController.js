 const userModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
   let insertId = await userModel.createUser({ username, email })
   res.status(200).json({ message:"User created", data: [insertId]});
  } catch (error) {
    res.status(500).json({ message: 'User creation failed', data:[] });
  }
};

const getAllUsers = async (req, res) => {
  try {
      let users = await userModel.getAllUsers()
      res.status(200).json({ message:"Get User", data: users});
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', data:[] });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const deleteResult = await userModel.deleteUser(userId);
    if(deleteResult){
      res.status(200).json({ message: "User deleted", data: deleteResult });
    }
    else{
      res.status(200).json({ message: "User Not Found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: 'User deletion failed', data: [] });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const updatedData = req.body;
    const updateResult = await userModel.updateUser(userId, updatedData);
    if(updateResult){
      res.status(200).json({ message: "User updated", data: updateResult });
    }
    else{
      res.status(200).json({ message: "User Not Found", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: 'User update failed', data: [] });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser
};
