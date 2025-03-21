const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");

// CRUD Pedidos
router.post('/', pedidoController.criarPedido);            // POST /api/pedidos
router.get('/', pedidoController.listarPedidos);           // GET /api/pedidos
router.get('/:id', pedidoController.listarPedidoId);       // GET /api/pedidos/1
router.put('/:id/status', pedidoController.atualizarStatusPedido); // PUT /api/pedidos/1/status

// Relatório por Período
router.get('/relatorios/periodo', pedidoController.gerarRelatorio); // GET /api/pedidos/relatorios/periodo

module.exports = router;