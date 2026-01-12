import mysql from 'mysql2/promise';

import config_data from './global_data.js'; 

var {host, user, password, databaseName} = config_data.sql_data;

let Connect = () => {

    let SQL = mysql.createPool({
        host: host,
        user: user,
        password: password,
        database: databaseName,
        timezone: 'Z', // UTC
        waitForConnections: true,
        connectionLimit: 60,
        queueLimit: 0,
        connectTimeout: 10000, // ⬅️ important
        keepAliveInitialDelay: 0,
        enableKeepAlive: true,
    });
    
    return SQL;
};

let sql = Connect();

sql.on('connection', conn => {
  console.log('MySQL connected:', conn.threadId);
});

sql.on('error', err => {
  console.error('MySQL pool error:', err);
});

export { sql };
