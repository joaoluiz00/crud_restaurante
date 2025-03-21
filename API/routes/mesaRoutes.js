const express = require("express");
const router = express.Router();
const mesaController = require("../controllers/mesaController");

// CRUD Mesas
router.post('/', mesaController.criarMesa);       // POST /api/mesas
router.get('/', mesaController.listarMesas);      // GET /api/mesas
router.get('/:id', mesaController.listarMesaId);  // GET /api/mesas/1
router.put('/:id', mesaController.atualizarMesa); // PUT /api/mesas/1
router.delete('/:id', mesaController.deletarMesa);// DELETE /api/mesas/1

module.exports = router;