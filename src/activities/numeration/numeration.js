/* GCompris - numeration.js
 *
 * Copyright (C) 2019 Emmanuel Charruau <echarruau@gmail.com>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <https://www.gnu.org/licenses/>.
 */

.pragma library
.import QtQuick 2.6 as Quick

var currentLevel = 0
var numberOfLevel = 0
var items

var numbersToConvert = []
var scorePercentage = 0
var scorePourcentageStep = 0
var numbersToConvertIndex = 0
var classNamesArray = {}

var classConstant = {
    "Unit class": 0,
    "Thousand class": 1,
    "Million class":2,
    "Milliard class":3
}

var numberWeightConstant = {
    "Unit": 0,
    "Ten": 1,
    "Hundred":2
}

var classNamesConstantArray = ["Unit class","Thousand class","Million class","Milliard class"]

var numberClassesObj = {
    "Unit class": { name: qsTr("Unit class"), color: "black", dragkeys: "NumberClassKey"},
    "Thousand class": { name: qsTr("Thousand class"), color: "black", dragkeys: "NumberClassKey"},
    "Million class": { name: qsTr("Million class"), color: "black", dragkeys: "NumberClassKey"},
    "Milliard class": { name: qsTr("Milliard class"), color: "black", dragkeys: "NumberClassKey"}
}

var numberWeightsConstantArray = ["Unit","Ten","Hundred"]

var numberWeightsObj = {
    "Unit": { name: qsTr("Unit"), color: "darkred", dragkeys: "numberWeightHeaderKey"},
    "Ten": { name: qsTr("Ten"), color: "darkred", dragkeys: "numberWeightHeaderKey"},
    "Hundred": { name: qsTr("Hundred"), color: "darkred", dragkeys: "numberWeightHeaderKey"},
}

var numberWeightComponentConstantArray = ["Unit","Ten","Hundred","Thousand","Ten","TenThousand",
                                          "OneHundredThousand","OneMillion","TenMillion","OneHundredMillion",
                                          "OneMilliard","TenMilliard","OneHundredMilliard"]

