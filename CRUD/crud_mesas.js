const conexao = require('./db');
const prompt = require('prompt-sync')();

async function criarMesa() {
    const numero = prompt("Número da mesa: ");
    const capacidade = prompt("Capacidade: ");
    const disponivel = prompt("Disponível (S/N): ").toUpperCase() === 'S' ? 1 : 0;

    const sql = "INSERT INTO mesas (numero_mesa, capacidade, disponivel) VALUES (?, ?, ?)";
    try {
        await conexao.query(sql, [numero, capacidade, disponivel]);
        console.log("Mesa cadastrada!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

async function listarMesas() {
    try {
        const [mesas] = await conexao.query("SELECT * FROM mesas");
        console.table(mesas);
    } catch (err) {
        console.log("Erro ao listar:", err);
    }
}

async function atualizarMesa() {
    const id = prompt("ID da mesa: ");
    const numero = prompt("Novo número: ");
    const capacidade = prompt("Nova capacidade: ");
    const disponivel = prompt("Disponível (S/N): ").toUpperCase() === 'S' ? 1 : 0;

    const sql = "UPDATE mesas SET numero_mesa = ?, capacidade = ?, disponivel = ? WHERE id_mesa = ?";
    try {
        await conexao.query(sql, [numero, capacidade, disponivel, id]);
        console.log("Mesa atualizada!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

async function deletarMesa() {
    const id = prompt("ID da mesa: ");
    try {
        await conexao.query("DELETE FROM mesas WHERE id_mesa = ?", [id]);
        console.log("Mesa excluída!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

module.exports = { criarMesa, listarMesas, atualizarMesa, deletarMesa };