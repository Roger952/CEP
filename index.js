var encontrado = undefined;

function onLoad() {
    
    if (encontrado == true) {
        
        document.getElementById('containerFormulario').style.display = "block"
        document.getElementById('mensagemNotFound').style.display = "none"
    }else if (encontrado == false) {
        document.getElementById('containerFormulario').style.display = "none"
        document.getElementById('mensagemNotFound').style.display = "block"
    }else{
        document.getElementById('containerFormulario').style.display = "none"
        document.getElementById('mensagemNotFound').style.display = "none"
    }
}

function procurarCEP() {
    
    var cepInserido = document.getElementById('cep').value;

    console.log(cepInserido)
}
