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

var savedTotalBoys
var savedTotalGirls
var savedTotalCandies
var savedPlacedInGirls
var savedPlacedInBoys
var savedCurrentCandies

var numbersToConvert = []
var numbersToConvertIndex = 0


var classConstant = {
    "Unit class": 0,
    "Thousand class": 1,
    "Million class":2,
    "Milliard class":3
}

var numberWeightConstant = {
    "unit": 0,
    "ten": 1,
    "hundred":2,
}

var numberWeightConstantdeb = ["unit","ten","hundred"]
var numberWeightConstantDeb = ["Unit class","Thousand class","Million class","Milliard class"]
var classNamesArray = {}

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
    readClassNameValues()
}

function readClassNameValues() {
    var enteredValue = 0
    for (var i=0; i<Object.keys(classConstant).length; i++) {
        console.log("ClassNameKey: " + numberWeightConstantDeb[i])
        for (var j=0; j<3; j++) {
            console.log("Class + NumberWeightKey: " + numberWeightConstantDeb[i] + " " + numberWeightConstantdeb[j])
            for (var k=0; k<9; k++) {
                console.log("index: " + k + " " + classNamesArray[i][j][k])
                enteredValue = enteredValue + classNamesArray[i][j][k]
            }
        }
    }
    console.log("entered value: " + enteredValue)
}

function readNumerationTableValues() {
    var numberValueAnswered = 0
    for (var i=0; i<items.numberClassListModel.count; i++) {
        console.log("classe name " + items.numberClassListModel.get(i).name)
        var className = items.numberClassListModel.get(i).name
        for (var j=0; j<numberClassWeightsKeysArray.length; j++) {
            for (var k=0; k<9; k++) {
                console.log("classNamesArray["+className+"]["+numberClassWeightsKeysArray[j]+"]["+k+"]: " + classNamesArray[className][numberClassWeightsKeysArray[j]][k])
                numberValueAnswered = numberValueAnswered + classNamesArray[className][numberClassWeightsKeysArray[j]][k]
            }
        }
    }
    console.log("numberValueAnswere is: " + numberValueAnswered)
}


function testModel() {
    console.log("testModel")
    numbersToConvertIndex++
    items.numberToConvertRectangle.text = numbersToConvert[numbersToConvertIndex]

}


function addClassInNumberClassesArray() {
    numberClassesArray.push(numberClass)
    for (var i=0; i<9; i++) {
        numberClassesArray[numberClassIndex][numberWeightType][numberWeightIndex] = 123
    }
}

function removeClassInNumberClassesArray() {
    numberClassesArray.pop(numberClass)
}

function removeClassInNumberClassesArray(numberClassIndex, numberWeightTyp, numberWeightIndex) {
    numberClassesArray[numberClassIndex][numberWeightType][numberWeightIndex] = 123
}


function start(items_) {
    items = items_
    currentLevel = 0
    initLevel()
    numberOfLevel = items.levels.length
}

function stop() {
}

function initLevel() {
    console.log("start init ")


    items.bar.level = currentLevel + 1
    var filename = "resource/board/"+ "board" + currentLevel + ".qml"
    items.dataset.source = filename

    items.instruction.text = items.levels[currentLevel].objective
    items.instruction.show()

    numbersToConvert = items.levels[currentLevel].numbers

    items.numberToConvertRectangle.text = numbersToConvert[numbersToConvertIndex]


//    setUp()

    classNamesArray = createNumberClasses.call();

    console.log("level length: " + items.dataset.item.levels.length)

    console.log("stop init ")

}


function setUp() {
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
        items.nbSubLevel = 5

        // depending on the levels configuration, add candies from start in a child rectangle
        if (levelData.levels[0].alreadyPlaced == false) {
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
}


function resetBoard() {
    items.background.currentGirls = 0
    items.background.currentBoys = 0
    items.background.resetCandy()
    items.background.finished = false

    items.acceptCandy = false
    items.instruction.opacity = 1
    items.listModel.clear()

    items.girlWidget.current = 0
    items.girlWidget.canDrag = true
    items.girlWidget.element.opacity = 1

    items.boyWidget.current = 0
    items.boyWidget.canDrag = true
    items.boyWidget.element.opacity = 1

    items.candyWidget.canDrag = true
    items.candyWidget.element.opacity = 1
    if (items.totalCandies - items.background.currentCandies == 0)
        items.candyWidget.element.opacity = 0.6

    items.basketWidget.canDrag = true
}

function saveVariables() {
    savedTotalBoys = items.totalBoys
    savedTotalGirls = items.totalGirls
    savedTotalCandies = items.totalCandies
    savedPlacedInGirls = items.background.placedInGirls
    savedPlacedInBoys = items.background.placedInBoys
    savedCurrentCandies = items.background.currentCandies
}

function loadVariables() {
    items.totalBoys = savedTotalBoys
    items.totalGirls = savedTotalGirls
    items.totalCandies = savedTotalCandies
    items.background.placedInGirls = savedPlacedInGirls
    items.background.placedInBoys = savedPlacedInBoys
    items.background.currentCandies = savedCurrentCandies
}

function reloadRandom() {
    if (currentLevel < 7) {
        initLevel()
    }
    else {
        loadVariables()
        resetBoard()

        items.background.rest = items.totalCandies -
                Math.floor(items.totalCandies / items.totalChildren) * (items.totalBoys+items.totalGirls)
        items.background.showCount = false
        items.basketWidget.element.opacity = 1
    }
}

function nextSubLevel() {
    items.currentSubLevel ++
    if (items.currentSubLevel === items.nbSubLevel) {
        nextLevel()
    }
    else {
        setUp()
    }
}

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
