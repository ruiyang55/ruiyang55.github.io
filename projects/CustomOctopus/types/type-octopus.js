
console.log("CIRCLE")
class Octopus {
	// Create a branching system  Each branch can hold other branches
	constructor(aof) {
		
		this.aof = aof
		this.center = new Vector()

		
	}


	update(p, t, dt) {
		
	}	

	draw(p) {
		let t = p.millis()*.001

		// All values are [0,1]
		let headSize = (this.aof.get("headSize")*40) + 40
		let bounceSpeed = this.aof.get("bounceSpeed")*4 + 1
		
		let bounce = 10*Math.sin(t*bounceSpeed)

		let color = this.aof.get("color") * 360
		let strokeWeight = (this.aof.get("strokeWeight") * 10) + 1
		let height = (this.aof.get("height") * 50) + 15
		let mouthShape = (this.aof.get("mouthShape") * 10) + 1
		let eyecolor = this.aof.get("eyecolor") * 30
		let cornersright = this.aof.get("cornersright") * 20
		let cornersbottom = this.aof.get("cornersbottom") * 55
		//let headSize = this.aof.get("headSize")
		let diameter = 25 * headSize + 50
		p.push()
		p.translate(0, -headSize + bounce)

		for (var i = 0; i < 1; i++) {
			p.push()
			p.translate(20 * Math.sin(t + headSize), -i*headSize*1.6)
			p.translate(0, -100)
			//p.trangle()
			p.fill(color, 100, 50)
			p.rect(0, 0, 20, height, 20)

			p.fill(color, 100, 80)
			p.ellipse(10, -headSize*.4, headSize*.8, headSize*.6)

			p.translate(5 / 2, 5 / 2);
			p.rotate(3.14 / 3.0);
			p.fill(color, 100, 80)
			p.rect(0, 0, 20, height, 20)

			p.translate(5 / 2, 5 / 2);
			p.rotate(4.45);
			p.fill(color, 100, 80)
			p.rect(0, 0, 20, height, 20)

			p.translate(-5, -14);
			p.fill(0, 0, 0)
			p.rect(0, 0, mouthShape, 8, 20)

			p.translate(-50, -80)
			//p.translta(-60, -100)
			p.stroke("black"); 
			p.strokeWeight(strokeWeight); 		
			p.point(85, 75);
			p.point(80, 55);
			//p.point(50, 75)


			p.pop()
		}
	
		 p.pop()

	}
}






// Optional background: drawn once per population
Octopus.drawBackground = function(p) {
	p.background(190, 80, 90)
}

// Static properties for this class
Octopus.landmarks = {
	"amazing_octopus": [0.972,0.631,0.804,0.640,0.539,1.000],
	"peaceful_octopus": [0.637,0.171,0.876,0.303,0.762,0.152],
	"dull_octopus": [0.376,0.596,0.121,0.078,0.128,0.381],
	"cute_octopus": [0.558,0.270,1.000,0.859,1.000,0.730],
	"balloon_octopus": [0.000,0.399,0.593,0.354,1.000,0.000]
}
Octopus.labels = ["height", "color", "headSize", "bounceSpeed", "strokeWeight", "mouthShape"]

