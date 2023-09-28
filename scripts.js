//view
show();
function show() {
    checkRollAgain();
    let HTML = /*HTML*/ `
        <div class="diceBlocks">
            ${displayDice(model.result.roll)}
            <button ${!checkRollAgain() ? 'disabled' : ''} onclick="clickRollDice()">Kast terninger</button>
            ${model.dice.timesRolled}
        </div>
    `;
    HTML += createTable();
    document.getElementById('app').innerHTML = HTML;
}

function createTable() {
    let rowName = model.structure.rowName;
    let rowId  = model.structure.rowId;
    let resultObject = model.result.resultObject;
    let player1Score = model.players.player1.score;
    let player2Score = model.players.player2.score;
    let currentPlayer = model.players.currentPlayer;
    let table = /*HTML*/`
        <table>
            <tr>
                <th>Yatzy</th>
                <th>Spiller 1</th>
                <th>Spiller 2</th>
            </tr>
    `
    for (i = 0; i < 6; i++) {
        let style1 = player1Score[i] == null ? (resultObject[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white';
        let style2 = player2Score[i] == null ? (resultObject[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white';
        let score1 = player1Score[i] == null ? '' : (player1Score[i] == 0 ? '―' : player1Score[i]);
        let score2 = player2Score[i] == null ? '' : (player2Score[i] == 0 ? '―' : player2Score[i]);
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td style="background-color: ${currentPlayer == 0 ? style1 : ""}" class="number" onclick="setScore('${rowId[i]}', ${i}, 0)"> ${score1} </td>
                <td style="background-color: ${currentPlayer == 1 ? style2 : ""}" class="number" onclick="setScore('${rowId[i]}', ${i}, 1)"> ${score2} </td>
            </tr>
        `;
    }
    table += /*HTML*/`
        <tr style="border-top: solid gray 3px">
            <th>Sum</td>
            <th>${checkBonus(player1Score)}</td>
            <th>${checkBonus(player2Score)}</td>
        </tr>
        <tr>
            <th>Bonus</td>
            <th>${player1Score[6] || "0"}</td>
            <th>${player2Score[6] || "0"}</td>
        <tr>
    `

    for (i = 7; i < rowName.length - 1; i++) {
        let style1 = player1Score[i] == null ? (resultObject[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white';
        let style2 = player2Score[i] == null ? (resultObject[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white';
        let score1 = player1Score[i] == null ? '' : (player1Score[i] == 0 ? '―' : player1Score[i]);
        let score2 = player2Score[i] == null ? '' : (player2Score[i] == 0 ? '―' : player2Score[i]);
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td style="background-color: ${currentPlayer == 0 ? style1:""}" class="number" onclick="setScore('${rowId[i]}', ${i}, 0)"> ${score1} </td>
                <td style="background-color: ${currentPlayer == 1 ? style2:""}" class="number" onclick="setScore('${rowId[i]}', ${i}, 1)"> ${score2} </td>
            </tr>
        `;
    }
    table += /*HTML*/`
            <tr style="border-top: solid gray 3px">
                <th>${rowName[i]}</th>
                <th>${player1Score[i]}</th>
                <th>${player2Score[i]}</th>
            </tr>
        `
    return table;
}

//Ruller terning, og returnerer en liste med terningsverdier.
function rollDice() {
    heldDice = model.dice.heldDice;
    let rolls = [];
    for (let i = 0; i < 5; i++) {
        if (!heldDice[i]) {
            rolls.push(Math.floor(Math.random() * 6 + 1))
        } else { rolls.push(heldDice[i]) }
    }
    return rolls;
}

//generer en frekvens tabell ut fra roll variablen
function generateFrequencyTable() {
    let result = model.result;
    let frequencyTable = result.frequencyTable
    frequencyTable = new Array(6).fill(0);
    for (let die of result.roll) {
        frequencyTable[die - 1]++;
    }
    return checkResult(frequencyTable);
}

//Denne kan hente ut relevant score fra resultatArray, og oppdatere riktig variabel, så reloade view.
function setScore(id, index, playerIndex) {
    if (playerIndex != model.players.currentPlayer) return;
    let score;
    switch(model.players.currentPlayer){
        case 0:
            score = model.players.player1.score;
            console.log("player 1");
            break;
        case 1:
            score = model.players.player2.score;
            console.log("player 2")
            break;
    }

    if (model.dice.usedDice || score[index] != null) return;

    //Kopierer verdien fra resultObject til playerScore listen, til den ruten vi trykket på
    score[index] = model.result.resultObject[id];
    score[16] = getTotalSum(score);
    checkBonus(score);

    resetTurn()
    show();
}

//Finner den totale summen av alle scorene man har satt i brettet.
function getTotalSum(arr) {
    let arraySum = arr.slice(0, arr.length - 1)
    arraySum = arraySum.reduce((acc, curr) => acc + curr, 0);
    
    return arraySum;
}

//Viser terningene etter hvert kast.
function displayDice(arr) {
    diceBlocks = '';
    for (let i = 0; i < arr.length; i++) {
        diceBlocks += `<div ${model.dice.selectedClass[i] ? 'class="selected"' : ''} onclick="clickDice(event)" id="die${i}">${model.constants.dice[arr[i]]}</div>`
    }
    return diceBlocks;
}

//Velger hvilken terninger man skal holde før neste kast.
function clickDice(event) {
    let dice = model.dice;
    let heldDice = dice.heldDice;
    let selectedClass = dice.selectedClass
    if (dice.usedDice) return;
    id = event.target.id.charAt(3);//Henter ut id'en til terningene, (format eksempel: die3)

    //Om terningen ikke er valgt, velg den, om den er valgt, de-select.
    if (selectedClass[id] === false) {
        selectedClass[id] = true
        heldDice[id] = model.result.roll[id];
    } else {
        selectedClass[id] = false
        heldDice[id] = null;
    }
    console.log("%cHeld dice ↓", "color: yellow")
    console.log(heldDice);
    show();
}

function clickRollDice() {
    let dice = model.dice;
    dice.timesRolled++;
    dice.usedDice = false;
    model.result.roll = rollDice();
    generateFrequencyTable();
    show();
}

function checkBonus(array, SumOrBonus) {
    let firstScoresArray = array.slice(0, 6);
    let firstScoresSum = firstScoresArray.reduce((sum, value) => sum + value, 0);
    if (firstScoresSum >= 63) //&& !firstScoresArray.includes(null)) 
    {
        model.players.player1.score[6] = 50;
    }
    return firstScoresSum;
}

function checkRollAgain() {
    let dice = model.dice;
    let canRollAgain = !(dice.timesRolled > 2 || dice.selectedClass.every(element => element === true));
    return canRollAgain;
}

function resetTurn() {
    let dice = model.dice;
    console.log(model.players.currentPlayer);
    dice.timesRolled = 0;
    model.players.currentPlayer = (model.players.currentPlayer + 1) % 2
    dice.selectedClass = [false, false, false, false, false]
    dice.heldDice = [null, null, null, null, null];
    dice.usedDice = true;
}