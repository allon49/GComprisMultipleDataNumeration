/* GCompris - Dataset.qml
 *
 * Copyright (C) 2019 Deepak Kumar <deepakdk2431@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <https://www.gnu.org/licenses/>.
*/
import QtQuick 2.6

QtObject {
    property var bulb: {
        'imageName': 'bulb1.png',
        'componentSource': 'Bulb.qml',
        'width': 0.4,
        'height': 0.4,
        'toolTipText': qsTr("Bulb")
    }
    property var battery: {
        'imageName': 'battery.png',
        'componentSource': 'Battery.qml',
        'width': 0.4,
        'height': 0.4,
        'toolTipText': qsTr("Battery")
    }
    // List of all components
    property var componentList: [bulb, battery]
    // tutorial levels
    property var tutorialLevels: [
        // level 1
        {
            inputComponentList: [battery, bulb],
            playAreaComponentList: [battery],
            playAreaComponentPositionX: [0.4],
            playAreaComponentPositionY: [0.3],
            introMessage: [
                qsTr("The bulb will glow when both of its terminal is connected to the battery.")
            ]
        }
    ]

}
