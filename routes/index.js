const router = require("express").Router();

router.use("/v1/api",require("./api/v1"));
router.get("/",(req,res,next)=>{
    
    return res.status(200).json({"statusCode":200,"message":"rota de homepage acessada com sucesso"});
})

module.exports = router;
