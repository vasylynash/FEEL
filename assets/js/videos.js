const API_KEY = "AIzaSyA3rkHsQ8EWGM113wT7U7Ie_BV6LG3g3oc";
const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?`;

var videoResults = $("#videos-search");

function getSearchQuery() {
    var queryString = document.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQuery = urlParams.get("q");
    return searchQuery;
}

function getParams() {
    const youtubeURLParams = new URLSearchParams();
    youtubeURLParams.set("part", "snippet");
    youtubeURLParams.set("maxResults", "12");
    youtubeURLParams.set("q", getSearchQuery());
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
        .catch(function (errorMessage) {
            if (typeof errorMessage !== "string") {
                errorMessage = "Can't connect to server";
            }
            videoResults.empty();
            var error = $(`<div class="ui placeholder segment" id="error">
                            <div class="ui icon header">
                                <i class="search icon"></i>
                                ${errorMessage}
                            </div>
                        </div>`)
            videoResults.append(error);
        });
}

function renderSearchVideos(data) {
    var videosArray = data.items;
    $("h3").text(`Search results for "${getSearchQuery()}"`);

    for (let i = 0; i < videosArray.length; i++) {
        const video = videosArray[i];
        let id = video.id.videoId;

        var videoContainer = $(`<div class="ui embed" data-source="youtube" data-url="https://www.youtube.com/embed/${id}"></div>`);
        var videoEl = $(`<div class="four wide column"></div>`);
        videoEl.append(videoContainer);
        videoResults.append(videoEl);
    }
    $('.ui.embed').embed();

    var seeMoreButton = $(`<button class="ui youtube button" id="youtube">
                              <i class="youtube icon"></i>
                                See more on YouTube
                            </button>`);

    videoResults.append(seeMoreButton);

}

getParams();

videoResults.on("click", "#youtube", function () {
    window.open(`https://www.youtube.com/results?search_query=${getSearchQuery()}`);
})