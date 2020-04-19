var pergPosicao = 0, correto = 0, conteudo, check, declara, alternativa, alternativa01, alternativa02, alternativa03, respostaCerta, valorEscolha;
var perguntas = [
    ["Quanto é 36 + 3?", //pergunta
        "39", "7", "0", //as escolhas
        "39"], //resposta certa
    ["Quanto é 2 x 4?", "88", "80", "8", "8"],
    ["Quanto é 4 / 4?", "44", "1", "13", "1"]
];

//função transforma tipo jQuery só para id
function get(x) {
    return document.getElementById(x);
}

//inicio
function renderpergunta() {
    conteudo = get("conteudo");
    check = get("check");

    check.style.display = "none"

    //final do questionario
    if (pergPosicao >= perguntas.length) {
        conteudo.innerHTML = "<h3 class='anime-entrarCima'>Você acertou " + correto + " de " + perguntas.length + "</h3>" +
            "<button class='btn btn-botao anime-entrarCima' onclick='location.reload()'>Reiniciar</button>";
        get("conteudo_status").innerHTML = "Fim <br/>"
        pergPosicao = 0;
        correto = 0;
        return false;
    }

    //escreve as perguntas e em qual delas está
    get("conteudo_status").innerHTML = "Pergunta " + (pergPosicao + 1) + " de " + perguntas.length;
    pergunta = perguntas[pergPosicao][0];
    alternativa01 = perguntas[pergPosicao][1];
    alternativa02 = perguntas[pergPosicao][2];
    alternativa03 = perguntas[pergPosicao][3];
    respostaCerta = perguntas[pergPosicao][4];

    conteudo.innerHTML = "<h3 class='anime-aparecer'>" + pergunta + "</h3>";
    conteudo.innerHTML += "<label class='anime-aparecer'><input type='radio' name='alternativa' value='" + alternativa01 + "'>" + alternativa01 + "</label><br/>";
    conteudo.innerHTML += "<label class='anime-aparecer'><input type='radio' name='alternativa' value='" + alternativa02 + "'>" + alternativa02 + "</label><br/>";
    conteudo.innerHTML += "<label class='anime-aparecer'><input type='radio' name='alternativa' value='" + alternativa03 + "'>" + alternativa03 + "</label><br/><br/>";
    conteudo.innerHTML += "<button class='btn btn-botao anime-aparecer' onclick='checkAnswer()'>Responder</button>";
};


//checa as perguntas e dá as respostas
function checkAnswer() {
    document.querySelector("button").setAttribute("disabled", "disabled");
    alternativa = document.getElementsByName("alternativa");
    valorEscolha = "";
    check.classList.remove("vermelho", "verde");
    check.style.display = "block";

    for (var i = 0; i < alternativa.length; i++) {
        if (alternativa[i].checked) {
            valorEscolha = alternativa[i].value;
        }
    }
    if (valorEscolha !== respostaCerta || alternativa == "") {
        check.classList.add("vermelho");
        declara = "Resposta é: " + respostaCerta
    } else {
        check.classList.add("verde");
        declara = "Acertou"
        correto++;
    }
    check.innerHTML = declara
    pergPosicao++;

    setTimeout(function () {
        renderpergunta();
    }, 2500)
};

window.addEventListener("load", renderpergunta, false);