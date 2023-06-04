import { useState, useEffect } from 'react'
import './App.css'
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App () {
  const [searchInput, setSearchInput] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [weatherInfo, setWeatherInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return
      setLoading(true)
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`
        const response = await fetch(url)
        const data = await response.json()
        if (response.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country}, ${data.main.temp}°C, ${data.weather[0].description}`
          )
          setErrorMessage('')
        } else {
          setErrorMessage(data.message)
        }
      } catch (e) {
        setErrorMessage(e.message)
      }
      setLoading(false)
    }
    fetchWeatherData()
  }, [searchCity])
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchCity(searchInput)
  }
  return (
    <div className='min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center bg-gray-100' style={{ backgroundImage: "url('https://picsum.photos/id/62/2000/1333/')" }}>
      <form className='max-w-md mx-auto p-4 bg-white rounded shadow' onSubmit={handleSubmit}>
        <input
          className='w-full px-4 py-2 mb-2 border border-gray-300 rounded'
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type='text'
          placeholder='City'
        />
        <button
          className='w-full px-4 py-2 bg-blue-500 text-white rounded'
          type='submit'
        >
          Search
        </button>
      </form>
      {loading
        ? (
          <div className='mt-4 text-center text-gray-500'>Loading...</div>
          )
        : (
          <>
            {errorMessage
              ? (
                <div className='font-serif text-3xl text-white'>{errorMessage}</div>
                )
              : (
                <div className='text-center mt-4'>
                  <p className='font-serif text-3xl text-white'>{weatherInfo}</p>
                </div>
                )}
          </>
          )}
    </div>
  )
}
export default App
