const db = require('../connection');

const {
  convertTimestampToDate,
} = require('./utils');

const seed = ({ userData }) => {
  return db.execute('DROP TABLE IF EXISTS users;')
    .then(() => {
      return db.execute(`
      CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      photo LONGBLOB,
      date_of_birth DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
    })
    .then(() => {

      //This doesn't work!
      const formattedCreatedData = userData.map(convertTimestampToDate);
      let values = formattedCreatedData.map(({ first_name, last_name, email, password, created_at }) => [
        first_name,
        last_name,
        email,
        password,
        // created_at
      ]);
      // const values = [['John', 'Doe', 'jdoe@gmail.com', '54781aasC'], ['Jim', 'D', 'jd@gmail.com', '54781aBC']];
      return db.execute("INSERT INTO users ( first_name, last_name, email, password) VALUES ?", [values]);

      // This works!
      //   return db.execute(`
      //   INSERT INTO users ( first_name, last_name, email, password) 
      //   VALUES ('John', 'Doe', 'jdoe@gmail.com', '54781aasC');`);
    })
    .then(() => {
      return db.execute('SELECT * FROM users').then((response) => {
        console.log(response[0]);
      });
    });
};

module.exports = seed;