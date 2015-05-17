// dont look, mom! I havent cleaned up!

var app = app || {}
var q = $('#questions')
var p = $('#phones')

var next = $('#next')
var prev = $('#prev')

next.on('click', function(e) {
	nextStep()
})

prev.on('click', function(e) {
	prevStep()
})

var amateur = $('#amateur')
var expert = $('#expert')

amateur.on('click', function(e) {
	nextStep()
})

expert.on('click', function(e) {
	lastStep()
})

var progress = $('#progress')

_.each(app.questions, function(question, i, arr) {

	var questionElement = $(app.templates.question(question))
	questionElement.qdata = question

	question.domNode = questionElement
	questionElement.appendTo(q)

	var answerContainer = questionElement.find('.answers').first()

	var cards = _.each(question.answers, function(answer, i, arr) {
		//var html = document.createElement('div')

		var card = $(app.templates.answer(answer))
		card.on('click', function(e) {
			var was = _.clone(app.selection, true)
			changeSelection(answer.add, answer.remove, answer.set)
			// updateForm()
			// updatePhones()
			nextStep(was)

		})
		card.appendTo(answerContainer)
		//return app.templates.answer(answer)
	})

	window.cards = cards
})

app.progress = []

_.each(app.questions, function(question, i, arr) {
	var width = 100/app.questions.length
	var thing = $(app.templates.progress({width: width}))

	thing.on('click', function(e) {
		gotoStep(i+1)
	})
	app.progress.push(thing)
	thing.appendTo(progress)
})

app.step = 0
app.lastSteps = []

var gotoStep = function(step, dontPush, was) {
	if(!dontPush) {
		console.log('############ added to history')
		app.lastSteps.push({

			step:app.step,
			selection: was || _.clone(app.selection, true)
		})
		console.log(_.clone(app.selection, true))
	}
	app.step = step
	_.each(steps, function(e, i, arr) {
		console.log(e)
		if(i == step) {
			$(e).removeClass('hideQuestion').addClass('showQuestion')
		} else {
			$(e).removeClass('showQuestion').addClass('hideQuestion')
		}
	})

	_.each(app.progress, function(e, i, arr) {
		if(i <= step-1) {
			e.addClass('active').addClass('z-depth-1')
		} else {
			e.removeClass('active').removeClass('z-depth-1')
		}
	})

	step>=steps.length-1?next.hide():next.show()

	if(step <= 0 ) {
		prev.hide()
		next.hide()
		p.hide()
		progress.hide()
	} else {
		prev.show()
		p.show()
		progress.show()
	}

	updateForm()
	updatePhones()


}

var prevStep = function() {
	var ls = app.lastSteps.pop()
	app.selection = ls.selection
	console.log("################", ls.selection)
	gotoStep(ls.step, true)
}

var nextStep = function(was) {
	gotoStep(app.step+1, false, was)
}

var lastStep = function() {
	gotoStep(steps.length-1)
}


var form = $('<form action="#" class="hideQuestion row"></form>')


form.on('change', function(e) {
	console.log('form changed')
	updateSelection()
	updatePhones()
})

app.selection = {
	make: {
		type: "checkbox",
		value: [],
		filter: "inclusive"
	},
	material: {
		type: "checkbox",
		value: [],
		filter: "inclusive"
	},
	display: {
		type: "slider",
		value: 8,
		filter: "minimal"
	},
	camera: {
		type: "slider",
		value: 24,
		filter: "minimal"
	},
	price: {
		type: "slider",
		value: 800,
		filter: "maximal"
	},
	storage: {
		type: "slider",
		value: 128,
		filter: "minimal"
	},
	connectivity: {
		type: "checkbox",
		value: [],
		filter: "exclusive"
	},
	shape: {
		type: "checkbox",
		value: [],
		filter: "inclusive"
	}
}

app.data = {}

//var phoneCriteria = typeof e[key] === "string"?[e[key]]:e[key]

