const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "45317dd5195b8906a8e036957e76ae99";
const pexelsApiKey = "QqkJihiKzYYbgHWaebbPGQXGx6irSPeTyJ8MSMLDaWxy5Tp4PSHyGn93";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeather(city);
            const imageUrl = await getCityImage(city);
            document.body.style.backgroundImage = `url(${imageUrl})`;
            dispalyWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("please enter a valid city");
    }
});

async function getWeather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);

    console.log(response);

    return await response.json();
}

function dispalyWeatherInfo(data) {
    const {
        name: city,
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
    tempDisplay.textContent = temp;
    humidityDisplay.textContent = humidity;
    descDispaly.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);;



    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDispaly.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    tempDisplay.textContent = `${(Math.floor(temp - 273.15))}°C`;
    humidityDisplay.textContent = `Humidity:${humidity}%`;

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDispaly);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherEmoji) {
    if (weatherEmoji >= 200 && weatherEmoji < 300) {
        return "⛈️"; // Thunderstorm
    }
    else if (weatherEmoji >= 300 && weatherEmoji < 400) {
        return "🌧️"; // Drizzle
    }
    else if (weatherEmoji >= 500 && weatherEmoji < 600) {
        return "🌧️"; // Rain
    }
    else if (weatherEmoji >= 600 && weatherEmoji < 700) {
        return "❄️"; // Snow
    }
    else if (weatherEmoji >= 700 && weatherEmoji < 800) {
        return "🌫️"; // Atmosphere (fog, mist, etc.)
    }
    else if (weatherEmoji === 800) {
        return "☀️"; // Clear sky
    }
    else if (weatherEmoji >= 801 && weatherEmoji < 810) {
        return "☁️"; // Clouds
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");

    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDispaly");

    card.textContent = "";
    card.style.display = "flex";

    card.appendChild(errorDisplay);
}
// working for img bg
async function getCityImage(city) {
    const apiurl = `https://api.pexels.com/v1/search?query=${city} famous landmark&per_page=1&orientation=landscape`;

    const response = await fetch(apiurl, {
        headers: {
            Authorization: pexelsApiKey
        }
    });

    const data = await response.json();

    console.log(data);

    return data.photos[0].src.landscape;
}