const mesaService = require('../services/mesaService');

async function criarMesa(req, res) {
    try {
        const { numero_mesa, capacidade, disponivel } = req.body;
        const sucesso = await mesaService.criarMesa(numero_mesa, capacidade, disponivel);
        sucesso ? res.status(201).json({ mensagem: "Mesa criada!" }) : res.status(400).json({ erro: "Falha ao criar mesa" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarMesas(req, res) {
    try {
        const mesas = await mesaService.listarMesas();
        mesas ? res.json(mesas) : res.status(404).json({ erro: "Mesas não encontradas" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarMesaId(req, res) {
    try {
        const { id } = req.params;
        const mesa = await mesaService.listarMesaId(id);
        mesa ? res.json(mesa) : res.status(404).json({ erro: "Mesa não encontrada" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function atualizarMesa(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;
        const sucesso = await mesaService.atualizarMesa(id, dados);
        sucesso ? res.json({ mensagem: "Mesa atualizada!" }) : res.status(400).json({ erro: "Falha ao atualizar mesa" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function deletarMesa(req, res) {
    try {
        const { id } = req.params;
        const sucesso = await mesaService.deletarMesa(id);
        sucesso ? res.json({ mensagem: "Mesa excluída!" }) : res.status(400).json({ erro: "Falha ao excluir mesa" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

module.exports = {
    criarMesa, listarMesas, listarMesaId, atualizarMesa, deletarMesa
};