const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto',
    password: 'Hugoxs99',
    port: 5432,
});

module.exports = pool;
