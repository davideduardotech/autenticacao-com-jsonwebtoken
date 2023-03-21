const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


// CODDING: Intância
const app = express();

// CODDING: Middleware
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: 1.5*1024*1024})) // 1.5MB
app.use(bodyParser.urlencoded({extended:false ,limit: 1.5*1024*1024})); // 1.5MB
app.use(cors());


// CODDING: Banco de Dados(MongoDB Atlas)
const db = require("./config/database.json");
mongoose.connect(db.MongoDB,{useNewUrlParser: true, useUnifiedTopology:true})
mongoose.connection.on("connected", ()=>{
    console.log('conectado no banco de dados');
})

/// CODDING: Carregar os Modelos
require("./model");


// CODDING: Rotas
app.use("/",require("./routes/index"));

// CODDING: Rotas(404)
app.use((req, res, next) => {
    const err = new Error("Não Encontrado");
    err.error = "Não Encontrado";
    err.status = 404;
    next(err);
});


// CODDING: Rotas(422, 500, 401)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if(err.status !== 404) console.warn("Error: ", err.message, new Date());
    res.json(err);
});


// CODDING: Start
app.listen(3000,(error)=>{
    if(error) throw error;
    console.log("servidor iniciado e pronto pra uso")
});