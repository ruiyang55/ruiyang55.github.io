// Represent a curve with Vectors
// Each curve point can have two control points 
// which are based on polar coordinate offsets


// Its a decorator class on Vectors

class CurvePoint {
	constructor(pt, r0=0, theta0=0, r1=0, theta1) {
		this.pt = pt

		if (theta1 === undefined)
			this.smooth = true
		else
			this.smooth = false

		this.cp = [{r:r0,theta:theta0}, {r:r1,theta:theta1}]

	}

	setTo(r0, theta0, r1, theta1) {
		// console.log("cp set")
		
		if (r0 !== undefined) {
			if (theta1 === undefined)
				this.smooth = true
			else
				this.smooth = false

			this.cp[0].r = r0
			this.cp[0].theta = theta0
			this.cp[1].r = r1
			this.cp[1].theta = this.smooth?theta0 + Math.PI:theta1
		}
	}

	get cp0() {
		let r = this.cp[0].r
		let theta = this.cp[0].theta
		return [this.pt[0] + r*Math.cos(theta), this.pt[1] + r*Math.sin(theta)]
	}
	get cp1() {
		let r = this.cp[1].r
		// Ignore the theta if we have set "smooth"
		let theta = this.smooth?this.cp[0].theta+ Math.PI:this.cp[1].theta
		return [this.pt[0] + r*Math.cos(theta), this.pt[1] + r*Math.sin(theta)]
	}

	draw(p) {
		let cp0 = this.cp0
		let cp1 = this.cp1

		p.noStroke()
		p.fill(0, 0, 0)

		p.circle(...this.pt, 5)
		p.stroke(0)
		// console.log(cp0)
		// p.text(cp0, ...this)
		p.strokeWeight(.1)
		p.line(...this.pt, ...cp0)
		p.line(...this.pt, ...cp1)
		p.fill(100, 100, 50)
		p.circle(...cp0, 3)
		p.fill(190, 100, 50)
		p.circle(...cp1, 3)
	}
}	

function bezierCurve(p, points, reverse) {
	p.vertex(...points[0].pt)
	for (var i = 1; i < points.length; i++) {
		let p0 = points[i - 1]
		let p1 = points[i]
		let cp0 = reverse?p0.cp1:p0.cp0
		let cp1 = reverse?p1.cp0:p1.cp1
		p.bezierVertex(...cp0, ...cp1, ...p1.pt)
	}
}