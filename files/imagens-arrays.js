var objetos, item;
objetos = {
    "frutas": ["abacate", "abacaxi", "banana", "laranja"],
    "legumes": ["cebola", "cenoura", "pimentao", "batata"],
    "alimentos": ["pimentao", "abacate", "cenoura", "banana"]
}

//cria link de navegação para escolha 
for (let item in objetos) {
    var link = document.createElement('a')
    link.href = 'javascript:void(0)'
    link.className = 'tipo'
    link.innerHTML = item
    document.querySelector('.navegacao').appendChild(link)
}


//loop nos link de navegação, executa tudo aqui dentro 
document.querySelectorAll('.tipo').forEach(function (el) {
    el.onclick = function (e) {
        var tipoNovo = this.innerHTML;

        document.querySelector("#quizForm").innerHTML = "";
        document.querySelector(".erros-total").innerHTML = "";
        document.querySelector(".feedback").style.display = "none";
        document.querySelector(".btn.tipo").innerHTML = tipoNovo;
        document.getElementById('quizForm').classList.remove("anime-aparecer");

        tema = objetos.frutas
        if (tipoNovo !== tema) {
            tema = objetos[tipoNovo]
        }

        let novaPergunta = [...tema]
        let pergunta = obterPergunta()
        var acertos = "";
        var erros = "";

        //loop dentro dos itens de objeto, gera as imagens para serem escolhidas
        for (let item of tema) {
            var divBox = document.createElement('div')
            divBox.className = 'anime-aparecer'

            let imgConfere = document.createElement('img')
            imgConfere.src = "files/" + item + ".jpg";
            imgConfere.className = 'certoerrado'

            let imgItem = document.createElement('img')
            imgItem.src = "files/" + item + ".jpg";
            imgItem.alt = item
            imgItem.className = 'resposta'

            divBox.appendChild(imgConfere)
            divBox.appendChild(imgItem);

            document.getElementById('quizForm').appendChild(divBox)

            //acertos e erros
            imgItem.addEventListener('click', (e) => {

                //Para ações ao final
                if (erros == 3 || novaPergunta.length === 0) {
                    return false;
                }

                //ACERTO
                if (e.target.alt === pergunta) {
                    imgConfere.src = 'files/icon-certo.png'
                    imgConfere.style.display = 'block'
                    acertos++;
                    novaPergunta = novaPergunta.filter(pergunta => pergunta !== e.target.alt)
                    setTimeout(function () {
                        imgConfere.style.display = 'none'
                    }, 800);
                    document.querySelectorAll("img[src='files/icon-errado.png']").forEach(e => {
                        e.style.display = 'none'
                    })

                    //ACERTO - APÓS TODOS ACERTOS
                    if (novaPergunta.length === 0) {
                        setTimeout(function () {
                            document.querySelector("h3").style.display = "none";
                            document.querySelector("h2").removeAttribute("style");
                            document.getElementById('pergunta').innerHTML = "fim";
                            document.querySelector(".feedback").classList.add("anime-entrarBaixo");
                            document.querySelector(".feedback").style.display = "block";
                        }, 800)
                        return
                    }
                    setTimeout(function () {
                        pergunta = obterPergunta();
                    }, 900);

                    //ERROS
                } else {
                    imgConfere.src = "files/icon-errado.png"
                    imgConfere.style.display = "block";
                    erros++;
                    document.querySelector(".erros-total").innerHTML = "Erros: " + erros + " de 3";

                    //QUANTIDADE DE ERROS
                    if (erros == 3) {
                        setTimeout(function () {
                            document.querySelector("h2").style.display = "none";
                            document.querySelector("h3").removeAttribute("style");
                            document.querySelector(".feedback").classList.add("anime-entrarBaixo");
                            document.querySelector(".feedback").style.display = "block";
                        }, 800);
                    }
                }
            })
        };

        //GERA PERGUNTA ALEATÓRIA SEM REPETIR 
        function obterPergunta() {
            var indexAtual = getRandomInt(0, novaPergunta.length);
            var nomepergunta = novaPergunta[indexAtual]

            document.getElementById('pergunta').classList.remove("anime-aparecer")
            setTimeout(function () {
                document.getElementById('pergunta').classList.add("anime-aparecer");
                document.getElementById('pergunta').innerHTML = nomepergunta
            }, 100);
            return nomepergunta
        }


        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
});