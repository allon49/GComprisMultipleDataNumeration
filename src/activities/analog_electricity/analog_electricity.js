/* GCompris - analog_electricity.js
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
.pragma library
.import QtQuick 2.6 as Quick
.import 'simulation.js' as Simulation

var currentLevel = 1
var numberOfLevel
var items
var url = "qrc:/gcompris/src/activities/analog_electricity/resource/"
var toolDelete
var toolDeleteSticky
var selectedIndex
var animationInProgress
var selectedTerminal
var deletedIndex = []
var components = []
var connected = []
var determiningComponents = []
var processingAnswer

// create the json data structure for the every connections made in the same format as it is loaded by the schematic part of the external library
// The function of external library will not be called as the usable part of the schematic portion of  external library will be added to the analog.js file
// call the external library with the json created as, in the schematic part also the cktsim is loaded with the json to produce Simulation
// Example: Create the json for every componentSelected, anaylysis set to dc, the nodes and the connections point
// some help from the schematic part of the external library will be taken to convert each components to json format, how they are ordered in the json
// to be loaded to the cktsim library
// code to show a example
    var json =['r','g','l']
    var netlist = json
    var ckt = new Simulation.cktsim.Circuit(json)
//code end

var currentZoom
var maxZoom = 0.375
var minZoom = 0.125
var defaultZoom = 0.25
var zoomStep = 0.0625

var direction = {
    LEFT: -1,
    RIGHT: 1,
    UP: -2,
    DOWN: 2
}

var viewPort = {
    leftExtreme: 0,
    rightExtreme: 1,
    topExtreme: 0,
    bottomExtreme: 1,
    leftEdge: 0,
    topEdge: 0
}

function start(items_) {
    items = items_
    //library.load_netlist(netlist)
    currentLevel = 1
    numberOfLevel = items.tutorialDataset.tutorialLevels.length
    initLevel()
}

function stop() {
    for(var i = 0 ; i < components.length ; ++i) {
        var j
        for(j = 0 ; j < deletedIndex.length ; ++j) {
            if(deletedIndex[j] == i)
                break
        }
        if(j == deletedIndex.length)
            removeComponent(i)
    }
}

function initLevel() {
    items.bar.level = currentLevel
    items.availablePieces.view.currentDisplayedGroup = 0
    items.availablePieces.view.previousNavigation = 1
    items.availablePieces.view.nextNavigation = 1
    deletedIndex = []
    components = []
    connected = []
    animationInProgress = false
    toolDelete = false
    toolDeleteSticky = false
    deselect()
    updateToolTip("")
    items.availablePieces.hideToolbar()

    currentZoom = defaultZoom
    items.availablePieces.zoomInBtn.state = "canZoomIn"
    items.availablePieces.zoomOutBtn.state = "canZoomOut"
    viewPort.leftEdge = 0
    viewPort.topEdge = 0
    items.playArea.x = items.mousePan.drag.maximumX
    items.playArea.y = items.mousePan.drag.maximumY

    if (!items.isTutorialMode) {
        items.tutorialInstruction.index = -1
        loadFreeMode()
    } else {
        // load tutorial levels from dataset
        var levelProperties = items.tutorialDataset.tutorialLevels[currentLevel - 1]

        for (var i = 0; i < levelProperties.inputComponentList.length; i++) {
            var currentInputComponent = levelProperties.inputComponentList[i]
            items.availablePieces.model.append( {
               "imgName": currentInputComponent.imageName,
               "componentSrc": currentInputComponent.componentSource,
               "imgWidth": currentInputComponent.width,
               "imgHeight": currentInputComponent.height,
               "toolTipText": currentInputComponent.toolTipText
            })
        }

        for (var i = 0; i < levelProperties.playAreaComponentList.length; i++) {
            var index = components.length
            var currentPlayAreaComponent = levelProperties.playAreaComponentList[i]
            var staticElectricalComponent = Qt.createComponent("qrc:/gcompris/src/activities/analog_electricity/" + currentPlayAreaComponent.componentSource)
            components[index] = staticElectricalComponent.createObject(
                        items.playArea, {
                          "index": index,
                          "posX": levelProperties.playAreaComponentPositionX[i] * currentZoom,
                          "posY": levelProperties.playAreaComponentPositionY[i] * currentZoom,
                          "imgSrc": currentPlayAreaComponent.imageName,
                          "toolTipTxt": currentPlayAreaComponent.toolTipText,
                          "imgWidth": currentPlayAreaComponent.width * currentZoom,
                          "imgHeight": currentPlayAreaComponent.height * currentZoom,
                          "destructible": false
                        });
        }

        if (levelProperties.introMessage.length != 0) {
            items.tutorialInstruction.index = 0
            items.tutorialInstruction.intro = levelProperties.introMessage
        } else {
            items.tutorialInstruction.index = -1
        }
    }
}

function loadFreeMode() {

    var componentList = items.tutorialDataset.componentList
    for (var i = 0; i < componentList.length; i++) {
        items.availablePieces.model.append( {
            "imgName": componentList[i].imageName,
            "componentSrc": componentList[i].componentSource,
            "imgWidth": componentList[i].width,
            "imgHeight": componentList[i].height,
            "toolTipText": componentList[i].toolTipText
        })
    }
}

function checkanswer()
{
 // here the external library needs to be called
}

function zoomIn() {
    var previousZoom = currentZoom
    currentZoom += zoomStep
    if (currentZoom > maxZoom)
        currentZoom = maxZoom
    var zoomRatio = currentZoom / previousZoom
    updateComponentDimension(zoomRatio)

    if (currentZoom == maxZoom) {
        items.availablePieces.zoomInBtn.state = "cannotZoomIn"
    } else {
        items.availablePieces.zoomInBtn.state = "canZoomIn"
    }
    items.availablePieces.zoomOutBtn.state = "canZoomOut"

    if (items.zoomLvl < 0.5) {
        items.zoomLvl += 0.125
    }
}

function zoomOut() {
    var previousZoom = currentZoom
    currentZoom -= zoomStep
    if (currentZoom < minZoom)
        currentZoom = minZoom
    var zoomRatio = currentZoom / previousZoom
    updateComponentDimension(zoomRatio)

    if (currentZoom == minZoom) {
        items.availablePieces.zoomOutBtn.state = "cannotZoomOut"
    } else {
        items.availablePieces.zoomOutBtn.state = "canZoomOut"
    }
    items.availablePieces.zoomInBtn.state = "canZoomIn"

    if (items.zoomLvl > 0) {
        items.zoomLvl -= 0.125
    }
}

function updateComponentDimension(zoomRatio) {
    for (var i = 0; i < components.length; i++) {
        components[i].posX *= zoomRatio
        components[i].posY *= zoomRatio
        components[i].imgWidth *= zoomRatio
        components[i].imgHeight *= zoomRatio
    }
}

function nextLevel() {
    if(numberOfLevel < ++currentLevel) {
        currentLevel = 1
    }
    reset();
}

function previousLevel() {
    if(--currentLevel < 1) {
        currentLevel = numberOfLevel
    }
    reset();
}

function reset() {
    stop()
    items.availablePieces.model.clear()
    initLevel()
}

// Creates component from ListWidget to the drawing board area
function createComponent(x, y, componentIndex) {
    x = x / items.playArea.width
    y = y / items.playArea.height

    var index
    if(deletedIndex.length > 0) {
        index = deletedIndex[deletedIndex.length - 1]
        deletedIndex.pop()
    }
    else
        index = components.length

    var component = items.availablePieces.repeater.itemAt(componentIndex)
    var electricComponent = Qt.createComponent("qrc:/gcompris/src/activities/analog_electricity/" +
                                               component.source)

    //console.log("Error loading component:", electricComponent.errorString())
    components[index] = electricComponent.createObject(
                        items.playArea, {
                            "index": index,
                            "posX": x,
                            "posY": y,
                            "imgSrc": component.imageName,
                            "toolTipTxt": component.toolTipTxt,
                            "imgWidth": component.imageWidth * currentZoom,
                            "imgHeight": component.imageHeight * currentZoom,
                            "destructible": true
                        });

    toolDeleteSticky = false
    deselect()
    componentSelected(index)
    //updateComponent(index)
}

/* Creates wire between two terminals. Condition for creation of wire is that an input terminal
 * can only be connected to 1 wire, output terminals can be connected by any number of wires, and
 * an input terminal can be connected with an output terminal only. 'connected' variable is used
 * to make sure that an input is connected by only 1 wire.
*/
function terminalPointSelected(terminal) {
    if(selectedTerminal == -1 || selectedTerminal == terminal)
        selectedTerminal = terminal
    else if((selectedTerminal.type != terminal.type) && (selectedTerminal.parent != terminal.parent)) {
        var inTerminal = terminal.type == "In" ? terminal : selectedTerminal
        var outTerminal = terminal.type == "Out" ? terminal : selectedTerminal
        if(connected[inTerminal] == undefined || connected[inTerminal] == -1) {
            createWire(inTerminal, outTerminal, true)
        }
        deselect()
    }
    else {
        deselect()
        selectedTerminal = terminal
        terminal.selected = true
    }
}


