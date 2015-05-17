var app = app || {}
app.templates = app.templates || {}

app.templates.answer = _.template('\
	<div class="col s3">\
	    <a href="#">\
			<div class="card">\
				<div class="card-image">\
					<img src="${ img }">\
					<span class="card-title">${ title }</span>\
				</div>\
				<div class="card-content">\
					<p>${ description }</p>\
				</div>\
			</div>\
	    </a>\
	</div>');
