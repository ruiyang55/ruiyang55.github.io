// A population of AOFs

let individualCount = 0

class Population {
	constructor(individualClass) {
		this.individualClass = individualClass
		this.individuals = []
		console.warn("Create population")

	}



	nextGeneration(settings={}) {
		if (settings.count === undefined)
			settings.count = controls.count
					

		let children = this.generate(settings)
		this.individuals = children
		this.setPositions()
		
		controls.updateSelected()
		
	}

	// Create new children
	// Can be either by cross-breeding or mutations
	generate({parents,count}) {
		console.log("Generate", count)
		let individuals = []
		for (var i = 0; i < count; i++) {
			// Make a new array of floats with these labels
			let aof = new AoF(this.individualClass.labels)
			if (parents && parents.length !== 0) {
				let parent = parents[0]
				aof.cloneParent(parent, controls.mutation)
			}

			let individual = new this.individualClass(aof)
			individual.id = individualCount++
			individuals.push(individual)
		}

		return individuals
	} 

	regenerate() {
		this.individuals = []
		for (var i = 0; i < controls.count; i++) {
			let aof = new AoF(this.individualClass.labels)
			let ind = new this.individualClass(aof)
			ind.id = individualCount++
			this.individuals.push(ind)

		}
		this.setPositions()
		controls.updateSelected()
	}

	update(p) {
		let frameCount = p.frameCount
		let t = p.millis()*.001
		let dt = p.deltaTime*.001

		if (controls.isAnimating) {
			switch(controls.animationMode) {
				case "wander":
					this.individuals.forEach(ind => ind.aof.setToNoise(t*.2))
					break;
				case "music":
					this.individuals.forEach(ind => ind.aof.setToSoundBar())
					break;
			}
		}
		

		this.individuals.forEach(ind => ind.update(p, t, dt))
	}

	draw(p) {
		if (this.individualClass.drawBackground)
			this.individualClass.drawBackground(p)
		else 
			p.background(200, 100, 95)
		// console.log(this.individuals)

		this.individuals.forEach((ind,index) => {
			p.push()
			p.translate(...ind.center)

			p.noStroke()

			if (controls.hovered === index) {
				p.fill(220, 100, 50, .3)
				p.ellipse(0, 0, 30, 16)
			}
			if (controls.selected === index) {
				p.fill(220, 100, 50, .3)
				p.ellipse(0, 0, 35, 19)
			}
			p.fill(0, 0, 0, .2)
			p.ellipse(0, 0, 30, 16)


			ind.draw(p)

			p.pop()

		})
	} 


	// Setup the individuals' positions so they are distributed on the screen
	setPositions() {
		let count = this.individuals.length
		for (var i = 0; i < this.individuals.length; i++) {
			let ind = this.individuals[i]
			let pct = count==1?.5:i/(count - 1)
			let x = canvasW*.5 + (canvasW - 100)*.9*(pct - .5)
			let y = canvasH*(.8 + .1*(i%2))
			ind.center.setTo(x, y)
		
		}
		
	}


	// Get the closest individual to this mouse position
	getClosest(p) {
		// Figure out what we're hovering over
		let minD = 100
		let closest = undefined

		this.individuals.forEach((ind,index) => {
			let d = Vector.getDistance(ind.center, p)
			if (d < minD) { 
				closest = index
				minD = d
			}
		})
		return closest
	}	
				
}