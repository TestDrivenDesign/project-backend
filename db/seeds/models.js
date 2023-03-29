const mysql = require('mysql2');
const db = require('../connection');

// return db.promise().query(
//   'SHOW DATABASES;'
// );


SelectAllElements = () => {
  return new Promise((resolve, reject) => {
    db.query('SHOW TABLES;', (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

SelectAllElements().then((result) => {
  console.log(result);
});