import mysql from 'mysql';

import config_data from './global_data.js'; 

var {host, user, password, databaseName} = config_data.sql_data;

let Connect = async () => {

    let SQL = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: databaseName
    });

    SQL.connect((err) => {
        if (err) {
            console.log(err);
        }
    });
    
    return SQL;
};

let sql = {
    query: async (query, callback) => {

        let SQL = await Connect();
        
        await SQL?.query(query, callback);
        
        SQL.end();
        
    }
};

export { sql };
