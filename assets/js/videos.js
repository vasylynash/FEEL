const API_KEY = "AIzaSyA3rkHsQ8EWGM113wT7U7Ie_BV6LG3g3oc";
const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?`;

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
    // console.log(youtubeURLParams.toString());
}

function searchVideos(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))

}

getParams();