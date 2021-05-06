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
}

function searchVideos(url) {
  fetch(url).then(parseToJson).then(renderSearchVideos);
}

//TODO move to helpers.js
function parseToJson(response) {
  if (!response.ok) {
    throw "Can't retrieve data";
  }
  return response.json();
}

function renderSearchVideos(data) {
  var videosArray = data.items;
  console.log(videosArray);
  for (let i = 0; i < videosArray.length; i++) {
    const video = videosArray[i];
    let id = video.id.videoId;
    console.log(id);

    var videoContainer = $(
      `<div class="ui embed" data-source="youtube" data-url="https://www.youtube.com/embed/${id}"></div>`
    );
    var videoEl = $(`<div class="embed">`);
    var videoContent = $(
      '<iframe width="50%" height="50%" frameborder="0" scrolling="no"></iframe>'
    );
    videoContainer.append(videoEl);
    videoEl.append(videoContent);
    $("#videos-search").append(videoContainer);
    $(".ui.embed").embed();
  }
}

getParams();
