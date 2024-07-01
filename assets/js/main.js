document.getElementById("morpion").addEventListener("click", function() {
    document.querySelector(".container").style.display = "flex";
    document.getElementById("choice").style.display = "none";
    document.querySelector(".containerP4").style.display = "none"
});

document.getElementById("p4").addEventListener("click", function() {
    // alert("Jeux en maintenance");
    document.querySelector(".container").style.display = "none";
    document.getElementById("choice").style.display = "none";
    document.querySelector(".containerP4").style.display = "flex"
});

// // board = tableau pour faire le board du jeu
// // currentPlayer = joueur X ou O 
// // gameOver = voir si le jeu est terminé ou non 
// // makeMove = permet de placer le symbole sur la case + met a jour l'affichage + verifie si la game est fini ou non (checkdraw ou checkwin)
// // checkWin = verifie si un joueur a gagné
// // checkDraw = verifie si il y a match nul
// // displayBoard = affiche le plateau de jeu 
// // updateMessage = met a jour le message dans ma balise p avec id msg 
// // resetGame = permet de reset la game
// // replayButton = bouton qui permet de rejouer la partie
// // makeRandomMove = fait un move aléatoire avec randomize
// // gamemode = choix du mode de jeu 


let board = [ // tableau dimensionnel pour board
    ["","",""],
    ["","",""],
    ["","",""],
];

let locked = false;
let currentPlayer = "X";
let gameOver = false;
let gameMode = "vsPlayer"; // 1v1 joueurs de base

function makeMove(row, col) { // function pour faire le moove et placer le symbolee et mettre a jour + verifiee si la game n'est pas fini
    if (gameOver || locked) return;
    if (board[row][col] === "") {
        if (gameMode === "vsComputer" && currentPlayer === 'O') {
            // pour ne pas quuee le joueur clique quand c'est au tour de l'ordi
            return;
        }
        board[row][col] = currentPlayer; // remplace la case par le currentplayer O ou X
        displayBoard(); // affichage a jour

        if (checkWin(currentPlayer)) { // si il y a une victoire annonce lee gagnant et affiche le bouton replay
            updateMessage(`Le joueur ${currentPlayer} a gagné!`);
            gameOver = true;
            replayButton()
            return;
        }

        if (checkDraw()) { // si il y a une égalité annonce l'égalité et affiche le bouton replay
            updateMessage("Match nul");
            gameOver = true;
            replayButton()
            return;
        }

        if (gameMode === "vsComputer" && currentPlayer === 'X') { // si le gm est contre le computer utilise la fonction random pour placer une case
            makeRandomMove();
        } else {
            currentPlayer = (currentPlayer === 'X')? 'O' : 'X'; // passe le tour a la personne suivante, si currentplayer = X alors passe a O, si currenplayer O passe a X
            updateMessage();
        }
    }
}

function makeRandomMove() { // fonction qui permet de jouer aléatoirement dans mon tableau en choisissant la row dde 0 à 2(indeex) et col de 0 a 2(index)
    let row, col;
    do {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    } while (board[row][col] !== ""); // permets de continuer tant que le random trouve pas de case vide

    // Ajout d'un délai avant de jouer
    locked = true;
    setTimeout(() => {
        board[row][col] = 'O';
        displayBoard();

        if (checkWin('O')) { // si il y a une victoire annonce lee gagnant et affiche le bouton replay
            updateMessage(`Le joueur O a gagné!`);
            gameOver = true;
            replayButton()
            return;
        }

        if (checkDraw()) { // si il y a une égalité annonce l'égalité et affiche le bouton replay
            updateMessage("Match nul");
            gameOver = true;
            replayButton()
            return;
        }

        currentPlayer = 'X';
        updateMessage();
        locked = false;
    }, 1000); // 1s délai
}


