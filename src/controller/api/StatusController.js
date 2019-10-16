const response = require('../../helper/response');

module.exports = {
    _404: function(res, queryData) {
        response.json(404, 'Not Found', res);
    }
};
