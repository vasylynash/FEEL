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
        .then(renderSearchResults)
}

function getUserInput() {
    var keyword = searchKeyword.val().trim();
    console.log(keyword);
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
}

submitBtn.on("click", function (event) {
    event.preventDefault();
    getUserInput();
    showRecipes();
});

