curveCount = 4

function drawCurves(p) {
	curvePoints.forEach(pt => {
		drawPoint(p, pt)
	})


	let t2 = p.millis()*.001%1

	// for (var i = 0; i < curvePoints.length; i++) {
	// 	let pt0 = curvePoints[i]
	// 	let pt1 = curvePoints[i + 1]
	// 	if (pt1 !== undefined) {

	// 		let pt2 = getLerp(pt0, pt1, t)
	// 		p.fill(0)
	// 		p.circle(...pt2, 20)
	// 	}
	// }

	// P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4
	for (var j = 0; j < 20; j++) {
		let t = (t2 + j *.05)%1

		let b = [0,0]
		let p1 = curvePoints[0]
		let p2 = curvePoints[1]
		let p3 = curvePoints[2]
		let p4 = curvePoints[3]
		for (var i = 0; i < 2; i++) {
			b[i] = ((1 - t)**3)*p1[i] 
				+ 3*(1- t)**2*t*p2[i]
				+ 3*(1- t)* t**2 * p3[i]
				+ t**3 * p4[i]
		

		}
			p.fill(150, 100, 50)
			p.circle(...b, 10)
	}

	
	// p.stroke(0)
	// p.strokeWeight(2)
	// for (var i = 0; i < curvePoints.length; i++) {
	// 	let pt0 = curvePoints[i]
	// 	let pt1 = curvePoints[i + 1]
	// 	if (pt1)
	// 		p.line(...pt0, ...pt1)
	// }


	// p.noFill()
	// p.fill(230, 100, 50)
	// p.stroke(190, 100, 50)
	// p.beginShape()
	// curvePoints.forEach((pt, index) => {
	// 	// console.log(index)

	// 	p.curveVertex(...pt)
	// 	// p.vertex(...pt)
	// })
	// p.endShape()
}


// Return the linear point interpolater
function getLerp(pt0, pt1, pct) {
	let pt2 = [0, 0]

	pt2[0] = (1 - pct)*pt0[0] + pct*pt1[0]


	pt2[1] = (1 - pct)*pt0[1] + pct*pt1[1]
	return pt2

}

function drawDashed(p, pt0, pt1) {

	for (var i = 0; i < 10; i++) {

	}
}

function drawPoint(p, pt) {
	let count = 5
	for (var i = 0; i < count; i++) {
		let pct = i/(count)
		let sat =  pt === tool.pointSelected?100:0
		p.fill(0, sat, pct*100)
		p.circle(...pt, 30*(1 - pct**2))
	}
}