export { puissance4 }
class puissance4 {
    constructor(settings) {
        this.game_container = settings.game_container || document.getElementById('game_container');
        this.rows = settings.rows || 6;
        this.columns = settings.columns || 7;
        this.playerId1 = settings.playerId1 || "Player 1"
        this.playerId2 = settings.playerId2 || "Player 2"
        this.playerColor1 = settings.playerColor1 || "yellow"
        this.playerColor2 = settings.playerColor2 || "red"
        this.stage = this.playerId1 
        this.introduction()
        this.gamePlay()
    }

    introduction() {
        this.gameHeader();
        this.gameBoard();
        this.mapState();
        this.button.addEventListener('click', () => {
            this.p.classList.remove('hide')
            this.button_playback.classList.remove('hide')
            this.button_replay.classList.remove('hide')
            this.game_board.classList.remove('hide')
        })
        this.p.innerText = "A vous de commencez " + this.stage
    }

    gameHeader() {
        this.div = document.createElement('div')
        this.header = document.createElement("header")
        this.div2 = document.createElement('div')
        this.h1 = document.createElement("h1")
        this.button = document.createElement("button")
        this.button_playback = document.createElement("button")
        this.button_replay = document.createElement("button")
        this.p = document.createElement("p")
        this.p.classList.add('hide')
        this.button_playback.classList.add('hide')
        this.button_replay.classList.add('hide')
        this.h1.innerText = "PUISSANCE 4"
        this.button.innerText = "PLAY"
        this.button_playback.innerText = "REPLAY MOVE"
        this.button_replay.innerText = "REMAKE GAME"
        this.game_container.appendChild(this.div)
        this.div.appendChild(this.header)
        this.header.appendChild(this.div2)
        this.div2.appendChild(this.h1)
        this.div2.appendChild(this.button)
        this.div2.appendChild(this.p)
        this.div2.appendChild(this.button_playback)
        this.div2.appendChild(this.button_replay)
    }

    gameBoard() {
        this.map = []
        this.game_board = document.createElement("table");
        this.game_board.classList.add('hide')
        this.tableBody = document.createElement("tbody");
        for (let i = 0; i < this.rows; i++) {
            this.tr = document.createElement("tr");
            this.tableBody.appendChild(this.tr);

            for (let j = 0; j < this.columns; j++) {
                this.td = document.createElement("td");
                this.td.setAttribute("row", i + 1)
                this.td.setAttribute("col", j + 1)
                this.map.unshift(this.td)
                this.tr.appendChild(this.td)
            }
        }
        this.map.forEach(element => {
            this.jeton = document.createElement('span')
            element.appendChild(this.jeton)
        });
        this.game_board.appendChild(this.tableBody)
        this.div.appendChild(this.game_board);
    }

    mapState() {
        this.map.forEach(element => {
            element.setAttribute("state", "not played")
        });
    }

    gamePlay() {
        this.tableBody.addEventListener('click', (e) => {
            if (e.target.tagName == "TD") {
                this.getCol(e)
                if (e.target.attributes[2].value != "played" && this.stage == this.playerId1) {
                    for (let i = this.rows; i >= 1; i--) {
                        if (this.state[i] == "not played") {
                            let td = document.querySelector('[row="' + this.rows + '"][col="' + e.target.attributes[1].value + '"]')
                            this.animation(td, this.playerColor1)
                            td.setAttribute("state", "played")
                            td.setAttribute("id_player", this.playerId1)
                            this.playerTurn()
                            if (!this.isWinner() && !this.draw()) {
                                return
                            } else {
                                this.endGame(this.playerId1);
                                return
                            }
                        } else {
                            let td_played = document.querySelector('[col="' + e.target.attributes[1].value + '"][state="played"]')
                            let td_played_row = td_played.attributes[0].value
                            td_played_row = td_played_row - 1
                            let td = document.querySelector('[row="' + td_played_row + '"][col="' + e.target.attributes[1].value + '"]')
                            this.animation(td, this.playerColor1)
                            td.setAttribute("state", "played")
                            td.setAttribute("id_player", this.playerId1)
                            this.playerTurn()
                            if (!this.isWinner() && !this.draw()) {
                                return
                            } else {
                                this.endGame(this.playerId1);
                                return
                            }
                        }
                    }
                } else if (e.target.attributes[2].value != "played" && this.stage == this.playerId2) {
                    for (let i = this.rows; i >= 1; i--) {
                        if (this.state[i] == "not played") {
                            let td = document.querySelector('[row="' + this.rows + '"][col="' + e.target.attributes[1].value + '"]')
                            this.animation(td, this.playerColor2)
                            td.setAttribute("state", "played")
                            td.setAttribute("id_player", this.playerId2)
                            this.playerTurn()
                            if (!this.isWinner() && !this.draw()) {
                                return
                            } else {
                                this.endGame(this.playerId2);
                                return
                            }
                        } else {
                            let td_played = document.querySelector('[col="' + e.target.attributes[1].value + '"][state="played"]')
                            let td_played_row = td_played.attributes[0].value
                            td_played_row = td_played_row - 1
                            let td = document.querySelector('[row="' + td_played_row + '"][col="' + e.target.attributes[1].value + '"]')
                            this.animation(td, this.playerColor2)
                            td.setAttribute("state", "played")
                            td.setAttribute("id_player", this.playerId2)
                            this.playerTurn()
                            if (!this.isWinner() && !this.draw()) {
                                return
                            } else {
                                this.endGame(this.playerId2);
                                return
                            }
                        }
                    }
                } else {
                    alert('Cette case est déja occupée !')
                }
            } else {
                alert('Cliquez sur une case du plateau de jeu !')
            }
        })
    }

