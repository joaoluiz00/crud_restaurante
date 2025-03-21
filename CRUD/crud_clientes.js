const conexao = require('./db');
const prompt = require('prompt-sync')();

async function criarCliente() {
    const nome = prompt("Nome do cliente: ");
    const telefone = prompt("Telefone: ");
    const email = prompt("Email: ");

    const sql = "INSERT INTO clientes (nome_cliente, telefone, email) VALUES (?, ?, ?)";
    try {
        await conexao.query(sql, [nome, telefone, email]);
        console.log("Cliente cadastrado!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

async function listarClientes() {
    try {
        const [clientes] = await conexao.query("SELECT * FROM clientes");
        console.table(clientes);
    } catch (err) {
        console.log("Erro ao listar:", err);
    }
}

async function atualizarCliente() {
    const id = prompt("ID do cliente: ");
    const nome = prompt("Novo nome: ");
    const telefone = prompt("Novo telefone: ");
    const email = prompt("Novo email: ");

    const sql = "UPDATE clientes SET nome_cliente = ?, telefone = ?, email = ? WHERE id_cliente = ?";
    try {
        await conexao.query(sql, [nome, telefone, email, id]);
        console.log("cliente atualizado!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

async function deletarCliente() {
    const id = prompt("ID do cliente: ");
    try {
        await conexao.query("DELETE FROM c3lientes WHERE id_cliente = ?", [id]);
        console.log("Cliente excluído!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

module.exports = { criarCliente, listarClientes, atualizarCliente, deletarCliente };