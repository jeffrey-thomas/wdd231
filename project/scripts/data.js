const birdsURL = "./data/birds.json"
const sightingsURL = "./data/sightings.json"

async function  getData(url){
    
    try{
        const response = await fetch(url)
        const data = await response.json()
    
        return data
    }catch(error){
        console.log(error)
        return undefined
    }
}

const birdData = await getData(birdsURL)

const sightingData = await getData(sightingsURL)

export {birdData, sightingData}
