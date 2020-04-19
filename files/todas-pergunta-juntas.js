//https://codepen.io/aacode/pen/oYKLEM

function submitAnswer() {
    var answers = ["13", "22", "33"];
    var total = answers.length;
    var ponto = 0;
    var questoes = '';
    var asPerguntas = document.querySelectorAll(".numeroPergunta");

    //verificar respostas não respondidas e alertar
    for (i = 1; i <= total; i++) {
        if (eval('document.quizForm.q' + i + '.value') === '') {
            asPerguntas[i - 1].classList.add("vermelho");
            questoes += i + ', ';
        } else {
            asPerguntas[i - 1].classList.remove("vermelho");
        }
    }
    
    if (questoes != '') {
        alert('Responda a questão: ' + questoes + ' em vermelho');
        return false;
    };

    //verificar respostas certas e erradas
    for (i = 1; i <= total; i++) {
        var selected = eval('document.quizForm.q' + i + '.value');

        eval('document.quizForm.q' + i).forEach(function (e) {

            e.parentElement.classList.remove("acertou");
            e.parentElement.classList.remove("errado");
            e.parentElement.classList.add("anime-aparecer");

            if (e.value === answers[i - 1])
                e.parentElement.classList.add("acertou");
            else
                e.parentElement.classList.add("errado");

            if (e.value === selected)
                e.parentElement.classList.add("click");
        });

        if (selected === answers[i - 1]) {
            ponto++;
        }
    }

    //responder no html
    if (questoes <= total) {
        document.querySelector(".btn-botao").remove();
        document.querySelector("form").classList.remove("pergunta");
        document.querySelectorAll("input[type='radio']").forEach(function(el){
            el.setAttribute("disabled", "disabled");
        });

        if (ponto > 0 && ponto < total) {
            declara = "Você acertou: " + ponto + " de " + total;
        } else if (ponto === total) {
            declara = "Parabéns, você acertou todas: " + ponto + " de " + total;
        } else {
            declara = "Não acertou nada";
        }
        document.getElementById("message").classList.add("anime-aparecer");
        document.getElementById("message").innerHTML = declara;
    }
}