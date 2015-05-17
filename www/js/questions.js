var app = app || {}
app.questions = []

var Question = function(title, description) {
	this.title = title || "no title"
	this.description = description || "no description"
	this.answers = []
	app.questions.push(this)
	return this

}

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

new Question("Frage 1", "Was wollen Sie mit Ihrem Handy machen?").addAnswer(
		"Klassisch", "Ich werde ab und zu etwas telefonieren und ein paar SMS schreiben"
	).addAnswer(
		"Multimedia", "Ich möchte telefonieren, SMS schreiben und auch ab und zu etwas surfen"
	).addAnswer(
		"Alleskönner", "Ich möchte viel surfen und eine vielzahl Apps und Spiele verwenden", {storage: 16, connectivity: ["lte", "wifi"]}, {}, {}
	).addAnswer(
		"Unentschlossen", "Weiß ich noch nicht"
	)

new Question("Frage 2", "Welches Betriebssystem bevorzugen Sie?").addAnswer(
		"iOS", "", {}, {}, {make: ["Apple"]}
	).addAnswer(
		"Android", "", {}, {}, {make: ["Motorola", "Samsung", "HTC"]}
	).addAnswer(
		"Windows Phone", "", {}, {}, {make: ["Nokia"]}
	).addAnswer(
		"Egal", "", {}, {}, {}
	)

new Question("Frage 3", "Wie häufig möchten Sie Ihr Handy nutzen?").addAnswer(
		"Den ganzen tag", "", {}, {}, {}
	).addAnswer(
		"Mehrmals am tag", "", {}, {}, {}
	).addAnswer(
		"Sehr selten", "", {}, {}, {}
	).addAnswer(
		"Unterschiedlich", "", {}, {}, {}
	)

new Question("Frage 4", "Wie viel Speicher benötigen Sie?").addAnswer(
		"Der Moderate", "Ich brauche nur Platz für ein bisschen Musik und ein par Apps", {storage: 8}, {}, {}
	).addAnswer(
		"Speicher-Riese", "Ich will meine gesamte Musik, viele Bilder, Videos und große Apps und Spiele immer dabei haben", {storage: 32}, {}, {}
	).addAnswer(
		"Alles Extern", "Ich speichere meine Sachen auf einer SD-Karte", {connectivity: ["sd"]}, {}, {}
	).addAnswer(
		"Unentschlossen", "Weiß ich noch nicht", {}, {}, {}
	)

new Question("Frage 5", "Wie wichtig sind Ihnen hochwertige Materialien bei Ihrem Handy?").addAnswer(
		"Edel", "Ich lege viel Wert auf Metall, Glas und ein exzellent verarbeitetes Design", {}, {}, {material: ["aluminium", "glass"]}
	).addAnswer(
		"Solide", "Gut verarbeitetes Plastik und ein gutes Aussehen reicht mir", {material: ["aluminium", "glass", "plastic"]}, {}, {}
	).addAnswer(
		"Prakmatisch", "Es soll nur funktionieren, das Aussehen ist mir egal", {material: ["aluminium", "glass", "plastic"]}, {}, {}
	).addAnswer(
		"Egal", "Mir kommt es nicht auf das Äußere des Handys an", {material: ["aluminium", "glass", "plastic"]}, {}, {}
	)
