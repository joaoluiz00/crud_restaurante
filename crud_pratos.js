const conexao = require('./db');
const prompt = require('prompt-sync')();

async function criarPrato() {
    const nome = prompt("Nome do prato: ");
    const descricao = prompt("Descrição: ");
    const imagem = prompt("Imagem: ");
    const preco = parseFloat(prompt("Preço: "));
    const disponivel = prompt("Disponível (S/N): ").toUpperCase() === 'S' ? 1 : 0;

   
    const sql = "INSERT INTO pratos (nome_prato, descricao, imagem, preco, disponivel) VALUES (?, ?, ?, ?, ?)";
    try {
        await conexao.query(sql, [nome, descricao, imagem, preco, disponivel]);
        console.log("Prato cadastrado!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

async function listarPratos() {
    try {
        const [pratos] = await conexao.query("SELECT * FROM pratos");
        console.table(pratos);
    } catch (err) {
        console.log("Erro ao listar:", err);
    }
}

async function atualizarPrato() {
    const id = prompt("ID do prato: ");
    const nome = prompt("Novo nome: ");
    const descricao = prompt("Nova descrição: ");
    const imagem = prompt("Nova Foto: ");
    const preco = parseFloat(prompt("Novo preço: "));
    const disponivel = prompt("Disponível (S/N): ").toUpperCase() === 'S' ? 1 : 0;

    const sql = "UPDATE pratos SET nome_prato = ?, descricao = ?, imagem = ?, preco = ?, disponivel = ? WHERE id_prato = ?";
    try {
        await conexao.query(sql, [nome, descricao, imagem, preco, disponivel, id]);
        console.log("Prato atualizado!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

async function deletarPrato() {
    const id = prompt("ID do prato: ");
    try {
        
        await conexao.query("DELETE FROM pratos WHERE id_prato = ?", [id]);
        console.log("Prato excluído!");
    } catch (err) {
        console.log("Erro:", err);
    }
}

module.exports = { criarPrato, listarPratos, atualizarPrato, deletarPrato };