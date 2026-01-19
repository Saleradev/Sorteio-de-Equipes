// Variáveis de estoque (decrescente)
var vagasVerde = 50;
var vagasAmarelo = 50;

// Variáveis de controle de repetição e estado
var ultimaCor = "";
var contadorRepeticao = 0;
var esperandoReset = false;

var area = document.getElementById('area');

// Criando o contador visual logo abaixo da área
var contador = document.createElement('div');
contador.id = 'contador';
contador.style.marginTop = '15px';
contador.innerText = `Verdes: ${vagasVerde} | Amarelos: ${vagasAmarelo}`;
area.parentNode.appendChild(contador);

area.addEventListener('click', clicar);

function clicar() {
    // Lógica de alternância: se já sorteou, o próximo clique limpa a tela
    if (esperandoReset) {
        area.innerText = "Clique para sortear";
        area.style.background = "#f3f3f3";
        area.style.color = "black";
        esperandoReset = false;
        return;
    }

    // Verifica se ainda há vagas disponíveis
    if (vagasVerde === 0 && vagasAmarelo === 0) {
        area.innerText = "Sorteio Encerrado!";
        area.style.background = "#ccc";
        return;
    }

    // 1. Identifica quais equipes ainda têm vagas
    var opcoesPossiveis = [];
    if (vagasVerde > 0) opcoesPossiveis.push('Verde');
    if (vagasAmarelo > 0) opcoesPossiveis.push('Amarelo');

    var escolha;

    // 2. BLOQUEIO DE REPETIÇÃO (Máximo 5 vezes)
    if (contadorRepeticao >= 3) {
        // Se a última foi Verde, tenta forçar Amarelo
        if (ultimaCor === 'Verde' && vagasAmarelo > 0) {
            escolha = 'Amarelo';
        } 
        // Se a última foi Amarelo, tenta forçar Verde
        else if (ultimaCor === 'Amarelo' && vagasVerde > 0) {
            escolha = 'Verde';
        } else {
            // Caso a cor oposta não tenha mais vaga, usa o que sobrou
            escolha = opcoesPossiveis[Math.floor(Math.random() * opcoesPossiveis.length)];
        }
    } else {
        // Sorteio aleatório normal
        escolha = opcoesPossiveis[Math.floor(Math.random() * opcoesPossiveis.length)];
    }

    // 3. Atualiza a memória de repetição
    if (escolha === ultimaCor) {
        contadorRepeticao++;
    } else {
        ultimaCor = escolha;
        contadorRepeticao = 1;
    }

    // 4. Aplica o resultado visualmente e subtrai do contador
    if (escolha === 'Verde') {
        vagasVerde--;
        area.innerText = 'VERDE!';
        area.style.background = '#62af66';
        area.style.color = 'white';
    } else {
        vagasAmarelo--;
        area.innerText = 'AMARELA!';
        area.style.background = '#f1c40f';
        area.style.color = 'white';
    }
    if (navigator.vibrate) {
        navigator.vibrate(40);
    }

    // Define que o próximo clique deve limpar a área
    esperandoReset = true;

    // Atualiza os números no contador
    contador.innerText = `Verdes: ${vagasVerde} | Amarelos: ${vagasAmarelo}`;
}