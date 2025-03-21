const pratoService = require('../services/pratoService');

async function criarPrato(req, res) {
    try {
        const { nome_prato, descricao, imagem, preco, disponivel } = req.body;
        const sucesso = await pratoService.criarPrato(nome_prato, descricao, imagem, preco, disponivel);
        sucesso ? res.status(201).json({ mensagem: "Prato criado!" }) : res.status(400).json({ erro: "Falha ao criar prato" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarPratos(req, res) {
    try {
        const pratos = await pratoService.listarPratos();
        pratos ? res.json(pratos) : res.status(404).json({ erro: "Pratos não encontrados" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarPratoId(req, res) {
    try {
        const { id } = req.params;
        const prato = await pratoService.listarPratoId(id);
        prato ? res.json(prato) : res.status(404).json({ erro: "Prato não encontrado" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function atualizarPrato(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;
        const sucesso = await pratoService.atualizarPrato(id, dados);
        sucesso ? res.json({ mensagem: "Prato atualizado!" }) : res.status(400).json({ erro: "Falha ao atualizar prato" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function deletarPrato(req, res) {
    try {
        const { id } = req.params;
        const sucesso = await pratoService.deletarPrato(id);
        sucesso ? res.json({ mensagem: "Prato excluído!" }) : res.status(400).json({ erro: "Falha ao excluir prato" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

module.exports = {
    criarPrato, listarPratos, listarPratoId, atualizarPrato, deletarPrato
};