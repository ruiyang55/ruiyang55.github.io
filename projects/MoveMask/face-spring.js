
masks.spring = function( p) {
	// Make a white background
	p.background(255, 250, 205, 0.4)

	// You can draw things in the background
	p.stroke(0)
	p.noFill()
	p.circle(0, 0, 300)

	// You can also draw things that are attached to the face
	// p.circle(...face.center, 20)
	
	// p.fill(0, 100, 50)
	// p.circle(...face.noseTip, 20)
	
	// // Get the two side contours of the face
	let sideContours = face.sides.map(side => {
		return side.faceRings[0]
	})
	
	// Join them together into a single continous contour
	let faceContour = joinSides(...sideContours)
	let weight = 0.1//SLIDER.b*10 + 1
	let lightness = 100//SLIDER.a*60 + 20
	let hue = SLIDER.c*360
	p.stroke(hue, 100, lightness)

	p.strokeWeight(weight)
	// p.fill(160, 70, 40)

	// // Drawing contours is your most basic tool
	// // A contour is an array of vectors (usually face points)
	// // You can draw it smooth or normal, closed or open
	drawSmoothContour(p, faceContour, true)

	// // Each face has a single center line
	// drawContour(p, face.centerLine, false)

	face.sides.forEach(side => {
		let earPosition = side.ear[0]
		p.circle(...earPosition, 20)
		p.textAlign(p.CENTER)

		p.textSize(200 * SLIDER.hatSize)
		p.text("👒",...earPosition)
		
		// For each side
		
		// We can take slices of the contours to only draw part of them
		// drawContour(p, side.nose[0].slice(-8), false)

		// drawContour(p, side.eyeRings[1].slice(2,8), false)
		side.faceRings.forEach((ring,index) => {
			p.fill(10 + 100 * SLIDER.color, 70, 50)
			 drawContour(p, ring)
			p.fill(10 + 100 * index, 70, 50)
		})
		let faceOutline = side.faceRings[0]
		side.faceRings[0].forEach((point, index) => {
			 p.textSize(40 + 10*Math.sin(index))
			let style = ["🌹", "🍏", "💎", "🌺", "🌱", "😊", "👑", "📀", "🍍", "🔥","🌙"]
			p.text(style[Math.round(10*SLIDER.style)],...point)
		})
		
		p.fill(255, 255, 255)
		drawContour(p, side.eyeRings[1], true)
		p.fill(0, 0, 0)
		drawContour(p, side.eyeRings[4], true)
	})

	//drawSmoothContour(p, faceContour, true)
	
	hand.forEach(hand => {
		hand.fingers.forEach(finger => {
			p.beginShape();
			finger.forEach(pt => {
				p.vertex(...pt);
			})
			p.endShape();
		})
		// p.fill(31,100,96)
		p.beginShape();
		p.fill(245, 122, 100 * SLIDER.color)
		p.vertex(...hand.points[17])
		p.vertex(...hand.points[13])
		p.vertex(...hand.points[9])
		p.vertex(...hand.points[5])
		p.vertex(...hand.points[1])
		p.vertex(hand.points[17][0], hand.points[1][1]);
		p.endShape(p.CLOSE);
	})

	let noseHoleLeft = []
	let noseLeftIndices = [360, 440, 438, 279]
	noseLeftIndices.forEach((i) => { noseHoleLeft.push(face.points[i]) })
	p.fill(0, 0, 100 * SLIDER.color)
	drawSmoothContour(p, noseHoleLeft, true)

	let noseHoleRight = []
	let noseRightIndices = [131, 49, 218, 220]
	noseRightIndices.forEach((i) => { noseHoleRight.push(face.points[i]) })
	p.fill(0, 0, 100 * SLIDER.color)
	drawSmoothContour(p, noseHoleRight, true)

	p.fill(255, 127, 100 * SLIDER.color)
	drawContour(p, face.mouth[4], true)
	

	// // Draw the test hand and 
	// drawTestFacePoints(p)
	// drawTestHandPoints(p)
}
