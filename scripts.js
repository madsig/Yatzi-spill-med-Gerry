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
let player1Score = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
let resultArray = {}
const rowName = ['Enere', 'Toere', 'Treere', 'Firere', 'Fememre', 'Seksere', '1 par', '2 par', '3 like', '4 like', 'Liten straight', 'Stor straight', 'Hus', 'Sjanse', 'Yatzy', 'Sum']
const rowId = ['ones', 'twos', 'threes', 'fours', 'fives','sixes', '1pair', '2pair', '3same', '4same', 'SmallStraight', 'BigStraight', 'House', 'Chance', 'Yatzy',]
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
            </tr>
    `
    for (i=0; i<6; i++) {
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td style="background-color: ${player1Score[i] == null ? (resultArray[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white'}" class="number" onclick="setScore('${rowId[i]}', ${i})">${player1Score[i] == null ? '' : (player1Score[i] == 0 ? '―' : player1Score[i]) }</td>
            </tr>
        `;
    }
    table += /*HTML*/`
        <tr style="border-top: solid gray 3px">
            <th>Sum</td>
            <th></td>
        </tr>
        <tr>
            <th>Bonus</td>
            <th></td>
        <tr>
    `

    for (i = 6; i < rowName.length - 1; i++) {
        table += /*HTML*/`
            <tr>
                <td>${rowName[i]}</td>
                <td style="background-color: ${player1Score[i] == null ? (resultArray[rowId[i]] > 0 ? 'LightGreen' : 'LightCoral') : 'white'}" class="number" onclick="setScore('${rowId[i]}', ${i})">${player1Score[i] == null ? '' : (player1Score[i] == 0 ? '―' : player1Score[i]) }</td>
            </tr>
        `;
    }
    table += /*HTML*/`
            <tr style="border-top: solid gray 3px">
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

function setScore(id, index) {
    //Denne kan hente ut relevant score fra resultatArray, og oppdatere riktig variabel, så reloade view.
    if (usedDice) return;
    timesRolled = 0;
    if (player1Score[index] != null) return
    player1Score[index] = resultArray[id];
    resultArray['Sum'] = getSum2(player1Score);
    player1Score[15] = resultArray['Sum'];
    //roll = rollDice();
    //checkRoll(); 
    selectedClass = [false, false, false, false, false]
    usedDice = true;
    canRollAgain = true;
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
    if(usedDice) return;
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
    canRollAgain = !(timesRolled >= 2 || selectedClass.every(element => element === true));
    console.log(canRollAgain)
    timesRolled++;
    usedDice = false;
    roll = rollDice();
    checkRoll();
    show();
}