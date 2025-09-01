import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days';
import './App.css';

// Mapeamento de condições climáticas para imagens/gradientes
const backgroundMap = {
  day: {
    clear: 'linear-gradient(to bottom, #66b5ffff, #4651e8ff)',
    clouds: 'linear-gradient(to bottom, #4c8dadff, #558abbff)',
    rain: 'linear-gradient(to bottom, #7C98B6, #98B3CD)',
    default: 'linear-gradient(to bottom, #3fa3caff, #B0E0E6)',
  },
  night: {
    clear: 'linear-gradient(to bottom, #000030, #1F2850)',
    clouds: 'linear-gradient(to bottom, #2C3E50, #34495E)',
    rain: 'linear-gradient(to bottom, #1D233C, #181D2A)',
    default: 'linear-gradient(to bottom, #1A237E, #3F51B5)',
  },
};

// Mapeamento de condições climáticas para ícones (você precisará ter esses ícones no seu projeto)
const iconMap = {
  // ... (mantenha o seu objeto iconMap)
};


function App() {
  const [Weather, setWeather] = useState(null); // Corrigido para "Weather"
  const [Weather5Days, setWeather5Days] = useState(null); // Corrigido para "Weather5Days"
  const [theme, setTheme] = useState('day');
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const inputRef = useRef();
  const key = "6b3e9119fa7e399ea1ab3ad48123120e";

  useEffect(() => {
    const localHour = new Date().getHours();
    const currentTheme = (localHour >= 6 && localHour < 18) ? 'day' : 'night';
    setTheme(currentTheme);
    setBackgroundStyle({ background: backgroundMap[currentTheme]['default'] });
  }, []);

  async function searchCity() {
    const city = inputRef.current.value;
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
      const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

      const [apiInfo, apiInfo5Days] = await Promise.all([
        axios.get(url),
        axios.get(url5Days)
      ]);

      setWeather(apiInfo.data); // Corrigido
      setWeather5Days(apiInfo5Days.data); // Corrigido

      const cityHour = new Date(apiInfo.data.dt * 1000 + apiInfo.data.timezone * 1000).getUTCHours();
      const newTheme = (cityHour >= 6 && cityHour < 18) ? 'day' : 'night';
      setTheme(newTheme);
      updateBackground(newTheme, apiInfo.data.weather[0].main.toLowerCase());

    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      alert('Cidade não encontrada ou erro na conexão.');
    }
  }

  function updateBackground(currentTheme, weatherCondition) {
    let newBackground = backgroundMap[currentTheme][weatherCondition];
    if (!newBackground) {
      newBackground = backgroundMap[currentTheme]['default'];
    }
    setBackgroundStyle({ background: newBackground });
  }

  return (
    <div className={`container ${theme}-mode`} style={backgroundStyle}>
      {theme === 'day' && (
        <>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
          <div className="cloud cloud4"></div>
          <div className="cloud cloud3"></div>
        </>
      )}
      {theme === 'night' && (
        <>
          <div className="star star1"></div>
          <div className="star star2"></div>
          <div className="star star3"></div>
          <div className="star star4"></div>
          <div className="star star5"></div>
          <div className="star star6"></div>
          <div className="star star7"></div>
          <div className="star star8"></div>
          <div className="star star9"></div>
          <div className="star star10"></div>
        </>
      )}

      <h1>Previsão do Tempo</h1>
      <div className="search-container">
        <input ref={inputRef} type='text' placeholder='Buscar cidade' />
        <button onClick={searchCity}>Buscar</button>
      </div>
      {/* Corrigido: As props agora correspondem aos estados */}
      {Weather && <WeatherInformations Weather={Weather} />}
      {Weather5Days && <WeatherInformations5Days Weather5Days={Weather5Days} />}
    </div>
  );
}


export default App;