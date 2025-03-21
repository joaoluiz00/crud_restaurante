const conexao = require('../db');

async function criarPedido(id_cliente, id_mesa, itens) {
    let connection;
    try {
        connection = await conexao.getConnection();
        await connection.beginTransaction();

        // 1. Criar o pedido
        const [pedido] = await connection.query(
            "INSERT INTO Pedidos (id_cliente, id_mesa) VALUES (?, ?)",
            [id_cliente, id_mesa]
        );
        const id_pedido = pedido.insertId;

        // 2. Adicionar itens ao pedido
        for (const item of itens) {
            await connection.query(
                "INSERT INTO Itens_Pedido (id_pedido, id_prato, quantidade, preco_unitario) VALUES (?, ?, ?, ?)",
                [id_pedido, item.id_prato, item.quantidade, item.preco_unitario]
            );
        }

        // 3. Atualizar status da mesa
        await connection.query(
            "UPDATE Mesas SET disponivel = FALSE WHERE id_mesa = ?",
            [id_mesa]
        );

        await connection.commit();
        return id_pedido;
    } catch (err) {
        if (connection) await connection.rollback();
        console.error("Erro ao criar pedido:", err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
}

async function listarPedidos() {
    const sql = `
        SELECT 
            p.id_pedido,
            c.nome_cliente,
            m.numero_mesa,
            p.data_pedido,
            p.status_pedido
        FROM Pedidos p
        JOIN Clientes c ON p.id_cliente = c.id_cliente
        JOIN Mesas m ON p.id_mesa = m.id_mesa
    `;
    try {
        const [pedidos] = await conexao.query(sql);
        return pedidos;
    } catch (err) {
        console.error("Erro ao listar pedidos:", err);
        throw err;
    }
}

async function listarPedidoId(id) {
    const sql = `
        SELECT 
            p.*,
            ip.id_prato,
            ip.quantidade,
            ip.preco_unitario
        FROM Pedidos p
        JOIN Itens_Pedido ip ON p.id_pedido = ip.id_pedido
        WHERE p.id_pedido = ?
    `;
    try {
        const [pedido] = await conexao.query(sql, [id]);
        return pedido;
    } catch (err) {
        console.error("Erro ao buscar pedido:", err);
        throw err;
    }
}

async function atualizarStatusPedido(id, status_pedido) {
    const sql = "UPDATE Pedidos SET status_pedido = ? WHERE id_pedido = ?";
    try {
        await conexao.query(sql, [status_pedido, id]);
        return true;
    } catch (err) {
        console.error("Erro ao atualizar status:", err);
        throw err;
    }
}

async function gerarRelatorio(dataInicial, dataFinal) {
    const sql = `
        SELECT 
            p.id_pedido,
            c.nome_cliente,
            m.numero_mesa,
            p.data_pedido,
            SUM(ip.quantidade * ip.preco_unitario) AS total
        FROM Pedidos p
        JOIN Clientes c ON p.id_cliente = c.id_cliente
        JOIN Mesas m ON p.id_mesa = m.id_mesa
        JOIN Itens_Pedido ip ON p.id_pedido = ip.id_pedido
        WHERE p.data_pedido BETWEEN ? AND ?
        GROUP BY p.id_pedido
    `;
    try {
        const [relatorio] = await conexao.query(sql, [dataInicial, dataFinal]);
        return relatorio;
    } catch (err) {
        console.error("Erro ao gerar relatório:", err);
        throw err;
    }
}

module.exports = {
    criarPedido, listarPedidos, listarPedidoId, atualizarStatusPedido, gerarRelatorio
};