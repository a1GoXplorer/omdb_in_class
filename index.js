// We need to require any libraries we want to use.
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

// Express requires that we instantiate an app.
var app = express();

// an array of movies to be filled
var movieList = [];

//Set EJS as the view engine
app.set("view engine", "ejs");

//telling my app to use the module
app.use(bodyParser.urlencoded())

// Create a handler to respond to GET requests
// to our home page ("/").
app.get('/', function(req, res){
  res.render('index.ejs');
});


// app.post("/search", function (req, res) {
//   console.log(req.body);
//   movies.push(req.body.movieTitle);
//   res.redirect("/search");
// });


//goes to the search page
app.get('/search', function(req, res) {
     
     //Grabs the movie title from the URL query string
     var searchTerm = req.query.movieTitle;
     
     //building the url we're calling
     var url = "http://www.omdb.com/?s=" + searchTerm;

     //Call the OMDB API searching for the movie
     request(url, function (error, response, body) {
     	if (!error && response.statusCode == 200) {

     		//Now we turn our JSON we've parsed from
     		//the OMDB into an object
     		var obj = JSON.parse(body);

            //Render results.ejs and pass it search results "movieList"
     		res.render('views/results.ejs', {movieList: obj.Search});
     	}
     });
});



// app.get("/books/:index", function (req, res) {
//   var index = req.params.index;
//   var book = books[index];
//   res.render("books/show", {book: book});
// });




//Post request data redirected to results.ejs
// app.post('/' , function (req, res) {
// 	console.log(req.body);
// 	movies.push(req.body.movieTitle);
// 	res.redirect('/results');
// });






app.listen(3000, function () {
	console.log("Listening");
});

// Create a handler to respond to GET requests
// to our search page ("/search").

// app.get('/results', function(req, res) {


// 	var searchTerm = req.query.movieTitle;
// 	var url = "http://www.omdbapi.com/?s=" + searchTerm;

// 	request(url, function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 			var obj = JSON.parse(body);
// 			res.render("results.ejs", {movieList: obj.Search});
// 		}
// 	});
// });

