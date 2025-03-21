const conexao = require('../db');

async function criarMesa(numero_mesa, capacidade, disponivel) {
    const sql = "INSERT INTO Mesas (numero_mesa, capacidade, disponivel) VALUES (?, ?, ?)";
    try {
        const [result] = await conexao.query(sql, [numero_mesa, capacidade, disponivel]);
        return result.insertId;
    } catch (err) {
        console.error("Erro ao criar mesa:", err);
        throw err;
    }
}

async function listarMesas() {
    const sql = "SELECT * FROM Mesas";
    try {
        const [mesas] = await conexao.query(sql);
        return mesas;
    } catch (err) {
        console.error("Erro ao listar mesas:", err);
        throw err;
    }
}

async function listarMesaId(id) {
    const sql = "SELECT * FROM Mesas WHERE id_mesa = ?";
    try {
        const [mesa] = await conexao.query(sql, [id]);
        return mesa[0];
    } catch (err) {
        console.error("Erro ao buscar mesa:", err);
        throw err;
    }
}

async function atualizarMesa(id, dados) {
    const sql = "UPDATE Mesas SET ? WHERE id_mesa = ?";
    try {
        await conexao.query(sql, [dados, id]);
        return true;
    } catch (err) {
        console.error("Erro ao atualizar mesa:", err);
        throw err;
    }
}

async function deletarMesa(id) {
    const sql = "DELETE FROM Mesas WHERE id_mesa = ?";
    try {
        await conexao.query(sql, [id]);
        return true;
    } catch (err) {
        console.error("Erro ao deletar mesa:", err);
        throw err;
    }
}

module.exports = {
    criarMesa, listarMesas, listarMesaId, atualizarMesa, deletarMesa
};