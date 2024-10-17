

class Eye {
	constructor(face, side) {
		this.face = face
		this.side = side
		this.center = new Vector(0,0)

		this.inner = new Vector(0,0)
		this.outer = new Vector(0,0)
		this.lid = [
			[new CurvePoint(this.inner, 0, 10, 30), new CurvePoint(this.outer, 30, 10, 0)],
			// [new CurvePoint(this.inner, 0, 10, 30), new CurvePoint(this.outer, 30, 10, 0)]
			]

	}


	draw(p) {
		let t = p.millis()*.001
		let id = this.face.aof.idNumber*20
		// Get eye angle things
		let eyeSize = this.face.faceSize*.3
		let eyeAngle = this.face.aof.get("eyeAngle") - .4
		let eyeColor = this.face.aof.get("eyeColor")

		this.inner.setToPolar(eyeSize, eyeAngle)
		this.outer.setToPolar(eyeSize, eyeAngle + Math.PI)


		
		this.inner[0]*= this.side
		this.outer[0]*= this.side

		let centerAngle = this.side*Math.PI/2 + Math.PI/2 + this.side*eyeAngle
		let lidAngle = centerAngle + Math.PI/2*this.side

		let blink = Math.abs(Math.sin(t + id))
		let lidAngle1 = 2*this.side*noise(id + t*.5 + 100*this.side)*blink
		let lidAngle2 = 2*this.side*noise(id + t*.5 + 100*this.side)*blink
		this.lid[0][0].setTo(eyeSize*.8, centerAngle + lidAngle1,  
							 eyeSize*1.4, lidAngle)
		this.lid[0][1].setTo(eyeSize*1.4, lidAngle, 
							 eyeSize*.8, centerAngle + Math.PI  + -lidAngle2)

		let skin = this.face.skinBase
		p.push()
		p.translate(...this.center)
		
		p.noStroke()
		p.fill(skin[0], skin[1], skin[2] *.7 )
		p.ellipse(0, 0, eyeSize*1.2, eyeSize*1.4)


		p.fill(100)
		p.circle(0, 0, eyeSize)


		// Iris
		p.push()
		p.translate((p.noise(t*.7 + id, this.side*10) - .5)*eyeSize, 0)
		let irisCount = 4
		for (var i = 0; i < irisCount; i++) {
			let pct = 1 - i/irisCount
			// p.fill(eyeColor*360, 100, 80 - pct*50)
			// p.circle(0, 0, eyeSize*.8*(pct**.3))
		}

		p.fill(0)
		p.circle(0, 0, eyeSize*.4)

		p.fill(100, 0, 100, .5)
		p.circle(0, -eyeSize*.3, eyeSize*.3)
		p.circle(0, -eyeSize*.3, eyeSize*.2)

		p.pop()


		

		
		p.beginShape()
		p.noStroke()
		p.fill(skin[0], skin[1], skin[2] *.7 )
		bezierCurve(p, this.lid[0], true)
		bezierCurve(p, [this.lid[0][1], this.lid[0][0]], true)
		
		p.endShape()

		p.stroke(0)
		p.strokeWeight(3)
		p.noFill()
		p.beginShape()
		bezierCurve(p, [this.lid[0][1], this.lid[0][0]], true)
		
		p.endShape()
			
			// Debug draw 
		// this.lid[0].forEach(pt => pt.draw(p))
		p.pop()


	}
}
class Face {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof
		this.center = new Vector()

		this.eyes = [new Eye(this, -1), new Eye(this, 1)]

		this.curve = []
		for (var i = 0; i < 4; i++) {
			// Create a new curve point for the face
			let cv = new CurvePoint(new Vector(0,0), 30, 10, 30)
			this.curve.push(cv)
		}
		this.skinBase = new Vector(0, 0, 0);

		[this.chin,this.jaw,this.cheek,this.forehead] = this.curve

		this.faceSize = 700/(10 + .5*controls.count)
		// console.log(controls.count, this.faceSize)
	}


	update(p, t, dt) {

		this.skinBase.setTo((this.aof.get("hue")*17 + 379)%360,
			20 + 86*this.aof.get("shade"),
			30 + 68*this.aof.get("shade"))
		
		let aspect = this.aof.get("aspect")*.3 + .7
		let w = this.faceSize*aspect
		let h = this.faceSize/aspect

		let jawHeight = this.aof.get("jaw")
		let chinAngle = this.aof.get("chin")
		let chinWidth = this.aof.get("chinWidth") + .1
		let cheekAngle = 1.5*this.aof.get("cheekAngle") - .9

		// Position the face vertices
		this.chin.pt.setTo(0, h)
		this.chin.setTo(w*.5*chinWidth, 0, 0)
		
		this.jaw.pt.setTo(w, h*(.6 - .4*jawHeight + chinAngle*.2))
		this.jaw.setTo(h*.1, -Math.PI*.5 + chinAngle, h*(.4 + .3*chinAngle))
		
		this.cheek.pt.setTo(w*1.1, -h*.2)
		this.cheek.setTo(h*.4, -Math.PI*.5 + cheekAngle, h*.2)
		
		this.forehead.pt.setTo(0, -h)
		this.forehead.setTo(0, Math.PI, w)

		let eyeW = w*.7
		let eyeH = h*-.1
		this.eyes[0].center.setTo(eyeW, eyeH)
		this.eyes[1].center.setTo(-eyeW, eyeH)
	}	

	draw(p) {
		p.push()
		p.translate(0, -this.faceSize - 100)

		//Debug draw the face
		this.curve.forEach(cv => cv.draw(p))
		p.noFill()
		p.stroke(0)
		p.strokeWeight(1)

		

		// Draw the face outline
		p.noStroke()
		let count = 3
		for (var i = 0; i < count; i++) {
			p.push()
			p.scale(1 - i*.1)
			// p.stroke(0)
			p.fill(this.skinBase[0], this.skinBase[1], this.skinBase[2] - 20*(1 - i/count))
		
			p.beginShape()
			bezierCurve(p, this.curve)
			p.endShape()
			p.push()
			p.scale(-1, 1)
			p.beginShape()
			bezierCurve(p, this.curve)
			p.endShape()
			p.pop()
			p.pop()
		}
		

		this.eyes.forEach(eye => eye.draw(p))


		p.pop()
	}
}






// Optional background: drawn once per population
Face.drawBackground = function(p) {
	p.background(190, 80, 90)
}

// Static properties for this class
Face.landmarks = {
	"christine": [0.24,0.86,0.47,0.81,0.44,0.31,0.01],
	"herbert": [0.80,0.00,0.00,0.86,0.93,0.94,0.84],
	"sharon": [0.98,0.39,0.15,0.89,0.74,0.44,0.49],
	"carlos": [0.88,0.60,0.24,0.44,0.44,0.70,0.53],
	"tyler": [0.67,0.16,1.00,0.81,0.21,0.00,0.01]
}
Face.labels = ["chin", "jaw", "chinWidth", "cheekAngle", "hue", "shade", "aspect", "eyeAngle", "eyeColor"]

