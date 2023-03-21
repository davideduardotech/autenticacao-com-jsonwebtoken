var { expressjwt: jwt } = require("express-jwt");
const secret = require("../config").secret;

function getTokenFromHeader(req){
    if(!req.headers.authorization) return null;
    const token = req.headers.authorization.split(" ");
    if(token[0] != "token") return null;
    return token[1]
}

const auth = {
    required:jwt({
        secret,
        requestProperty: 'payload',
        getToken: getTokenFromHeader,
        algorithms: ['HS256']
    })
};

module.exports = auth;