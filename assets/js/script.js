// Seacrest-Weather-Dashboard
// A weather dashboard that will use OpenWeather API call for 5-day / 3-hour weather forecast to retrieve weather data for cities

var historyEl = $("#history");
var forecastEl = $("#forecast");
var cities = [];
var forecastDays = 5;                               // Open Weather '5 Days / 3 Hour Forecast'
var dataEachDay = 8;                                // 8 sets of data for each day
var apiKey = "3102f3b643256623c7321b2ed4853779";    //API key

// Get and format today's date 
var currentDay = moment().format("DD/MM/YYYY");

// Create HTML list of search history
var ulTag = $("<ul>");
ulTag.attr("id", "city-list");
ulTag.attr("class", "list-group");
historyEl.append(ulTag);

// Retrieved search history from localStorage
    var searchedCities = JSON.parse(localStorage.getItem("cities"));

    // Update the cities array
    if (searchedCities !== null) {
        cities = searchedCities;
    }
    renderSeachHistory();

    forecastEl.before("<h4>5-Day Forecast:</h4>");

// Listener for clicking the search button
$("#search-button").on("click", function (event) {
    // Prevent the default behavior
    event.preventDefault();

    // Get city input from the search input box
    var city = $("#search-input").val().trim();
    // Return for blank input
    if (city === "") {
        localStorage.clear();
        return;
    }
    // Push city input into the cities array
    cities.push(city);
    // Store searched history into localStorage
    localStorage.setItem("cities", JSON.stringify(cities));
    renderSeachHistory();
});

// Display cities in the search history
function renderSeachHistory() {
    // Clear cityList element
    var cityList = $("#city-list");
    cityList.empty();

    // Render a <li> for each city
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var li = $("<li>").text(city);
        li.attr("id", "search-city");
        li.attr("data-city", city);
        li.attr("class", "list-group-item");
        console.log(li);
        cityList.prepend(li);
    }
    if (!city) {
        return
    }
    else {
        // getWeatherCondition(city)
    };
}
