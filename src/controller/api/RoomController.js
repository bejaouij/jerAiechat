const response = require('../../helper/response');
const databaseManager = require('../../helper/database-manager');
const databaseConfig = require('../../../config/database');

const MESSAGES_PER_PACKET = 30;

module.exports = {
    rooms: function(httpRes, queryData) {
        const client = databaseManager.getNewClient();

        client.connect();

        client.query('SELECT * FROM ' + databaseConfig.schema + '.room').then(res => {
            response.json(200, res.rows, httpRes);
        }).catch(err => {
            response.json(500, err, httpRes);
        }).finally(() => {
            client.end();
        });
    },
    messages: function(httpRes, queryData) {
        if(!queryData.room_id || parseInt(queryData.room_id) < 1 || parseInt(queryData.room_id) > 5) {
            response.json(400, {error: 'invalid \'room_id\' value'}, httpRes);
        } else {
            const client = databaseManager.getNewClient()

            client.connect();

            client.query('SELECT * FROM ' + databaseConfig.schema + '.message WHERE room_id = $1', [queryData.room_id]).then(res => {
                response.json(200, res.rows, httpRes);
            }).catch(err => {
                response.json(500, err, httpRes);
            }).finally(() => {
                client.end();
            });
        }
    },
    messagesByPacket: function(httpRes, queryData) {
        if(!queryData.room_id || parseInt(queryData.room_id) < 1 || parseInt(queryData.room_id) > 5) {
            response.json(400, {error: 'invalid \'room_id\' value'}, httpRes);
        } else if(!queryData.offset) {
            response.json(400, {error: 'invalid \'offset\' value'}, httpRes);
        } else {
            const client = databaseManager.getNewClient()

            client.connect();

            client.query('SELECT * FROM ' + databaseConfig.schema + '.message WHERE room_id = $1 ORDER BY message_id DESC LIMIT $2 OFFSET $3', [queryData.room_id, MESSAGES_PER_PACKET, queryData.offset]).then(res => {
                response.json(200, res.rows, httpRes);
            }).catch(err => {
                response.json(500, err, httpRes);
            }).finally(() => {
                client.end();
            });
        }
    }
};
