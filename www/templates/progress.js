var app = app || {}
app.templates = app.templates || {}

app.templates.progress = _.template('\
	<div style="width:${ width }%" class="progressThing"></div>\
	');
