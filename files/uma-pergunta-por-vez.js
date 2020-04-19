var valores = document.querySelectorAll(".resposta");
var resp = ["c", "b", "c"];
var perg = 1;

document.getElementById("quantidades").innerHTML = "pergunta: " + perg + " de " + resp.length;

//marcar e desmarcar resposta do "parentElement" selecionado
valores.forEach(function (valor) {
    valor.onclick = function () {
        var lista = valor.parentElement.getElementsByTagName('div');
        for (i = 0; i < lista.length; i++) {
            lista[i].classList.remove("active");
        }
        valor.classList.add("active");
    }
});

function funcBotao() {

    //alerta quando não respondido e esconde botao no final
    if (document.getElementsByClassName("active").length < perg) {
        alert('Selecione uma resposta!');
        return false;
    }

    //pontua acertos e erros
    var selecionados = document.getElementsByClassName("active");
    var certos = 0;
    var erros = 0;

    for (i = 0; i < selecionados.length; i++) {

        if (selecionados[i].dataset.value === resp[i]) {
            certos++;
        } else {
            selecionados[i].classList.add("errado");
            erros++;
        }
    }

    //esconde e mostra proxima pergunta
    selecionados[selecionados.length - 1].parentElement.style.display = "none";
    selecionados[selecionados.length - 1].parentElement.nextElementSibling.classList.add("anime-entrarEsquerda");
    selecionados[selecionados.length - 1].parentElement.nextElementSibling.style.display = "block";

    //escreve numero de acertos e erros no HTML
    perg++;

    if (perg == resp.length) {
        document.querySelector(".btn-botao").classList.add("verde");
        document.querySelector(".btn-botao").value = "Ver resultados";
    }

    if (perg > resp.length) {
        document.getElementById("total").innerHTML = certos + " certo(s) e " + erros + " erro(s)";
        document.querySelector(".btn-botao").style.display = 'none';
    }

    if (perg < (resp.length + 1)) {
        document.getElementById("quantidades").innerHTML = "pergunta: " + perg + " de " + resp.length;
    }

    //final de tudo - Mostra as resposta
    if (perg > resp.length) {
        var seguenciaResp = 1;

        //anula os clicks
        for (i = 0; i < valores.length; i++) {
            valores[i].onclick = "return false";

            //busca respostas corretas de cada bloco de perguntas e insere uma classe
            if (valores[i].dataset.resposta == seguenciaResp.toString()) {
                if (valores[i].dataset.value === resp[seguenciaResp - 1]) {
                    valores[i].classList.add("acertou");
                    seguenciaResp++;
                }
            }
        }

        //mostra todos os blocos de perguntas
        var blocoPerguntas = document.getElementsByClassName("pergunta");
        for (i = 0; i < blocoPerguntas.length; i++) {
            blocoPerguntas[i].classList.remove("anime-entrarEsquerda");
            blocoPerguntas[i].classList.add("anime-entrarBaixo");
            blocoPerguntas[i].style.display = "block";
        }
        for (i = 0; i < valores.length; i++) {
            valores[i].classList.remove("resposta");
        }
    }
};