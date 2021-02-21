module.exports = {

    database: {
        connectionLimit: 60,
        host: procces.env.DB_host || 'localhost',
        user: 'root',
        password: '',
        database: 'db_registro'
    }

};
