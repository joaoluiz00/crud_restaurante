const express = require("express");
const router = express.Router();
const mesaController = require("../controllers/mesaController");


router.post('/', mesaController.criarMesa);       
router.get('/', mesaController.listarMesas);      
router.get('/:id', mesaController.listarMesaId);  
router.put('/:id', mesaController.atualizarMesa); 
router.delete('/:id', mesaController.deletarMesa);

module.exports = router;