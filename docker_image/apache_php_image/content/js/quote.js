$(function() {
	console.log("loading quotes");
	
	function loadQuotes(){
		$.getJSON("/api/", function( quotes ) {
			console.log(quotes);
			var msg = "no quotes ! :(";
			if(quotes.length > 0){
				msg = quotes[0].Quote;
			}
			$(".text-black-50.mb-0").text(msg);
		});
	};
	loadQuotes();
	setInterval(loadQuotes, 2000);
	
});