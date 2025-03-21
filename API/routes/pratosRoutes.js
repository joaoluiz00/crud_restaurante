const express = require("express");
const router = express.Router();
const pratoController = require("../controllers/pratoController");

router.post('/pratos', pratoController.criarPrato);
router.get('/pratos', pratoController.listarPratos);
router.get('/pratos/:id', pratoController.listarPratoId);
router.put('/pratos/:id', pratoController.atualizarPrato);
router.delete('/pratos/:id', pratoController.deletarPrato);

module.exports = router;const express = require("express");
const pratoController = require("../controllers/pratoController");

// CRUD Pratos
router.post('/', pratoController.criarPrato);       // POST /api/pratos
router.get('/', pratoController.listarPratos);      // GET /api/pratos
router.get('/:id', pratoController.listarPratoId);  // GET /api/pratos/1
router.put('/:id', pratoController.atualizarPrato); // PUT /api/pratos/1
router.delete('/:id', pratoController.deletarPrato);// DELETE /api/pratos/1

module.exports = router;