const conexao = require('./db');
const prompt = require('prompt-sync')();


async function criarPedido() {
    try {

        const [clientes] = await conexao.query("SELECT id_cliente, nome_cliente FROM Clientes");
        console.table(clientes);
        const id_cliente = prompt("Informe o ID do cliente: ");


        const [mesas] = await conexao.query("SELECT id_mesa, numero_mesa FROM Mesas WHERE disponivel = 1");
        console.table(mesas);
        const id_mesa = prompt("Informe o ID da mesa: ");


        const sqlPedido = "INSERT INTO Pedidos (id_cliente, id_mesa) VALUES (?, ?)";
        const [result] = await conexao.query(sqlPedido, [id_cliente, id_mesa]);
        const id_pedido = result.insertId;


        let continuar = true;
        while (continuar) {
            const [pratos] = await conexao.query("SELECT id_prato, nome_prato, preco FROM Pratos WHERE disponivel = 1");
            console.table(pratos);
            const id_prato = prompt("Informe o ID do prato (ou 0 para finalizar): ");
            
            if (id_prato === '0') {
                continuar = false;
            } else {
                const quantidade = prompt("Quantidade: ");
                const preco_unitario = pratos.find(p => p.id_prato == id_prato).preco;
                
                const sqlItem = "INSERT INTO Itens_Pedido (id_pedido, id_prato, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
                await conexao.query(sqlItem, [id_pedido, id_prato, quantidade, preco_unitario]);
                console.log("Prato adicionado!");
            }
        }


        await conexao.query("UPDATE Mesas SET disponivel = 0 WHERE id_mesa = ?", [id_mesa]);
        console.log("Pedido registrado com sucesso!");

    } catch (err) {
        console.log("Erro ao criar pedido:", err);
    }
}

// Listar Pedidos
async function listarPedidos() {
    try {
        const [pedidos] = await conexao.query(`
            SELECT 
                p.id_pedido,
                c.nome_cliente,
                m.numero_mesa,
                p.data_pedido,
                p.status_pedido
            FROM Pedidos p
            JOIN Clientes c ON p.id_cliente = c.id_cliente
            JOIN Mesas m ON p.id_mesa = m.id_mesa
        `);
        console.table(pedidos);
    } catch (err) {
        console.log("Erro ao listar pedidos:", err);
    }
}

async function gerarRelatorio() {
    try {
        const dataInicial = prompt("Data/hora inicial (YYYY-MM-DD HH:MM): ");
        const dataFinal = prompt("Data/hora final (YYYY-MM-DD HH:MM): ");

        const [relatorio] = await conexao.query(`
            SELECT 
                p.id_pedido,
                DATE_FORMAT(p.data_pedido, '%d/%m/%Y %H:%i') AS data_hora,
                c.nome_cliente,
                m.numero_mesa,
                SUM(ip.quantidade * ip.preco_unitario) AS total_pedido
            FROM Pedidos p
            JOIN Clientes c ON p.id_cliente = c.id_cliente
            JOIN Mesas m ON p.id_mesa = m.id_mesa
            JOIN Itens_Pedido ip ON p.id_pedido = ip.id_pedido
            WHERE p.data_pedido BETWEEN ? AND ?
            GROUP BY p.id_pedido
        `, [dataInicial, dataFinal]);

        console.table(relatorio);
    } catch (err) {
        console.log("Erro:", err);
    }
}

module.exports = { criarPedido, listarPedidos, gerarRelatorio };