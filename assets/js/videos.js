var resultsEl = $(`#results`);
var resultsTextEl = $(`result-text`);

function getParams() {}

const youTubeUrl = `https://youtube.googleapis.com/youtube/v3/search`;
const apiKey = "AIzaSyA3rkHsQ8EWGM113wT7U7Ie_BV6LG3g3oc";

$(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    var queryString = buildQueryString();
    var requestUrl = youTubeUrl + "?" + queryString + `&app_key=${apiKey}`;
    fetch(requestUrl).then(parseToJson);
  });
});

function buildQueryString() {
  var searchOptions = {
    q: searchEl.val().trim(),
  };
}
