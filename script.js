class produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        if (nome.trim() === "") {
            throw new Error("O nome do produto não pode ficar em branco.");
        }

        if (parseFloat(preco) <= 0) {
            throw new Error("O preço deve ser maior que zero.");
        }

        if (parseInt(quantidade) <= 0) {
            throw new Error("A quantidade deve ser maior que zero.");
        }

        this.nome = nome;
        this.#preco = parseFloat(preco);
        this.#quantidade = parseInt(quantidade);
    }
    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    calcularSubtotal() {
        return this.#preco * this.#quantidade;
    }
}

const listadeProdutos = [];

const formProduto = document.getElementById("produto-form");

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome").value;
    const precoInput = document.getElementById("preco").value;
    const quantidadeInput = document.getElementById("quantidade").value;

    try {
        const novoProduto = new produto(
            nomeInput,
            precoInput,
            quantidadeInput
        );

        listadeProdutos.push(novoProduto);

        renderizarTabela();
        atualizarTotalEstoque();

        formProduto.reset();

    } catch (erro) {
        alert(erro.message);
    }
});

function renderizarTabela() {
    const tabelaBody = document.querySelector("#tabela-produtos tbody");

    tabelaBody.innerHTML = "";

    listadeProdutos.forEach((produto, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.calcularSubtotal().toFixed(2)}</td>
            <td>
                <button
                    class="btn-remover"
                    onclick="removerProduto(${index})"
                >
                    Remover
                </button>
            </td>
        `;

        tabelaBody.appendChild(linha);
    });
}

function atualizarTotalEstoque() {
    const total = listadeProdutos.reduce((acumulador, produto) => {
        return acumulador + produto.calcularSubtotal();
    }, 0);

    const totalEstoque = document.getElementById("total-estoque");

    totalEstoque.textContent = `Total em Estoque: ${total.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    )}`;
}

function removerProduto(index) {
    listadeProdutos.splice(index, 1);

    renderizarTabela();
    atualizarTotalEstoque();
}

const botaoLimpar = document.getElementById("limpar-tabela");

botaoLimpar.addEventListener("click", function() {
    listadeProdutos.length = 0;

    renderizarTabela();
    atualizarTotalEstoque();
});
