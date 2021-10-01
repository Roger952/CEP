var encontrado = undefined;
var mensagemErro = 'Não foi encontrado nenhum CEP.';

function onLoad() {

    if (encontrado == true) {

        found();
    } else if (encontrado == false) {
        erro();
    } else {
        document.getElementById('containerFormulario').style.display = "none"
        document.getElementById('mensagemNotFound').style.display = "none"
    }
}

function procurarCEP() {

    var cepInserido = document.getElementById('cep').value;

    if (/^\d{5}-\d{3}$/g.test(cepInserido)) {

        cepInserido = cepInserido.replaceAll(/[^0-9]/g, '');

        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'http://cep.republicavirtual.com.br/web_cep.php?cep=' + cepInserido, true);
        xhttp.onload = function () {
            if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status < 400)) {

                var resp = xhttp.responseText;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(resp, "text/xml");
                var serviceTag = xmlDoc.getElementsByTagName('webservicecep')[0];

                if (serviceTag.getElementsByTagName('resultado')[0].textContent == 0) {
                    erro();
                } else {
                    var cepEncontrado = {
                        "uf": serviceTag.getElementsByTagName('uf')[0].textContent,
                        "cidade": serviceTag.getElementsByTagName('cidade')[0].textContent,
                        "bairro": serviceTag.getElementsByTagName('bairro')[0].textContent,
                        "logradouro": serviceTag.getElementsByTagName('logradouro')[0].textContent
                    }
                    found(cepEncontrado);
                }
            } else {
                erro();
            }
        };
        xhttp.onerror = function () {
            erro();
        };
        xhttp.send();
    } else {
        erro();
        document.getElementById('errorMessage').innerHTML = "Insira um formato de CEP valido";
    }
}

function erro() {
    document.getElementById('containerFormulario').style.display = "none"
    document.getElementById('mensagemNotFound').style.display = "block"
}

function found(cepEncontrado) {
    document.getElementById('inputAddress').value = cepEncontrado.logradouro;
    document.getElementById('inputBairro').value = cepEncontrado.bairro;
    document.getElementById('inputCity').value = cepEncontrado.cidade;
    document.getElementById('inputEstado').value = cepEncontrado.uf;

    document.getElementById('containerFormulario').style.display = "block"
    document.getElementById('mensagemNotFound').style.display = "none"
}