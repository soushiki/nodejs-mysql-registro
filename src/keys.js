module.exports = {

    database: {
        connectionLimit: 60,
        host: procces.env.DB_host || 'localhost',
        user: process.env.DB_USER || 'root',
        password: '',
        database: 'db_registro'
    }

};
