var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = new express();

app.get('/', function(req, res) {
	res.send(generateQuote());
});

app.listen(3000, function (){
	console.log('Accepting http resquets on port 3000.');
});

function generateQuote(){
	var string = [];
	for(var i = 0; i < 5; ++i){
		var numberWord = chance.integer({min : 3, max : 15});
		string.push({Quote: chance.sentence({ words: numberWord })});
	}
return string;
}
