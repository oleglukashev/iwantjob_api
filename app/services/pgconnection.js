const { Pool } = require('pg');
const db_config = require('../../database.json');

module.exports = new Pool(db_config.dev);
