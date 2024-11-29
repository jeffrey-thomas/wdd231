const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=45.63&lon=-122.65&appid=618c310bc47f5aa06ed925624a9e8534&units=imperial`

const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=45.63&lon=-122.65&appid=618c310bc47f5aa06ed925624a9e8534&units=imperial&cnt=24`

const apiCall = async (url)=>{
    const resp = await fetch(url)
    const data = await resp.json()
    return data
}

const fetchWeather = async ()=>{
    return await apiCall(weatherUrl)
}

const fetchForecast = async ()=>{
    return await apiCall(forecastUrl)
}

export { fetchWeather, fetchForecast }