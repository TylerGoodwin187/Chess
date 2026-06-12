let game = new Chess();
let board = document.getElementById("board");
let selected = null;

let elo = parseInt(localStorage.getItem("elo") || "700");

let engine = Stockfish();

engine.postMessage("uci");
engine.postMessage("setoption name UCI_LimitStrength value true");

function syncEloToEngine() {
    engine.postMessage("setoption name UCI_Elo value " + elo);
}

syncEloToEngine();

function drawBoard() {
    board.innerHTML = "";
    let squares = game.board();

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {

            let sq = document.createElement("div");
            let piece = squares[r][c];

            sq.className = "square " + ((r + c) % 2 ? "dark" : "light");

            let file = "abcdefgh"[c];
            let rank = 8 - r;
            let square = file + rank;

            if (piece) sq.textContent = render(piece);

            sq.onclick = () => click(square);

            board.appendChild(sq);
        }
    }

    document.getElementById("info").innerText =
        `ELO: ${elo} | Turn: ${game.turn() === "w" ? "You" : "Stockfish"}`;

    if (game.game_over()) endGame();
}

function render(p) {
    const map = {
        p:"♟", r:"♜", n:"♞", b:"♝", q:"♛", k:"♚",
        P:"♙", R:"♖", N:"♘", B:"♗", Q:"♕", K:"♔"
    };
    return map[p.type === p.type.toLowerCase() ? p.type : p.type.toUpperCase()] || "";
}

function click(square) {
    if (game.turn() !== "w") return;

    if (selected) {
        game.move({ from: selected, to: square, promotion: "q" });
        selected = null;
        drawBoard();
        setTimeout(stockfishMove, 200);
        return;
    }

    let p = game.get(square);
    if (p && p.color === "w") {
        selected = square;
    }
}

function stockfishMove() {
    if (game.game_over()) return;

    syncEloToEngine();

    engine.postMessage("position fen " + game.fen());
    engine.postMessage("go depth 12");

    engine.onmessage = (event) => {
        let line = event.data;

        if (line.includes("bestmove")) {
            let move = line.split(" ")[1];

            if (move && move !== "(none)") {
                game.move({
                    from: move.slice(0,2),
                    to: move.slice(2,4),
                    promotion: "q"
                });

                drawBoard();
            }
        }
    };
}

function endGame() {
    let result = "";

    if (game.in_checkmate()) {
        result = game.turn() === "w" ? "loss" : "win";
    } else {
        result = "draw";
    }

    if (result === "win") elo += 25;
    if (result === "loss") elo -= 25;
    if (result === "draw") elo += 0;

    localStorage.setItem("elo", elo);

    setTimeout(() => {
        alert("Game Over: " + result.toUpperCase());
    }, 200);
}

function newGame() {
    game.reset();
    drawBoard();
}

drawBoard();
