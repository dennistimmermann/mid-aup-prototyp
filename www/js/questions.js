var app = app || {}
app.questions = {}

var Question = function(title, description) {
	this.title = title || "no title"
	this.description = description || "no description"
	this.answers = []
	Question.list.push(this)
	return this

}

Question.list = []

Question.prototype.addAnswer = function(title, description, add, remove, set, img) {
	var _answer = {}
	_answer.title = title || "no title"
	_answer.description = description || "no description"
	_answer.add = add || {}
	_answer.remove = remove || {}
	_answer.set = set || {}
	_answer.img = img || "http://placehold.it/350x350"
	this.answers.push(_answer)
	return this
}

new Question("Frage 1").addAnswer(
		"one"
	).addAnswer(
		"two"
	).addAnswer(
		"three"
	).addAnswer(
		"four"
	)

new Question("Frage 2").addAnswer(
		"iOS", "Apples Betriebssystem", {make: ["Apple"]}
	).addAnswer(
		"two"
	).addAnswer(
		"three"
	).addAnswer(
		"four"
	)