function checkWin(player) { // Verifie si un joueur a gagné
    for(let row = 0; row < 3; row++){ // verifie la ligne 1, ensuite 2 ensuite 3
        if(board[row][0] === player && board[row][1] === player && board[row][2] === player){
            return true;
        }
    }
    for(let col = 0; col < 3; col++){ // verifie la colonne 1 ensuitee 2 ensuite 3
        if(board[0][col] === player && board[1][col] === player && board[2][col] === player){
            return true;
        }
    }
    if(board[0][0] === player && board[1][1] === player && board[2][2] === player){ // verifie la premiere diagonale
        return true;
    }
    if(board[0][2] === player && board[1][1] === player && board[2][0] === player){ // verifie la deuxieme diago
        return true;
    }
    return false;
}

function checkDraw() { // Vérifie l'égalité
    for(let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++) {
            if(board[row][col] === ""){
                return false;
            }
        }
    }
    return true;
}

function displayBoard() { // affiche le board
    const boardContainer = document.querySelector("#board");
    boardContainer.innerHTML = "";
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")
            cell.textContent = board[row][col];

            if (!gameOver) {
                cell.addEventListener('click', function(){
                    makeMove(row,col);
                });
            }

            boardContainer.appendChild(cell)
        }
    }
}

function updateMessage(message) { // mets a jour les msg dans mon #msg
    const msgElement = document.querySelector("#msg");
    if (message) {
        msgElement.textContent = message;
    } else {
        msgElement.textContent = `C'est au tour du joueur ${currentPlayer}`;
    }
}

function resetGame() { // remets le tableau a 0 pour rrejouer
    board = [
        ["","",""],
        ["","",""],
        ["","",""], 
    ];
    currentPlayer = 'X'
    gameOver = false;
    const replayButton = document.querySelector("#replay");
    replayButton.style.display = "none";
    displayBoard();
    updateMessage();
}

function replayButton() { // fucntion replay
    const replayButton = document.querySelector("#replay")
    replayButton.style.display = "flex"
}

function startVsComputer() { // function pour jouer contre un ordi
    gameMode = "vsComputer";
    resetGame();
}

function startVsPlayer() { // function pouur joueer contre quelqu'un
    gameMode = "vsPlayer";
    resetGame();
}

displayBoard();
updateMessage();

// ------------------------------------------ P4 -------------------------------------

// // boardP4 = tableau pour faire le board du jeu de Puissance 4
// // currentPlayerP4 = joueur X ou O pour le jeu de Puissance 4
// // gameOverP4 = voir si le jeu de Puissance 4 est terminé ou non
// // makeMoveP4 = permet de placer le symbole sur la case + met a jour l'affichage + verifie si la game est fini ou non (checkdraw ou checkwin)
// // checkWinP4 = verifie si un joueur a gagné dans le jeu de Puissance 4
// // checkDrawP4 = verifie si il y a match nul dans le jeu de Puissance 4
// // displayBoardP4 = affiche le plateau de jeu de Puissance 4
// // updateMessageP4 = met a jour le message dans ma balise p avec id msg pour le jeu de Puissance 4
// // resetGameP4 = permet de reset la game de Puissance 4
// // replayButtonP4 = bouton qui permet de rejouer la partie de Puissance 4

let boardP4 = [ // tableau dimensionnel pour board de Puissance 4
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
];

let lockedP4 = false;
let currentPlayerP4 = "X";
let gameOverP4 = false;
let gameModeP4 = "vsComputer";

function makeMoveP4(col) { // function pour faire le moove et placer le symbolee et mettre a jour + verifiee si la game n'est pas fini et aussi sert pour la gravité
    if (gameOverP4 || lockedP4) return;
    for (let row = 5; row >= 0; row--) {
        if (boardP4[row][col] === "") {
            boardP4[row][col] = currentPlayerP4;
            displayBoardP4();

            if (checkWinP4(currentPlayerP4)) { // si il y a une victoire annonce lee gagnant et affiche le bouton replay
                updateMessageP4(`Le joueur ${currentPlayerP4} a gagné!`);
                gameOverP4 = true;
                replayButtonP4()
                return;
            }

            if (checkDrawP4()) { // si il y a une égalité annonce l'égalité et affiche le bouton replay
                updateMessageP4("Match nul");
                gameOverP4 = true;
                replayButtonP4()
                return;
            }

            if (gameModeP4 === "vsComputer" && currentPlayerP4 === "X") {
                setTimeout(computerMoveP4, 0); 
            } else {
                currentPlayerP4 = (currentPlayerP4 === 'X')? 'O' : 'X';
                updateMessageP4();
            }

            return;
        }
    }
}

