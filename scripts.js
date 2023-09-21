//model
let roll = [];
const dice = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };
let diceRolled = []
let heldDice = [];
let maxRollCount = 3;
let timesRolled = 0;
let frequencyTable = [];
let firstLoad = false
let selectedClass = [false, false, false, false, false]
let player1Score = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
let player2Score = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
let resultArray = {}
const rowName = ['Enere', 'Toere', 'Treere', 'Firere', 'Fememre', 'Seksere', '1 par', '2 par', '3 like', '4 like', 'Liten straight', 'Stor straight', 'Hus', 'Sjanse', 'Yatzy', 'Sum']
const rowId = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes', '1pair', '2pair', '3same', '4same', 'SmallStraight', 'BigStraight', 'House', 'Chance', 'Yatzy',]
let diceBlocks = '';
let usedDice = false;
let canRollAgain = true;

//view
show();
function show() {
    let HTML = `<div class="diceBlocks" >${displayDice(roll)}<button ${!canRollAgain ? 'disabled' : 'a'} onclick="clickRollDice()" >Kast terninger</button></div>`
    HTML += createTable();
    document.getElementById('app').innerHTML = HTML;
}

function createTable() {
    let table = /*HTML*/`
        <table>
            <tr>
                <th>Yatzy</th>
                <th>Spiller 1</th>
                <th>Spiller 2</th>
            </tr>
    `
    for (i = 0; i < 6; i++) {
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td style="background-color: ${player1Score[i] == null ? (resultArray[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white'}" class="number" onclick="setScore('${rowId[i]}', ${i})">${player1Score[i] == null ? '' : (player1Score[i] == 0 ? '―' : player1Score[i])}</td>
                <td style="background-color: ${player2Score[i] == null ? (resultArray[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white'}" class="number" onclick="setScore('${rowId[i]}', ${i})">${player2Score[i] == null ? '' : (player2Score[i] == 0 ? '―' : player2Score[i])}</td>
            </tr>
        `;
    }
    table += /*HTML*/`
        <tr style="border-top: solid gray 3px">
            <th>Sum</td>
            <th>${checkBonus(player1Score, 'Sum')}</td>
            <th>${checkBonus(player2Score, 'Sum')}</td>
        </tr>
        <tr>
            <th>Bonus</td>
            <th>${checkBonus(player1Score, 'Bonus')}</td>
            <th>${checkBonus(player2Score, 'Bonus')}</td>
        <tr>
    `

    for (i = 6; i < rowName.length - 1; i++) {
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td style="background-color: ${player1Score[i] == null ? (resultArray[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white'}" class="number" onclick="setScore('${rowId[i]}', ${i})">${player1Score[i] == null ? '' : (player1Score[i] == 0 ? '―' : player1Score[i])}</td>
                <td style="background-color: ${player2Score[i] == null ? (resultArray[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white'}" class="number" onclick="setScore('${rowId[i]}', ${i})">${player2Score[i] == null ? '' : (player2Score[i] == 0 ? '―' : player2Score[i])}</td>
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
    frequencyTable = new Array(6).fill(0);
    for (let die of roll) {
        frequencyTable[die - 1]++;
    }
    return checkResult(frequencyTable);
}


//Denne kan hente ut relevant score fra resultatArray, og oppdatere riktig variabel, så reloade view.
function setScore(id, index) {
    if (usedDice || player1Score[index] != null) return;

    //Kopierer verdien fra resultArray til playerScore listen, til den ruten vi trykket på
    player1Score[index] = resultArray[id];
    player1Score[15] = getTotalSum(player1Score);

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
        diceBlocks += `<div ${selectedClass[i] ? 'class="selected"' : ''} onclick="clickDice(event)" id="die${i}">${dice[arr[i]]}</div>`
    }
    return diceBlocks;
}

//Velger hvilken terninger man skal holde før neste kast.
function clickDice(event) {
    if (usedDice) return;
    id = event.target.id.charAt(3);//Henter ut id'en til terningene, (format eksempel: die3)

    //Om terningen ikke er valgt, velg den, om den er valgt, de-select.
    if (selectedClass[id] === false) {
        selectedClass[id] = true
        heldDice[id] = roll[id];
    } else {
        selectedClass[id] = false
        heldDice[id] = null;
    }
    console.log("%cHeld dice ↓", "color: yellow")
    console.log(heldDice);
    show();
}

function clickRollDice() {
    canRollAgain = !(timesRolled >= 2 || selectedClass.every(element => element === true));
    timesRolled++;
    usedDice = false;
    roll = rollDice();
    generateFrequencyTable();
    show();
}

function checkBonus(array, SumOrBonus) {
    let firstScoresArray = array.slice(0, 6);
    let firstScoresSum = firstScoresArray.reduce((sum, value) => sum + value, 0);
    if (SumOrBonus == 'Sum') return firstScoresSum;
    else if (SumOrBonus == 'Bonus') {
        if (firstScoresSum >= 63 && !firstScoresArray.includes(null)) {
            player1Score[15] += 50;
            return 50;
        }
        else return 0;
    }
}

function resetTurn() {
    timesRolled = 0;
    selectedClass = [false, false, false, false, false]
    heldDice = [null, null, null, null, null];
    usedDice = true;
    canRollAgain = true;
}