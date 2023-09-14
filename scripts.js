//model
let roll = [];
let dice = {1:'⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅'};
let diceRolled = []
let heldDice = [];
let maxRollCount = 3;
let timesRolled = 0;
let frequencyTable = [];
let firstLoad = false
let selectedClass = [false, false, false, false, false]
let player1Score = [null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
let resultArray = {}
const rowName = ['1 par', '2 par', '3 like', '4 like', 'Liten straight', 'Stor straight', 'Hus', 'Sjanse', 'Yatzy', 'Sum']
const rowId = ['1pair', '2pair', '3same', '4same', 'SmallStraight', 'BigStraight', 'House', 'Chance', 'Yatzy']
let diceBlocks = '';



//view
show();
function show() {
    let HTML = `<div class="diceBlocks" >${displayDice(roll)}<button onclick="clickRollDice()">Kast terninger</button></div>`
    HTML += createTable();
    document.getElementById('app').innerHTML = HTML;
}
    
function createTable() {
    let table = /*HTML*/`
        <table>
            <tr>
                <th>Yatzy</th>
                <th>Spiller 1</th>
            </tr>
    `
    for (i = 0; i < rowName.length - 1; i++) {
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td class="number" onclick="getScore('${rowId[i]}', ${i})">${player1Score[i] != null ? player1Score[i] : ''}</td>
            </tr>
        `;
    }
    table += /*HTML*/`
            <tr>
                <th>${rowName[i]}</th>
                <th>${player1Score[i]}</th>
            </tr>
        `
    return table;
}

function rollDice() {
    let rolls = [];
    for (let i = 0; i < 5; i++) {
        if(!heldDice[i]){
        rolls.push(Math.floor(Math.random() * 6 + 1))
        }else {rolls.push(heldDice[i])}
    }
    console.log(rolls)
    return rolls;
}

function checkRoll() {
    frequencyTable = new Array(6).fill(0);
    for (let die of roll) {
        frequencyTable[die - 1]++;
    }
    console.log("FT: " + frequencyTable);
    return checkResult(frequencyTable);
}

function getScore(id, index) {
    //Denne kan hente ut relevant score fra resultatArray, og oppdatere riktig variabel, så reloade view.
    timesRolled = 0;
    if (player1Score[index] != null) return
    player1Score[index] = resultArray[id];
    resultArray['Sum'] = getSum2(player1Score);
    player1Score[9] = resultArray['Sum'];
    roll = rollDice();
    checkRoll();
    show();
}

function getSum(arr) {
    const arraySum = arr.reduce((acc, curr) => acc + curr, 0);
    return arraySum;
}
function getSum2(arr) {
    let arraySum = [...arr];
    arraySum.pop();
    arraySum = arraySum.reduce((acc, curr) => acc + curr, 0);
    return arraySum;
}

function displayDice(arr) {
    diceBlocks = '';
    let idNr = 1;
    for (let i = 0; i < arr.length; i++) {
        diceBlocks += `<div ${selectedClass[i] ? 'class="selected"' : ''} onclick="clickDice(event)" id="die${i}">${dice[arr[i]]}</div>`
    }
    
    return diceBlocks;
}

function clickDice(event) {
    id = event.target.id.charAt(3);
    
    if (selectedClass[id] === false){
        selectedClass[id] = true
        heldDice[id] = roll[id];
        diceHeld = heldDice.length;
    } else {
        selectedClass[id] = false
        heldDice[id] = null;
    }
    console.log(heldDice);
    show();
}

function clickRollDice() {
    if (timesRolled >= 3 || selectedClass.every(element => element === true)) return;
    timesRolled++;
    roll = rollDice();
    checkRoll();
    show();
}