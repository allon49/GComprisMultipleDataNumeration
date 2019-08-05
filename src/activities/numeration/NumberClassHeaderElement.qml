 
/* GCompris - NumberClassHeaderElement.qml
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


Component {
    id: nnumberClassHeaderElement

    MouseArea {
        id: dragArea

        property bool held: false

        anchors { top: parent.top; bottom: parent.bottom }

        width: mainZoneArea.width / numberClassListModel.count
        height: mainZoneArea.height / 2


        drag.target: held ? content : undefined

        onPressAndHold: held = true
        onReleased: held = false

        Rectangle {
            id: content

            anchors {
                horizontalCenter: parent.horizontalCenter
                verticalCenter: parent.verticalCenter
            }

            width: dragArea.width;
            height: parent.height

            border.width: 1
            border.color: "lightsteelblue"

            color: dragArea.held ? "lightsteelblue" : "white"
            Behavior on color { ColorAnimation { duration: 100 } }

            radius: 2

            Drag.active: dragArea.held
            Drag.source: dragArea
            Drag.hotSpot.x: width / 2
            Drag.hotSpot.y: height / 2

            states: State {
                when: dragArea.held

                ParentChange { target: content; parent: root }
                AnchorChanges {
                    target: content
                    anchors { horizontalCenter: undefined; verticalCenter: undefined }
                }
            }

            GCText {
                id: numberClassHeaderCaption

                anchors.fill: parent
                anchors.bottom: parent.bottom
                fontSizeMode: Text.Fit
                color: "black"
                verticalAlignment: Text.AlignVCenter
                horizontalAlignment: Text.AlignHCenter
                text: numberClassListModel.get(index).name
                z: 100
            }

        }

        DropArea {
            anchors { fill: parent; margins: 10 }

            onEntered: {
                numberClassListModel.move(
                            drag.source.DelegateModel.itemsIndex,
                            dragArea.DelegateModel.itemsIndex,1)
            }
        }
    }
}


