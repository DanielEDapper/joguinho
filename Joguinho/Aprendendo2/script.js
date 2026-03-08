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

        if(dados.movies && dados.movies.length > 0)
        {
            for(let i = 0; i < 8; i++)
            {
                resultado.innerHTML += 
                "<div class='card-filme'>" + 
                    "<img class='posterImage' src='https://image.tmdb.org/t/p/w500" + dados.movies[i].posterImage + "' width='150'>" +
                    "<div class='overlay'>" +
                        "<button id='descricaoButton' onclick='mostrarDescricao(${i})'>Ver Descrição</button>" +
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
    let filme = filmes[index];

    let box = document.createElement("div");

    box.id = "descricaoBox";

    box.innerHTML = `
        <p>Título: ${descricao.title}</p>
        <p>Sinopse: ${descricao.overview}</p>
        <p>Gêneros: ${descricao.genres}</p>
        <button onclick="fecharDescricao()">Fechar</button>
    `;

    document.body.appendChild(box);
}