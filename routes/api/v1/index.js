const router = require("express").Router();

router.use("/usuario",require("./usuarioRouter"));

module.exports = router;