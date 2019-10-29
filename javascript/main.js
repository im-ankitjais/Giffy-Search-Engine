document.querySelector(".js-go").addEventListener('click', function () {
	var inputValue = document.querySelector('.js-userinput').value;
	var userInput = getUserInput();
	searchGiphy(userInput);

});

document.querySelector('.js-userinput').addEventListener('keyup', function (e) {
	if (e.which === 13) {
		var userInput = getUserInput();
		searchGiphy(userInput);
	}
});

function getUserInput() {
	var inputValue = document.querySelector('.js-userinput').value;
	return inputValue;
}





function searchGiphy(searchQuery) {
	var url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchQuery;

	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open('GET', url);
	GiphyAJAXCall.send();


	GiphyAJAXCall.addEventListener('load', function (data) {

		var actualData = data.target.response;
		pushToDOM(actualData);
		console.log(actualData);

	});

}










function pushToDOM(response) {
	// turn response into real javascript object
	response = JSON.parse(response);
	// drill down to the data array
	var images = response.data;

	// find the container to hold this stuff in DOM
	var container = document.querySelector('.js-container');
	// clear it of old content since this function will be used on every search
	// we want to reset the div
	container.innerHTML = "";

	// loop through data array and add IMG html
	images.forEach(function (image) {
		// find img src
		var src = image.images.fixed_height.url;

		// concatenate a new IMG tag
		container.innerHTML += "<img src='" + src + "' class='container-image' />";
	});

	document.querySelectorAll('.container-image').forEach(function (element) {
		element.addEventListener('click', function (e) {
			var src = e.target.src;
			if (src.slice(src.length - 3, src.length) == 'gif') {
				document.querySelector('.popup .dl-yes').setAttribute('href', src);
				document.querySelector('.download-popup').style.display = 'block';
				document.querySelector('.download-popup').style.opacity = 1;
			}
		});
	});
}





document.querySelector('.popup .dl-no').addEventListener('click', function (e) {
	document.querySelector('.download-popup').style.opacity = 0;
	document.querySelector('.download-popup').style.display = 'none';
});

document.querySelector('.popup .dl-yes').addEventListener('click', function (e) {
	document.querySelector('.download-popup').style.opacity = 0;
	document.querySelector('.download-popup').style.display = 'none';
});