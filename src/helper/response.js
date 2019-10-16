const response = {
    json: function(httpCode, content, res) {
        res.writeHead(httpCode, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(content));
        res.end();
    }
};

module.exports = response;
