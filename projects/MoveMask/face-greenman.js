
let fingerTrails = [[[],[],[],[],[]], [[],[],[],[],[]]]


class GreenMan {
	constructor() {
		// get the element of the "app" div
		let el = document.getElementById("app")
		// Set the background image and how big it is
		el.style.backgroundImage = "url('ireland.jpg')";
		el.style.backgroundSize = "cover"

		// Make a lot of leaves

		console.log("Start greenman")


		this.leafSides = face.sides.map(side => {
			let leaves = []
			side.faceRings.forEach((ring, ringIndex) => {
				ring.forEach((pt, ptIndex) => {

					if (ptIndex%3 == ringIndex ) {
						let leaf = new GreenManLeaf(pt, face.centerLine[8], .3+ 1-ringIndex/side.faceRings.length, 1.5  - .5*ringIndex)
						leaves.push(leaf)
					}
						
				})
				
			})

			side.eyeRings[2].forEach((pt, ptIndex) => {

					if (ptIndex%3 == 0 ) {
	 					let leaf = new GreenManLeaf(pt, side.eye, 1, 0)
						leaves.push(leaf)
					}
						
			})
			return leaves
 		})


	}

	update(t, dt) {

		this.leafSides.forEach(leafSide => leafSide.forEach(leaf => {
			leaf.update(t, dt)
		}))
	}

	draw(p, t) {

		p.clear()
	
		// console.log("greenman!")
		p.noStroke()
		p.fill(0)
		// drawTestFacePoints(p)
		face.points.forEach((pt, ptIndex) => {
			if (ptIndex % 3 == 0) {
				p.fill(120 + 40*Math.sin(ptIndex), 100, 50 + 40*Math.sin(ptIndex*3), .2)
				pt.draw(p, 10)
			}
		})

		face.sides.forEach(side => {
			p.fill(120, 100, 50, .3)
			drawContour(p, side.faceRings[0].concat(face.centerLine.slice(0, 20).reverse()))
			p.fill(0)
			drawContour(p, side.eyeRings[3])
			p.fill(12)
			drawContour(p, side.eyeRings[4])
		})

		p.fill(0, 0, 0, .4)
 		drawContour(p, face.mouth[3])
		
		this.leafSides.forEach(leafSide => leafSide.forEach(leaf => {
			leaf.draw(p, t)
		}))


		hand.forEach(h => h.fingers.forEach((finger,fingerIndex) => {
			finger.forEach((pt, ptIndex) => {
				p.fill(120 + 40*Math.sin(ptIndex + fingerIndex), 100, 50 + 40*Math.sin(ptIndex*3), .5)
				pt.draw(p, 6 + 5*Math.sin(ptIndex*3 + t))
			})

			p.stroke(120 + 40*Math.sin(fingerIndex), 100, 50 + 40*Math.sin(fingerIndex*3), .5)
			p.fill(120 + 40*Math.sin(fingerIndex), 100, 50 + 40*Math.sin(fingerIndex*3), .5)
			p.beginShape()

			h.wrist.vertex(p)
			finger.forEach((pt, ptIndex) => {
				pt.curveVertex(p)
			})
			p.endShape()

		}))
	}


}

masks.greenMan = GreenMan
let leafCount = 0

class GreenManLeaf {
	constructor(pt0, pt1, scale, shade) {
		this.shade = shade
		this.scale = scale
	
		this.pt0 = pt1
		this.pt1 = new Vector()
		this.root = new Vector()
		this.end = new Vector()
		this.target = pt0

		this.dna = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
	
		this.e = new Vector()
		this.n = new Vector()
		this.idNumber = leafCount++

		let crownCount = 4*Math.ceil(Math.random()*2) + 1
		this.crown = []

		for (var i = 0; i < crownCount; i++) {
			let v = new Vector()
			v.h = [new Vector.Handle(v), new Vector.Handle(v)]
			v.pct = crownCount===1?0:(i/(crownCount - 1))*2 - 1
			this.crown.push(v)
		}
		this.innerHandles = [new Vector.Handle(this.root), new Vector.Handle(this.root)]
	}

	update(t, dt) {
		let dna = this.dna
		// this.anchorOuter.setToLerp(this.a)
		this.pt1.setToLerp(this.target, this.pt1, .8)

		this.root.copy(this.target)
		this.end.setToLerp(this.pt0, this.pt1, 1.5)
		
		this.e.setToDifference(this.root, this.end)

		this.n.setToNormal(this.e)
 
		let theta = this.e.angle + Math.PI
		let m = Math.min(100, 10*Math.pow(this.e.magnitude, .5))*this.scale

		let spread = 1.5 + .5*Math.sin(this.idNumber * 4 + t)
		let length = .4*m*(this.scale + .3) + (1 + .2*Math.sin(this.idNumber*3))
		let leafDip= Math.PI + -2*dna[0]
		let leafDipLength= length*.2 + (1 + 3*dna[2])
		let leafWidth = SLIDER.a

		// Set the crown
		this.crown.forEach((v, vIndex) => {
			let crownTheta = theta + v.pct*spread
			let r = length
			let dip = leafDipLength
			if (vIndex%2 === 1) {
				r = length*.5
				dip *= 1
			} 

			r *= 1

			let stretch = .2 + .3*Math.sin(this.idNumber + t)
			dip += -3*stretch

			v.setToPolarOffset(this.root, r, crownTheta)
			v.addMultiples(this.e, -stretch*(1 - Math.abs(v.pct)))
			v.h.forEach((h,hIndex) => h.setToHandle(dip, crownTheta + Math.PI +  -leafDip*(hIndex - .5)))
			
		})

		this.innerHandles.forEach((h,hIndex) => h.setToHandle(length*leafWidth, theta + Math.PI + -1.8*(hIndex - .5)))
		
	}

	draw(p, t) {

		let hue = 40*Math.sin(this.idNumber) + 130
		let theta = this.e.angle
		let m = this.e.magnitude
		
		
	
		let lastCP = this.innerHandles[0]
		let last = this.innerHandles[0]


		p.fill(0)
		// this.pt0.draw(p,)
		// this.pt1.draw(p)
		
		
		
		for (var i = 0; i < this.crown.length; i++) {

			p.fill(hue + i, 100, 50 + 20*Math.sin(this.idNumber*3 + theta*4 + i) - 20*this.shade, .7 + .3*Math.sin(i))
			p.noStroke()
			// p.stroke(hue, 100, 40)
			let c0 = this.crown[i]
			let c1 = this.crown[i + 1]
			p.beginShape()
			this.root.vertex(p)
			if (i == 0)
				c0.bezierVertex(p, this.innerHandles[0], c0.h[0])
			else
				c0.vertex(p)

			if (c1) 
				c1.bezierVertex(p, c0.h[1], c1.h[0])
			else 
				this.root.bezierVertex(p, c0.h[1], this.innerHandles[1])
			
			p.endShape()
		}
		
		
		
	}
}