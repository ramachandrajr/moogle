var express = require("express")
	app = express()
	request = require("request");

// ========== SETTINGS ==========

// Set default engine as ejs.
app.set("view engine", "ejs");



// ========== MIDDLEWARE ==========

app.use(express.static("public"));



// ========== ROUTES ==========

// ROOT route.
app.get("/", function (req, res) {
	res.render("index");
});

// SEARCH route.
app.get("/:id", function (req, res) {
	var id = req.params.id;
	// Request omdb page.
	request("http://www.omdbapi.com/?s=" + id, function (err, response, body) {
		if (!err && response.statusCode === 200) {
			var data = JSON.parse(body);
			// Send data to template.
			res.render("search", {data: data});
		}
	});
});


// Keep listening for requests.
app.listen("3000", function () {
	console.log("Started search engine server");
})
