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
    var searchOptions = getUserInput();
    const parsedResponsePromise = recipePromise(keyword)
        .then(parseToJson)
        .then(renderSearchResults)
}

function getUserInput() {
    var searchOptions = {
        q: "",
        cuisineType: "",
        mealType: "",
        diet: "",

    }
    searchOptions.q = searchKeyword.val().trim();
    searchOptions.cuisineType = cuisineSel.val();
    searchOptions.mealType = mealSel.val();
    searchOptions.diet = dietSel.val();
    console.log(searchOptions);
    return searchOptions;
}

function recipePromise(searchOptions) {
    var queryString = Object.keys(searchOptions).map(key => key + "=" + searchOptions[key]).join("&");
    // var queryString = $.param(searchOptions);
    console.log(queryString);
    var url = requestURL + "?" + queryString + `&app_id=${APP_ID}&app_key=${APP_KEY}`;
    console.log(url);
    // var url = requestURL + `?q=${keyword}&app_id=${APP_ID}&app_key=${APP_KEY}`;
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
        var listItem = (`<div name="list-item-${i}"><h3>${name}</h3></div>`);
        var buttonUrl = recipe.recipe.url;
        var instructionsButton = (`<a href="${buttonUrl}">How to</button>`)
        var infoButton = (`<a href="${buttonUrl}">More info</button>`)
        var videosButton = (`<a href="${buttonUrl}">Find videos</button>`)
        searchResults.append(listItem);
        searchResults.append(infoButton);
        searchResults.append(instructionsButton);
        searchResults.append(videosButton);
    }
}

submitBtn.on("click", function (event) {
    event.preventDefault();
    getUserInput();
    showRecipes();
});