import { cardapio } from "./cardapio.js";

class CaixaDaLanchonete {

    calcularValorDaCompra(formaDePagamento, itens) {

        const formasValidas = ['dinheiro', 'debito', 'credito'];

        if (!formasValidas.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        };

        if (itens.length === 0) {
            return 'com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!'
        };

        let valorTotal = 0;

        let temCafe = false;

        let temSanduiche = false;

        for (let produto of itens) {
            const [codigo, quantidade] = produto.split(',');

            const item = cardapio.find((item) => {
                return item.codigo === codigo;
            });

            if (!item) {
                return "Item inválido!";
            };

            if (quantidade < 1) {
                return "Quantidade inválida!";
            };

            let valorItem = item.valor / 100;

            if (codigo === "cafe") {
                temCafe = true;
            } else if (item.codigo === "sanduiche") {
                temSanduiche = true;
            };

            if (codigo === "chantily" && !temCafe || codigo === "queijo" && !temSanduiche) {
                return 'Item extra não pode ser pedido sem o principal';
            };

            if (quantidade > 1 && valorItem > 0) {
                valorItem *= quantidade;
            };

            valorTotal += valorItem;
        };

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03;
        };

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

    };
};

export { CaixaDaLanchonete };
