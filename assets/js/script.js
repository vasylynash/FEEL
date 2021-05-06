var searchKeyword = $("#keyword");
var cuisineSel = $("#cuisine");
var mealSel = $("#mealType");
var submitBtn = $("#submit");
var searchResults = $("#search-results");
var list = $(".list-group");
var clearButton = $("#clear");

var keyword = "";
var currentPage = 0;

const APP_KEY = "4147e89469febd4e4e9264cc0a6e7cbe";
const APP_ID = "c36e8feb";
const REQUEST_URL = "https://api.edamam.com/search";
const PAGE_SIZE = 20;

function showRecipes() {
    var queryString = buildQueryString();

    var url =
        REQUEST_URL +
        "?" +
        queryString +
        `&app_id=${APP_ID}&app_key=${APP_KEY}&from=${PAGE_SIZE * currentPage}&to=${PAGE_SIZE * currentPage + PAGE_SIZE
        }`;

    fetch(url)
        .then(parseToJson)
        .then(renderSearchResults)
        .catch(function (errorMessage) {
            if (typeof errorMessage !== "string") {
                errorMessage = "Can't connect to server";
            }
            searchResults.empty();
            var error = $(`<div class="ui placeholder segment">
                            <div class="ui icon header">
                                <i class="search icon"></i>
                                ${errorMessage}
                            </div>
                        </div>`)
            searchResults.append(error);
        });
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

function parseToJson(response) {
    if (!response.ok) {
        throw "Can't retrieve data";
    }
    return response.json();
}

function renderSearchResults(data) {
    var recipes = data.hits;
    if (!recipes.length) {
        throw "No results found";
    }
    searchResults.empty();
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const name = recipe.recipe.label;
        var time = recipe.recipe.totalTime;
        var calories = recipe.recipe.calories;
        var url = recipe.recipe.url;
        var imageURL = recipe.recipe.image;
        var ingredients = recipe.recipe.ingredientLines;
        var sevings = recipe.recipe.yield;

        $("#ingredientsList").html("<p>" + ingredients.join("</p><p>") + "</p>");

        // var resultSegment = $(`<div class="ui vertical segment"></div>`);
        // var resultBody = $(`<div>`);

        var title = $(`<h3><a class="btn btn-link" href="${url}" target="_blank" rel="noopener noreferrer" id="recipe-name" value="${name}">${name}</a></h3>`);
        var bodyContentTime = time !== 0 ? $(`<p>Time to cook: ${time}</p>`) : "";
        var bodyContentCalories = $(`<p>Calories: ${Math.floor(calories)}</p>`);
        var bodyServings = $(`<p>Sevings: ${sevings}</p>`);
        var imageContainer = $(
            `<img class="ui small rounded image" src="${imageURL}" alt="Recipe image">`
        );

        var instructionsButton = $(`<button class="ui animated teal button" id="ingredients" tabindex="0">
                    <div class="visible content">Ingredients</div>
                        <div class="hidden content">
                        <i class="right arrow icon"></i>
                        </div>
                    </div>
                    </button>`);
        var videosButton = $(`<button class="ui youtube button" id="videos" tabindex="0">
                    <i class="youtube icon"></i>
                    Find Videos
                    </button>`);

        videosButton.on("click", function () {
            var videoQueryString = `./videos.html?q=${encodeURIComponent(name)}`;
            window.open(videoQueryString, "_blank")
        })

        // resultBody.append(title);
        // resultBody.append(bodyContentTime);
        // resultBody.append(bodyContentCalories);
        // resultBody.append(imageContainer);
        // resultBody.append(instructionsButton);
        // resultBody.append(videosButton);
        // resultSegment.append(resultBody);
        // searchResults.append(resultSegment);

        //NEW STAFF
        var resultsContainer = $(`<div class="ui internally celled grid" id="results">`);
        var resultsRow = $(`<div class="row">`);
        var divider = $(`<div class="ui divider">`)
        var textResultsContainer = $(`<div class="ten wide column">`);
        var imageResultsContainer = $(`<div class="three wide column" id="image-container">`);

        textResultsContainer.append(title);
        textResultsContainer.append(bodyContentTime);
        textResultsContainer.append(bodyContentCalories);
        textResultsContainer.append(bodyServings);
        textResultsContainer.append(instructionsButton);
        textResultsContainer.append(videosButton);
        imageResultsContainer.append(imageContainer);
        resultsRow.append(textResultsContainer);
        resultsRow.append(imageResultsContainer);
        resultsContainer.append(resultsRow);
        resultsContainer.append(divider);

        searchResults.append(resultsContainer);
        //
    }

    var count = data.count;
    var isLastPage = (currentPage + 1) * PAGE_SIZE >= count;
    var isFirstPage = currentPage === 0;

    var previousButton = $(
        `<button class="left attached teal ui button" id="previous">Previous</button>`
    );
    var nextButton = $(
        `<button class="left attached teal ui button" id="next">Next</button>`
    );
    searchResults.append(previousButton);
    if (isFirstPage) {
        previousButton.addClass("disabled");
    }
    searchResults.append(nextButton);
    if (isLastPage) {
        nextButton.addClass("disabled");
    }
}

function getUserInput() {
    if (searchKeyword.val().trim() !== "") {
        keyword = searchKeyword.val().trim();
    } else {
        keyword = "";
    }
}

function saveToLocalStorage(keyword) {
    var keywords = JSON.parse(localStorage.getItem("keywords") || "[]");
    if (keyword !== "" && keyword !== undefined && !keywords.includes(keyword)) {
        keywords.push(keyword);
        localStorage.setItem("keywords", JSON.stringify(keywords));
    }
}

function renderHistory() {
    var array = JSON.parse(localStorage.getItem("keywords") || "[]");
    list.empty();
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        var listEl = $("<li>" + element + "</li>");
        $(listEl).attr("class", "list-group-item");
        $(listEl).attr("data-value", element.toLowerCase());
        list.append(listEl);
    }
}

function clearHistory() {
    localStorage.clear();
    renderHistory();
}

submitBtn.on("click", function (event) {
    event.preventDefault();
    getUserInput();
    saveToLocalStorage(keyword);
    renderHistory();
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

searchResults.on("click", "#ingredients", function () {
    $("#modal")
        .modal("show");
});

clearButton.on("click", clearHistory);

$(window).on("load", renderHistory);