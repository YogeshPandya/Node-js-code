const db = require('../../../database/db.js');

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.query(query, [user.username, user.email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId);
      }
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteUser = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM users WHERE id = ${userId}`
    db.query(query,(err,result)=>{
      if(err){
        reject(err)
      }
      else{
        resolve(result.id)
      }
    })
  })
};

const updateUser = async (userId, updatedData) => {
  return new Promise((resolve,reject)=>{
    const query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    db.query(query,[updatedData.username,updatedData.email,userId],(err,result)=>{
      if(err){
        reject(err)
      }
      else{
        resolve(result.id)
      }
    })
  })
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,

};
