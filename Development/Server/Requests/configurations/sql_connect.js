import mysql from 'mysql2/promise';

let Connect_Pool = () => {

    let SQL = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: 3306,
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

  let old_sql = sql;

  sql = Connect_Pool();

  sql.on('connection', conn => {

      console.log('MySQL connected:', conn.threadId);

      conn.on('error', err => {

        if (query_wrapper.isConnectionError(err)) {
          
          console.warn('MySQL connection dropped, pool will recover');

        } else {

          console.error('MySQL pool error:', err);

        }

      });
  });

  if (old_sql) {

    old_sql.end().then(() => {

      console.log('Old MySQL pool closed');

    }).catch(err => {

      console.error('Error closing old MySQL pool:', err);

    });

  }

}

Reconnect();


let count = 0;

setInterval(async ()=>{

  try {
    await sql.query('select 1');
    //console.log(++count);
  } catch(err){

    console.error("Failed MySQL ping:", err.code);

    Reconnect();

  }

}, 30000);

let query_wrapper = {
  query: async function(q, data = null, tries = 3){

    try {

      let result = data === null ? await sql.query({sql: q, timeout: 10000}) : await sql.query({sql: q, timeout: 10000}, data);

      return result;

    } catch(err){

      if(tries > 0 && this.isConnectionError(err)){

        console.warn("Retrying MySQL query after:", err.code);

        Reconnect();

        return await this.query(q, data, tries - 1);

      } else {

        throw err;

      }

    }

  },
  execute: async function(q, data = null, tries = 3){

      try {

        let result = data === null ? await sql.execute({sql: q, timeout: 10000}) : await sql.execute({sql: q, timeout: 10000}, data);

        return result;

    } catch(err){

      if(tries > 0 && this.isConnectionError(err)){

        console.warn("Retrying MySQL execute after:", err.code);

        Reconnect();

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
      'ETIMEDOUT',
      'EADDRNOTAVAIL',
      'ENOTFOUND'
    ].includes(err.code);

  }
};

export { sql, query_wrapper };
