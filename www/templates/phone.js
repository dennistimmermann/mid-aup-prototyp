var app = app || {}
app.templates = app.templates || {}

app.templates.phone = _.template('\
	<div class="col s3 hidePhone">\
	    <a href="#">\
			<div class="card">\
				<div class="card-image">\
					<img src="${ img }">\
					<span class="card-title">${ model }</span>\
				</div>\
				<div class="card-content">\
					<p>${ description }</p>\
				</div>\
			</div>\
	    </a>\
	</div>');
