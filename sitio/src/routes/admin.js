var express = require('express');
var router = express.Router();

const { admin, productHide,productActive ,add, save, load, update,destroy } = require("../controllers/productsController");

const { list } = require('../controllers/usersController');

//middlewares
const adminUserCheck = require("../middlewares/adminUserCheck");
const addProductValidator = require("../validations/addProductValidator");
const upload = require("../middlewares/multerConfig");


router.get("/productos", adminUserCheck, admin);

router.put("/producto/mostrar/:id", productActive);

router.put("/producto/ocultar/:id", productHide);

router.delete("/producto/eliminar/:id",destroy);

router.get('/producto/agregar',adminUserCheck ,add);

router.post("/producto/agregar", upload.array("imagen"), addProductValidator, save); 

router.get('/producto/modificar/:id', adminUserCheck, load);

router.put("/producto/modificar/:id", upload.array("imagen"), addProductValidator, update);

router.get("/list",list)

module.exports=router