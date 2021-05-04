var searchKeyword = $("#keyword");
var cuisine = $("#cuisine");
var meal = $("#mealType");
var diet = $("#diet");
var submitBtn = $("#submit");
var searchResults = $("#search-results");

var currentPage = 0;

const APP_KEY = "4147e89469febd4e4e9264cc0a6e7cbe";
const APP_ID = "c36e8feb";
const REQUEST_URL = "https://api.edamam.com/search";
const PAGE_SIZE = 20;
<<<<<<< Updated upstream

function showRecipes() {
<<<<<<< Updated upstream
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
=======
    var queryString = buildQueryString();
    var url = REQUEST_URL + "?" + queryString + `&app_id=${APP_ID}&app_key=${APP_KEY}&from=${PAGE_SIZE * currentPage}&to=${PAGE_SIZE * currentPage + PAGE_SIZE}`;
    fetch(url)
        .then(parseToJson)
        .then(renderSearchResults)
        .catch(function (errorMessage) {
            if (typeof errorMessage !== "string") {
                errorMessage = "Can't connect to server";
            }
            searchResults.empty();
            var error = $(`<div class="error"><h3>${errorMessage}</3></div>`)
            searchResults.append(error);
        })
}

=======


function showRecipes() {
    var queryString = buildQueryString();
    var url = REQUEST_URL + "?" + queryString + `&app_id=${APP_ID}&app_key=${APP_KEY}&from=${PAGE_SIZE * currentPage}&to=${PAGE_SIZE * currentPage + PAGE_SIZE}`;
    fetch(url)
        .then(parseToJson)
        .then(renderSearchResults)
        .catch(function (errorMessage) {
            if (typeof errorMessage !== "string") {
                errorMessage = "Can't connect to server";
            }
            searchResults.empty();
            var error = $(`<div class="error"><h3>${errorMessage}</3></div>`)
            searchResults.append(error);
        })
}

>>>>>>> Stashed changes
function buildQueryString() {
    var searchOptions = {
        q: searchKeyword.val().trim(),
        cuisineType: cuisineSel.val(),
        mealType: mealSel.val(),
    };
    $.each(searchOptions, function (key, value) {
        if (value === "") {
            delete searchOptions[key];
        }
    });
    var queryString = $.param(searchOptions);
    return queryString;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

//TODO move to helpers.js
function parseToJson(response) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
    if (!response.ok) {
        throw "Can't retrieve data";
    }
    return response.json();
}

function renderSearchResults(data) {

    var recipes = data.hits;
    console.log(recipes);
    if (!recipes.length) {
        throw "No results found";
    }
    searchResults.empty();
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        var name = recipe.recipe.label;
        var time = recipe.recipe.totalTime;
        var calories = recipe.recipe.calories;
        var url = recipe.recipe.url;

        var resultSegment = $(`<div class="ui vertical segment"></div>`);
        var resultBody = $(`<div>`);
        var title = $(`<h3><a class="btn btn-link" href="${url}">${name}</a></h3>`);
        var bodyContentTime = $(`<p>Time to cook: ${time}</p>`);
        var bodyContentCalories = $(`<p>Calories: ${Math.floor(calories)}</p>`);

        var instructionsButton = (`<div class="ui animated purple button" tabindex="0">
                    <div class="visible content">Ingredients</div>
                        <div class="hidden content">
                        <i class="right arrow icon"></i>
                        </div>
                    </div>
                    </div>`);
        var videosButton = (`<div class="ui animated youtube button" tabindex="0">
                    <div class="visible content">Find videos</div>
                        <div class="hidden content">
                        <i class="youtube icon"></i>
                        </div>
                    </div>
                    </div>`);
        resultBody.append(title);
        resultBody.append(bodyContentTime);
        resultBody.append(bodyContentCalories);
        resultBody.append(instructionsButton);
        resultBody.append(videosButton);
        resultSegment.append(resultBody);
        searchResults.append(resultSegment);
    }
    var count = data.count;
    var isLastPage = ((currentPage + 1) * PAGE_SIZE) >= count;
    var isFirstPage = (currentPage === 0);

    var previousButton = $(`<button class="left attached ui button" id="previous">Previous</button>`);
    var nextButton = $(`<button class="left attached ui button" id="next">Next</button>`);
    searchResults.append(previousButton);
    if (isFirstPage) {
        previousButton.addClass("disabled");
    }
    searchResults.append(nextButton);
    if (isLastPage) {
        nextButton.addClass("disabled");
    }
}

submitBtn.on("click", function (event) {
    event.preventDefault();
    currentPage = 0;
    showRecipes();
});

searchResults.on("click", "#next", function () {
    currentPage++;
    showRecipes();
});

searchResults.on("click", "#previous", function () {
    currentPage--;
    showRecipes();
});
>>>>>>> Stashed changes
