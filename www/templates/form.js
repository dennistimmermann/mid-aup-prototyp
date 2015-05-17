var app = app || {}
app.templates = app.templates || {}

app.templates.inputCheckbox = _.template('\
	<p>\
		<input type="checkbox" class="filled-in" name="${ name }" value="${ value }" id="${ id }" />\
		<label for="${ id }">${ title }</label>\
	</p>')

app.templates.inputRange = _.template('\
	<p class="range-field">\
	  	<label for="${ id }">${ title }</label>\
      	<input type="range" name="${ name }" id="${ id }" min="${ min }" max="${ max }" step="${ step }" />\
    </p>')
