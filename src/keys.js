module.exports = {

    database: {
        connectionLimit: 60,
        host: procces.env.DB_host || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DATABASE || 'db_registro'
    }

};
