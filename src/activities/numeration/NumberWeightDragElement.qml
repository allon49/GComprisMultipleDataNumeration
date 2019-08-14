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
    property string imageName
    property string name
    property bool canDrag: true
    property string caption
    property string src

    // callback defined in each numberWeightDragElement called when we release the element in background   //?
    property var releaseElement: null

    width: parent.width - parent.width/5
    height: parent.height / 15

    color: "transparent"

    Drag.active: numberWeightDragElementMouseArea.drag.active

    src: "resource/images/" + imageName

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
        }
    }
}
