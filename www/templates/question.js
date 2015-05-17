var app = app || {}
app.templates = app.templates || {}

app.templates.question = _.template('\
	<div class="question hideQuestion">\
		<div class="questionTitle">${ title }</div>\
		<div class="questionDescription">${ description }</div>\
		<div class="row answers"></div>\
	</div>');
