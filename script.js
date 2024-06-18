let carte = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'];
let nClick = 0;
let velo = document.getElementById('velo');
let testoVelo = document.getElementById('testoVelo');
let pairsRemaining = 1; // number of pairs remaining to be found
let currentPlayer = 1; // current player (1 or 2)
let player1Score = 0;
let player2Score = 0;
let popUp = document.getElementById('popUp');
let messaggioPopuP = document.getElementById('vittoria');

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
shuffle(carte);

document.addEventListener('DOMContentLoaded', function () {
    let tds = document.querySelectorAll('td');

    for (i = 0; i < carte.length; i++) {
        tds[i].innerHTML = '<img src=icons/' + carte[i] + '>';
    }
    for (i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function () {
            if (this.classList.contains('show')) {
                nClick--
            }
            nClick++;
            this.classList.add('show');
            if (nClick % 2 == 0) {
                // check if cards match
                let selectedImg = document.querySelectorAll('td.show img');
                let selectedTd = document.querySelectorAll('td.show');
                velo.style.display = 'block';
                if (selectedImg[0].src == selectedImg[1].src) {
                    pairsRemaining--;
                    if (currentPlayer == 1) {
                        player1Score++;
                        console.log(player1Score);
                        selectedTd[0].classList.add('g1');
                        selectedTd[1].classList.add('g1');
                    } else {
                        player2Score++;
                        console.log(player2Score);

                        selectedTd[0].classList.add('g2');
                        selectedTd[1].classList.add('g2');
                    }
                    if (pairsRemaining == 0) {
                        popUp.style.display = 'block';
                        messaggioPopuP.innerText = `Giocatore ${currentPlayer} ha vinto con ${currentPlayer == 1 ? player1Score : player2Score} tentativi`;
                        $('#score').val(currentPlayer == 1 ? player1Score : player2Score);
                    }
                    copriCarte()
                } else {


                    switchPlayer();
                    setTimeout(copriCarte, 500)
                }
            }
        })
    }
})

function copriCarte() {
    let selectedTd = document.querySelectorAll('td.show');
    document.getElementById('velo').style.display = 'none';
    selectedTd[0].classList.remove('show');
    selectedTd[1].classList.remove('show');
}

function switchPlayer() {
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    player1Score = currentPlayer == 1 ? ++player1Score : player1Score;
    player2Score = currentPlayer == 2 ? ++player2Score : player2Score;
    console.log(player1Score, player2Score);
    document.getElementById('turno').innerHTML = `Turno Giocatore ${currentPlayer}`;
    document.getElementById('turno').style.color = currentPlayer == 1 ? '#00f' : '#0f0';
}

function checkData() {
    $.get('ajax_record.php', $('#record').serialize(), function (data) {
        document.getElementById('scores').innerHTML = data;
        location.reload();
    })
}

function loadScore() {
    $.get('ajax_scoreBoard.php', function (data) {
        document.getElementById('scores').innerHTML = data;
    })
}