_.forIn(app.selection, function(criteria, key) {
	_.each(app.phones, function(phone, i, arr) {
		if(criteria.type == "checkbox") {
			if(typeof criteria.options === 'undefined') criteria.options = []
			var add = typeof phone[key] === "string"?[phone[key]]:phone[key]

			criteria.options = _.union(criteria.options, add)

			if(criteria.filter == "inclusive") {
				criteria.value = criteria.options
			} else {
				criteria.value = []
			}
		} else if(criteria.type == "slider") {
			if(typeof criteria.options === 'undefined') criteria.options = {min: +Infinity, max: -Infinity}

			criteria.options.min = Math.min(criteria.options.min, phone[key])
			criteria.options.max = Math.max(criteria.options.max, phone[key])

			if(criteria.filter == "minimal") {
				criteria.value = criteria.options.min
			} else {
				criteria.value = criteria.options.max
			}
		}
	})

})

// _.each(app.phones, function(phone, i, arr) {
// 	_.forIn(app.selection, function(value, key) {
// 		if(value.type == "checkbox") {
// 			if(typeof app.data[key] === 'undefined') app.data[key] = []

// 			app.data[key] = _.union(app.data[key], value)

// 		} else if(typeof value === 'number') {
// 			if(typeof app.data[key] === 'undefined') app.data[key] = {min: +Infinity, max: -Infinity}

// 			app.data[key].min = Math.min(app.data[key].min, value)
// 			app.data[key].max = Math.max(app.data[key].max, value)
// 		} else if(typeof value === 'string') {
// 			if(typeof app.data[key] === 'undefined') app.data[key] = []

// 			app.data[key] = _.union(app.data[key], [value])
// 		}
// 	})
// })

var buildCheckboxes = function(title, category) {
	var group = $('<div class="col s2"></div>')
	_.each(app.selection[category].options, function(value, i, arr) {
		var id = _.uniqueId('form-'+category+'-')
		var title = app.translations[value] || value
		var checked = "checked"
		var e = $(app.templates.inputCheckbox({name: category, value: value, id: id, title: title, checked: checked}))
		e.appendTo(group)
	})
	return group
}

var buildRange = function(title, category, step) {
	var data = app.selection[category].options
	var e = $(app.templates.inputRange({id: _.uniqueId('form-'+name+'-'), title: title, name: category, min: data.min, max: data.max, step: step}))
	return e
}

var makes = buildCheckboxes("Hersteller", "make")
var material = buildCheckboxes("Material", "material")
var display = buildRange("Displaygröße", "display", 0.1)
var camera = buildRange("Kamera", "camera", "camera")
var price = buildRange("Preis", "price", "price")
var storage = buildRange("Speicher", "storage", "storage")
var connectivity = buildCheckboxes("Konnektivität", "connectivity")
var shape = buildCheckboxes("Handytyp", "shape")

var rangeGroup = $('<div class="col s4"></div>')
display.appendTo(rangeGroup)
camera.appendTo(rangeGroup)
price.appendTo(rangeGroup)
storage.appendTo(rangeGroup)

makes.appendTo(form)
material.appendTo(form)
rangeGroup.appendTo(form)
connectivity.appendTo(form)
shape.appendTo(form)
form.appendTo(q)

window.f = form[0]
app.form = form[0]

var changeSelection = function(add, remove, set) {
	console.log('hi there')
	_.forIn(app.selection, function(value, key) {
		if(value.type == "checkbox") {
			if(add[key]) {
				console.log(value)
				app.selection[key].value = _.union(value.value, add[key])
			}
			if(remove[key])  {
				console.log("remove")
				app.selection[key].value = _.difference(value.value, remove[key])
			}
			if(set[key]) app.selection[key].value = set[key]
		} else if(value.type == "slider") {
			if(add[key]) app.selection[key].value = add[key]
			if(remove[key]) app.selection[key].value = remove[key]
			if(set[key]) app.selection[key].value = set[key]
		}
	})
	//_.assign(app.selection, option)
}

