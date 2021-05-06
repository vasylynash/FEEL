const API_KEY = "AIzaSyA3rkHsQ8EWGM113wT7U7Ie_BV6LG3g3oc";
const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?`;

var videoResults = $("#videos-search");

function getParams() {
    var queryString = document.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQuery = urlParams.get("q");

    const youtubeURLParams = new URLSearchParams();
    youtubeURLParams.set("part", "snippet");
    youtubeURLParams.set("maxResults", "25");
    youtubeURLParams.set("q", searchQuery);
    youtubeURLParams.set("key", API_KEY);

    var searchURL = YOUTUBE_URL + youtubeURLParams.toString();
    searchVideos(searchURL);
}

function parseToJson(response) {
    if (!response.ok) {
        throw "Can't retrieve data";
    }
    return response.json();
}

function searchVideos(url) {
    fetch(url)
        .then(parseToJson)
        .then(renderSearchVideos)
}

function renderSearchVideos(data) {
    var videosArray = data.items;
    console.log(videosArray);
    for (let i = 0; i < videosArray.length; i++) {
        const video = videosArray[i];
        let id = video.id.videoId;

        var videoContainer = $(`<div class="ui embed" data-source="youtube" data-url="https://www.youtube.com/embed/${id}"></div>`);
        var videoEl = $(`<div class="four wide column"></div>`);
        videoEl.append(videoContainer);
        videoResults.append(videoEl);
    }
    $('.ui.embed').embed();
    var placeholder = $(`<a href="https://www.youtube.com/results?search_query=chicken" class="ui medium image" id="more">
  <img src="./assets/images/image.jpg">
</a>`)
    videoResults.append(placeholder);
}

getParams();