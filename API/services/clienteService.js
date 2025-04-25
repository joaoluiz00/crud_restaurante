const conexao = require('../db');

async function criarCliente(nome_cliente, telefone, email) {
    const sql = "INSERT INTO Clientes (nome_cliente, telefone, email) VALUES (?, ?, ?)";
    try {
        const [result] = await conexao.query(sql, [nome_cliente, telefone, email]);
        return result.insertId;
    } catch (err) {
        console.error("Erro ao criar cliente:", err);
        throw err;
    }
}

async function listarClientes() {
    const sql = "SELECT * FROM Clientes";
    try {
        const [clientes] = await conexao.query(sql);
        return clientes;
    } catch (err) {
        console.error("Erro ao listar clientes:", err);
        throw err;
    }
}

async function listarClienteId(id) {
    const sql = "SELECT * FROM Clientes WHERE id_cliente = ?";
    try {
        const [cliente] = await conexao.query(sql, [id]);
        return cliente[0];
    } catch (err) {
        console.error("Erro ao buscar cliente:", err);
        throw err;
    }
}

async function atualizarCliente(id, dados) {
    const sql = "UPDATE Clientes SET nome_cliente = ?, telefone = ?, email = ? WHERE id_cliente = ?";
    try {
        console.log(dados);
        await conexao.query(sql, [dados.nome_cliente, dados.telefone, dados.email, dados.id_cliente]);
        return true;
    } catch (err) {
        console.error("Erro ao atualizar cliente:", err);
        throw err;
    }
}

async function deletarCliente(id) {
    const sql = "DELETE FROM Clientes WHERE id_cliente = ?";
    try {
        console.log(id);
        await conexao.query(sql, [id]);
        return true;
    } catch (err) {
        console.error("Erro ao deletar cliente:", err);
        throw err;
    }
}

module.exports = {
    criarCliente, listarClientes, listarClienteId, atualizarCliente, deletarCliente
};