var app = app || {}
app.templates = app.templates || {}

app.templates.button = _.template('\
	<a class="waves-effect waves-light btn">\
		<i class="${ left } left"></i>${ text }<i class="${ right } right"></i>\
	</a>');
