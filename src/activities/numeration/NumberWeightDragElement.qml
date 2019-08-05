/* GCompris - NumberWeightDragElement.qml
 *
 * Copyright (C) 2016 Stefan Toncu <stefan.toncu29@gmail.com>
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

import "../../core"

Rectangle {
    id: numberWeightDragElement

    //initial position of the element
    //(these vars are assigned to element after release of click mouse)
    property int lastX
    property int lastY
    property string src
    property int current: 0
    property int total: 0
    property string name
    property bool canDrag: true
    property string caption
    property int weightValue: 0


    property string availableItems

    // callback defined in each numberWeightDragElement called when we release the element in background
    property var releaseElement: null



    width: parent.width - parent.width/5
    height: parent.height / 15

    color: "transparent"

    src: "resource/images/" + name + ".svg"

    availableItems: (background.showCount && background.easyMode) ?
                           numberWeightDragElement.total - numberWeightDragElement.current : ""

    property int placedInChild



    Drag.active: numberWeightDragElementMouseArea.drag.active

    Image {
        id: numberWeightDragElementImage
        sourceSize.width: items.cellSize * 1.5
        sourceSize.height: items.cellSize * 1.5
        source: numberWeightDragElement.src

        //number of available items
        GCText {
            id: numberWeightDragElementCaption

            anchors.fill: parent
            anchors.bottom: parent.bottom
            fontSizeMode: Text.Fit
            color: "white"
            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignHCenter
            text: caption
        }
    }




    MouseArea {
        id: numberWeightDragElementMouseArea
        anchors.fill: parent
        //     drag.target: (numberWeightDragElement.canDrag) ? numberWeightDragElement : null


        //  enabled: element.opacity > 0
        /*            onPressed: {
        instruction.hide()
        if (numberWeightDragElement.name !== "candy")
            background.resetCandy()
        //set the initial position
        numberWeightDragElement.lastX = numberWeightDragElement.x
        numberWeightDragElement.lastY = numberWeightDragElement.y
        }

        onReleased: {
        //set the numberWeightDragElement to its initial coordinates
        numberWeightDragElement.x = numberWeightDragElement.lastX
        numberWeightDragElement.y = numberWeightDragElement.lastY
        }*/

        onPressed: {
            //set the initial position
            numberWeightDragElement.lastX = numberWeightDragElement.x
            numberWeightDragElement.lastY = numberWeightDragElement.y
            console.log("moving left element")
        }


        drag.target: numberWeightDragElement
        drag.axis: numberWeightDragElement.x < parent.width ? Drag.XAxis : Drag.XAndYAxis
        Drag.hotSpot.x: width/2
        Drag.hotSpot.y: height/2


        onReleased: {
            parent.Drag.drop()
            //set the element to its initial coordinates
            numberWeightDragElement.x = numberWeightDragElement.lastX
            numberWeightDragElement.y = numberWeightDragElement.lastY
            //numberWeightDragElement.opacity = 1
            //numberWeightDragElement.canDrag = false


            /*      console.log("set drag")
            console.log(numberWeightDragElement.Drag.target)
            parent = numberWeightDragElement.Drag.target*/
            //print(parent.dropRectangle.color)
            //     numberWeightDragElement.x = parent.x
            //     numberWeightDragElement.y = parent.y

            //  parent = numberWeightDragElement.Drag.target !== null ? numberWeightDragElement.Drag.target : numberWeightDragElement

        }
    }
}


