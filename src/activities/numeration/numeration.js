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
var numberOfLevel = 0    //?
var items

var numbersToConvert = []
var scorePercentage = 0
var scorePourcentageStep = 0
var numbersToConvertIndex = 0
var classNamesArray = {}
var smallerNumberClass = ""
var biggerNumberClass = ""
var selectedNumberWeightDragElementIndex = -1

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

var fullClassNamesConstantArray = ["Unit class","Thousand class","Million class","Milliard class"]
//var classNamesConstantArray = ["Unit class","Thousand class","Million class","Milliard class"]

var classNamesConstantArray = []
    classNamesConstantArray.push("Unit class")

var numberClassesObj = {
    "Unit class": { name: qsTr("Unit class"), color: "black", dragkeys: "NumberClassKey"},
    "Thousand class": { name: qsTr("Thousand class"), color: "black", dragkeys: "NumberClassKey"},
    "Million class": { name: qsTr("Million class"), color: "black", dragkeys: "NumberClassKey"},
    "Milliard class": { name: qsTr("Milliard class"), color: "black", dragkeys: "NumberClassKey"}
}

var numberWeightsConstantArray = ["Unit","Ten","Hundred"]  //?
var numberWeightsColumnsArray = ["UnitColumn","TenColumn","HundredColumn"]

var numberWeightsObj = {
    "Unit": { name: qsTr("Unit"), color: "darkred", dragkeys: "numberWeightHeaderKey"},
    "Ten": { name: qsTr("Ten"), color: "darkred", dragkeys: "numberWeightHeaderKey"},
    "Hundred": { name: qsTr("Hundred"), color: "darkred", dragkeys: "numberWeightHeaderKey"},
}

var numberWeightComponentConstantArray = ["UnitColumn","TenColumn","HundredColumn","Unit","Ten","Hundred","Thousand","TenThousand",
                                          "OneHundredThousand","OneMillion","TenMillion","OneHundredMillion",
                                          "OneMilliard","TenMilliard","OneHundredMilliard"]

