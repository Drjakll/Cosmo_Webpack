import mysql from 'mysql2/promise';

import config_data from './global_data.js'; 

//var {host, user, password, databaseName} = config_data.sql_data;

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

let Connect_Pool = () => {

    let SQL = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        timezone: 'Z', // UTC
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000, 
        keepAliveInitialDelay: 0,
        enableKeepAlive: true
        
    });
    
    return SQL;
};

let sql;

function Reconnect() {

  sql = Connect_Pool();

  sql.on('connection', conn => {

      console.log('MySQL connected:', conn.threadId);

      conn.on('error', err => {

        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET'){
          
          console.warn('MySQL connection dropped, pool will recover');

        } else {

          console.error('MySQL pool error:', err);

        }

      });
  });

}

Reconnect();

let count = 0;

setInterval(async ()=>{

  try {
    await sql.query('select 1');
    //console.log(++count);
  } catch(err){
    console.error('Failed ping', err);
  }

}, 30000)

let query_wrapper = {
  query: async function(q, data = null, tries = 3){

    try {

      let result = data === null ? await sql.query(q) : await sql.query(q, data);

      return result;

    } catch(err){

      if(tries > 0 && this.isConnectionError(err)){

        return await this.query(q, data, tries - 1);

      } else {

        throw err;

      }

    }

  },
  execute: async function(q, data = null, tries = 3){

      try {

        let result = data === null ? await sql.execute(q) : await sql.execute(q, data);

        return result;

    } catch(err){

      if(tries > 0 && this.isConnectionError(err)){

        return await this.execute(q, data, tries - 1);

      } else {

        throw err;

      }

    }

  },
  isConnectionError: function(err) {
    return [
      'PROTOCOL_CONNECTION_LOST',
      'ECONNRESET',
      'ECONNREFUSED',
      'ETIMEDOUT'
    ].includes(err.code);
  }
}

let SQL_Middleware = {
  connect: async () => {

    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        timezone: 'Z', // UTC
    })
  },
  query: async function(q, data = null){

    let sql_con = await this.connect();
    
    let result = data === null ? await sql_con.query(q) : await sql_con.query(q, data);

    await sql_con.end();

    return result;

  }
};

export { sql, SQL_Middleware, query_wrapper };
