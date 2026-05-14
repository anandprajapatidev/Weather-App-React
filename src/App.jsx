import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
    const [cityInput, setCityInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    async function getWeather(cityName) {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data.cod === "404") {
                alert("City not found");
                return;
            }
            setWeatherData(data);
        }
        catch (error) {
            console.log(error);
            alert("Failed to fetch weather data");
        }
    }

    function handleSearch() {
        if (cityInput.trim() !== "") {
            getWeather(cityInput);
        }
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            getWeather(cityInput);
        }
    }

    useEffect(() => {
        getWeather("Lucknow");
    }, []);

    function getWeatherIcon() {
        if (!weatherData) {
            return "☀️";
        }

        const weatherMain =weatherData.weather[0].main;
        if (weatherMain === "Clouds") {
            return "☁️";
        }
        else if (weatherMain === "Rain") {
            return "🌧️";
        }
        else if (weatherMain === "Clear") {
            return "☀️";
        }
        else if (weatherMain === "Snow") {
            return "❄️";
        }
        else if (weatherMain === "Thunderstorm") {
            return "⛈️";
        }
        else {
            return "🌤️";
        }
    }

    return (
        <div className="container">
            <div className="weather-card">
                <h1 className="title">
                    Weather App
                </h1>
                <div className="search-box">
                    <input type="text" placeholder="Enter city name" value={cityInput} onChange={(e) =>setCityInput(e.target.value)}onKeyPress={handleKeyPress}/>
                    
                    <button onClick={handleSearch}>🔍</button>
                </div>
                {
                    weatherData && (
                        <div className="weather-info">
                            <div className="weather-icon">{getWeatherIcon()}</div>
                            <h2>{weatherData.name}</h2>
                            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>

                            <p className="feels-like">
                                Feels like:
                                {Math.round(weatherData.main.feels_like)}°C
                            </p>

                            <p className="condition">{weatherData.weather[0].main}</p>

                            <div className="details">
                                <div className="detail-box">
                                    <span className="detail-icon">💧</span>
                                    <div>
                                        <p>Humidity</p>
                                        <h3>{weatherData.main.humidity}%</h3>
                                    </div>
                                </div>
                                <div className="detail-box">
                                    <span className="detail-icon">🌬️</span>
                                    <div>
                                        <p>Wind</p>
                                        <h3>{weatherData.wind.speed} km/h</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;