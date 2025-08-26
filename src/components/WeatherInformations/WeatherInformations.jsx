import './WeatherInformations.css';

function WeatherInformations({ Weather }) {
    

    // Verificação para evitar erros se Weather for undefined ou null
    if (!Weather || !Weather.main || !Weather.weather) {
        return <div>Carregando dados do clima...</div>;
    }

    return (
        <div className='weather-container'>
            <h2>{Weather.name}</h2>
            <div className="weather-info">
                {Weather.weather && Weather.weather.length > 0 && (
                    <>
                        <img
                            src={`https://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`}
                            alt="Ícone do clima"
                        />
                        <p className = 'temperature'>{Math.round(Weather.main?.temp)}°C</p>
                    </>
                )}
            </div>
            {Weather.weather[0].description && (
                <p className='description'>{Weather.weather[0].description}</p>
            )}
            <div className='details'>
                <p>Sensação Térmica: {Math.round(Weather.main?.feels_like)}ºC</p>
                <p>Umidade: {Weather.main?.humidity}%</p>
                <p>Pressão: {Weather.main?.pressure}hPa</p>
            </div>
        </div>
    );
}

export default WeatherInformations;