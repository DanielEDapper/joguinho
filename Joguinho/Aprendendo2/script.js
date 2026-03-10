console.log("Script carregado com sucesso!");

let listaFilmes = [];

function mostrarBusca(){
    const campo = document.getElementById("pesquisa");
    const botao = document.getElementById("buscaButton");

    campo.classList.toggle("ativo");

    if(campo.classList.contains("ativo")){
        botao.style.display = "block";
    }else{
        botao.style.display = "none";
    }
}

function buscarFilme()
{
    console.log("funcção foi chamada");

    let nomeFilme = document.getElementById("pesquisa").value;
    let resultado = document.getElementById("resultado");

    let larguraResultado = resultado.offsetWidth;
    let larguraCard = 180 + 10;
    let quantidadeFilmes = Math.floor(larguraResultado / larguraCard);

    fetch(`https://screenscore-api-yrw8.onrender.com/filmes/externos?title=${nomeFilme}`)
    .then(resposta => { 

        if(!resposta.ok)
        {
            throw new Error("Erro ao Buscar Filmes");
        }
        return resposta.json()
    })
    .then(dados => 
    {
        resultado.innerHTML = "";
        listaFilmes = dados.movies;

        if(dados.movies && dados.movies.length > 0)
        {
            for(let i = 0; i < dados.movies.length && i < quantidadeFilmes; i++)
            {
                let poster = dados.movies[i].posterImage;

                if(!poster)
                {
                    poster = "img/imagemNaoEncontrada.jpg";
                }
                else{
                    poster = "https://image.tmdb.org/t/p/w500" + poster;
                }

                resultado.innerHTML += 
                "<div class='card-filme'>" + 
                    "<img class='posterImage' src='" + poster + "' width='150'>" +
                    "<div class='overlay'>" +
                        "<button id='descricaoButton' onclick='mostrarDescricao(this, " + i + ")'>Ver Descrição</button>" +
                    "</div>" +
                "</div>";
            }
        }
        else
        {  
            resultado.innerHTML = "Filme não encontrado.";
        }
    }
    );
}

function mostrarDescricao(botao, indice)
{
    let movie = listaFilmes[indice];

    let card = botao.closest(".card-filme");

    let descricao = document.createElement("div");
    descricao.className = "descricaoBox";

    descricao.innerHTML =
    "<div class='descricaoConteudo'>" + 
        "<p><b>Título:</b> " + movie.title + "</p>" +
        "<p><b>Sinopse:</b> " + movie.overview + "</p>" +
        "<button id='descricaoButton' onclick='fecharDescricao'>Fechar</button>" +
    "</div>";

    card.appendChild(descricao);
}

function fecharDescricao()
{
    document.getElementById("descricaoBox").remove();
}