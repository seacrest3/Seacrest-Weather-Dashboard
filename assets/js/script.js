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

// Find the most frequently occurred elements in an array
// for choosing a weather icon which can represent the weather condition over a set of icons for that day
function findArrayFreqEl(arr) {
    var freq = 1;
    var counter = 0;
    var item;
    if (arr.length === 1)
        return arr[0];
    if (arr.length === 2 && (arr[0] != arr[1]))
        return arr[1];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i; j < arr.length; j++) {
            if (arr[i] == arr[j])
                counter++;
            if (freq <= counter) {
                freq = counter;
                item = arr[i];
            }
        }
        if (counter === 0) {
            item = arr[i];
            return item;
        }
        counter = 0;
    }
    return item;
}

// Get weather conditions and render into the weather dash board
function getWeatherCondition(city) {

    // Constructing a URL to search for current weather data
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    // Performing AJAX GET request
    $("#today").empty();
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    })
    // After the data comes back from the API
    .then(function (response) {
        var imgIcon = $("<img>");
        // Store the code of weather icon in the iconUrl variable
        var iconUrl = response.weather[0].icon;
        imgIcon.attr("src", "http://openweathermap.org/img/wn/" + iconUrl + "@2x.png");

        // Add 'alt' attribute to <img> tag
        imgIcon.attr("alt", "Weather icon");

        // Render the current weather conditions of the city on the weather dashboard
        var cityName = $("<h3>").text(response.name + " " + currentDay);
        cityName.append(imgIcon);

        $("#today").append(cityName);
        var cityTemperature = $("<p>").text("Temp: " + response.main.temp + " °C");
        $("#today").append(cityTemperature);
        var cityWindSpeed = $("<p>").text("Wind: " + response.wind.speed + " m/s");
        $("#today").append(cityWindSpeed);
        var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        $("#today").append(cityHumidity);

        // Store the longitude and latitude of the city in variables
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;

        // Performing AJAX GET request to get 5-day forecast weather forecast data
        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
        forecastEl.empty();
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        })
        
        // After the data comes back from the API
        .then(function (response5Day) {
            // Create data objects to store the 5-day weather data and the target weather data
            var forecast5DayObj = {
                date: [],
                temp: [],
                wind: [],
                humidity: [],
                icon: []
            }
            var target5DayObj = {
                date: [],
                averageTemp: [],
                averageWind: [],
                averageHumidity: [],
                icon: []
            }

            // Create and initialise dataArrayEl variable to count filtered elements in the 5-day forecast weather forecast data
            var dataArrayEl = 0;

            // Get and format dates of data in the 5-day forecast weather forecast data
            for (var i = 0; i < response5Day.list.length; i++) {

                var date = response5Day.list[i].dt_txt.split(' ')[0];
                var forecastDay = moment(date).format("DD/MM/YYYY");
                
                // Eliminate current day weather data from the 5-day forecast weather forecast data
                if (forecastDay > currentDay) {
                    // Store remaining 5-day weather data into the forecast5DayObj data object
                    forecast5DayObj.date.push(moment(response5Day.list[i].dt_txt).format('DD/MM/YYYY'));
                    forecast5DayObj.temp.push(response5Day.list[i].main.temp);
                    forecast5DayObj.wind.push(response5Day.list[i].wind.speed);
                    forecast5DayObj.humidity.push(response5Day.list[i].main.humidity);
                    forecast5DayObj.icon.push(response5Day.list[i].weather[0].icon);
                    // Count and save the number of remaining elements in the 5-day forecast weather forecast data into the dataArrayEl variable
                    dataArrayEl = dataArrayEl + 1;
                }
            }

            // Calculate the number of data elements in the 5th day of the 5-day weather condition data
            var dataLastDay = 0;
            if (dataArrayEl === 40) {
                dataLastDay = 8;
            } else {
                dataLastDay = dataArrayEl % 8;
            }


            var iconArray = [];
            // Calculate the average temperature, the avergae wind speed and the average humidity for each day of the 5-day weather condition data
            for (var j = 0; j < forecastDays; j++) {
                var sumTemp = 0;
                var sumWind = 0;
                var sumHumidity = 0;
                var averageDayTemp = 0;
                var averageDayWind = 0;
                var averageDayHumidity = 0;

                // First day weather data
                if (j == 0) {
                    //Calucate the sum of each set of weather condition data for the first day
                    for (var x = 0; x < dataEachDay; x++) {
                        sumTemp = sumTemp + forecast5DayObj.temp[x];
                        sumWind = sumWind + forecast5DayObj.wind[x];
                        sumHumidity = sumHumidity + forecast5DayObj.humidity[x];
                        iconArray.push(forecast5DayObj.icon[x]);
                    }

                    // Store the date of data set into the target5DayObj data object
                    target5DayObj.date.push(forecast5DayObj.date[x - 1]);

                    // Find and save the code of weather icon for that day
                    var findIcon = findArrayFreqEl(iconArray);
                }

                // Repeat the calculation for the second day weather data
                if (j == 1) {
                    for (var x = dataEachDay; x < (2 * dataEachDay); x++) {
                        sumTemp = sumTemp + forecast5DayObj.temp[x];
                        sumWind = sumWind + forecast5DayObj.wind[x];
                        sumHumidity = sumHumidity + forecast5DayObj.humidity[x];
                        iconArray.push(forecast5DayObj.icon[x]);
                    }

                    // Store the date of data set into the target5DayObj data object
                    target5DayObj.date.push(forecast5DayObj.date[x - 1]);

                    // Find and save the code of weather icon for that day
                    var findIcon = findArrayFreqEl(iconArray);
                    console.log("item is " + findIcon);
                }

                // Repeat the calculation for the third day weather data
                if (j == 2) {
                    for (var x = (2 * dataEachDay); x < (3 * dataEachDay); x++) {
                        sumTemp = sumTemp + forecast5DayObj.temp[x];
                        sumWind = sumWind + forecast5DayObj.wind[x];
                        sumHumidity = sumHumidity + forecast5DayObj.humidity[x];
                        iconArray.push(forecast5DayObj.icon[x]);
                    }

                    // Store the date of data set into the target5DayObj data object
                    target5DayObj.date.push(forecast5DayObj.date[x - 1]);

                    // Find and save the code of weather icon for that day
                    var findIcon = findArrayFreqEl(iconArray);
                }

                //  Repeat the calculation for the fouth day weather data
                if (j == 3) {
                    for (var x = (3 * dataEachDay); x < (4 * dataEachDay); x++) {
                        sumTemp = sumTemp + forecast5DayObj.temp[x];
                        sumWind = sumWind + forecast5DayObj.wind[x];
                        sumHumidity = sumHumidity + forecast5DayObj.humidity[x];
                        iconArray.push(forecast5DayObj.icon[x]);
                    }

                    // Store the date of data set into the target5DayObj data object
                    target5DayObj.date.push(forecast5DayObj.date[x - 1]);

                    // Find and save the code of weather icon for that day
                    var findIcon = findArrayFreqEl(iconArray);
                }
                averageDayTemp = (sumTemp / dataEachDay).toFixed(2);
                averageDayWind = (sumWind / dataEachDay).toFixed(2);
                averageDayHumidity = (sumHumidity / dataEachDay).toFixed(2);

                // Repeat the calculation for the fifth day weather data
                if (j == 4) {
                    for (var x = (4 * dataEachDay); x < ((4 * dataEachDay) + dataLastDay); x++) {
                        sumTemp = sumTemp + forecast5DayObj.temp[x];
                        sumWind = sumWind + forecast5DayObj.wind[x];
                        sumHumidity = sumHumidity + forecast5DayObj.humidity[x];
                        iconArray.push(forecast5DayObj.icon[x]);
                    }

                    // Store the date of data set into the target5DayObj data object
                    target5DayObj.date.push(forecast5DayObj.date[x - 1]);

                    // Find and save the code of weather icon for that day
                    var findIcon = findArrayFreqEl(iconArray);

                    // Calculate and save the average temperature, the average wind speed and the average humidity for that day into variables
                    averageDayTemp = (sumTemp / dataLastDay).toFixed(2);
                    averageDayWind = (sumWind / dataLastDay).toFixed(2);
                    averageDayHumidity = (sumHumidity / dataLastDay).toFixed(2);
                }
                // Empty the iconArray before looping into next day
                iconArray = [];
                // Save the average temperature, the average wind speed and the average humidity for that day into the target5DayObj data object
                target5DayObj.averageTemp.push(averageDayTemp);
                target5DayObj.averageWind.push(averageDayWind);
                target5DayObj.averageHumidity.push(averageDayHumidity);

                // Present the weather conditions of that day into a card
                // and render the cards for the 5-day weather conditions on the weather dashboard
                var imgTag = $("<img>");
                imgTag.attr("src", "http://openweathermap.org/img/wn/" + findIcon + "@2x.png");
                imgTag.attr("alt", "Weather icon");
                var showTemp = $("<p>").text("Temp: " + averageDayTemp + " °C");
                var showWind = $("<p>").text("Wind: " + averageDayWind + " m/s");
                var showHumidity = $("<p>").text("Humidity: " + averageDayHumidity + "%");
                var cardDivEl = $("<div>");
                cardDivEl.attr("class", "card mb-3");
                forecastEl.append(cardDivEl);

                // Render card header
                var headerDivEl = $('<div>');
                headerDivEl.attr('class', 'card-header');
                headerDivEl.text(forecast5DayObj.date[x - 1]);
                cardDivEl.append(headerDivEl);

                // Render card body
                var bodyDivEl = $('<div>');
                bodyDivEl.attr('class', 'card-body');
                bodyDivEl.append(imgTag);
                bodyDivEl.append(showTemp);
                bodyDivEl.append(showWind);
                bodyDivEl.append(showHumidity);
                cardDivEl.append(bodyDivEl);
            }
        });
    });
}

// Show cities in the search history
function showSearchHistory() {
    // Clear cityList element
    var cityList = $("#city-list");
    cityList.empty();

    // Render a <li> for each city
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var li = $("<li>").text(city);
        li.attr("id", "search-city");
        li.attr("city", city);
        li.attr("class", "list-group-item");
        cityList.prepend(li);
    }
    if (!city) {
        return
    }
    else {
        getWeatherCondition(city)
    }
}

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
    // Render search history
    showSearchHistory();
});

//Listener for clicking the city in the search history
$(document).on("click", "#search-city", function () {
    var cityOnClick = $(this).attr("city");
    getWeatherCondition(cityOnClick);
});

// Create a list of search history
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
showSearchHistory();

// A header decription for 5-Day Forecast
forecastEl.before("<h4>5-Day Forecast:</h4>");
