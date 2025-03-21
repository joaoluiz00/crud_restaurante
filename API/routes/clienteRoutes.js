const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

// CRUD Clientes
router.post('/', clienteController.criarCliente);       // POST /api/clientes
router.get('/', clienteController.listarClientes);      // GET /api/clientes
router.get('/:id', clienteController.listarClienteId);  // GET /api/clientes/1
router.put('/:id', clienteController.atualizarCliente); // PUT /api/clientes/1
router.delete('/:id', clienteController.deletarCliente);// DELETE /api/clientes/1

module.exports = router;