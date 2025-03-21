const clienteService = require('../services/clienteService');

async function criarCliente(req, res) {
    try {
        const { nome_cliente, telefone, email } = req.body;
        const sucesso = await clienteService.criarCliente(nome_cliente, telefone, email);
        sucesso ? res.status(201).json({ mensagem: "Cliente criado!" }) : res.status(400).json({ erro: "Falha ao criar cliente" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarClientes(req, res) {
    try {
        const clientes = await clienteService.listarClientes();
        clientes ? res.json(clientes) : res.status(404).json({ erro: "Clientes não encontrados" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarClienteId(req, res) {
    try {
        const { id } = req.params;
        const cliente = await clienteService.listarClienteId(id);
        cliente ? res.json(cliente) : res.status(404).json({ erro: "Cliente não encontrado" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function atualizarCliente(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;
        const sucesso = await clienteService.atualizarCliente(id, dados);
        sucesso ? res.json({ mensagem: "Cliente atualizado!" }) : res.status(400).json({ erro: "Falha ao atualizar cliente" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function deletarCliente(req, res) {
    try {
        const { id } = req.params;
        const sucesso = await clienteService.deletarCliente(id);
        sucesso ? res.json({ mensagem: "Cliente excluído!" }) : res.status(400).json({ erro: "Falha ao excluir cliente" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

module.exports = {
    criarCliente, listarClientes, listarClienteId, atualizarCliente, deletarCliente
};