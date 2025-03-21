const express = require("express");
const router = express.Router();
const pratoController = require("../controllers/pratosController");

// Rotas para Pratos
router.post('/', pratoController.criarPrato);
router.get('/', pratoController.listarPratos);
router.get('/:id', pratoController.listarPratoId);
router.put('/:id', pratoController.atualizarPrato);
router.delete('/:id', pratoController.deletarPrato);

module.exports = router; // Exportação deve ser a ÚLTIMA linha do arquivo