

class Fish {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof
		this.center = new Vector()
	}


	update(t, dt) {
		// No update needed here
		// Updates are good for if you want to maintain more complicated state 
	}

	draw(p) {
		let t = p.millis()*.001

		p.push()
		// Move the fish around a bit
		p.translate(0, -200*p.noise(.2*t + this.id))
		p.rotate(1*p.noise(.3*t + this.id) - .5)

		
		let fishSize = this.aof.get("size")*20 + 10
		

		let pointCount = this.aof.get("complexity")*20 + 3
		

		let deformation = this.aof.get("deformation")

		let hue = this.aof.get("hue")
		let hueOffset = this.aof.get("hueOffset") - .5

		// Make the point on the body
		let bodyPoint = (r, theta, index) => {
			// Make every other point lumpy

			r *= 1+this.aof.get("lumps")*(index%2)
			let bp = Vector.polar(r, theta)
						
			// Use noise to offset each point
			let defR =  .2*r*this.aof.get("deformation")
			let scale = .1
			let defTheta =  20*p.noise((bp[0]*scale, bp[1]*scale +  t*.3))
			

			// Sweep the body back
			bp[0] += 1.5*this.aof.get("streamline")*Math.abs(bp[1])
			bp.addPolar(defR, defTheta)
			return bp
		}

		// Draw a blobby shape, actually draw 3 shapes on top of each other
		for (var i = 0; i < 3; i++) {
			let size = fishSize*(1 - i*.2)
			p.fill(((hue + .2*i*hueOffset)%1)*360, 100, 50 - i*10, 1)
			p.beginShape()
			for (var j = 0; j < pointCount + 2; j++) {
				
				// get the point on this body
				let theta = j*Math.PI*2/pointCount
				let bp = bodyPoint(size, theta, j)
				p.curveVertex(...bp)

			}

			p.endShape()
		}
		


		// Draw an eye
		
		p.push()
		p.translate(-fishSize*.5, -fishSize*.2)
		p.fill(0)
		p.circle(0,0, 4)
		p.fill(80)
		p.circle(1,1.8, 1)
		p.fill(100)
		p.circle(.5,-1.5, 2)
		p.pop()

		p.pop()
	}
}

// Optional background: drawn once per population
// Fish.drawBackground = function(p) {
// 	p.background(190, 80, 90)
// }

// Static properties for this class
Fish.landmarks = {
	"palm": [0.4, 0.5, 0.1, 0.5],
	"pine": [0.4, 0.5, 0.1, 0.5],
	"oak": [0.4, 0.5, 0.1, 0.5],
	"willow": [0.4, 0.5, 0.1, 0.5]
}
Fish.labels = ["streamline", "size", "hue", "hueOffset", "lumps", "complexity", "deformation"]

