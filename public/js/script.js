// Makes an ajax request with the search key.
var ajax = function (searchKey) {
	var resultsLis = "";
	// Create a new ajax request.
	var ajaxReq = new XMLHttpRequest();
	ajaxReq.addEventListener ("load", function () {
		var resultsData = JSON.parse(this.responseText.replace(/&#34;/g, "\""))["Search"];
		// Iterate on all results.
		for (var i = 0; i < resultsData.length; i++) {
			resultsLis += "<div class=\"result\">" +
							"<a class=\"title\">" +
							  resultsData[i]["Title"] +
							"<\/a>" +
							"<br>" + 
							"<span>" + 
							resultsData[i]["Poster"] +
							"<\/span>" +
							"<p class=\"small\">" +
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis posuere mauris. Maecenas nec nisl sapien. Pellentesque eget odio est. Aliquam dictum tellus eget enim ultrices, eget mollis metus posuere. " +
							"<\/p>" +
						  "<\/div>";
		}

		results.innerHTML = resultsLis;
	});
	ajaxReq.open("GET", "http://localhost:3000/" + searchKey);
	ajaxReq.send();

	prevKey = searchKey;
};

// Gets the data from input.
var getInput = function () {
	// Increment the times
	times++;
	// Get search term.
	var searchKey = input.value;
	// If searchKey is not empty.
	if (searchKey.length > 1 && searchKey !== " ") {
		// Send ajax request if not the same search word.
		if (prevKey !== searchKey) {
			ajax(searchKey)
		} else {
			console.log("[-] Same search word avoiding ajax.");
			// Slow it up if the user isn't typing.
			_clock = clockIt(100 ** times);
			// Speeds up again on keydown.
			init();
		}
	} else if (searchKey === " " || searchKey === "") {
		// Can't get empty movie.
		results.innerHTML = "<div class=\"result\"> No results <\/div>";
	}
};


// ==========
// GLOBALS
// ==========
var prevKey =  "";
var _clock = 0;
var times = 0;


// ==========
// GET DOM OBJECTS NEEDED
// ==========

// Real stuff starts here.
var results = document.getElementById("results");
// Get input.
var input = document.getElementById("search-term");
// Get the wrappers child.
var wrap = document.getElementById("child-wrap");



// ==========
// START RUNNING THE CLOCK.
// ==========

// This function starts the clock.
var clockIt = function (t) {
	// Shows speed.
	console.log("[+] Setting clock at " + t + "ms");
	// Remove previous interval if its not a zero.
	(_clock !== 0)? clearInterval(_clock): console.log("[+] Interval doesnot exist.");
	// Run the get input every 3000 milli seconds.
	return setInterval(getInput, t);
};



// ==========
// MAKE SEARCH SMALL.
// ==========

// If the key is pressed run this function.
var pressed = function () {
	if (wrap.classList[0] === "big-center") {
		console.log("[+] Shifted to smaller search form.");
		// Change its class to small-center.
		wrap.classList = "small-center";
		// We will now see results div.
		results.style.display = "block";		
	}
	// Set clock at 3000.
	_clock = clockIt(3000);
	// Then remove event listener.
	this.removeEventListener("keydown", pressed);
	console.log("[+] Keydown event listener removed");
};

// Initiating function.
var init = function () {
	// Onkeydown go initiate pressed function.
	input.addEventListener("keydown", pressed);
};


// All starts here.
init();


