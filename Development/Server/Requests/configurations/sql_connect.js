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
        connectionLimit: 10,
        queueLimit: 0
    });
    
    return SQL;
};

let sql = Connect();

export { sql };
