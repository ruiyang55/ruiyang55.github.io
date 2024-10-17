// An array of floats

let aofCount = 0
class AoF  {
	constructor(labels) {
		this.mode = "none"
		this.idNumber = aofCount++
		this.idColor = [(this.idNumber*39)%360, 100, 50]
		

		this.max = 1
		this.min = 0
		this.labels = labels
		this.values = []
		for (var i = 0; i < labels.length; i++) {
			this.values[i] = Math.random()
		}

		// console.log("Created AOF" + this.idNumber + "\n" + this.valuesToLabeledString())
	}



	
	

	cloneParent(aof, mutationValue=.1) {
		for (var i = 0; i < this.values.length; i++) {
			let val = aof.values[i]

			val += (Math.random()-.5)*mutationValue
			// Clamp to 0, 1
			val = Math.max(0, Math.min(1, val))
			Vue.set(this.values, i, val)
		}
		return this
	}
	
	// Set a particular index to a value
	set(index, val) {
		if (typeof index === String)
			index = this.labels.indexOf(index)
		Vue.set(this.values, index, val)
	}


	// Set this AOF to the noise function
	setToNoise(t) {
		for (var i = 0; i< this.values.length; i++) {
			let val =noise(this.idNumber*35 + i*100, t)
			// val =  Math.cos(Math.PI*val)*.5 + .5
			val = unitSigmoid(val, 10)
			Vue.set(this.values, i, val)
		}
	}

	setToSoundBar(soundbar) {
		// // No soundbar, no update
		if (app.audio.soundbar) {
			for (var i = 0; i< this.values.length; i++) {
				let pct = app.audio.soundbar.getAOFValue(i, this.values.length, this.idNumber)
				Vue.set(this.values, i, pct)
			}
		
		} else {
			
		}
	}

	randomize() {
		for (var i = 0; i< this.values.length; i++) {
			Vue.set(this.values, i, Math.random())
		}
	}


	get(index) {
		if (typeof index === "string") {
			index = this.labels.indexOf(index)
		}
		return this.values[index]
	}

	setLabels(labels) {
		Vue.set(this, "labels", labels)
	}

	setValues(vals) {
		console.log("set ", this.idNumber, "to", vals)
		for (var i = 0; i < vals.length; i++) {
			Vue.set(this.values, i, vals[i])
		}
	}

	valuesToString() {
		return ("[" + this.values.map(s => s.toFixed(2)).join(",") + "]")
	}

	valuesToLabeledString() {
		return this.values.map((s,index) => {
			return ("\t" + this.labels[index] + ":").padEnd(20, ' ') + s.toFixed(2)
		}).join("\n")
	}
}



