console.log("Script carregado com sucesso!");

let listaFilmes = [];

function buscarFilme()
{
    console.log("funcção foi chamada");

    let nomeFilme = document.getElementById("pesquisa").value;
    let resultado = document.getElementById("resultado");

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
            for(let i = 0; i < 8; i++)
            {
                let poster = dados.movies[i].posterImage;

                if(!poster)
                {
                    poster = "imagemNaoEncontrada.jpg";
                }
                else{
                    poster = "https://image.tmdb.org/t/p/w500" + poster;
                }

                resultado.innerHTML += 
                "<div class='card-filme'>" + 
                    "<img class='posterImage' src='" + poster + "' width='150'>" +
                    "<div class='overlay'>" +
                        "<button id='descricaoButton' onclick='mostrarDescricao(" + i + ")'>Ver Descrição</button>" +
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

function mostrarDescricao(descricao)
{
    let movies = listaFilmes[descricao];
    let box = document.createElement("div");
    let generos = [];

    if(movies.genres && movies.genres.length > 0)
    {
        for(let i = 0; i < movies.genres.length && i < 3; i++)
        {
            generos.push(movies.genres[i]);
        }
    }
    else
    {
        generos = "Gêneros não disponíveis";
    }

    box.id = "descricaoBox";

            box.innerHTML = 
                "<div class='descricaoConteudo'>" +
                    "<p>Título: "  + movies.title + "</p>" +
                    "<p>Sinopse: " + movies.overview + "</p>"+ 
                    "<p>Gêneros: " + generos.join(", ") + "</p>" +
                    "<button id='descricaoButton' onclick='fecharDescricao()'>Fechar</button>" +
                "</div>";
            document.body.appendChild(box);
}

function fecharDescricao()
{
    document.getElementById("descricaoBox").remove();
}