function computerMoveP4() { // fonction pour faire le mouvement du compu
    let col = Math.floor(Math.random() * 7); // choix aléatoire de la colonne
    for (let row = 5; row >= 0; row--) {
        if (boardP4[row][col] === "") {
            boardP4[row][col] = "O"; // le computer joue avec O
            displayBoardP4();

            if (checkWinP4("O")) { // si le computer a gagné
                updateMessageP4(`Le computer a gagné!`);
                gameOverP4 = true;
                replayButtonP4()
                return;
            }

            if (checkDrawP4()) { // si il y a une égalité
                updateMessageP4("Match nul");
                gameOverP4 = true;
                replayButtonP4()
                return;
            }

            // changement de tour
            currentPlayerP4 = "X";
            updateMessageP4()
            return;
        }
    }
}

function checkWinP4(player) { // Verifie si un joueur a gagné dans le jeu de Puissance 4
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (boardP4[row][col] === player && boardP4[row][col + 1] === player && boardP4[row][col + 2] === player && boardP4[row][col + 3] === player) {
                return true;
            }
        }
    }
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (boardP4[row][col] === player && boardP4[row + 1][col] === player && boardP4[row + 2][col] === player && boardP4[row + 3][col] === player) {
                return true;
            }
        }
    }
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (boardP4[row][col] === player && boardP4[row + 1][col + 1] === player && boardP4[row + 2][col + 2] === player && boardP4[row + 3][col + 3] === player) {
                return true;
            }
        }
    }
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (boardP4[row][col] === player && boardP4[row - 1][col + 1] === player && boardP4[row - 2][col + 2] === player && boardP4[row - 3][col + 3] === player) {
                return true;
            }
        }
    }
    return false;
}

function checkDrawP4() { // Vérifie l'égalité dans le jeu de Puissance 4
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (boardP4[row][col] === "") {
                return false;
            }
        }
    }
    return true;
}

function displayBoardP4() { // affiche le board de Puissance 4
    const boardContainerP4 = document.querySelector("#boardP4");
    boardContainerP4.innerHTML = "";
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement("div")
            cell.classList.add("cellP4")
            cell.textContent = boardP4[row][col];

            if (!gameOverP4) {
                cell.addEventListener('click', function(){
                    makeMoveP4(col);
                });
            }

            boardContainerP4.appendChild(cell)
        }
    }
}

function updateMessageP4(message) { // mets a jour les msg dans mon #msg pour le jeu de Puissance 4
    const msgElementP4 = document.querySelector("#msgP4");
    if (message) {
        msgElementP4.textContent = message;
    } else {
        msgElementP4.textContent = `C'est au tour du joueur ${currentPlayerP4}`;
    }
}

function resetGameP4() { // remets le tableau a 0 pour rrejouer le jeu de Puissance 4
    boardP4 = [ // tableau dimensionnel pour board de Puissance 4
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
    ];
    currentPlayerP4 = 'X'
    gameOverP4 = false;
    const replayButtonP4 = document.querySelector("#replayP4");
    replayButtonP4.style.display = "none";
    displayBoardP4();
    updateMessageP4();
}

function replayButtonP4() { // fucntion replay pour le jeu de Puissance 4
    const replayButtonP4 = document.querySelector("#replayP4")
    replayButtonP4.style.display = "flex"
}

function startVsComputerP4() { // function pour jouer contre un ordi dans le jeu de Puissance 4
    gameModeP4 = "vsComputer";
    resetGameP4();
}

function startVsPlayerP4() { // function pouur joueer contre quelqu'un dans le jeu de Puissance 4
    gameModeP4 = "vsPlayer";
    resetGameP4();
}

displayBoardP4();
updateMessageP4();