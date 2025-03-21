const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

// CRUD Clientes
router.post('/', clienteController.criarCliente);       
router.get('/', clienteController.listarClientes);      
router.get('/:id', clienteController.listarClienteId);  
router.put('/:id', clienteController.atualizarCliente); 
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;