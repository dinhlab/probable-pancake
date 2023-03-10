import { useState, useEffect } from 'react'

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
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type='text'
          placeholder='City'
        />
        <button>Search</button>
      </form>
      {loading
        ? (
          <div>Loading...</div>
          )
        : (
          <>
            {errorMessage
              ? (
                <div style={{ color: 'red' }}>{errorMessage}</div>
                )
              : (
                <div>{weatherInfo}</div>
                )}
          </>
          )}
    </>
  )
}

export default App