function deselect() {
    if(toolDeleteSticky == false) {
        toolDelete = false
        items.availablePieces.toolDelete.state = "notSelected"
    }
    items.availablePieces.rotateLeft.state = "canNotBeSelected"
    items.availablePieces.rotateRight.state = "canNotBeSelected"
    items.availablePieces.info.state = "canNotBeSelected"
    items.infoTxt.visible = false
    selectedIndex = -1
    selectedTerminal = -1
    for(var i = 0 ; i < components.length ; ++i) {
        var component = components[i]
        for(var j = 0 ; j < component.noOfInputs ; ++j)
            component.inputTerminals.itemAt(j).selected = false
        for(var j = 0 ; j < component.noOfOutputs ; ++j)
            component.outputTerminals.itemAt(j).selected = false
    }
}


function componentSelected(index) {
    selectedIndex = index
    items.availablePieces.rotateLeft.state = "canBeSelected"
    items.availablePieces.rotateRight.state = "canBeSelected"
    items.availablePieces.info.state = "canBeSelected"
}

function rotateLeft() {
    components[selectedIndex].rotationAngle = -2
    components[selectedIndex].rotateComponent.start()
}

function rotateRight() {
    components[selectedIndex].rotationAngle = 2
    components[selectedIndex].rotateComponent.start()
}

