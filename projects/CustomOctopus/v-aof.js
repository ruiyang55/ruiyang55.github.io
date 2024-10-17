// Components for exploring an array of floats

//====================================================================================
// Breeding multiple arrays of floats

Vue.component("aof-population", {
	template: `<details class="aof-population section" open>
		<summary>Population</summary>
		<div>
			Mutation: <input type="range" min="0" max="1" :step=".001" class="slider" v-model="controls.mutation" />
			
			<div>
				Animate: <select v-model="controls.animationMode"><option v-for="opt in animationModes">{{opt}}</option></select>
				<button class="emoji-button" @click="controls.isAnimating = !controls.isAnimating">▶️</button>
			</div>
		</div>

		<div>
			Population:<select v-model="controls.count" @change="reroll">
				<option>1</option><option>3</option><option>7</option><option>15</option>
			</select>
			<button class="emoji-button" @click="reroll">🎲</button>
		</div>


	</details>`,

	mounted() {
		population.nextGeneration()
	},
	methods: {
		reroll() {
			population.nextGeneration({count:controls.count})
		}
	},

	data() {
		return {
			controls:controls,
			animationModes: ["music", "wander", "evolve"]
		
		}
	},
})

//====================================================================================
// Looking at landmarks

Vue.component("aof-landmarks", {
	template: `<div class="aof-population section">
	

		<div v-if="false">
			<select v-model="app.xaxis">
				<option v-for="label in controls.selectedClass.labels">{{label}}</option>
			</select>
			<select v-model="app.yaxis">
				<option v-for="label in controls.selectedClass.labels">{{label}}</option>
			</select>
			<button class="emoji-button" @click="randomAxes">🎲</button>
		</div>

		<div>
			<div>Landmarks</div>
			<button v-for="(landmarkAOF,landmarkName) in controls.selectedClass.landmarks" @click="controls.selectedAOF.setValues(landmarkAOF, landmarkName)">{{landmarkName}}</button>
		</div>


		

	</div>`,
	data() {
		return {
			controls:controls,
			
		
		}
	},
	// props: ["app"]
})

//====================================================================================
// A set of sliders for a single AOF

Vue.component("aof-sliders", {
	template: `<div class="aof-view section" v-if="aof">
		<div class="contrast">Selected: {{aof.idNumber}}</div>
		<div class="ultradetail">{{aof.mode}}</div>
		<div class="controls">
			<button class="emoji-button" @click="aof.randomize()">🎲</button>
		</div>
		<table>
			<tr v-for="(value,valIndex in aof.values">
				<td class="label">{{aof.labels[valIndex]}}</td>
				<td class="slider-cell">
					<div class="slider-val">{{value.toFixed(3)}}</div>
					<input type="range" min="0" max="1" :step=".001" class="slider" :value="value" @input="ev => change(ev, valIndex)" />
				</td>

			</tr>
		</table>
		<input style="width:97%" v-model="aofinput" @keyup.enter='setFromInput'>
	</div>
	<div v-else>
	((no aof))
	</div>
	`,

	
	mounted() {
		this.updateValues()
	},
	watch: {
		"aof.values"() {
			this.updateValues()
		}
	},
	methods: {
		updateValues() {
			if (this.aof)
				this.aofinput = this.aof.valuesToString()
		},
		setFromInput() {
			let val = JSON.parse(this.aofinput)
			this.aof.setValues(val)
		},
		change(ev,  valIndex) {
			let val = parseFloat(ev.target.value)
			this.aof.set(valIndex, val)


		}
	},
	data() {
		return {
			animationMode: undefined,
			aofinput: ""
		}
	},
	props: ["aof"]
})
