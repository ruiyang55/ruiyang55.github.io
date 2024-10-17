
// Track the last mouse
let lastMouse = undefined
let mouse = new Vector(0,0)

// We can also store the last N points
let trailPoints = []
let trailPointMax = 200

// How big do you want the canvas?
let canvasSize = [600, 400]

// You can also track how long the user has been drawing
let lastPenDownTime = 0
let distanceTravelled = 0


// Which mode and color do we start with?
// You may want to change these starting values
let tool = {
	color0: [137, 207, 240],
	color1: [240, 255, 255],
	color2: [204, 204, 255],
	size: 30,
	mode: "oil",

	clearCanvas(p) {
		p.background(218, 247, 166)
	},

	rainbowClearCanvas(p) {
		for (var i = 0; i < 100; i++) {
			// Pastellish, transluscent
			p.fill(Math.random()*260, 100, Math.random()*50 + 50, .1)
			p.circle(Math.random()*p.width, Math.random()*p.height, 100 + 200*Math.random())
			p.circle(Math.random()*p.width, Math.random()*p.height, 100 + 200*Math.random())
		}
	}
}


let tools = {

	oil(p, size, color2, color3) {

		let time = p.millis() - lastPenDownTime

		for (var i = 0; i < trailPoints.length; i++) {
			let pct = i / trailPoints.length
			let point = trailPoints[i]
			p.fill((time * .2) % 360, 2000, 55, pct)
			p.circle(...point, 50 * pct)
		}

		for (var i = 0; i < trailPoints.length; i++) {
			let pct = i / trailPoints.length
			let point = trailPoints[i]
			let r = 100 * pct
			let theta = time * .1
			p.fill(204, 204, 255, .8)
			p.circle(...point.clonePolarOffset(r, theta), 10)
		}
	},

	tree(p, size, color0, color1) {

		let mouse = new Vector()

		let emojiOptions = ["🌲","🌿","🥬","🥬","🌿","🌲"]
		
		let index = Math.floor(emojiOptions.length*Math.random())
		let emoji = emojiOptions[index]
		
		let x = p.mouseX
		let y = p.mouseY

		x += 50*size*(Math.random() - .5)
		y += 50*size*(Math.random() - .5)

		p.textSize(Math.sqrt(size)*40)

		if (Math.random() < .5)
			p.text(emoji, x, y)
	},

	epiphany(p, size, color0, color1, drawCount) {
		let time = p.millis() - lastPenDownTime

		if (Math.random() < .1)
			p.background(255, 195, 0 , .06)
		
		let lineColor = color1.slice()

		lineColor[2] += (Math.random() - .5)*40
		let pastelShift = p.noise(time*4) - .5
		lineColor[2] += (pastelShift)*180

		p.noFill()
		p.stroke(...lineColor, .5*Math.random())
		
		size += 12*p.noise(time*.5)
		
		let jump = 30
		let count = 16
		
		p.beginShape()
		for (var i = 0; i < count; i++) {
			let index = trailPoints.length - 50 - i*jump

			if (index > 0) {
				let pos = trailPoints[index].slice()
				p.curveVertex(...pos)
			}

			p.endShape()
		}
	},

}