var numberWeightComponentObj = {
    "Unit": { name: qsTr("Unit"), caption: "", imageName: "unity.svg", weightValue: "", dragkeys: "numberWeightKey" },
    "Ten": { name: qsTr("Unit"), caption: "", imageName: "ten.svg", weightValue: "", dragkeys: "numberWeightKey" },
    "Hundred": { name: qsTr("Unit"), caption: "", imageName: "hundred.svg", weightValue: "", dragkeys: "numberWeightKey" },
    "Thousand": { name: qsTr("Unit"), caption: "", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "TenThousand": { name: qsTr("Unit"), caption: "10 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "OneHundredThousand": { name: qsTr("Unit"), caption: "100 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "OneMillion": { name: qsTr("Unit"), caption: "1 000 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "TenMillion": { name: qsTr("Unit"), caption: "10 000 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "OneHundredMillion": { name: qsTr("Unit"), caption: "1000 000 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "OneMilliard": { name: qsTr("Unit"), caption: "1 000 000 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "TenMilliard": { name: qsTr("Unit"), caption: "10 000 000 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
    "OneHundredMilliard": { name: qsTr("Unit"), caption: "100 000 000 000", imageName: "", weightValue: "", dragkeys: "numberWeightKey" },
}



/*NumberWeightDragElement {
    id: unitWeightDragElement
    name: "unity"
    caption: ""
    weightValue: 1
    Drag.keys: "numberWeightKey"

}

NumberWeightDragElement {
    id: tenWeightDragElement
    name: "ten"
    caption: ""
    weightValue: 10
    Drag.keys: "numberWeightKey"
}

NumberWeightDragElement {
    id: hundredWeightDragElement
    name: "hundred"
    caption: ""
    weightValue: 100
    Drag.keys: "numberWeightKey"
}

NumberWeightDragElement {
    id: thousandWeightDragElement
    name: "weightCaption"
    caption: qsTr("1 000")
    weightValue: 1000
    Drag.keys: "numberWeightKey"
}

NumberWeightDragElement {
    id: tenthousandWeightDragElement
    name: "weightCaption"
    caption: qsTr("10 000")
    weightValue: 10000
    Drag.keys: "numberWeightKey"
}

NumberWeightDragElement {
    id: onehundredthousandWeightDragElement
    name: "weightCaption"
    caption: qsTr("100 000")
    weightValue: 100000
    Drag.keys: "numberWeightKey"
}*/




function createNumberClasses() {
    var numberClasses = [];
    for (var i=0; i<4; i++) {
        numberClasses[i] = [ ]
        numberClasses[i][0] = [0,0,0,0,0,0,0,0,0]
        numberClasses[i][1] = [0,0,0,0,0,0,0,0,0]
        numberClasses[i][2] = [0,0,0,0,0,0,0,0,0]
    }
    return numberClasses;
}

function removeClassInNumberClassesArray(className) {
    console.log(numberClassesArray)
    var index = numberClassesArray.indexOf(className);
    if (index > -1) {
       numberClassesArray.splice(index, 1);
    }
    console.log(numberClassesArray)
}


function resetClassNameValues(className) {
    for (var i=0; i<numberClassWeightsValues.count; i++) {
        for (var j=0; j<9; j++) {
            classNamesArray[className][i][j] = 0
        }
    }
}

function writeClassNameValue(className, numberWeightKey, rowIndex, numberValue) {
    console.log("numberWeightKey: " + numberWeightKey)
    console.log("writeClassNameValue: classNamesArray["+className+"]["+numberWeightConstant[numberWeightKey] +"]["+rowIndex+"] = "+numberValue);
    classNamesArray[classConstant[className]][numberWeightConstant[numberWeightKey]][rowIndex] = numberValue
    readNumerationTableEnteredValue()
}


function resetNumerationTable() {
    console.log("test reset classname: " + items.numberClassListModel.count)
    for (var i = 0; i<items.numberClassListModel.count; i++) {
        console.log("classname: " + items.numberClassListModel.get(i).name)
        for (var j=0; j<3; j++) {
            for (var k=0; k<9; k++) {
                items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightsDropTiles.numberWeightDropAreaGridRepeater.itemAt(k).numberWeightImageTile.source = ""
            }
        }
    }
}


function readNumerationTableEnteredValue() {
    var enteredValue = 0
    for (var i=0; i<Object.keys(classConstant).length; i++) {
        console.log("ClassNameKey: " + numberWeightsConstantArray[i])
        for (var j=0; j<3; j++) {
            console.log("Class + NumberWeightKey: " + numberWeightsConstantArray[i] + " " + numberWeightsConstantArray[j])
            for (var k=0; k<9; k++) {
                console.log("index: " + k + " " + classNamesArray[i][j][k])
                enteredValue = enteredValue + classNamesArray[i][j][k]
            }
        }
    }
    console.log("entered value: " + enteredValue)
    return enteredValue
}


//check if the answer is correct
function checkAnswer() {






    //check number classes
    for (var i = 0; i<items.numberClassListModel.count; i++) {
        console.log("classname: " + items.numberClassListModel.get(i).name)
        var mirroredIndex = items.numberClassListModel.count - 1 - i
        console.log("mirroredIndex: " + mirroredIndex)
        console.log("mirrored classname: " + items.numberClassListModel.get(mirroredIndex).name)
        console.log("numberWeightsConstantArray[i]: " + numberWeightsConstantArray[i])



        if (items.numberClassListModel.get(mirroredIndex).name === numberWeightsConstantArray[i]) {
            console.log("numberWeightsConstantArray at the right place " + numberWeightsConstantArray[i])
            items.numberClassListModel.setProperty(i, "misplaced", false)
        }
        else
        {
            console.log("numberWeightsConstantArray nooooooooooooooootttttttttt at the right place " + numberWeightsConstantArray[i])
            items.numberClassListModel.setProperty(i, "misplaced", true)
        }
    }




    //check number weights
    for (i = 0; i<items.numberClassListModel.count; i++) {
        console.log("check class: " + items.numberClassListModel.get(i).name)
        for (var j=0; j<3; j++) {
            console.log("check number weight: ")
            console.log(items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.textAlias)
            var numberWeightTypeDropped = items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.textAlias
            var numberWeightType = items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightType
            console.log("test: " + items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightType)
            if (numberWeightTypeDropped !== numberWeightType) {
                items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.border.width = 5
            }
            else items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.border.width = 0
        }
    }



    //check entered values
    var enteredValue = readNumerationTableEnteredValue()
    console.log("enteredValue: " + enteredValue)
    console.log("numbersToConvert[numbersToConvertIndex]: " + numbersToConvert[numbersToConvertIndex])

    //test if given answer is equal to given number
    if (enteredValue === parseInt(numbersToConvert[numbersToConvertIndex],10)) {
        items.bonus.good("flower")
        scorePercentage = scorePercentage + scorePourcentageStep
        items.progressBar.value = scorePercentage
        if (scorePercentage > 97) {
            nextLevel()
        }
        numbersToConvertIndex++
        items.numberToConvertRectangle.text = numbersToConvert[numbersToConvertIndex]
        return
    }
    else {
        items.bonus.bad("flower")
        scorePercentage = scorePercentage - (2 * scorePourcentageStep)
        if (scorePercentage < 0) scorePercentage = 0
        items.progressBar.value = scorePercentage
        var numbersToConvertIndexPlus4 = numbersToConvertIndex + 4
        //we insert here an random additional value, otherwise there could be an overflow when adding the 2 values
        //inserted when the user makes an error and that we are at the end of the array
        if (numbersToConvertIndexPlus4 -1 > numbersToConvert.length ) {
            var randomValueToInsert = numbersToConvert[Math.floor(Math.random() * numbersToConvert.length)]
            numbersToConvert.push(randomValueToInsert)
            console.log("randomValueToInsert: " + randomValueToInsert)
        }
        //when user makes an error, the given error is inserted twice, one time to find the good result, a second time to be sure that the answer is understood
        numbersToConvert.splice(numbersToConvertIndex+2, 0, numbersToConvert[numbersToConvertIndex]);
        console.log("numbersToConvertindex: " + numbersToConvertIndex)
        numbersToConvert.splice(numbersToConvertIndex+4, 0, numbersToConvert[numbersToConvertIndex]);
        console.log("numbersToConvert: " + numbersToConvert)
        console.log("numbersToConvert length: " + numbersToConvert.length)
        numbersToConvertIndex++
        items.numberToConvertRectangle.text = numbersToConvert[numbersToConvertIndex]
        console.log("numbersToConvert: " + numbersToConvert[numbersToConvertIndex])
    }
}


function removeClassInNumberClassesArray() {
    numberClassesArray.pop(numberClass)
}


function start(items_) {
    items = items_
    currentLevel = 0
    initLevel()
    numberOfLevel = items.levels.length  // ?
}

function stop() {
}

function initLevel() {
    console.log("start init ")

    resetNumerationTable()

    items.bar.level = currentLevel + 1
    var filename = "resource/board/"+ "board" + currentLevel + ".qml"    // ?
    items.dataset.source = filename  // ?

    items.instruction.text = items.levels[currentLevel].objective
    items.instruction.show()



    console.log("currentLevel: " + currentLevel)
    numbersToConvert = items.levels[currentLevel].numbers
    console.log("numbersToConvert: " + numbersToConvert)
    scorePercentage = 0
    items.progressBar.value = scorePercentage
    numbersToConvertIndex = 0
    scorePourcentageStep = Math.round((100 / numbersToConvert.length))

    items.numberToConvertRectangle.text = numbersToConvert[numbersToConvertIndex]


//    setUp()

    classNamesArray = createNumberClasses.call();



    console.log("stop init ")

}


/*function setUp() {
    var levelData = items.dataset.item

    // use board levels
    if (currentLevel < 7) {
        var subLevelData = levelData.levels[items.currentSubLevel];
        items.totalBoys = subLevelData.totalBoys
        items.totalGirls = subLevelData.totalGirls
        items.totalCandies = subLevelData.totalCandies

        items.instruction.text = subLevelData.instruction
        items.nbSubLevel = levelData.levels.length

        items.background.currentCandies = items.totalGirls * subLevelData.placedInGirls +
                items.totalBoys * subLevelData.placedInBoys

        items.background.placedInGirls = subLevelData.placedInGirls
        items.background.placedInBoys = subLevelData.placedInBoys
        items.background.showCount = subLevelData.showCount

        items.background.rest = items.totalCandies -
                Math.floor(items.totalCandies / items.totalChildren) * (items.totalBoys+items.totalGirls)
        items.basketWidget.element.opacity = (subLevelData.forceShowBasket === true ||
                                              items.background.rest !== 0) ? 1 : 0
        items.background.wrongMove.visible = false
    }
    else {
        // create random (guided) levels
        // get a random number between 1 and max for boys, girls and candies
        var maxBoys = levelData.levels[0].maxBoys
        var maxGirls = levelData.levels[0].maxGirls
        var maxCandies = levelData.levels[0].maxCandies

        items.totalBoys = Math.floor(Math.random() * maxBoys) + 1
        items.totalGirls = Math.floor(Math.random() * maxGirls) + 1
        var sum = items.totalBoys + items.totalGirls
        // use sum * 4 as top margin (max 4 candies per rectangle)
        items.totalCandies = Math.floor(Math.random() * (4 * sum - sum + 1)) + sum

        // stay within the max margin
        if (items.totalCandies > maxCandies)
            items.totalCandies = maxCandies

        //~ singular Place %n boy
        //~ plural Place %n boys
        items.instruction.text = qsTr("Place %n boy(s) ", "First part of Place %n boy(s) and %n girl(s) in the center. Then equally split %n pieces of candy between them.", items.totalBoys);

        //~ singular and %n girl in the center.
        //~ plural and %n girls in the center.
        items.instruction.text += qsTr("and %n girl(s) in the center. ", "Second part of Place %n boy(s) and %n girl(s) in the center. Then equally split %n pieces of candy between them.", items.totalGirls);

        //~ singular Then equally split %n candy between them.
        //~ plural Then equally split %n candies between them.
        items.instruction.text += qsTr("Then equally split %n pieces of candy between them.", "Third part of Place %n boy(s) and %n girl(s) in the center. Then equally split %n pieces of candy between them.", items.totalCandies);

        items.background.showCount = false


        // depending on the levels configuration, add candies from start in a child rectangle
        if (levelData.levels[0].alreadyPlaced === false) {
            items.background.placedInGirls = 0
            items.background.placedInBoys = 0
            items.background.currentCandies = 0
        }
        else {
            items.background.currentCandies = items.totalCandies * 2
            // Place randomly between 0 and 3 candies for each child
            while (items.background.currentCandies > items.totalCandies / 3) {
                items.background.placedInGirls = Math.floor(Math.random() * 3)
                items.background.placedInBoys = Math.floor(Math.random() * 3)
                items.background.currentCandies = items.totalGirls * items.background.placedInGirls
                        + items.totalBoys * items.background.placedInBoys
            }
        }

        items.background.rest = items.totalCandies -
                Math.floor(items.totalCandies / items.totalChildren) * (items.totalBoys+items.totalGirls)

        items.basketWidget.element.opacity = 1

        items.background.wrongMove.visible = false;

        saveVariables()
    }
    resetBoard()
}*/



function nextLevel() {
    if(numberOfLevel <= ++currentLevel) {
        currentLevel = 0
    }
    items.currentSubLevel = 0;
    initLevel();
}

function previousLevel() {
    if(--currentLevel < 0) {
        currentLevel = numberOfLevel - 1
    }
    items.currentSubLevel = 0;
    initLevel();
}
