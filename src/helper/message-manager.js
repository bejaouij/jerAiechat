const databaseConfig = require('../../config/database');
const databaseManager = require('./database-manager');

const messageManager = {
    create: function(data) {
        if(data.room_id < 1 || data.room_id > 5) {
            throw new Error('Invalid \'room_id\' value')
        }
        if(!data.message) {
            throw new Error('Invalid \'message\' value')
        }
        if(!data.author) {
            throw new Error('Invalid \'author\' value')
        }

        const client = databaseManager.getNewClient();

        client.connect();

        client.query('INSERT INTO ' + databaseConfig.schema + '.message(message_author, message_content, room_id) VALUES($1, $2, $3)', [data.author, data.message, data.room_id]);
    }
};

module.exports = messageManager;
