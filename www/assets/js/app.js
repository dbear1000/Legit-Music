var home = new Vue({
	el: '#home',
	data() {
		return {
			creds: {
				name: '',
				email: '',
				password: '',
			}
		}
	},
	methods: {
			storeCredentials(){
				localStorage.creds = JSON.stringify(this.creds);
			}
	}
})

var dash = new Vue({
	el: '#dashboard',
	data() {
			return {
				creds: JSON.parse(localStorage.creds)
			}
	},
	methods: {

	},
})

var splits = new Vue({
	el: '#splits',
	data() {
			return {
				creds: JSON.parse(localStorage.creds),
				contract: {
					songtitle: '',
					totalWriters: null,
					writers: []
				},
				steps: 1,
				totalsteps: 4
			}
	},
	methods: {
		nextStep(){
			if(this.contract.totalWriters !== null){
				this.totalsteps = this.totalsteps + Number(this.contract.totalWriters);
				this.pushWriters(this.contract.totalWriters);
			}
			this.steps++;
		},
		prevStep(){
			this.steps--;
		},
		pushWriters(quantity){
			for (var array = [], i = 0; i < quantity; i++) {
				array.push({
					uid: i + 1,
					name: '',
					splits: {
						performance: null,
						mechanical: null
					}
				});
			}
			this.contract.writers = array;
			console.log(this.contract.writers)
		},
		createContract(){
			localStorage.writers = JSON.stringify(this.contract.writers)
			localStorage.songtitle = this.contract.songtitle
		}
	},
})

var calc = new Vue({
	el: '#calculator',
	data() {
			return {
				creds: JSON.parse(localStorage.creds),
				streams: null,
				sign: "$",
				s: {
					napster: 0,
					spotify: 0,
					tidal: 0,
					apple: 0,
					google: 0,
					deezer: 0,
					amazon: 0,
					pandora: 0,
				}
			}
	},
	methods: {
		calculate(rate){
			this.s.napster = this.sign + Math.round(this.streams * 0.019);
			this.s.spotify = this.sign + Math.round(this.streams * 0.00437);
			this.s.tidal = this.sign + Math.round(this.streams * 0.0125);
			this.s.apple = this.sign + Math.round(this.streams * 0.00735);
			this.s.google = this.sign + Math.round(this.streams * 0.00676);
			this.s.deezer = this.sign + Math.round(this.streams * 0.0064);
			this.s.amazon = this.sign + Math.round(this.streams * 0.00402);
			this.s.pandora = this.sign + Math.round(this.streams * 0.00133);
		}
	},
})

var contract = new Vue({
	el: '#contract',
	data() {
			return {
				writers: JSON.parse(localStorage.writers),
				songtitle : localStorage.songtitle,
				date: this.getDate()
			}
	},
	methods: {
		getDate(){
			var date = new Date();
			return date.toDateString();
		}
	}
})
