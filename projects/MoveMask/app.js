


// Moving noise into the global scope so its not attached to P5
let noise = () => {}
const canvasW = 700
const canvasH = 480
const dimensions = 10



let masks = {}


let SLIDER = {
	// katesUniqueEyebrow: .5,
	zoom: 0,
	color: 0.888,
	style: 0,
	hatSize: 0.75
	// voronoiLerp: .9,
	// eyebrow: .5,
	// blink: .5,
	// a: .5,
	// b: .5, 
	// c: .5
}


let controls = {

	startMask: "spring",
	paused: false,
	playingRecordedData: true,
	playingFrame: 0,
	recording: false,

	maskOffset: new Vector(0,0),
	maskZoom: 1,
}

let app = {
	
	// 
	recordingData: {hand:[],face:[]},

	// Location of the mouse
	mouse: new Vector(),


	// Store the mask instance, if its a class-based mask
	maskInstance: undefined,
	maskFxn: undefined,
	maskID: undefined,

	setMask(id) {
		console.log("Set mask", id)
		app.maskID = id
		
		app.maskInstance = undefined
		app.maskFxn = undefined
		if (typeof masks[id] === "function") {
			 if (isClass(masks[id])) {
			 	console.log("Loading Class-based mask", id)
			 	app.maskInstance = new masks[id]()
			 } else if (masks[id] !== undefined) {
			 	console.log("Loading Function-based mask", id)
			 	app.maskFxn = masks[id]
			 } 
			console.log("set to fxn")
		}
		else {
		 	console.warn("No mask named", id, " in mask list", masks)
		 }
	},


	init() {
		// Start playing test data, use the initial mask
		app.setMask(controls.startMask)
		console.log(controls.startMask)
	},


	draw(p) {
		
		p.push()
		p.translate(p.width/2, p.height/2)
		

		// Set the relative offset based on the current offset
		// console.log(app.mouse)
		let relOffset = Vector.add(controls.maskOffset, app.mouse.dragOffset)
		relOffset.mult(-1)
		controls.zoom = (SLIDER.zoom*8)**1.5 + 1

		p.scale(controls.zoom, controls.zoom)
		p.translate(...relOffset)

		let t = p.millis()*.001
		let dt = p.deltaTime*.001
		
		
		if (app.maskFxn) {
			if (!controls.paused)
				app.maskFxn(p)
		}

		if (app.maskInstance) {
			if (!controls.paused)
				app.maskInstance.update(t, dt, p.frameCount, p)	
			app.maskInstance.draw(p)	
		}
	
		
		
	},

	updateFace(p) {
		
		// Run some update code every frame

		// If we are recording, 
		//   push a copy of the current face/hand points onto the recording data
		if (controls.recording) {
			app.recordingData.face.push(face.points.map(pt => pt.slice(0)))

			let handData = hand.map(h => h.points.map(pt => pt.slice(0)))
			app.recordingData.hand.push(handData)
		} 

		// If we are *playing* recorded data, 
		//  use the current frame of the recorded data to set the hands/face
		if (controls.playingRecordedData) {
			
			if (!controls.paused && p.frameCount%3 == 1) {
				controls.playingFrame++
				// console.log(frame)
				let frame = controls.playingFrame%testFaceData.length
				let faceData = testFaceData[frame]
				face.points.forEach((pt,i) => pt.copy(faceData[i]))
				
				let handData = testHandData[frame]
				hand.forEach((h,index) => {
					h.points.forEach((pt,i) => pt.copy(handData[index][i]))
				})

				
				calculateMetaTrackingData()
			}
		} else {
			// Currently using Handsfree, its updated on its own schedule
		}
	}
}





