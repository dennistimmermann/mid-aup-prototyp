var app = app || {}
var q = $('#questions')

// build questions

_.each(Question.list, function(question, i, arr) {

	var questionElement = $(app.templates.question(question))
	questionElement.appendTo(q)

	var answerContainer = questionElement.find('.answers').first()

	var cards = _.each(question.answers, function(answer, i, arr) {
		//var html = document.createElement('div')

		var card = $(app.templates.answer(answer))
		card.on('click', function(e) {
			changeSelection(answer.add, answer.remove, answer.set)
			updateForm()
		})
		card.appendTo(answerContainer)
		//return app.templates.answer(answer)
	})

	window.cards = cards


})

var form = $('<form action="#"></form>')


form.on('change', function(e) {
	console.log('form changed')
	updateSelection()
})

app.data = {}

_.each(app.phones, function(phone, i, arr) {
	_.forIn(phone, function(value, key) {
		if(Array.isArray(value)) {
			if(typeof app.data[key] === 'undefined') app.data[key] = []

			app.data[key] = _.union(app.data[key], value)

		} else if(typeof value === 'number') {
			if(typeof app.data[key] === 'undefined') app.data[key] = {min: +Infinity, max: -Infinity}

			app.data[key].min = Math.min(app.data[key].min, value)
			app.data[key].max = Math.max(app.data[key].max, value)
		} else if(typeof value === 'string') {
			if(typeof app.data[key] === 'undefined') app.data[key] = []

			app.data[key] = _.union(app.data[key], [value])
		}
	})
})

var buildCheckboxes = function(title, collection, groupname) {
	var group = $('<div></div>')
	_.each(collection, function(value, i, arr) {
		var id = _.uniqueId('form-'+groupname+'-')
		var title = app.translations[value] || value
		var e = $(app.templates.inputCheckbox({name: groupname, value: value, id: id, title: title}))
		e.appendTo(group)
	})
	return group
}

var buildRange = function(title, name, min, max, step) {
	var e = $(app.templates.inputRange({id: _.uniqueId('form-'+name+'-'), title: title, name: name, min: min, max: max, step: step}))
	return e
}

var makes = buildCheckboxes("Hersteller", app.data.make, "make")
var material = buildCheckboxes("Material", app.data.material, "material")
var display = buildRange("Displaygröße", "display", app.data.display.min, app.data.display.max, 0.1)
var camera = buildRange("Kamera", "camera", app.data.camera.min, app.data.camera.max)
var price = buildRange("Preis", "price", app.data.price.min, app.data.price.max)
var storage = buildRange("Speicher", "storage", app.data.storage.min, app.data.storage.max)
var connectivity = buildCheckboxes("Konnektivität", app.data.connectivity, "connectivity")
var type = buildCheckboxes("Handytyp", app.data.type, "type")


makes.appendTo(form)
material.appendTo(form)
display.appendTo(form)
camera.appendTo(form)
price.appendTo(form)
storage.appendTo(form)
connectivity.appendTo(form)
type.appendTo(form)
form.appendTo(q)

app.selection = {
	make: [],
	material: [],
	display: 8,
	camera: 24,
	price: 800,
	storage: 128,
	connectivity: [],
	type: []
}

window.f = form[0]
app.form = form[0]

var changeSelection = function(add, remove, set) {
	console.log('hi there')
	_.forIn(app.selection, function(value, key) {
		if(Array.isArray(value)) {
			if(add[key]) {
				console.log(value)
				app.selection[key] = _.union(value, add[key])
			}
			if(remove[key])  {
				console.log("remove")
				app.selection[key] = _.difference(value, remove[key])
			}
			if(set[key]) app.selection[key] = set[key]
		} else if(typeof value === "number") {
			if(add[key]) app.selection[key] = add[key]
			if(remove[key]) app.selection[key] = remove[key]
			if(set[key]) app.selection[key] = set[key]
		}
	})
	//_.assign(app.selection, option)
}

var updateSelection = function() {
	_.forIn(app.selection, function(value, key) {
		if(Array.isArray(value)) {
			var sel = [].filter.call(app.form.elements[key], function(e, i, arr) {
				return e.checked
			})

			app.selection[key] = _.map(sel, function(e, i, arr) {
				return e.value
			})

		} else if(typeof value === "number") {
			if(app.form.elements[key]) {
				app.selection[key] = app.form.elements[key].value
			} else {
				console.warn("tried to read not existing criteria:", key)
			}
		}
	})
}

var updateForm = function() {
	_.forIn(app.selection, function(value, key) {
		if(Array.isArray(value)) {
			if(app.form.elements[key]) {
				[].forEach.call(app.form.elements[key], function(box, i, arr) {
					if(value.indexOf(box.value) != -1) {
						box.checked = true
					} else {
						box.checked = false
					}
				})
			} else {
				console.warn("tried to set not existing criteria:", key)
			}
		} else if(typeof value === "number") {
			if(app.form.elements[key]) {
				app.form.elements[key].value = value
			} else {
				console.warn("tried to set not existing criteria:", key)
			}
		}
	})
}

updateForm()
