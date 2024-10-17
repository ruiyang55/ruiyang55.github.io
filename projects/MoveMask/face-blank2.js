
class Blank2 {
	constructor() {

		this.bobbles = []
		for (var i = 0; i < 15; i++) {
			this.bobbles[i] = new Vector(0, 0)

		}

	}

	update(t, dt, p) {

	}

	draw(p) {
		let t = p.millis()*.001

		// Make a white background
		p.background(160, 70, 70, 1)

		// You can draw things in the background
		p.stroke(0)
		p.noFill()
		p.circle(0, 0, 300)

		// You can also draw things that are attached to the face
		p.circle(...face.center, 20)
		
		
		
		// // Get the two side contours of the face
		let sideContours = face.sides.map(side => {
			return side.faceRings[0]
		})
		
		// Join them together into a single continous contour
		let faceContour = joinSides(...sideContours)
		let weight = SLIDER.b*10 + 1
		let lightness = SLIDER.a*60 + 20
		let hue = SLIDER.c*360
	p.stroke(hue, 100, lightness)

	p.strokeWeight(weight)
	p.fill(160, 70, 40)

	// // Drawing contours is your most basic tool
	// // A contour is an array of vectors (usually face points)
	// // You can draw it smooth or normal, closed or open
	drawSmoothContour(p, faceContour, true)

	// // Each face has a single center line
	// drawContour(p, face.centerLine, false)


	let pts = []
	hand.forEach(hand => {
		// hand.fingers.forEach(finger => {
		// 	let extraFinger = new Vector(0,0)
		// 	extraFinger.setToLerp(finger[2], finger[3], 2.5)
			
		// 	finger.forEach(pt => {
		// 		p.noStroke()
		// 		p.fill(0)

		// 		p.circle(...pt, 10)


		// 	})

		// 	p.fill(10, 100, 50)
		// 	p.circle(...extraFinger, 10)

		// 	p.stroke(0, 0, 0, .4)
		// 	p.strokeWeight(10)
		// 	p.noFill()
		// 	// Make a copy
		// 	let finger2  = finger.slice(0, 4)
		// 	finger2.push(extraFinger)

		// 	pts = pts.concat(finger2)
		// 	drawContour(p, finger2)


		// })
	})

	face.sideOrder.forEach(side => {


		side.faceRings.forEach((ring,index) => {
			p.fill(160 + 20*index, 70, 50)
			drawContour(p, ring)
		})

		let earPosition = side.ear[0]
		// p.circle(...earPosition, 20)
		// p.textAlign(p.CENTER)

		// p.textSize(200)

		// // For each side
		
		// // We can take slices of the contours to only draw part of them
		// // drawContour(p, side.nose[0].slice(-8), false)

		p.strokeWeight(1)
		p.noFill()
		drawSmoothContour(p, side.eyeRings[1], true)
		
		p.fill(140, 100, 50)
		side.eyeRings[1].forEach(pt => p.circle(...pt, 5))

		p.fill(190, 100, 50)
		side.eyeRings[0].forEach(pt => p.circle(...pt, 5))

		let eyeRing0 =side.eyeRings[0]
		let eyeRing1 =side.eyeRings[1]
		// let maxCount = Math.min(eyeRing0.length, eyeRing1.length)
		for (var i = 0; i < this.bobbles.length; i++) {
			let p0 = eyeRing0[i]
			let p1 = eyeRing1[i]

			p.fill(140, 100, 50)
			p.circle(...p0, 5)
			p.fill(190, 100, 50)
			p.circle(...p1, 3)

			p.line(...p0, ...p1)

			
			let b = this.bobbles[i]
			// Where b wants to be
			// let b2 = new Vector(0, 0)
			b.setToLerp(p0, p1, -2.5*SLIDER.a + 2*Math.sin(t*2))


			// p.fill(10, 100, 0)
			// p.circle(...b2, 3)


			p.fill(10, 100, 50)
			p.circle(...b, 5)
			
			p.line(...p0, ...b)

		
		}

		// let faceOutline = side.faceRings[0]
		// side.faceRings[0].forEach((point, index) => {
		// 	p.textSize(40 + 10*Math.sin(index))
		// 	p.text("🎮",...point)
		// })


		drawContour(p, side.eyeRings[4])
		p.fill(0)
			p.circle(...side.eye, 5)


	})

	drawContour(p, face.mouth[3])
	

	// let pts = 
	// let pts  = this.bobbles

	for (var i = 0; i < 30; i++) {
		let pt = Vector.polar(100 + i*30, i)
		pts.push(pt)
	}
	// const delaunay = Delaunator.from(pts);

	// forEachVoronoiCell(pts, delaunay, (centerIndex, verts) => {
	// 	p.stroke(0)
	// 	p.noFill()
	// 	drawContour(p, verts)
	// })

		
	
	// drawContour(p, face.mouth[4], true)

	// // Draw the test hand and 
	// drawTestFacePoints(p)
	// drawTestHandPoints(p)
	}
}

masks.blank2 = Blank2