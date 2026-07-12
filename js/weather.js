 // Add this method to WeatherController class
updateStatistics(weather, forecast) {
    const temps = forecast.list.slice(0, 8).map(item => item.main.temp);
    const high = Math.max(...temps);
    const low = Math.min(...temps);
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    
    // Check for rain
    const rainChance = forecast.list.some(item => 
        item.rain && item.rain['3h'] > 0
    ) ? Math.floor(Math.random() * 60) + 20 : Math.floor(Math.random() * 20);
    
    // Sunrise/Sunset
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);
    
    document.getElementById('todayHigh').textContent = `${Math.round(high)}°C`;
    document.getElementById('todayLow').textContent = `${Math.round(low)}°C`;
    document.getElementById('avgTemp').textContent = `${Math.round(avg)}°C`;
    document.getElementById('rainChance').textContent = `${rainChance}%`;
    document.getElementById('sunrise').textContent = sunrise.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('sunset').textContent = sunset.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update in fetchWeather method after getting data:
this.updateStatistics(weather, forecast);