var numberWeightComponentObj = {
    "UnitColumn": { name: qsTr("Unit"), caption: "Unit", imageName: "", weightValue: "1", dragkeys: "numberWeightHeaderKey", color: "lightskyblue", selected: false },
    "TenColumn": { name: qsTr("Ten"), caption: "Ten", imageName: "", weightValue: "10", dragkeys: "numberWeightHeaderKey", color: "lightskyblue", selected: false },
    "HundredColumn": { name: qsTr("Hundred"), caption: "Hundred", imageName: "", weightValue: "100", dragkeys: "numberWeightHeaderKey", color: "lightskyblue", selected: false },
    "Unit": { name: qsTr("Unit"), caption: "", imageName: "unit.svg", weightValue: "1", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "Ten": { name: qsTr("Unit"), caption: "", imageName: "ten.svg", weightValue: "10", dragkeys: "numberWeightKey", color: "transparent", selected: true },
    "Hundred": { name: qsTr("Unit"), caption: "", imageName: "hundred.svg", weightValue: "100", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "Thousand": { name: qsTr("Unit"), caption: "1000", imageName: "weightCaption.svg", weightValue: "1000", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "TenThousand": { name: qsTr("Unit"), caption: "10 000", imageName: "weightCaption.svg", weightValue: "10000", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "OneHundredThousand": { name: qsTr("Unit"), caption: "100 000", imageName: "weightCaption.svg", weightValue: "100000", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "OneMillion": { name: qsTr("Unit"), caption: "1 000 000", imageName: "weightCaption.svg", weightValue: "1000000", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "TenMillion": { name: qsTr("Unit"), caption: "10 000 000", imageName: "weightCaption.svg", weightValue: "10000000", dragkeys: "numberWeightKey", color: "transparent", selected: false },
    "OneHundredMillion": { name: qsTr("Unit"), caption: "1000 000 000", imageName: "weightCaption.svg", weightValue: "100000000", dragkeys: "numberWeightKey", color: "transparent" , selected: false },
    "OneMilliard": { name: qsTr("Unit"), caption: "1 000 000 000", imageName: "weightCaption.svg", weightValue: "1000000000", dragkeys: "numberWeightKey", color: "transparent" , selected: false },
    "TenMilliard": { name: qsTr("Unit"), caption: "10 000 000 000", imageName: "weightCaption.svg", weightValue: "10000000000", dragkeys: "numberWeightKey", color: "transparent" , selected: false },
    "OneHundredMilliard": { name: qsTr("Unit"), caption: "100 000 000 000", imageName: "weightCaption.svg", weightValue: "100000000000", dragkeys: "numberWeightKey", color: "transparent" , selected: false }
}

// for what is used name in numberWeightComponentObj ?  //?

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
    classNamesArray[classConstant[className]][numberWeightConstant[numberWeightKey]][rowIndex] = numberValue
    readNumerationTableEnteredValue()
}

function removeClassInNumberClassesArray() {
    numberClassesArray.pop(numberClass)
}

function resetNumerationTable() {
    for (var i = 0; i<items.numberClassListModel.count; i++) {
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
        for (var j=0; j<3; j++) {
            for (var k=0; k<9; k++) {
                enteredValue = enteredValue + classNamesArray[i][j][k]
            }
        }
    }
    console.log("entered value: " + enteredValue)
    return enteredValue
}

//check if the answer is correct
function checkAnswer() {




    var classNamesArrayToCompare = []
    classNamesArrayToCompare = classNamesConstantArray.slice(0,items.numberClassListModel.count).reverse()
    console.log("classNamesArrayToCompare: " + classNamesArrayToCompare)
    var numberClassListModelNamesArrayReversed = []
    for (var i = 0; i<items.numberClassListModel.count; i++) {
        numberClassListModelNamesArrayReversed.push(items.numberClassListModel.get(i).name)
        console.log("-----classname: " + items.numberClassListModel.get(i).name)
    }
    numberClassListModelNamesArrayReversed.reverse()
    console.log("numberClassListModelNamesArrayReversed: " + numberClassListModelNamesArrayReversed)
    console.log("classNamesConstantArray: " + classNamesConstantArray)


    //check number classes positions
    for (i = 0; i<items.numberClassListModel.count; i++) {
        if (items.numberClassListModel.get(i).name === classNamesArrayToCompare[i]) {
            items.numberClassListModel.setProperty(i, "misplaced", false)
        }
        else items.numberClassListModel.setProperty(i, "misplaced", true)
    }

    //check number weights
    for (i = 0; i<items.numberClassListModel.count; i++) {
        for (var j=0; j<3; j++) {
            var numberWeightTypeDropped = items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.textAlias
            var numberWeightType = items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightType
            if (numberWeightTypeDropped !== numberWeightType) {
                items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.border.width = 5
            }
            else items.numberClassDropAreaRepeater.itemAt(i).numberWeightsDropAreasRepeaterAlias.itemAt(j).numberWeightHeaderElement.border.width = 0
        }
    }

    //check entered values
    var enteredValue = readNumerationTableEnteredValue()
//    console.log("enteredValue: " + enteredValue)
//    console.log("numbersToConvert[numbersToConvertIndex]: " + numbersToConvert[numbersToConvertIndex])

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
//            console.log("randomValueToInsert: " + randomValueToInsert)
        }
        //when user makes an error, the given error is inserted twice, one time to find the good result, a second time to be sure that the answer is understood
        numbersToConvert.splice(numbersToConvertIndex+2, 0, numbersToConvert[numbersToConvertIndex]);
//        console.log("numbersToConvertindex: " + numbersToConvertIndex)
        numbersToConvert.splice(numbersToConvertIndex+4, 0, numbersToConvert[numbersToConvertIndex]);
//        console.log("numbersToConvert: " + numbersToConvert)
//        console.log("numbersToConvert length: " + numbersToConvert.length)
        numbersToConvertIndex++
        items.numberToConvertRectangle.text = numbersToConvert[numbersToConvertIndex]
//        console.log("numbersToConvert: " + numbersToConvert[numbersToConvertIndex])
    }
}


function start(items_) {
    items = items_
    currentLevel = 0

    setNumberClassDragListModel(fullClassNamesConstantArray)

    setNumberWeightDragListModel(numberWeightComponentConstantArray)

    initLevel()


    numberOfLevel = items.levels.length  // ?
}


function setNumberClassDragListModel(fullClassNamesConstantArray) {
    smallerNumberClass = items.levels[currentLevel].smallerNumberClass
    biggerNumberClass = items.levels[currentLevel].biggerNumberClass
    var classNamesUsedArray
    if (fullClassNamesConstantArray.indexOf(smallerNumberClass) !== -1 && fullClassNamesConstantArray.indexOf(biggerNumberClass)  !== -1) {
        classNamesUsedArray = fullClassNamesConstantArray.slice(fullClassNamesConstantArray.indexOf(smallerNumberClass),fullClassNamesConstantArray.indexOf(biggerNumberClass)+1)
        console.log("classNamesUsed " + classNamesUsedArray)
    }
    else {
        classNamesUsedArray = fullClassNamesConstantArray
    }
    for (var i=0; i<classNamesUsedArray.length; i++) {
        var classNameStr = classNamesUsedArray[i]
        console.log("classname to add " + classNameStr)
        items.numberClassDragListModel.append({"name": numberClassesObj[classNameStr]["name"],
                                                "color": numberClassesObj[classNameStr]["color"],
                                                "dragkeys": numberClassesObj[classNameStr]["dragkeys"]})
    }
}


function setNumberWeightDragListModel(numberWeightComponentConstantArray) {
    for (var i=0; i<numberWeightComponentConstantArray.length; i++) {
        var weightNameStr = numberWeightComponentConstantArray[i]
        console.log("numberWeightsColumn to add " + weightNameStr)
        console.log("numberWeightComponentObj[weightNameStr][selected]" + numberWeightComponentObj[weightNameStr]["selected"])
        items.numberWeightDragListModel.append({"name": numberWeightComponentObj[weightNameStr]["name"],
                                                "imageName": numberWeightComponentObj[weightNameStr]["imageName"],
                                                "dragkeys": numberWeightComponentObj[weightNameStr]["dragkeys"],
                                                "weightValue": numberWeightComponentObj[weightNameStr]["weightValue"],
                                                "caption": numberWeightComponentObj[weightNameStr]["caption"],
                                                "color": numberWeightComponentObj[weightNameStr]["color"],
                                                "selected": numberWeightComponentObj[weightNameStr]["selected"]
                                               })
    }
}

function selectNumberWeightDragElement(elementIndex) {
    console.log("--*-* " + items.numberWeightDragListModel.get(elementIndex).selected)
    if (items.numberWeightDragListModel.get(elementIndex).selected === true) {
        items.numberWeightDragListModel.setProperty(elementIndex, "selected", false)
        selectedNumberWeightDragElementIndex = -1
    }
    else {
        unselectAllNumberWeightDragElement()
        items.numberWeightDragListModel.setProperty(elementIndex, "selected", true)
        selectedNumberWeightDragElementIndex = elementIndex
    }
}

function unselectAllNumberWeightDragElement() {
    for (var i=0; i<items.numberWeightDragListModel.count; i++) {
        items.numberWeightDragListModel.setProperty(i, "selected", false)
    }
}

function stop() {
}

function initLevel() {
    console.log("start init ")

    resetNumerationTable()

    items.bar.level = currentLevel + 1
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

    console.log("resetNumerationTable")
    resetNumerationTable()

    console.log("stop init ")
}

/*function setUp() {   //?
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
        currentLevel = numberOfLevel - 1      //?
    }
    items.currentSubLevel = 0;
    initLevel();
}
