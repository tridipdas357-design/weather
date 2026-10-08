{/* <h1 class="cityDisplay">
            kolkata
        </h1>
        <p class="tempDisplay">90°C</p>
        <p class="humidity">Humidity:75%</p>
        <p class="descDispaly">Clear Skies</p>
        <p class="weatherEmoji">☀️</p>
        <p class="errorDisplay">please enter a city</p> */}
    //  api=>   45317dd5195b8906a8e036957e76ae99
    // img api=QqkJihiKzYYbgHWaebbPGQXGx6irSPeTyJ8MSMLDaWxy5Tp4PSHyGn93
    const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "45317dd5195b8906a8e036957e76ae99";
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeather(city);
        }
        catch (error) {
            console.error(error);
            diaplayError(error);
        }
    }
    else {
        displayError("please enter a valid city");
        dispalyWeatherInfo(weatherData);
    }
});
async function getWeather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey} `;
    const response = await fetch(apiurl);
    console.log(response);
}
function dispalyWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;
    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDispaly = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.textContent=`${temp}K`;
    card.appendChild(cityDisplay);

}
function getWeatherEmoji(weatherid) {

}
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDispaly");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}