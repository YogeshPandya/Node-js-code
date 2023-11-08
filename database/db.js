const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost', // Replace with your MySQL server's host
  user: 'root', // Replace with your MySQL username
  password: 'password', // Replace with your MySQL password
  database: 'node_test_case', // Replace with your MySQL database name
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;
