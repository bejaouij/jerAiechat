const response = require('../../helper/response');

module.exports = {
    index: function(res, queryData) {
        response.json(200, 'Hello World!', res);
    }
};
