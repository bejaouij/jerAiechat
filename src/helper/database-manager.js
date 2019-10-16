const { Client } = require('pg');
const databaseConfig = require('../../config/database');

const databaseManager = {
    getNewClient: function(httpCode, content, res) {
        return new Client({
            host: databaseConfig.host,
            username: databaseConfig.username,
            password: databaseConfig.password,
            database: databaseConfig.database
        });
    }
};

module.exports = databaseManager;
