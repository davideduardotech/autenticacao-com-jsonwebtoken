const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const uniqueValidation = require("mongoose-unique-validator");
const crypto = require("crypto");
const secret = require("../config").secret;



const UsuarioSchema = new Schema({
    nome:{
        type: String,
        required: [true, "Por favor, preencha o nome do usuario"]
    },
    email:{
        type:String, 
        required: [true, "Por favor, preencha o email"]
    },
    salt:{
        type: String
    },
    hash: {
        type: String
    }
},{timestamps: true})


// UsuarioSchema.plugin(uniqueValidation, {message:"usuário já está sendo utilizado."})


// CODDING: Methods
UsuarioSchema.methods.criptografarSenha = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000,512, "sha512").toString("hex");
}

UsuarioSchema.methods.descriptografarSenha = function(senha){
    const hash = crypto.pbkdf2Sync(senha, this.salt, 10000,512, "sha512").toString("hex");
    return hash == this.hash
}

UsuarioSchema.methods.gerarJsonWebToken = function(){
    return jwt.sign({
        id: this._id,
        nome: this.nome,
        email: this.email
    },secret);
}

UsuarioSchema.methods.enviarAuthJSON = function(){
    return {
        id: this._id,
        nome: this.nome, 
        email: this.email,
        token: this.gerarJsonWebToken() 
    }
}


module.exports = mongoose.model("Usuario",UsuarioSchema);