var updateSelection = function() {
	_.forIn(app.selection, function(value, key) {
		if(value.type == "checkbox") {
			var sel = [].filter.call(app.form.elements[key], function(e, i, arr) {
				return e.checked
			})

			app.selection[key].value = _.map(sel, function(e, i, arr) {
				return e.value
			})

		} else if(value.type == "slider") {
			if(app.form.elements[key]) {
				app.selection[key].value = app.form.elements[key].value
			} else {
				console.warn("tried to read not existing criteria:", key)
			}
		}
	})
}

var updateForm = function() {
	_.forIn(app.selection, function(value, key) {
		if(value.type == "checkbox") {
			if(app.form.elements[key]) {
				[].forEach.call(app.form.elements[key], function(box, i, arr) {
					if(value.value.indexOf(box.value) != -1) {
						box.checked = true
					} else {
						box.checked = false
					}
				})
			} else {
				console.warn("tried to set not existing criteria:", key)
			}
		} else if(value.type == "slider") {
			if(app.form.elements[key]) {
				app.form.elements[key].value = value.value
			} else {
				console.warn("tried to set not existing criteria:", key)
			}
		}
	})
}

var buildPhone = function(phone) {
	var e = $(app.templates.phone(phone))
	phone.domNode = e
	e.appendTo(p)
}

var buildAllPhones = function() {
	_.each(app.phones, function(phone, i, arr) {
		buildPhone(phone)
	})
}

buildAllPhones()

var updatePhones = function() {
	var phones = filterPhones(app.phones)
	var show = phones
	var hide = _.xor(app.phones, phones)

	_.each(show, function(e, i, arr) {
		e.domNode.removeClass("hidePhone")
		e.domNode.addClass("showPhone")
	})

	_.each(hide, function(e, i, arr) {
		e.domNode.removeClass("showPhone")
		e.domNode.addClass("hidePhone")
	})

}

var filterPhones = function(candidates) {
	candidates = candidates || app.phones

	_.forIn(app.selection, function(criteria, key) {
		if(criteria.type == "checkbox") {
			// console.log("vorher:", candidates.length)
			if(criteria.filter == "inclusive") {
				// console.log("inclusive")
				candidates = _.filter(candidates, function(e) {
					var phoneCriteria = typeof e[key] === "string"?[e[key]]:e[key] // make and model to array
					// console.log("phoneCriteria:", phoneCriteria)
					// console.log("selecCriteria:", criteria.value)
					var res = _.intersection(criteria.value, phoneCriteria).length > 0
					// console.log("result:", res)
					return res
				})

			} else if(criteria.filter == "exclusive") {
				// console.log("exclusive")
				candidates = _.filter(candidates, function(e) {
					var phoneCriteria = typeof e[key] === "string"?[e[key]]:e[key] // make and model to array
					// console.log("phoneCriteria:", phoneCriteria)
					// console.log("selecCriteria:", criteria.value)
					// wtf, is that right?
					var res = _.intersection(criteria.value, phoneCriteria).length == criteria.value.length
					// console.log("result:", res)
					return res
				})

			}
			// console.log("nachher:", candidates.length)

		} else if(criteria.type == "slider") {
			// console.log("vorher:", candidates.length)
			if(criteria.filter == "minimal") {
				// console.log("minimal")
				candidates = _.filter(candidates, function(e) {
					// console.log("phoneCriteria:", e[key])
					// console.log("selecCriteria:", criteria.value)
					return criteria.value <= e[key]
				})
			} else if(criteria.filter == "maximal") {
				// console.log("maximal")
				candidates = _.filter(candidates, function(e) {
					// console.log("phoneCriteria:", e[key])
					// console.log("selecCriteria:", criteria.value)
					return criteria.value >= e[key]
				})
			}
			// console.log("nachher:", candidates.length)
		}
	})

	console.log(candidates)
	return candidates
}

var steps = q.children()

updateForm()
updateSelection()
updatePhones()

gotoStep(0)
