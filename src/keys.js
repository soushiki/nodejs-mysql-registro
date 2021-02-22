
module.exports = {

    database: {
          connectionLimit: 1000,
          connectTimeout: 60 * 60 * 1000,
          acquireTimeout: 60 * 60 * 1000,
          timeout: 60 * 60 * 1000,
        
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'db_registro',
      
    }

};
