$(document).ready(() => {
    run();
});
  
// The initialize function must be run each time a new page is loaded
Office.initialize = (reason) => {
    $('#sideload-msg').hide();
    $('#app-body').show();
};

async function run() {
    // Office.context.document.setSelectedDataAsync('Hello World!', {
    //     coercionType: Office.CoercionType.Text
    // }, result => {
    //     if (result.status === Office.AsyncResultStatus.Failed) {
    //         console.error(result.error.message);
    //     }
    // });
}

function searchForGif() {
    let searchInput = document.getElementById('searchInput');
    let searchTerm = searchInput.value ? searchInput.value : '';
    if (searchTerm) {
        makeApiCall(searchTerm);
    } else {

    }
}

function makeApiCall(searchTerm) {
    let request = new XMLHttpRequest();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open('GET', url, true);
    request.send();

    getElements = function(response) {
        const responses = response.data;
        responses.forEach(function(gif) {
            let imgLink = gif.images.original.url;
            let imgSrc = gif.images.fixed_height_downsampled.webp;
            let imgHeight = gif.images.fixed_height_downsampled.height;
            let imgWidth = gif.images.fixed_height_downsampled.width;
            let imgAlt = gif.title;
            displayGif(imgLink,
                       imgSrc,
                       imgHeight,
                       imgWidth,
                       imgAlt);
        });
    }
}

function displayGif(imgLink, imgSrc, imgHeight, imgWidth, imgAlt) {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'container');

    const img = document.createElement('img');
    img.src = imgSrc;
    img.height = imgHeight;
    img.width = imgWidth;
    img.alt = imgAlt;
    img.setAttribute('class', 'image');

    const textDiv = document.createElement('div');
    textDiv.setAttribute('class', 'text');
    textDiv.innerHTML += 'Add GIF to Slide';

    const overlayDiv = document.createElement('div');
    overlayDiv.setAttribute('class', 'overlay');
    overlayDiv.appendChild(textDiv);

    containerDiv.appendChild(img);
    containerDiv.appendChild(overlayDiv);

    // This next line will just add it to the <body> tag
    document.getElementById('search-results').appendChild(containerDiv);
}

function addGifToSlide(imgLink) {

}