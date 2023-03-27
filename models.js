const db = require("./db/connection.js");

afterAll(() => {
  db.end();
});

module.exports = {};
