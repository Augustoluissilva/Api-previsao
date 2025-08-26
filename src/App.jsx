import { useState, useRef} from 'react'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'




import './App.css'

function App() {
  const [Weather, setWeather] = useState()
  const [Weather5Days, setWeather5Days] = useState()
  const inputRef = useRef() 

   async function searchCity(){
    console.log(inputRef.current.value)
    const city =inputRef.current.value
    const key = "6b3e9119fa7e399ea1ab3ad48123120e"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const apiInfo = await axios.get(url)
    const apiInfo5Days = await axios.get(url5Days)

    setWeather5Days (apiInfo5Days.data)
    setWeather(apiInfo.data)


  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref ={inputRef} type='text' placeholder ='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button>


      {Weather && <WeatherInformations Weather={Weather} />}
      {Weather5Days && <WeatherInformations5Days Weather5Days={Weather5Days} />}

    </div>
  
  )
}

export default App
