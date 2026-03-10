function buscarFilme()
{
    let nomeFilme = document.getElementById("pesquisa").value;

    fetch(`https://screenscore-api-yrw8.onrender.com/filmes/externos?title=${nomeFilme}`)
    .then(resposta => resposta.json())
    .then(dados => 
    {

        console.log("funcção foi chamada");
        console.log(dados);

        let resultado = document.getElementById("resultado");

        resultado.innerHTML = "";

        if(dados.movies)
        {
            for(let i = 0; i < dados.movies.length; i++)
            {
                resultado.innerHTML += 
                `<label>
                    
                </label>`
                "<h3>" + dados.movies[i].title + "</h3>" +
                "<p>Língua Original: " + dados.movies[i].originalLanguage + "</p>" + 
                "<p>Título Original: " + dados.movies[i].originalTitle + "</p>" +
                "<p> Adulto: " + dados.movies[i].adult + "</p>" +
                "<p>Data de Lançamento: " + dados.movies[i].releaseDate + "</p>" +
                "<img src='https://image.tmdb.org/t/p/w500/" + dados.movies[i].posterImage + "' width='150'>" + 
                "<p>Descrição: " + dados.movies[i].overview + "</p>" +
                "<p>Generos: " + dados.movies[i].genres + "</p><hr>";

            }
        }
        if(resposta.status === 400)
        {
            resultado.innerHTML = "Dados inválidos";
        }

        if(resposta.status === 500)
        {
            resultado.innerHTML = "Erro no servidor";
        }

        if(resposta.status === 502)
        {
            resultado.innerHTML = "Erro ao comunicar com API externa";
        }
        else
        {
            resultado.innerHTML = "Filme não encontrado.";
        }
    }
    );
}

function criarFilme()
{

}