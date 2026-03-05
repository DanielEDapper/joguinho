let roteiro = [];
let dados = [];

/* carregar o JSON */
fetch("destinos.json")
    .then(resposta => resposta.json())
    .then(json => {
        dados = json;
    });

function mostrarCategoria(categoriaEscolhida) {

    let conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = "";

    for (let i = 0; i < dados.length; i++) {

        if (dados[i].categoria === categoriaEscolhida) {

            conteudo.innerHTML +=
                "<h3>" + dados[i].nome + "</h3>" +
                "<p>" + dados[i].descricao + "</p>" +
                "<button onclick=\"adicionarAoRoteiro('" + dados[i].nome + "')\">Adicionar</button><hr>";
        }
    }
}

function adicionarAoRoteiro(item) {
    roteiro.push(item);
    alert(item + " adicionado ao roteiro!");
}

function verRoteiro() {

    let conteudo = document.getElementById("conteudo");

    conteudo.innerHTML = "<h2>Seu Roteiro:</h2>";

    for (let i = 0; i < roteiro.length; i++) {
        conteudo.innerHTML += "<p>" + roteiro[i] + "</p>";
    }
}