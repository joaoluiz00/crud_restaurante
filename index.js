const prompt = require('prompt-sync')();
const { criarPrato, listarPratos, atualizarPrato, deletarPrato } = require('./crud_pratos');
const { criarCliente, listarClientes, atualizarCliente, deletarCliente } = require('./crud_clientes');
const { criarMesa, listarMesas, atualizarMesa, deletarMesa } = require('./crud_mesas');
const { criarPedido, listarPedidos, gerarRelatorio } = require('./crud_pedidos'); // Nova importação

async function menuPrincipal() {
    console.log("\n=== Sistema Restaurante ===");
    console.log("1 - Gerenciar Pratos");
    console.log("2 - Gerenciar Clientes");
    console.log("3 - Gerenciar Mesas");
    console.log("4 - Gerenciar Pedidos"); 
    console.log("5 - Gerar Relatório"); 
    console.log("6 - Sair");

    const opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case '1':
            await menuCRUD("Pratos", criarPrato, listarPratos, atualizarPrato, deletarPrato);
            break;
        case '2':
            await menuCRUD("Clientes", criarCliente, listarClientes, atualizarCliente, deletarCliente);
            break;
        case '3':
            await menuCRUD("Mesas", criarMesa, listarMesas, atualizarMesa, deletarMesa);
            break;
        case '4':
            await menuPedidos();
            break;
        case '5':
            await gerarRelatorio();
            break;
        case '6':
            process.exit();
        default:
            console.log("Opção inválida!");
    }
}

// Novo menu para Pedidos
async function menuPedidos() {
    while (true) {
        console.log("\n=== CRUD Pedidos ===");
        console.log("1 - Criar Pedido");
        console.log("2 - Listar Pedidos");
        console.log("3 - Voltar");

        const opcao = prompt("Escolha uma ação: ");

        switch (opcao) {
            case '1':
                await criarPedido();
                break;
            case '2':
                await listarPedidos();
                break;
            case '3':
                return;
            default:
                console.log("Opção inválida!");
        }
    }
}

(async () => {
    while (true) {
        await menuPrincipal();
    }
})();