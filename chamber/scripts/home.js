import { fetchForecast, fetchWeather } from "./weather.js";
import { getMemberData, createSpotlightCard } from "./members.js";

///////////////////////////////////////////////////////////////////
//Weather Section
///////////////////////////////////////////////////////////////////

//get current weather
const weather = await fetchWeather()

//get elements to display current weather
const temperature = document.querySelector('#weather-temp')
const icon = document.querySelector('#weather-icon')
const description = document.querySelector('#weather-desc')

//set inner text of elements to display current weather
temperature.innerText = `${weather.main.temp} °F`
icon.src=`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
description.innerText = weather.weather[0].description

//get 3 day forecast
const forecastDiv = document.querySelector('#forecast')
const forecasts = await fetchForecast()
//display forecast 
forecasts.list.forEach((forecast)=>{

    const date = new Date(forecast.dt_txt)

    const tile = document.createElement('div')
    tile.classList.add('forecast-tile')
    
    const temp = document.createElement('p')
    temp.classList.add('bold')
    temp.innerText = `${forecast.main.temp} °F`

    const time = document.createElement('p')
    time.innerText = date.toLocaleTimeString('en-US',{timeStyle:'short'})

    const day = document.createElement('p')
    day.innerText = date.toLocaleDateString("en-US",{dateStyle:'short'})
    
    tile.appendChild(temp)
    tile.appendChild(time)
    tile.appendChild(day)

   forecastDiv.appendChild(tile)
})

//////////////////////////////////////////////////////////////
//Spotlights Section
//////////////////////////////////////////////////////////////

//get members and filter to only gold and silver level
let spotlightMembers = (await getMemberData()).members.filter((member)=>member.membership>1)

//get 2 random gold or silver members

let index = Math.floor(Math.random()*spotlightMembers.length)   //generate random index

const spotlight1 = spotlightMembers[index]                      //get member at index
spotlightMembers.splice(index,1)          //remove member from list of possibilities

index = Math.floor(Math.random()*spotlightMembers.length)       //generate another random index
const spotlight2 = spotlightMembers[index]                      //get member at second index

//Display spotlights
const spotlights = document.querySelector('#spotlight-cards')
spotlights.appendChild(createSpotlightCard(spotlight1))
spotlights.appendChild(createSpotlightCard(spotlight2))

