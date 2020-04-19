function funcResposta() {
    var valores = document.querySelectorAll(".write");
    var botao = document.querySelector("input[type='button']");
    var certos = 0;
    var erros = 0;
    var semResposta = 0;


    valores.forEach(function (valor) {
        var el_pai = valor.parentElement;
        var el_irmao = valor.nextElementSibling;
        var respCerta = valor.dataset.resposta;
        const values = valor.value.toLowerCase();

        el_irmao.classList.add("anime-entrarEsquerda");
        
        if (values === valor.dataset.resposta) {
            el_pai.classList.add("verde");
            el_irmao.innerHTML = "Certo";
            certos++
        } else if (values == "") {
            el_irmao.innerHTML = "Não respondido. Resposta é: " + respCerta;
            semResposta++;
        } else {
            el_pai.classList.add("vermelho");
            el_irmao.innerHTML = "Errado. Correto é: " + respCerta;
            erros++;
        }
        valor.setAttribute("disabled", "disabled");
    });

    botao.setAttribute("value", "Recomeçar");
    botao.setAttribute("onclick", "location.reload()");
    botao.classList.add("laranjado");

    document.getElementById("contagem").innerHTML =
        "<p class='verde anime-entrarCima'>" + certos + " Certo(s) </p>" +
        "<p class='vermelho anime-entrarCima'>" + erros + " Erro(s) </p>" +
        "<p class='anime-entrarCima'>" + semResposta + " Não respondidos(s) </p>";
}