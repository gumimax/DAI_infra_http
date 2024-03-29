var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = new express();

app.get('/api', function(req, res) {
	res.send(generateQuote());
	console.log('quotes sent');
});

app.listen(3000, function (){
	console.log('Accepting http requests on port 3000.');
});

function generateQuote(){
	var string = [];
	for(var i = 0; i < 5; ++i){
		var numberWord = chance.integer({min : 3, max : 15});
		string.push({Quote: chance.sentence({ words: numberWord })});
	}
return string;
}
