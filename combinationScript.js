function checkResult(array) {

    resultArray['ones'] = getSingles(array, 1)

    resultArray['twos'] = getSingles(array, 2)

    resultArray['threes'] = getSingles(array, 3)

    resultArray['fours'] = getSingles(array, 4)

    resultArray['fives'] = getSingles(array, 5)

    resultArray['sixes'] = getSingles(array, 6)

    resultArray['1pair'] = get1pair(array)

    resultArray['2pair'] = get2pair(array)

    resultArray['3same'] = get3same(array)

    resultArray['4same'] = get4same(array)

    resultArray['SmallStraight'] = getStraight(array, 'small')

    resultArray['BigStraight'] = getStraight(array, 'big')

    resultArray['House'] = getHouse(array)

    resultArray['Chance'] = getChance(array)

    resultArray['Yatzy'] = getYatzy(array)

    console.log("Result Array " + Object.entries(resultArray))
}

function getSingles(array, number) {
    amount = array[number-1]
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
        console.log("Tempvar1 og 2 = " + tempVar1, tempVar2)
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

    if (array.includes(2) && array.includes(3)) {
        return resultArray['1pair'] + resultArray['3same']
    }
    return 0;
}
function getChance(array) {
    return getSum(roll)
}
function getYatzy(array) {
    if (array.includes(5)) {
        return 50;
    }
    return 0;
}