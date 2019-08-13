
/* GCompris - NumberWeightHeaderElement.qml
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
    id: numberWeightHeaderElement
    color: "darkred"
    radius: 0.2
    z: 1

    anchors.top: parent.top

    property int lastX
    property int lastY

    property Item dragParent

    property alias textAlias: numberWeightHeaderCaption.text

    Drag.active: numberWeightHeaderElementMouseArea.drag.active
    Drag.keys: "NumberWeightHeaderKey"

    border.color: "red"
    border.width: 0

    function updateNumberWeightHeaderCaption() {
        numberWeightHeaderCaption.text = numberWeightHeadersModel.get(index).name
    }


    GCText {
        id: numberWeightHeaderCaption

        anchors.fill: parent
        anchors.topMargin: 10
        anchors.bottomMargin: 10   //find a way to fit the text without truncating it
        anchors.leftMargin: 10
        anchors.rightMargin: 10
        anchors.bottom: parent.bottom
        fontSizeMode: Text.Fit
        color: "white"
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        text: numberWeightHeadersModel.get(index).name  // here error to be corrected  TypeError: Cannot read property 'name' of undefined
        wrapMode: TextEdit.WordWrap
    }

    MouseArea {
        id: numberWeightHeaderElementMouseArea
        anchors.fill: parent

        onPressed: {
            numberWeightHeadersModel.setProperty(index,"name","?")   //?
            updateNumberWeightHeaderCaption()
        }

    }
}
