//https://codepen.io/DavidRizzo/pen/EvadmK?editors=1010
function check() {
    var valor = '';
    var todasResp = '';
    var cert_errad = '';
    var correto = 0;
    var asPerguntas = document.querySelectorAll(".asPerguntas");
    var respostas = [
        'br',
        'am',
        'Amazonas',
        'São Paulo'
    ];

    //verificar respostas não respondidas e alertar
    for (i = 1; i <= respostas.length; i++) {
        var valorCampo = eval('document.quiz.question' + i + '.value').toLowerCase();
        var asRespostas = respostas[i - 1].toLowerCase();

        //validar as perguntas
        if (valorCampo === '') {
            asPerguntas[i - 1].classList.add("vermelho");
        } else {
            asPerguntas[i - 1].classList.remove("vermelho");
        }

        if (valorCampo === asRespostas) {
            cert_errad += i + "º " + " acertou" + "<br/>";
            correto++;
        } else {
            cert_errad += "<span class='vermelho'>" + i + "º " + " errou - Correto é: ( " + respostas[i - 1] + " )</span><br/>";
        }
    };

    if (document.querySelectorAll(".vermelho").length > 0) {
        alert('Questões em vermelho precisam ser respondidas!');
        return false;
    };

    //recebe valor para respostas
    if (correto == respostas.length) {
        valor = 0;
    } else if (correto > 0 && correto < respostas.length) {
        valor = 1;
    } else {
        valor = 2;
    }

    //mensagens e imagens prontas para cada valor
    var messages = [
        "Parabéns",//0
        "Humnn, pode melhorar",//1
        "Xiii, errou todas"//2
    ];
    var pictures = [
        "files/happy.gif",//0
        "files/angry.gif",//1
        "files/sad.gif"//2
    ];

    //responder no html
    document.querySelector("#quiz").classList.remove("pergunta");
    document.querySelector(".btn-botao").remove();
    document.querySelectorAll("input").forEach(function (el) {
        el.setAttribute("disabled", "disabled");
    });

    document.getElementById("message").classList.add("anime-entrarCima");
    setTimeout(function () {
        document.getElementById("message").innerHTML =
            "<img src=" + pictures[valor] + ">" + "<br/>" +
            messages[valor] + "<br/>" +
            "Você teve: " + correto + " acertos." + "<br/> <br/>" +
            cert_errad;
    }, 200)
};