function displayInfo() {
    var component = components[selectedIndex]
    var componentTruthTable = component.truthTable
    deselect()
    items.infoTxt.visible = true
    items.infoTxt.text = component.information

    if(component.infoImageSrc != undefined) {
        items.infoImage.imgVisible = true
        items.infoImage.source = url + component.infoImageSrc
    }
    else {
        items.infoImage.imgVisible = false
        items.infoImage.source = ""
    }
}

function updateToolTip(toolTipTxt) {
    items.toolTip.show(toolTipTxt)
}



//////////////////////////////////////////////////////////////////////////////
//
//  Concept to show how the external library can be used
//
//////////////////////////////////////////////////////////////////////////////

/*
   var componentsSel = []
   var connection_points = []
   var results = undefined
   var json = []
   var operating_point = undefined
   //var ckt = new cktsim.Circuit() // to load the circuit simulation library

   function componentSelected(component) { //function to be declared in analog.js
        add_component(component)
   }


   function add_components(new_c) {
   componentsSel.push[new_c]

   }


 function remove_component(c) {
        var index = this.components.indexOf(c);
        if (index != -1) this.components.splice(index,1);
    }

 function find_connections(cp) {
        return this.connection_points[cp.location];

    }

 function add_connection_point(cp) {
        var cplist = this.connection_points[cp.location];
        if (cplist) cplist.push(cp);
        else {
        cplist = [cp];
        this.connection_points[cp.location] = cplist;
        }

        return cplist;
    }

 function remove_connection_point(cp,old_location) {
        // remove cp from list at old location
        var cplist = this.connection_points[old_location];
        if (cplist) {
        var index = cplist.indexOf(cp);
        if (index != -1) {
            cplist.splice(index,1);
            // if no more connections at this location, remove
            // entry from array to keep our search time short
            if (cplist.length == 0)
            delete this.connection_points[old_location];
        }
        }
    }

  function update_connection_point(cp,old_location) {
        this.remove_connection_point(cp,old_location);
        return this.add_connection_point(cp);
    }

 function add_wire(x1,y1,x2,y2) {  //from node position x1,y1 to x2,y2
        var new_wire = new Wire(x1,y1,x2,y2);
        new_wire.add(this);
        new_wire.move_end();
        return new_wire;
    }

 function split_wire(w,cp) {
        // remove bisected wire
        w.remove();

        // add two new wires with connection point cp in the middle
        this.add_wire(w.x,w.y,cp.x,cp.y);
        this.add_wire(w.x+w.dx,w.y+w.dy,cp.x,cp.y);
    }

 function check_wires(c) {
        for (var i = 0; i < this.components.length; i++) {
        var cc = this.components[i];
        if (cc != c) {  // don't check a component against itself
            // only wires will return non-null from a bisect call
            var cp = cc.bisect(c);
            if (cp) {
            // cc is a wire bisected by connection point cp
            this.split_wire(cc,cp);
            this.redraw_background();
            }
        }
        }
    }

    // see if there are any existing connection points that bisect wire w
   function check_connection_points(w) {
        for (var locn in this.connection_points) {
        var cplist = this.connection_points[locn];
        if (cplist && w.bisect_cp(cplist[0])) {
            this.split_wire(w,cplist[0]);
            this.redraw_background();

            // stop here, new wires introduced by split will do their own checks
            return;
        }
        }
    }

    function convert_json() {
        var json = [];

        // output all the components/wires in the diagram
        var n = this.components.length;
        for (var i = 0; i < n; i++)
        json.push(this.components[i].json(i));

        // capture the current view parameters
        json.push(['view',this.origin_x,this.origin_y,this.scale,
               this.ac_npts,this.ac_fstart,this.ac_fstop,
               this.ac_source_name,this.tran_npts,this.tran_tstop,
               this.dc_max_iters]);

        return json;
    }

   function json_with_analyse() { // this function wil be used to set the default analysis to dc format json
       var json = this.json();
       json.push(['dc',this.dc_results]);
       return json;
}

 function extract_circuit() {   // this function will be used to load the cktsim library
        // give all the circuit nodes a name, extract netlist
        this.label_connection_points();
        var netlist = this.json();

        // since we've done the heavy lifting, update input field value
        // so user can grab diagram if they want
        this.input.value = JSON.stringify(netlist);

        // create a circuit from the netlist
        var ckt = new cktsim.Circuit();
        if (ckt.load_netlist(netlist))
        return ckt;
        else
        return null;
    }

 function dc_analysis() {

        var ckt = this.extract_circuit();
        if (ckt === null) return;

        // run the analysis
        this.operating_point = ckt.dc(); // here the dc analysis of the cktsim is called

        if (this.operating_point != undefined) {
        // save a copy of the results for submission
        this.dc_results = {};  // results dictionary to maintain the value at every nodes
        for (var i in this.operating_point) this.dc_results[i] = this.operating_point[i];

        }
 }

  function json(index) {  //function which would be used to convert each componenets added and their propoerties(properties means the value of teh component) to the json format of a
        this.properties['_json_'] = index; // remember where we are in the JSON list

        var props = {};
        for (var p in this.properties) props[p] = properties[p];

        var conns = [];
        for (var i = 0; i < this.connections.length; i++)
        conns.push(connections[i].json());

        var json = [type,[x, y, rotation],props,conns];
        return json;
    }






*/






















