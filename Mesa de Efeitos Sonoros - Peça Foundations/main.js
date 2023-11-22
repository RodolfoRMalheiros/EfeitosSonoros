// Adicione um objeto para armazenar o estado do áudio
const estadoAudio = {
    elementoAtual: null,
    teclaAtual: null,
};

function tocaOuPausaSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);

    if (elemento && elemento.localName === 'audio') {
        // Se a tecla atual for a mesma que está sendo clicada novamente, pausa o som
        if (estadoAudio.teclaAtual === seletorAudio) {
            if (elemento.paused) {
                elemento.play();
            } else {
                elemento.pause();
            }
        } else {
            // Se for uma nova tecla, para o som anterior e inicia o novo som
            if (estadoAudio.elementoAtual) {
                estadoAudio.elementoAtual.pause();
                estadoAudio.elementoAtual.currentTime = 0;
            }

            elemento.play();
            estadoAudio.elementoAtual = elemento;
            estadoAudio.teclaAtual = seletorAudio;
        }
    } else {
        console.log('Elemento não encontrado ou seletor inválido');
    }
}

const listaDeTeclas = document.querySelectorAll('.tecla');

for (let contador = 0; contador < listaDeTeclas.length; contador++) {
    const tecla = listaDeTeclas[contador];
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`;

    tecla.onclick = function () {
        tocaOuPausaSom(idAudio);
    };

    tecla.onkeydown = function (evento) {
        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');
            tocaOuPausaSom(idAudio);
        }
    };

    tecla.onkeyup = function () {
        tecla.classList.remove('ativa');
    };
}

const volumeRange = document.getElementById('volumeRange');

volumeRange.addEventListener('input', function () {
    const volume = this.value / 100; // O valor deve estar entre 0 e 1
    if (estadoAudio.elementoAtual) {
        estadoAudio.elementoAtual.volume = volume;
    }
});