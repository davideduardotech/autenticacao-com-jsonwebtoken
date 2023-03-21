const joi = require("joi");

const UsuarioValidation = {
    login: {
        body: joi.object().keys({
            "email": joi.string().email().required(),
            "senha":joi.string().required()
        }).required()
    },
    cadastrar:{
        body: joi.object().keys({
            "nome": joi.string().required(),
            "email": joi.string().email().required(),
            "senha": joi.string().required()
        }).required()
    }
}


module.exports = {
    UsuarioValidation
}

