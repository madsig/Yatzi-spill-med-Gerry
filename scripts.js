//model
let roll;
let dice = {1:'⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅'};
let frequencyTable = [];
let player1Score = [null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
let resultArray = {}
const rowName = ['1 par', '2 par', '3 like', '4 like', 'Liten straight', 'Stor straight', 'Hus', 'Sjanse', 'Yatzy', 'Sum']
const rowId = ['1pair', '2pair', '3same', '4same', 'SmallStraight', 'BigStraight', 'House', 'Chance', 'Yatzy']

//view
show();
function show() {
    roll = rollDice();
    checkRoll();
    let HTML = createTable();
    HTML += `<h1>${displayDice(roll)}</h1>`
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
        rolls.push(Math.floor(Math.random() * 6 + 1))
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
    if (player1Score[index] != null) return
    player1Score[index] = resultArray[id];
    resultArray['Sum'] = getSum2(player1Score);
    player1Score[9] = resultArray['Sum'];
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
    let diceBlocks = '';
    for (let n of arr) {
        diceBlocks += dice[n]
    }
    return diceBlocks;
}