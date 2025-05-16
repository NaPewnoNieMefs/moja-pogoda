// Import wymaganych bibliotek
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const AUTHOR = "Nikodem Pałka";

// Pobranie klucza API
const API_KEY = process.env.WEATHER_API_KEY || "a9eb608e174e4dceb1b94922251605";

// Lista predefiniowanych krajów i miast
const cities = {
    "Polska": ["Warszawa", "Krakow", "Gdansk"],
    "Niemcy": ["Berlin", "Munich", "Hamburg"],
    "USA": ["New York", "Los Angeles", "Chicago"]
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Logowanie podstawowych informacji przy starcie serwera
app.listen(PORT, () => {
    const now = new Date().toISOString();
    console.log(`Data uruchomienia: ${now}`);
    console.log(`Autor: ${AUTHOR}`);
    console.log(`Port TCP: ${PORT}`);
    console.log("Aplikacja dostępna na http://localhost:" + PORT);
});

// Funkcja renderująca formularz i wynik pogody
function renderForm(selectedCountry, selectedCity, weatherInfo) {
    return `
        <html>
        <head>
            <title>Pogoda</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h2>Wybierz kraj i miasto:</h2>
            <form method="post">
                <label>Kraj:</label>
                <select name="country" id="country" onchange="this.form.submit()">
                    <option disabled ${!selectedCountry ? 'selected' : ''}>Wybierz kraj</option>
                    ${Object.keys(cities).map(country =>
                        `<option value="${country}" ${country === selectedCountry ? 'selected' : ''}>${country}</option>`
                    ).join('')}
                </select>
                <br><br>
                ${
                    selectedCountry ?
                    `<label>Miasto:</label>
                    <select name="city">
                        ${cities[selectedCountry].map(city =>
                            `<option value="${city}" ${city === selectedCity ? 'selected' : ''}>${city}</option>`
                        ).join('')}
                    </select>
                    <br><br>
                    <button type="submit">Pokaż pogodę</button>`
                    : ''
                }
            </form>
            ${weatherInfo ? `<h3>Pogoda:</h3><pre>${weatherInfo}</pre>` : ''}
        </body>
        </html>
    `;
}

// Funkcja pobierająca pogodę z WeatherAPI
async function getWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=pl`;
        const response = await axios.get(url);
        const data = response.data;
        return `${data.location.name}: ${data.current.condition.text}, temperatura: ${data.current.temp_c}°C, wilgotność: ${data.current.humidity}%`;
    } catch (err) {
        console.error("Błąd pobierania pogody:", err.response ? err.response.data : err.message);
        return "Nie udało się pobrać pogody.";
    }
}

// Trasa GET - wyświetla pusty formularz
app.get('/', (req, res) => {
    res.send(renderForm(null, null, null));
});

// Trasa POST - obsługuje wybór kraju/miasta oraz pobranie pogody
app.post('/', async (req, res) => {
    const selectedCountry = req.body.country;
    const selectedCity = req.body.city;
    let weatherInfo = null;

    if (selectedCountry && !selectedCity) {
        res.send(renderForm(selectedCountry, null, null));
    } else if (selectedCountry && selectedCity) {
        weatherInfo = await getWeather(selectedCity);
        res.send(renderForm(selectedCountry, selectedCity, weatherInfo));
    } else {
        res.send(renderForm(null, null, null));
    }
});
