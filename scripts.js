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
    // let rowId = model.structure.rowId;
    // let resultObject = model.result.resultObject;
    // let player1Score = model.players.playerList[0].score;
    // let player2Score = model.players.playerList[1].score;
    // let currentPlayer = model.players.currentPlayer;

    let table = /*HTML*/`
        <table>
            <tr>
                <th>Yatzy</th>
                ${generateHeaders()}
            </tr>
    `
    for (i = 0; i < 6; i++) {
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                ${generatePlayers(i)}
            </tr>
        `;
    }
    table += /*HTML*/`
        ${generateSubHeader()}
    `

    for (i = 7; i < rowName.length - 1; i++) {

        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                ${generatePlayers(i)}
               
            </tr>
        `;
    }
    table += /*HTML*/`
            <tr style="border-top: solid gray 3px">
                <th>${rowName[i]}</th>
                ${generateSum()}
            </tr>
        `
    return table;
}

function generateHeaders() {
    let headersHtml = '';
    for (i=0; i<model.players.playerCount; i++) {
        headersHtml += /*HTML*/`
            <th>${model.players.playerList[i].name}</th>
        `
    }
    return headersHtml;
}

function generatePlayers(index) {
    let playersHtml = '';
    for (j = 0; j < model.players.playerCount; j++) {
        let currentPlayerObject = model.players.playerList[j];
        let score = currentPlayerObject.score[index] == null ? '' : (currentPlayerObject.score[index] == 0 ? '―' : currentPlayerObject.score[index]);
        let style = currentPlayerObject.score[index] == null ? (model.result.resultObject[model.structure.rowId[index]] > 0 ? model.structure.colorGreen : model.structure.colorRed) : 'white';
        
        playersHtml += /*HTML*/`
           <td style="background-color: ${model.players.currentPlayer == j ? style : ''}" class="number" onclick="setScore('${model.structure.rowId[index]}', ${index},${j})"> ${score} </td>`  
    }
    return playersHtml;
}

function generateSubHeader() {
    let sumRowHtml = /*HTML*/`
        <tr style="border-top: solid gray 3px">
            <th>Sum</td>
    `
    for (i=0; i<model.players.playerCount; i++) {
        sumRowHtml+= /*HTML*/`
            <th>${checkBonus(model.players.playerList[i].score)}</td>
        `
    }
    sumRowHtml += /*HTML*/`</tr>`

    let bonusRowHtml = /*HTML*/`
        <tr>
            <th>Bonus</td>
    `
    for (i=0; i<model.players.playerCount; i++) {
        bonusRowHtml+= /*HTML*/`
            <th>${model.players.playerList[i].score[6] || "0"}</td>
        `
    }
    sumRowHtml += /*HTML*/`</tr>`

    let subHeaderBonus = sumRowHtml + bonusRowHtml;
    return subHeaderBonus;
}

function generateSum() {
    let sumHtml = '';
    for (i=0; i<model.players.playerCount; i++) {
        sumHtml+= /*HTML*/`
            <th>${getTotalSum(model.players.playerList[i].score)}</th>
        `
    }
    return sumHtml
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
    console.log("Set score kallet")
    if (playerIndex != model.players.currentPlayer) return;
    let score;
    score = model.players.playerList[model.players.currentPlayer].score;

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
        diceBlocks += /*HTML*/ `<div ${model.dice.selectedClass[i] ? 'class="selected"' : ''} onclick="clickDice(event)" id="die${i}">${model.constants.dice[arr[i]]}</div>`
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
    if (firstScoresSum >= 63) {
        model.players.playerList[model.players.currentPlayer].score[6] = 50;
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
    model.players.currentPlayer = (model.players.currentPlayer + 1) % model.players.playerCount;
    dice.selectedClass = [false, false, false, false, false]
    dice.heldDice = [null, null, null, null, null];
    dice.usedDice = true;
}