const pedidoService = require('../services/pedidoService');

async function criarPedido(req, res) {
    try {
        const { id_cliente, id_mesa, itens } = req.body;
        const sucesso = await pedidoService.criarPedido(id_cliente, id_mesa, itens);
        sucesso ? res.status(201).json({ mensagem: "Pedido criado!" }) : res.status(400).json({ erro: "Falha ao criar pedido" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarPedidos(req, res) {
    try {
        const pedidos = await pedidoService.listarPedidos();
        pedidos ? res.json(pedidos) : res.status(404).json({ erro: "Pedidos não encontrados" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function listarPedidoId(req, res) {
    try {
        const { id } = req.params;
        const pedido = await pedidoService.listarPedidoId(id);
        pedido ? res.json(pedido) : res.status(404).json({ erro: "Pedido não encontrado" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function atualizarStatusPedido(req, res) {
    try {
        const { id } = req.params;
        const { status_pedido } = req.body;
        const sucesso = await pedidoService.atualizarStatusPedido(id, status_pedido);
        sucesso ? res.json({ mensagem: "Status atualizado!" }) : res.status(400).json({ erro: "Falha ao atualizar status" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function gerarRelatorio(req, res) {
    try {
        const { dataInicial, dataFinal } = req.query;
        const relatorio = await pedidoService.gerarRelatorio(dataInicial, dataFinal);
        relatorio ? res.json(relatorio) : res.status(404).json({ erro: "Nenhum dado encontrado" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

module.exports = {
    criarPedido, listarPedidos, listarPedidoId, atualizarStatusPedido, gerarRelatorio
};