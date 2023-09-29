let model = {
    structure: {
        rowName: ['Enere', 'Toere', 'Treere', 'Firere', 'Fememre', 'Seksere', 'Bonus', '1 par', '2 par', '3 like', '4 like', 'Liten straight', 'Stor straight', 'Hus', 'Sjanse', 'Yatzy', 'Sum'],
        rowId: ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes', 'Bonus', '1pair', '2pair', '3same', '4same', 'SmallStraight', 'BigStraight', 'House', 'Chance', 'Yatzy',],
        colorGreen: "rgb(222, 250, 222);",
        colorRed: "rgb(240, 177, 197);",
    },
    result: {
        roll: [],
        frequencyTable: [],
        resultObject: {}
    },
    players: {
        playerCount: 4,
        currentPlayer: 0,
        playerList: [
            player1 = {
                name: "Navn ",
                score: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0], //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
            },
            player2 = {
                name: 'Per ',
                score: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0], 
            },
            player3 = {
                name: 'Tore ',
                score: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0], 
            },
            player4 = {
                name: 'Pål',
                score: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0], 
            },
        ]
    },
    dice: {
        heldDice: [],
        timesRolled: 0,
        selectedClass: [false, false, false, false, false],
        diceBlocks: '',
        usedDice: false,
    },
    constants: {
        dice: { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' },
    }
}




//model
// let roll = [];
// const dice = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };
// let diceRolled = []
// let heldDice = [];
// let maxRollCount = 3;
// let timesRolled = 0;
// let frequencyTable = [];

// let firstLoad = false

// let selectedClass = [false, false, false, false, false]
// let player1Score = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy
// let player2Score = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0] //1par, 2par, 3like, 4 like, liten straight, stor straight, hus, sjanse, yatzy

// let resultArray = {}

// const rowName = ['Enere', 'Toere', 'Treere', 'Firere', 'Fememre', 'Seksere', '1 par', '2 par', '3 like', '4 like', 'Liten straight', 'Stor straight', 'Hus', 'Sjanse', 'Yatzy', 'Sum']
// const rowId = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes', '1pair', '2pair', '3same', '4same', 'SmallStraight', 'BigStraight', 'House', 'Chance', 'Yatzy',]
// let diceBlocks = '';
// let usedDice = false;
// let canRollAgain = true;