const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");


class UsuarioController{
    async show(req, res, next){
        console.log(`Payload: ${req.payload}`);
        const usuario = await Usuario.findById(req.payload.id).exec();
        if(!usuario) return res.status(404).json({"statusCode":404,"message":"usuario não encontrao"});
        return res.status(200).json({"statusCode":200,"usuario":usuario.enviarAuthJSON()});
    }
    async login(req, res, next) {
        const {email, senha} = req.body;
        const usuario = await Usuario.findOne({"email":email}).exec();
        if(!usuario) return res.status(404).json({"statusCode":404,"message":"email/senha incorretos"});
        if(usuario.descriptografarSenha(senha)){
            return res.status(200).json({"statusCode":200, "usuario": usuario.enviarAuthJSON() })
        }else{
            return res.status(404).json({"statusCode":404,"message":"email/senha incorretos"});
        }

    }

    async cadastrar(req,res, next){
        const {nome, email, senha} = req.body;
        const usuarioMongoDB = await Usuario.findOne({"email":email}).exec();
        if(usuarioMongoDB) return res.status(401).json({"statusCode":401,"message":"não foi possivel cadastrar usuario por que ele já existe no banco de dados"});
        
        try{
            const usuario = new Usuario({"nome":nome, "email":email});
            usuario.criptografarSenha(senha);
            await usuario.save();
            return res.status(200).json({"statusCode":200,"usuario":usuario.enviarAuthJSON() });
        }catch(error){
            next(error);
        }
        

    }
}

module.exports = {
    UsuarioController
};