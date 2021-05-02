var searchKeyword = $("#keyword");
var cuisineSel = $("#cuisine");
var mealSel = $("#mealType");
var dietSel = $("#diet");
var submitBtn = $("#submit");
var searchResults = $("#search-results");

const APP_KEY = "4147e89469febd4e4e9264cc0a6e7cbe";
const APP_ID = "c36e8feb";
const requestURL = "https://api.edamam.com/search";


function showRecipes() {
    var queryString = buildQueryString();
    var url = requestURL + "?" + queryString + `&app_id=${APP_ID}&app_key=${APP_KEY}`;
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
}

//TODO move to helpers.js
function parseToJson(response) {
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
        console.log(name);
        var listItem = (`<div name="list-item-${i}"><h3>${name}</h3></div>`);
        var buttonUrl = recipe.recipe.url;
        var instructionsButton = (`<a href="${buttonUrl}">How to</button>`);
        var infoButton = (`<a href="${buttonUrl}">More info</button>`);
        var videosButton = (`<a href="${buttonUrl}">Find videos</button>`);
        searchResults.append(listItem);
        searchResults.append(infoButton);
        searchResults.append(instructionsButton);
        searchResults.append(videosButton);
    }
}

submitBtn.on("click", function (event) {
    event.preventDefault();
    showRecipes();
});