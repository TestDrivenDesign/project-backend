const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "db-test-1.cclkjrtv3cvn.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "SuperBigGoblin$60help#",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

//Creates connection pool, meaning you only need one connection for all the querys
pool.getConnection(function (error, connection) {
  //Will scream if can't connect
  if (error) {
    throw error;
  }

  // Do something with the connection, in this case query it
  connection.query(`SHOW DATABASES;`, (error, response, field) => {
    console.log(response);

    //Must release the connection after the response!
    connection.release();
  });
});

//These all show the pool 'events' in action,
pool.on("acquire", function (connection) {
  console.log(
    "Conection %d authorised: " + connection.authorized,
    connection.threadId
  );
});

//pool has to be ended at some point.... At least while messing with the db.
//The connection is ended when released by the connection.release
pool.on("release", function (connection) {
  console.log("Connection %d: released", connection.threadId);

  pool.end();
});
