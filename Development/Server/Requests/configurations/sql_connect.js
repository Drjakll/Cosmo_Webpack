import mysql from 'mysql2/promise';

import config_data from './global_data.js'; 

var {host, user, password, databaseName} = config_data.sql_data;

let Connect = () => {

    let SQL = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        timezone: 'Z', // UTC
        waitForConnections: true,
        connectionLimit: 20,
        queueLimit: 0,
        connectTimeout: 10000, 
        keepAliveInitialDelay: 0,
        enableKeepAlive: true
    });
    
    return SQL;
};

let sql;

function Reconnect() {

  sql = Connect();

  sql.on('connection', conn => {

      console.log('MySQL connected:', conn.threadId);

      conn.on('error', err => {

        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET'){
          
          console.warn('MySQL connection dropped, pool will recover');

        } else {

          console.error('MySQL pool error:', err);

        }

        Reconnect();

      });
  });

}

Reconnect();


export { sql };
