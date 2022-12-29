$(function() {
	console.log("loading quotes");
	
	function loadQuotes(){
		$.getJSON("/api/", function( quotes ) {
			console.log(quotes);
			var msg = "no quotes ! :(";
			var msg2 = "no quotes ! :(";
			if(quotes.length > 0){
				msg = quotes[0].Quote;
				msg2 = quotes[1].Quote;
			}
			$(".text-black-50.mb-0").text(msg);
			$(".mb-0.text-white-50").text(msg2);
		});
	};
	loadQuotes();
	setInterval(loadQuotes, 2000);
	
});