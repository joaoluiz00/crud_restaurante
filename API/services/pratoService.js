const conexao = require('../db');

async function criarPrato(nome_prato, descricao, imagem, preco, disponivel) {
    const sql = "INSERT INTO Pratos (nome_prato, descricao, imagem, preco, disponivel) VALUES (?, ?, ?, ?, ?)";
    try {
        const [result] = await conexao.query(sql, [nome_prato, descricao, imagem, preco, disponivel]);
        return result.insertId; // Retorna o ID do prato criado
    } catch (err) {
        console.error("Erro ao criar prato:", err);
        throw err;
    }
}

async function listarPratos() {
    const sql = "SELECT * FROM Pratos";
    try {
        const [pratos] = await conexao.query(sql);
        return pratos;
    } catch (err) {
        console.error("Erro ao listar pratos:", err);
        throw err;
    }
}

async function listarPratoId(id) {
    const sql = "SELECT * FROM Pratos WHERE id_prato = ?";
    try {
        const [prato] = await conexao.query(sql, [id]);
        return prato[0]; // Retorna o primeiro resultado (ou undefined)
    } catch (err) {
        console.error("Erro ao buscar prato:", err);
        throw err;
    }
}

async function atualizarPrato(id, dados) {
    const sql = "UPDATE Pratos SET ? WHERE id_prato = ?";
    try {
        await conexao.query(sql, [dados, id]);
        return true;
    } catch (err) {
        console.error("Erro ao atualizar prato:", err);
        throw err;
    }
}

async function deletarPrato(id) {
    const sql = "DELETE FROM Pratos WHERE id_prato = ?";
    try {
        await conexao.query(sql, [id]);
        return true;
    } catch (err) {
        console.error("Erro ao deletar prato:", err);
        throw err;
    }
}

module.exports = {
    criarPrato, listarPratos, listarPratoId, atualizarPrato, deletarPrato
};