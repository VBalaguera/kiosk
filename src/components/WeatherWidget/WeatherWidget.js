import { useState, useEffect } from 'react'

export default function WeatherWidget() {
  const [lat, setLat] = useState([])
  const [lon, setLong] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      })

      await fetch(
        `
        http://api.weatherapi.com/v1/current.json?key=4be4190797b0425d97e125946222806&q=${lat},${lon}&aqi=no`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result)
          console.log(result)
        })
    }
    fetchData()

    console.log('Latitude is:', lat)
    console.log('Longitude is:', lon)
  }, [lat, lon])
  return (
    <div className='text-light'>
      <h1>WeatherWidget{data.location.name}</h1>
    </div>
  )
}
