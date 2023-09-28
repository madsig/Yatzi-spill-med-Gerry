//Midlertidig liste av alle mulige scores for hvert kast.
function checkResult(array) {
    let resultObject = model.result.resultObject;

    resultObject['ones'] = getSingles(array, 1);

    resultObject['twos'] = getSingles(array, 2);

    resultObject['threes'] = getSingles(array, 3);

    resultObject['fours'] = getSingles(array, 4);

    resultObject['fives'] = getSingles(array, 5);

    resultObject['sixes'] = getSingles(array, 6);

    resultObject['1pair'] = get1pair(array);

    resultObject['2pair'] = get2pair(array);

    resultObject['3same'] = get3same(array);

    resultObject['4same'] = get4same(array);

    resultObject['SmallStraight'] = getStraight(array, 'small');

    resultObject['BigStraight'] = getStraight(array, 'big');

    resultObject['House'] = getHouse(array);

    resultObject['Chance'] = getChance(array);

    resultObject['Yatzy'] = getYatzy(array);

    console.log("%cResult array ↓", "color: red");
    console.log(resultObject);
}

function getSingles(array, number) {
    amount = array[number - 1]
    return amount * number;
}

function get1pair(array) {
    let tempVar = 0;

    for (i = 0; i < array.length; i++) {
        if (array[i] >= 2) {
            tempVar = i + 1;
        }
    }
    if (tempVar == 0) return tempVar
    return (tempVar) * 2
}

function get2pair(array) {
    let tempVar1 = 0;
    let tempVar2 = 0;

    for (i = 0; i < array.length; i++) {
        if (array[i] >= 2) {
            if (tempVar1 == 0) { tempVar1 = i + 1 }
            else { tempVar2 = i + 1 }
        }
    }
    if (tempVar2 == 0) return tempVar2
    return ((tempVar1) + (tempVar2)) * 2
}

function get3same(array) {
    let tempVar = 0;

    for (i = 0; i < array.length; i++) {
        if (array[i] >= 3) {
            tempVar = i + 1;
        }
    }
    if (tempVar == 0) return tempVar
    return (tempVar) * 3
}

function get4same(array) {
    let tempVar = 0;

    for (i = 0; i < array.length; i++) {
        if (array[i] >= 4) {
            tempVar = i + 1;
        }
    }
    if (tempVar == 0) return tempVar
    return (tempVar) * 4
}

function getStraight(array, size) {
    let count = array.reduce((acc, val) => (val === 1 ? acc + 1 : acc), 0);

    if (count != 5) return 0;
    switch (size) {
        case 'small':
            if (array[5] == 0) return 15
            else return 0;
            break;

        case 'big':
            if (array[0] == 0) return 20
            else return 0;
            break;
    }
}

function getHouse(array) {
    let resultObject = model.result.resultObject;
    if (array.includes(2) && array.includes(3)) {
        return resultObject['1pair'] + resultObject['3same']
    }
    return 0;
}

function getChance(array) {
    return model.result.roll.reduce((acc, curr) => acc + curr, 0);
}

function getYatzy(array) {
    if (array.includes(5)) {
        return 50;
    }
    return 0;
}