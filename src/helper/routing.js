const uri = require('url');
const querystring = require('querystring');
let routes = require('../../route/api.js');

let routing = function(url, verb, res) {
    const queryData = querystring.parse(uri.parse(url).query);
    let action;

    if(routes[verb] === undefined || (action = routes[verb][uri.parse(url).pathname]) === undefined) {
        action = {
            controller : 'StatusController',
            method : '_404'
        }
    }

    let controller = require('../controller/api/' + action.controller + '.js');
    controller[action.method](res, queryData);
};

module.exports = routing;
