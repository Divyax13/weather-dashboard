// ---------- Config & constants ----------
const API_KEY = CONFIG.API_KEY;
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// ---------- State ----------
let unit = localStorage.getItem("unit") || "metric";
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
let lastCurrentData = null;
let lastForecastData = null;
let iconCounter = 0;

// ---------- DOM references ----------
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locateBtn = document.getElementById("locateBtn");
const unitToggle = document.getElementById("unitToggle");
const weatherDisplay = document.getElementById("weatherDisplay");
const forecastDisplay = document.getElementById("forecastDisplay");
const recentSearchesEl = document.getElementById("recentSearches");
const sky = document.getElementById("sky");
const celestial = document.getElementById("celestial");
const particles = document.getElementById("particles");

// ---------- Init ----------
unitToggle.textContent = unit === "metric" ? "°C" : "°F";
renderRecentSearches();

// ---------- Event listeners ----------
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchByCity(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchByCity(city);
  }
});

locateBtn.addEventListener("click", useMyLocation);

unitToggle.addEventListener("click", () => {
  unit = unit === "metric" ? "imperial" : "metric";
  localStorage.setItem("unit", unit);
  unitToggle.textContent = unit === "metric" ? "°C" : "°F";
  if (lastCurrentData) renderWeather(lastCurrentData);
  if (lastForecastData) renderForecast(lastForecastData);
});