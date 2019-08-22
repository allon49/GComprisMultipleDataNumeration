/* GCompris - NumberClassDropArea.qml
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

import QtQuick 2.6
import GCompris 1.0
import QtQuick.Layouts 1.3

import "../../core"
import "numeration.js" as Activity


Rectangle {
    id: numberClassDropArea

    property string className
    property var unitColumnWeightImagesArray: ["","","","","","","","",""]   //?
    property int unitColumnWeightImagesArrayIndex: 0
    property var tenColumnWeightImagesArray: ["","","","","","","","",""]
    property int tenColumnWeightImagesArrayIndex: 0
    property var hundredColumnWeightImagesArray: ["","","","","","","","",""]
    property int hundredColumnWeightImagesArrayIndex: 0
    property string numberClassDropAreaIndex: index

    property string defaultColor: "darkseagreen"
    property string overlapColor: "grey"

    property alias numberWeightsDropAreasRepeaterAlias: numberWeightsDropAreasRepeater
//    property alias numberWeightHeadersModelAlias: numberWeightHeadersModel //?


    width: parent.width
    height: parent.height - numberClassHeaders.height

    color: "blue"

    ListModel {
        id: numberWeightHeadersModel

        ListElement {
            weightType: "Hundred"
            name: "Drag number weight here"
            weightElementDroppedName: ""   //?
        }
        ListElement {
            weightType: "Ten"
            name: "Drag number weight here"
            weightElementDroppedName: ""
        }
        ListElement {
            weightType: "Unit"
            name: "Drag number weight here"
            weightElementDroppedName: ""
        }
    }


    RowLayout {
        id: numberWeightsDropAreasRowLayout

        width: parent.width
        height: parent.height
        spacing: 10

        Repeater {
            id: numberWeightsDropAreasRepeater
            model: numberWeightHeadersModel


            Rectangle {
                id: numberWeightDropAreaRectangle

                property string numberWeightDropAreaRectangleIndex: index
                property string numberWeightKey: weightType
                property alias numberWeightsDropTiles: numberWeightsDropTiles
                property alias numberWeightHeaderElement: numberWeightHeaderElement
                property string numberWeightType: weightType

                color: "lightsteelblue"

                Layout.fillWidth: true
                Layout.fillHeight: true
                Layout.minimumWidth: 50
                Layout.preferredWidth: 100

                NumberWeightHeaderElement {
                    id: numberWeightHeaderElement

                    x: 0 //numberWeightDropAreaRectangle.x  //?
                    y: 0 //numberWeightDropAreaRectangle.y
                    width: numberWeightDropAreaRectangle.width
                    height: numberWeightDropAreaRectangle.height /10
                }

                // Implement NumberWeightsHeaders elements
                DropArea {
                    id: numberWeightsHeaderDropArea

                    keys: "numberWeightHeaderKey"

                    anchors.top: numberWeightHeaderElement.top
                    width: parent.width
                    height: parent.height - numberWeightHeaderElement.height

                    states: [
                       State {
                           when: numberWeightsHeaderDropArea.containsDrag
                           PropertyChanges {
                               target: numberWeightDropAreaRectangle
                               color: overlapColor
                           }
                       }
                    ]

                    onDropped: {
                        //console.log("dropped number in: " + numberWeightHeadersModel.get(index).name)
                        console.log("dropped number in: " + index)

                        console.log("Header- "+ className + " " + drag.source.name)
                        numberWeightHeadersModel.setProperty(index, "name", drag.source.name)
                        callUpdateNumberWeightHeaderCaption()   //?
                        console.log("jjjjjjj : " + numberWeightsDropAreasRepeater.classNameStr)
                        console.log(numberWeightsDropAreasRepeater.modelData)
                        console.log(numberWeightHeadersModel.get(index).name)
                    }

                    function callUpdateNumberWeightHeaderCaption() {
                        numberWeightHeaderElement.updateNumberWeightHeaderCaption()
                    }
                }

                // Implement columns where the numberWeights are set by the user
                Rectangle {
                    id: numberWeightsDropTiles

                    property alias numberWeightDropAreaGridRepeater: numberWeightDropAreaGridRepeater

                    anchors.top: numberWeightHeaderElement.bottom
                    width: parent.width
                    height: parent.height - numberWeightHeaderElement.height


                    Grid {
                        id: numberWeightDropAreaGrid

                        anchors.left: parent.left
                        anchors.top: parent.top
                        anchors.bottom: parent.bottom;
                        width: parent.width
                        height: parent.height
                        columns: 1

                        Repeater {
                            id: numberWeightDropAreaGridRepeater
                            model: 9

                            DropArea {
                                property alias numberWeightImageTile: numberWeightImageTile
                                property alias numberWeightComponentRectangle: numberWeightComponentRectangle

                                keys: "numberWeightKey"

                                width: parent.width
                                height: parent.height/9

                                onEntered: {
                                    numberWeightComponentRectangle.color = overlapColor
                                }

                                onExited: {
                                    numberWeightComponentRectangle.color = defaultColor
                                }

                                onDropped: {
                                    numberWeightImageTile.source = "qrc:/gcompris/src/activities/numeration/resource/images/" + drag.source.imageName
                                    numberWeightImageTile.caption = drag.source.caption
                                    numberWeightImageTile.weightValue = drag.source.weightValue
                                    numberWeightComponentRectangle.color = defaultColor
                                    Activity.writeClassNameValue(className, numberWeightKey, index, drag.source.weightValue)
                                    console.log("weight index: " + numberWeightDropAreaRectangleIndex + " " + numberClassDropAreaIndex)
                                }

                                Rectangle {
                                    id: numberWeightComponentRectangle  //? replace with numberWeightComponentRectangle

                                    border.color: "black"
                                    border.width: 5
                                    radius: 10
                                    width: parent.width
                                    height: parent.height
                                    color: defaultColor

                                    Image {
                                        id: numberWeightImageTile

                                        property string caption: ""
                                        property string weightValue: ""

                                        anchors.fill: parent
                                        sourceSize.width: parent.width
                                        sourceSize.height: parent.height

                                        MouseArea {
                                             anchors.fill: parent
                                             onClicked: {
                                                 if (numberWeightImageTile.status === Image.Ready) {
                                                    numberWeightImageTile.source = ""
                                                    Activity.writeClassNameValue(className, numberWeightKey, index, 0)
                                                 }
                                                 else {
                                                     if (Activity.selectedNumberWeightDragElementIndex !== -1)
                                                     {
                                                         var selectedNumberWeightDragElementImageName = numberWeightDragListModel.get(Activity.selectedNumberWeightDragElementIndex).imageName
                                                         if ( selectedNumberWeightDragElementImageName !== "") {
                                                             numberWeightImageTile.source = "qrc:/gcompris/src/activities/numeration/resource/images/" + selectedNumberWeightDragElementImageName
                                                         }
                                                         numberWeightImageTile.caption = numberWeightDragListModel.get(Activity.selectedNumberWeightDragElementIndex).caption
                                                         numberWeightImageTile.weightValue = numberWeightDragListModel.get(Activity.selectedNumberWeightDragElementIndex).weightValue
                                                         //numberWeightComponentRectangle.color = defaultColor
                                                         Activity.writeClassNameValue(className, numberWeightKey, index, numberWeightImageTile.weightValue)
                                                    }
                                                }
                                             }
                                        }

                                        GCText {
                                            id: numberClassElementCaption

                                            anchors.fill: parent
                                            anchors.bottom: parent.bottom
                                            fontSizeMode: Text.Fit
                                            color: "white"
                                            verticalAlignment: Text.AlignVCenter
                                            horizontalAlignment: Text.AlignHCenter
                                            text: numberWeightImageTile.caption
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
