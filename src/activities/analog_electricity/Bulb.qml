/* GCompris - Bulb.qml
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
import GCompris 1.0
import "analog_electricity.js" as Activity

ElectricalComponent {
    id: digitalLight
    terminalSize: 0.1
    noOfNodes: 2
    property var positionX: [0.8, 0.2]

    information: qsTr("A light bulb is a device that produces light from electricity.")


    property alias nodes: nodes

    Repeater {
        id: nodes
        model: 2
        delegate: node
        Component {
            id: node
            TerminalPoint {
                posX: positionX[index]
                posY: 1.0
                type: "Out"
            }
        }
    }

}