// Setup and Vue things
document.addEventListener("DOMContentLoaded", function(){
	

	// CONTROLS
	// UI to control things *not* handled by individual AOFs
	new Vue({
		el : "#controls",
		template: `
		<div id="controls">
			<button @click="toggleHandsFree" >handsfree</button>
			<select @change="setMask">	
				<option v-for="id in Object.keys(masks)" :selected="controls.startMask==id" >{{id}}</option>
			</select>
			
			<div v-if="false" class="recordingcontrols">
			<button @click="controls.recording=!controls.recording" :class="{toggled:controls.recording}">record</button>
			<button @click="saveData()">copy</button>
			<button @click="saveHandData()">copy hands</button>
			</div>
			<table>	
				<tr v-for="(value,label in sliders">

					<td class="label">{{label}}</td>
					<td class="slider-cell">
						<div class="slider-val">{{sliders[label]}}</div>
						<input type="range" min="0" max="1" :step=".001" class="slider" v-model="sliders[label]"  />
					</td>

				</tr>
			</table>
			
		</div>`, 

		methods: {
			toggleHandsFree() {
				if (handsfree === undefined) {
					console.log("start handsfree")
					initHandsFree()
				} else {

					controls.playingRecordedData = !controls.playingRecordedData
					console.log("Set recorded Data = ", controls.playingRecordedData)
				}
				
			},
			
			setMask(ev) {
				console.log(ev.target.value)
				app.setMask(ev.target.value)
			},
			saveData() {
				let output = 'let testFaceData = ' + neatJSON(app.recordingData.face, {decimals:1})
				console.log(output)
				navigator.clipboard.writeText(output);
			},
			saveHandData() {
				let output = 'let testHandData = ' + neatJSON(app.recordingData.hand, {decimals:1})
				console.log(output)
				navigator.clipboard.writeText(output);
			}
		},
		computed: {
		},
		data() {
			return {
				sliders: SLIDER,
				controls: controls,
				masks: masks,
			}
		}
	})

	// P5
	new Vue({
		el : "#app",
		template: `<div id="app">
			<div id="p5-holder" ref="p5"></div>

		</div>`,


		mounted() {
			app.p5 = new p5((p) => {
				// Save the noise fxn
				noise = p.noise
				// Save a mouse position
				
				
				// Basic P5 setup
				p.setup = () => {
					p.createCanvas(canvasW, canvasH)
					p.colorMode(p.HSL)
					p.ellipseMode(p.RADIUS)
				}

				//-------------------------------------------
				// Mouse things

				app.mouse.dragStart = new Vector(0,0)
				app.mouse.dragOffset = new Vector(0,0)


				// Utility fxn to test if mouse in p5
				function mouseInP5() {
					return p.mouseX > 0 && p.mouseX < canvasW && p.mouseY > 0 && p.mouseY < canvasH
				}

				p.mousePressed = () => {
					if (mouseInP5()) {
						app.mouse.dragging = true
						app.mouse.dragStart.setTo(p.mouseX, p.mouseY)
					}
				}
				p.mouseReleased = () => {
					// Stopped dragging? Update the offset
					app.mouse.dragging = false
					controls.maskOffset[0] += app.mouse.dragOffset[0]
					controls.maskOffset[1] += app.mouse.dragOffset[1]
					app.mouse.dragOffset.setTo(0, 0)
				}
				
				p.mouseMoved = () => { app.mouse.setTo(p.mouseX, p.mouseY) }
				p.mouseDragged = () => {
					app.mouse.setTo(p.mouseX, p.mouseY)
					if (app.mouse.dragging) {
						app.mouse.dragOffset.setToDifference(app.mouse.dragStart, app.mouse)
				
					}
				}
				p.doubleClicked = () => {}

				p.mouseClicked = () => {}

				//-------------------------------------------
				// Draw

				let recordedFrame = 0
				p.draw = () => {
					
					app.updateFace(p)
					app.draw(p)
					
				}

			}, this.$refs.p5)


			app.init()
		},
		
		data() {
			return {
				output: "",

			}
		}
		
	}) 
})

//============
// Utilities
// Returns a value between 0 and 1, but never reaching either

// https://zaiste.net/posts/javascript-class-function/
function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}

function sigmoid(v) {
	return 1 / (1 + Math.pow(Math.E, -v));
}

function unitSigmoid(v, range=1) {
	return 1 / (1 + Math.pow(Math.E, -range*(v - .5)));
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


document.addEventListener('keyup', function(e){
	
	console.log(e)
	if (e.key === "Shift") {
		// Clear all the shift-selected
		app.shiftDown = false
		// Vue.set(app, "shiftSelected", [])
	}
});  

document.addEventListener('keydown', function(e){
	if (e.key === "Shift") {
		app.shiftDown = true
		Vue.set(app, "shiftSelected", [])
	}
	if (e.code === "Space") {
		controls.paused = !controls.paused
		console.log("paused", controls.paused)
	}
});
