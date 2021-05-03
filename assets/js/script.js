var searchKeyword = $("#keyword");
var cuisine = $("#cuisine");
var meal = $("#mealType");
var diet = $("#diet");
var submitBtn = $("#submit");
var searchResults = $("#search-results");

const APP_KEY = "4147e89469febd4e4e9264cc0a6e7cbe";
const APP_ID = "c36e8feb";
const requestURL = "https://api.edamam.com/search";

function showRecipes() {
  var keyword = getUserInput();
  const parsedResponsePromise = recipePromise(keyword)
    .then(parseToJson)
    .then(renderSearchResults);
}

function getUserInput() {
  var keyword = searchKeyword.val().trim();
  return keyword;
}

function recipePromise(keyword) {
  var url = requestURL + `?q=${keyword}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  return fetch(url);
}

//TODO move to helpers.js
function parseToJson(response) {
  return response.json();
}

function renderSearchResults(data) {
  var recipes = data.hits;
  console.log(recipes);
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    var name = recipe.recipe.label;
    console.log(name);
    var listItem = `<div name="list-item-${i}"><h3>${name}</h3></div>`;
    searchResults.append(listItem);
  }
}

submitBtn.on("click", function (event) {
  event.preventDefault();
  getUserInput();
  showRecipes();
});

//youTube API

function videoRecipes() {
  var youTubeApiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=suggestions&part=topicDetails&maxResults=20&myRating=like&key=${youTubeApiKey}`;
  var youTubeApiKey = `AIzaSyA3rkHsQ8EWGM113wT7U7Ie_BV6LG3g3oc`;
  fetch(youTubeApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
})