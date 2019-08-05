/* GCompris - ActivityInfo.qml
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
import GCompris 1.0

ActivityInfo {
  name: "analog_electricity/Analog_electricity.qml"
  difficulty: 1
  icon: "analog_electricity/analog_electricity.svg"
  author: "Deepak Kumar &lt;deepakdk2431@gmail.com&gt;"
  demo: true
  //: Activity title
  title: qsTr("Analog electricity")
  //: Help title
  description: qsTr("Create and simulate an electric schema.")
  //intro: "put here in comment the text for the intro voice"
  //: Help goal
  goal: qsTr("Freely create an electric schema with a real time simulation of it.")
  //: Help prerequisite
  prerequisite: qsTr("Requires some basic understanding of the concept of electricity.")
  //: Help manual
  manual: qsTr("Drag electrical components from the selector and drop them in the working area. Create wires by clicking on a connection spot, dragging the mouse to the next connection spot, and letting go. You can also move components by dragging them. You can delete wires by clicking on them. To delete a component, select the deletion tool on top of the component selector. You can click on the switch to open and close it. You can change the rheostat value by dragging its wiper. In order to simulate what happens when a bulb is blown, you can blown it by right-clicking on it. The simulation is updated in real time by any user action.")
  credit: ""
  section: "experimental"
  createdInVersion: 9000
}
