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

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  return a;
}

function downloadGiphy(file_url) {
	fetch(file_url)
  	.then(response => response.blob())
  	.then(blob => {
			// Create a new FileReader innstance
			const reader = new FileReader();
			// Add a listener to handle successful reading of the blob
			reader.addEventListener('load', () => {
				const downloadLink = downloadBlob(blob, file_url.split('/').pop());
				document.body.appendChild(downloadLink);
				downloadLink.click()
				document.body.removeChild(downloadLink);
			});
    // Start reading the content of the blob
    // The result should be a base64 data URL
    reader.readAsDataURL(blob);
  });
	
}


function handleGiphyClick(e) {
	file_url = e.src;
	console.log("Downloading: " + file_url);
	downloadGiphy(file_url, e);
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

	if (!images.length) {
		container.innerHTML = "<h1>No results found =(<h1><br /><h2>Try a different search term</h2>"
		return;
	}

	// loop through data array and add IMG html
	images.forEach(function (image) {
		// find img src
		var src = image.images.fixed_height.url;

		// concatenate a new IMG tag
		container.innerHTML += "<img src='" + src + "' class='container-image' onclick='handleGiphyClick(this)'/>";
	});

	document.querySelectorAll('.container-image').forEach(function (element) {
		element.addEventListener('click', function (e) {
			var src = e.target.src;
			document.querySelector('.popup .dl-yes').setAttribute('src', src);
			document.querySelector('.download-popup').style.display = 'block';
			document.querySelector('.download-popup').style.opacity = 1;
		});
	});
}





document.querySelector('.popup .dl-no').addEventListener('click', function (e) {
	document.querySelector('.download-popup').style.opacity = 0;
	document.querySelector('.download-popup').style.display = 'none';
});

document.querySelector('.popup .dl-yes').addEventListener('click', function (e) {
	var e = {"src": document.querySelector('.popup .dl-yes').getAttribute('src')};
	handleGiphyClick(e);
	document.querySelector('.download-popup').style.opacity = 0;
	document.querySelector('.download-popup').style.display = 'none';
});

function handleGiphyClick(e) {
	file_url = e.src;
	console.log("Downloading: " + file_url);
	downloadGiphy(file_url, e);
}

function downloadGiphy(file_url) {
	fetch(file_url)
  	.then(response => response.blob())
  	.then(blob => {
			// Create a new FileReader innstance
			const reader = new FileReader();
			// Add a listener to handle successful reading of the blob
			reader.addEventListener('load', () => {
				const downloadLink = downloadBlob(blob, file_url.split('/').pop());
				document.body.appendChild(downloadLink);
				downloadLink.click()
				document.body.removeChild(downloadLink);
			});
    // Start reading the content of the blob
    // The result should be a base64 data URL
    reader.readAsDataURL(blob);
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  return a;
}