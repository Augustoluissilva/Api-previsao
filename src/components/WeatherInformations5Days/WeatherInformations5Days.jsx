import './WeatherInformations5Days.css';

function WeatherInformations5Days({ Weather5Days }) {
    console.log(Weather5Days);

    let dailyForecast = {}


    for (let forecast of Weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        // Example: group forecasts by date
        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })

        return newDate
    }

    return (
        <div className="weather-conatiner">
            <h3>Previsão dos Próximos 5 Dias</h3>
            <div className='weather-list'>
                {next5DaysForecast.map(forecast => (
                    <div key={forecast.dt} className="weather-item">
                        <p className='forecast-day'>{convertDate(forecast)}</p>
                        <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)} ºC min /{Math.round(forecast.main.temp_max)} ºC máx</p>

                    </div>
                ))}
            </div>
        </div>
    );
}
function getWeatherIcon(iconCode) {
  const iconMap = {
    '01d': 'day-sunny',
    '01n': 'night-clear',
    '02d': 'day-cloudy',
    '02n': 'night-cloudy',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'rain',
    '09n': 'rain',
    '10d': 'day-rain',
    '10n': 'night-rain',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'fog',
    '50n': 'fog',
  };
  return iconMap[iconCode] || 'day-sunny'; // Default to sunny if no match
}
export default WeatherInformations5Days;