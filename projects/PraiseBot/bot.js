class PraiseBot {
	constructor() {
		this.praise = 0
		this.fighting = 0
		this.maxPraise = 10
		this.maxFighting = 10
		this.givepraise = "You did a great job!"
		this.givefighting = "be happy!"
		this.weather = ""
		this.color = ""

		this.grammar = tracery.createGrammar(praiseGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		console.log("A type of praise:", this.grammar.flatten("#praise#"))
	}

	respondTo(s) {
		console.log("User said", s)
		// return "<img src='https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif'></img>"

		if (s.toLowerCase().includes("praise")) {
			let pr = this.grammar.flatten("#praise#")
			speechSynthesis.speak(new SpeechSynthesisUtterance(pr))
			return pr
		}

		if (s.toLowerCase().includes("fighting")) {
			let fi = this.grammar.flatten("#praise#")
			speechSynthesis.speak(new SpeechSynthesisUtterance(fi))
			return fi
			
		}
	
		if (s.toLowerCase().includes("thank")) {
			return this.grammar.flatten("#thank#")
		}

		if (s.toLowerCase().includes("bye")) {
			return this.grammar.flatten("#bye#")
		}
	
		if (s.toLowerCase().includes("predict")) {

			
			this.weather = this.grammar.flatten("#weather#")
			this.color = this.grammar.flatten("#color#")

			this.post(`In the ${this.weather} day`)
			this.post("... ")
					
			let interval = setInterval(() => {
				this.post(`When you see ${this.color}`)
					clearInterval(interval)

				this.post("... ")
				this.post("You would be lucky! ")

			}, 200)
			return ""
		}

		if (s.toLowerCase().includes("hi") || s.toLowerCase().includes("hello") || s.toLowerCase().includes("meet"))
			return `I'm a praise robot` + " " + this.grammar.flatten("#emoji#")

		if (s.toLowerCase().includes("nice") || s.toLowerCase().includes("like") || s.toLowerCase().includes("great"))
		{	
			let ph = this.grammar.flatten("#photo#")
			//let ph = ""
			let tmp = "<img src=" + ph + "></img>"
			console.log(tmp)
			this.praise += 1
			return tmp
			//return "<img src='https://i01piccdn.sogoucdn.com/63e5b1ae0a95bf04'></img>"
		}
		


		
		this.post("")
		return `Umm, I hope I can understand human language next time.`

	}
}