class WeatherMap {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.layer = 'clouds';
        this.data = null;
    }

    setData(weatherData) {
        this.data = weatherData;
        this.render();
    }

    render() {
        if (!this.data) return;
        
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F7FA');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw weather data visualization
        this.drawClouds(ctx, width, height);
        this.drawTemperatureGradient(ctx, width, height);
        this.drawCityMarkers(ctx);
    }

    drawClouds(ctx, width, height) {
        const clouds = [
            { x: 100, y: 80, size: 40 },
            { x: 300, y: 120, size: 50 },
            { x: 500, y: 60, size: 35 },
            { x: 700, y: 100, size: 45 }
        ];
        
        clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fill();
            
            // Second circle
            ctx.beginPath();
            ctx.arc(cloud.x + 30, cloud.y - 10, cloud.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    drawTemperatureGradient(ctx, width, height) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        const temp = this.data.main ? this.data.main.temp : 20;
        const colors = this.getTemperatureColors(temp);
        
        gradient.addColorStop(0, colors.cold);
        gradient.addColorStop(0.5, colors.mild);
        gradient.addColorStop(1, colors.hot);
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, height - 30, width, 30);
        ctx.globalAlpha = 1.0;
    }

    getTemperatureColors(temp) {
        if (temp < 0) return { cold: '#4A90E2', mild: '#5DADE2', hot: '#48C9B0' };
        if (temp < 15) return { cold: '#5DADE2', mild: '#48C9B0', hot: '#F39C12' };
        if (temp < 25) return { cold: '#48C9B0', mild: '#F39C12', hot: '#E67E22' };
        return { cold: '#F39C12', mild: '#E67E22', hot: '#E74C3C' };
    }

    drawCityMarkers(ctx) {
        // Draw city markers on map
        const cities = [
            { x: 150, y: 150, name: 'New York' },
            { x: 400, y: 130, name: 'London' },
            { x: 600, y: 180, name: 'Dubai' },
            { x: 350, y: 280, name: 'Singapore' }
        ];
        
        cities.forEach(city => {
            ctx.beginPath();
            ctx.arc(city.x, city.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#FF6B6B';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = '#2C3E50';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(city.name, city.x, city.y - 15);
        });
    }

    changeLayer(layer) {
        this.layer = layer;
        this.render();
    }
}