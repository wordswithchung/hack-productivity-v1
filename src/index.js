function searchForPhotos() {
    let searchInput = document.getElementById('searchInput');
    let searchTerm = searchInput.value ? searchInput.value : '';
    if (searchTerm) {
        makeApiCall(searchTerm);
    } else {

    }
}

function makeApiCall(searchTerm) {
    let request = new XMLHttpRequest();
    const accessKey = '';
    let url = `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=${accessKey}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open('GET', url, true);
    request.send();

    getElements = function(response) {
        const results = response.results;
        results.forEach((result) => {
            downloadPhoto(result.id, result);
        });
    }
}

function displayPhoto(userName, 
                      userHtmlUrl, 
                      displayThumbUrl,
                      downloadUrl) {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'container');

    const downloadA = document.createElement('a');
    downloadA.href = downloadUrl;
    downloadA.target = '_blank';

    const img = document.createElement('img');
    img.src = displayThumbUrl;
    downloadA.appendChild(img);

    const attributionLink = document.createElement('a');
    attributionLink.href = userHtmlUrl;
    attributionLink.target = '_blank';
    attributionLink.innerHTML = 'Image by ' + userName + ' via Unsplash';
    
    const textDiv = document.createElement('div');
    textDiv.setAttribute('class', 'text');
    textDiv.innerHTML += 'CLICK TO OPEN & DOWNLOAD PHOTO';

    const overlayDiv = document.createElement('div');
    overlayDiv.setAttribute('class', 'overlay');
    overlayDiv.appendChild(textDiv);

    containerDiv.appendChild(downloadA);
    containerDiv.appendChild(document.createElement('br'));
    containerDiv.appendChild(attributionLink);
    containerDiv.appendChild(overlayDiv);

    // This next line will just add it to the <body> tag
    document.getElementById('search-results').appendChild(containerDiv);
}

function downloadPhoto(photoId, result) {
    let request = new XMLHttpRequest();
    const accessKey = '';
    let url = `https://api.unsplash.com/photos/${photoId}/download?client_id=${accessKey}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        displayPhoto(result.user.name,
                     result.user.links.html,
                     result.urls.thumb,
                     response.url);
      }
    }

    request.open('GET', url, true);
    request.send();
}