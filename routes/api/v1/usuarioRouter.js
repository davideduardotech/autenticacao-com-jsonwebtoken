const router = require("express").Router();
const {validate} = require("express-validation");
const auth = require("../../auth");

const { UsuarioController } = require("../../../controller/UsuarioController")
const { UsuarioValidation } = require("../../../controller/validation/usuarioValidation");
const usuarioController = new UsuarioController()

router.post("/login",validate(UsuarioValidation.login),usuarioController.login);
router.post("/cadastrar",validate(UsuarioValidation.cadastrar),usuarioController.cadastrar);
router.get('/',auth.required,usuarioController.show);

module.exports = router;