    getCol(e) {
        this.state = {}
        this.map.forEach(element => {
            this.col = element.attributes[1].value
            if (this.col == e.target.attributes[1].value) {
                this.array_state = []
                this.array_row = []
                this.col_state = element.getAttribute("state")
                this.array_state.push(this.col_state)
                this.col_row = element.getAttribute("row")
                this.array_row.push(this.col_row)
                for (let i = 0; i < this.array_row.length; i++) {
                    this.state[this.array_row[i]] = this.array_state[i]
                }
            }
        });
    }

    animation(element, color) {
        let span = element.children[0]
        span.style.display = "block"
        span.style.backgroundColor = color
        span.classList.add("drop")
    }

    playerTurn() {
        if (this.stage == this.playerId1) {
            this.p.innerText = ""
            this.p.innerText = "C'est au tour de " + this.playerId2
            this.stage = this.playerId2
        } else {
            this.p.innerText = ""
            this.p.innerText = "C'est au tour de " + this.playerId1
            this.stage = this.playerId1
        }
    }

    endGame(player) {
        if (this.isWinner()) {
            this.p.innerText = ""
            this.p.innerText = player + " a gagné(e) la partie !"
            return
        }
        if(this.draw()){
            this.p.innerText = ""
            this.p.innerText = "Personne n'a gagné la partie ! Égalité !"
            return            
        }
    }

    isWinner() {
        //rows
        let rows = []
        for (let i = 1; i < this.rows + 1; i++) {
            let row_element = document.querySelectorAll('[row="' + i + '"')
            rows.push(row_element)
        }
        for (let j = 0; j < this.rows; j++) {
            for (let k = 0; k + 3 < this.columns; k++) {
                if (rows[j][k].attributes[3] !== undefined &&
                    rows[j][k + 1].attributes[3] !== undefined &&
                    rows[j][k + 2].attributes[3] !== undefined &&
                    rows[j][k + 3].attributes[3] !== undefined) {
                    if (rows[j][k].attributes[3].value === rows[j][k + 1].attributes[3].value &&
                        rows[j][k].attributes[3].value === rows[j][k + 2].attributes[3].value &&
                        rows[j][k].attributes[3].value === rows[j][k + 3].attributes[3].value) {
                        return true
                    }
                }
            }
        }
        //cols
        let cols = []
        for (let i = 1; i < this.columns + 1; i++) {
            let col_element = document.querySelectorAll('[col="' + i + '"')
            cols.push(col_element)
        }
        for (let j = 0; j < this.columns; j++) {
            for (let k = 0; k + 3 < this.rows; k++) {
                if (cols[j][k].attributes[3] != undefined &&
                    cols[j][k + 1].attributes[3] != undefined &&
                    cols[j][k + 2].attributes[3] != undefined &&
                    cols[j][k + 3].attributes[3] != undefined) {
                    if (cols[j][k].attributes[3].value === cols[j][k + 1].attributes[3].value &&
                        cols[j][k].attributes[3].value === cols[j][k + 2].attributes[3].value &&
                        cols[j][k].attributes[3].value === cols[j][k + 3].attributes[3].value) {
                        return true
                    }
                }
            }
        }
        // diagonals 
        let diagonals = []
        for (let i = 1; i < this.rows + 1; i++) {
            let row_element = document.querySelectorAll('[row="' + i + '"')
            diagonals.push(row_element)
        }
        for (let j = 0; j + 3 < this.rows; j++) {
            for (let k = 3; k < this.columns; k++) {
                if (diagonals[j][k].attributes[3] != undefined &&
                    diagonals[j + 1][k - 1].attributes[3] != undefined &&
                    diagonals[j + 2][k - 2].attributes[3] != undefined &&
                    diagonals[j + 3][k - 3].attributes[3] != undefined) {
                    if (diagonals[j][k].attributes[3].value === diagonals[j + 1][k - 1].attributes[3].value &&
                        diagonals[j][k].attributes[3].value === diagonals[j + 2][k - 2].attributes[3].value &&
                        diagonals[j][k].attributes[3].value === diagonals[j + 3][k - 3].attributes[3].value) {
                        return true
                    }
                }
            }
            for (let l = 0; l + 3 < this.rows; l++) {
                for (let m = this.columns - 4; m >= 0; m--) {
                    if (diagonals[l][m].attributes[3] != undefined &&
                        diagonals[l + 1][m + 1].attributes[3] != undefined &&
                        diagonals[l + 2][m + 2].attributes[3] != undefined &&
                        diagonals[l + 3][m + 3].attributes[3] != undefined) {
                        if (diagonals[l][m].attributes[3].value === diagonals[l + 1][m + 1].attributes[3].value &&
                            diagonals[l][m].attributes[3].value === diagonals[l + 2][m + 2].attributes[3].value &&
                            diagonals[l][m].attributes[3].value === diagonals[l + 3][m + 3].attributes[3].value) {
                            return true
                        }
                    }
                }
            }
        }
    }

    draw(){
        let draw = 0
        for (let i = 0; i < this.map.length; i++) {
            if(this.map[i].attributes[2].textContent == 'not played'){
                return
            }else{
                draw++
            }
        }   
        if(draw == this.map.length){
            return true
        }else{
            return false
        }
    }

    // playback(){
    //     this.previous_map = []
    //     let array = []
    //     for(let i=0; i < this.map.length; i++){
    //         array.push(this.map[i].attributes)
    //     }
    //     this.previous_map.push(array)
    //     console.log(this.previous_map)
    // }
}
