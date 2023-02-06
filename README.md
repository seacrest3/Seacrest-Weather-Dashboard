# Seacrest-Weather-Dashboard
Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

## Description

Server APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. It is tasked to build a weather dashboard that will use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities and run in the browser to feature dynamically updated HTML and CSS.

### User Story

AS A traveler, I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

### Acceptance Criteria

The app should:
* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user click on a city in the search history they are again presented with current and future conditions for that city

### Mock up and Functionality

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for London.](./assets/images/mockup.gif)

When a user opens the app and searches for a city's weather in the serach input form:

1. They are presented with current and future conditions for that city and that city is added to the search history

2. The current weather conditions presented for that city includes:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The wind speed
    * The humidity

3. The future weather conditions present a 5-day / 3-hour forecast for that city and displays:
    * The date
    * An icon representation of weather conditions (presented by the most occurrence of weather icon over the sets of data on that day)
    * The temperature (presented by the average temperature over the sets of data on that day)
    * The wind speed  (presented by the average wind speed over the sets of data on that day)
    * The humidity    (presented by the average humidity over the sets of data on that day)

4. When a user click on a city in the search history they are again presented with current and future conditions for that city

5. Metric units (i.e. '°C'- Celsius for temperature, 'm/s'- meter/sec for wind speed and '%'- percentage for humidity) are used in the presentation of all weather conditions.

### Review

TA, a Web Developer, reviews the code, providing feedback on errors and making sure that all of the acceptance criteria have been met.

* [The URL of the deployed application.](https://seacrest3.github.io/Seacrest-Weather-Dashboard/)

* [The URL of the GitHub repository.](https://github.com/seacrest3/Seacrest-Weather-Dashboard.git)

### Helpful Resources

- [OpenWeather APIs](https://openweathermap.org/api)

- [Moment](https://momentjs.com/)

- [jQuery](https://jquery.com/)

- [jQuery UI](https://jqueryui.com/)

- [Bootstrap](https://getbootstrap.com)

- [MDN Javascript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)

- [W3Schools Javascript](https://www.w3schools.com/js/)

- [JavaScript Tutorial](https://www.javascripttutorial.net/)

- [freeCodeCamp.org](https://www.freecodecamp.org/)

- [Github Pages Guide](https://pages.github.com/)