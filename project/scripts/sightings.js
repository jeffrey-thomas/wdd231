import { birdData as birds, sightingData } from "./data.js"

let sightings = sightingData.sightings

function getSightingBird(speciesId){
    return birds.clades[speciesId[0]].subgroups[speciesId[1]].birds[speciesId[2]]
}

//Common names vs Scientific Names Control
const scientificCtrl = document.querySelector('#scientific-ctrl')
scientificCtrl.checked = localStorage.getItem('scientificNames')==="true"
scientificCtrl.addEventListener('change',(event)=>{
    populateList(sightings)
    localStorage.setItem('scientificNames',event.target.checked)
})

const applyBtn = document.querySelector('#apply')
applyBtn.addEventListener('click',()=>{
    sightings = sightingData.sightings
    filterCommonName()
    filterLocation()
    sortSightings()
    populateList(sightings)
})

//////////////////////////////////////////////////////////////////////////////
//Sorting
//////////////////////////////////////////////////////////////////////////////
const sorting = document.querySelector("#sorting")

const compareAlpha = (a,b)=>{
    const birdA = getSightingBird(a.speciesId)
    const birdB = getSightingBird(b.speciesId)
    return birdA.commonName.localeCompare(birdB.commonName)
}

const compareAlphaScience = (a,b)=>{
    const birdA = getSightingBird(a.speciesId)
    const birdB = getSightingBird(b.speciesId)
    return birdA.scientificName.localeCompare(birdB.scientificName)
}

const compareLocation = (a,b)=>{
    return a.location.localeCompare(b.location)
}

const compareRecent = (a,b)=>{
    if(a.date < b.date)
        return 1
    
    if(a.date > b.date)
        return -1
    
    return 0
}

const compareOldest = (a,b)=>{
    return -1*compareRecent(a,b)
}

function sortSightings(){
    switch(sorting.value){
        case "alpha":
            populateList(sightings.sort(compareAlpha))
            break;
        case "recent":
            populateList(sightings.sort(compareRecent))
            break;
        case "location":
            populateList(sightings.sort(compareLocation))
            break;
        case "oldest":
            populateList(sightings.sort(compareOldest))
            break;
        case "alphaScience":
            populateList(sightings.sort(compareAlphaScience))
            break;
    }
}

///////////////////////////////////////////////////////////////////////////
//Filtering
///////////////////////////////////////////////////////////////////////////
const commonFilter = document.querySelector('#common-name')

function filterCommonName(){
    sightings =  sightings.filter(
        (sighting)=>{
           return getSightingBird(sighting.speciesId).commonName.toLowerCase().includes(commonFilter.value.toLowerCase())
        }
    )

}

const locationFilter = document.querySelector("#location")

function filterLocation(){
    sightings = sightings.filter(
        (sighting)=>{
            return sighting.location.toLowerCase().includes(locationFilter.value.toLowerCase())
        }
    )
}

///////////////////////////////////////////////////////////////////////////
//Display
///////////////////////////////////////////////////////////////////////////
const table = document.querySelector("#sightings")

function populateList(sightings){

    while(table.firstChild)
        table.removeChild(table.firstChild)

    if(sightings.length==0){
        const row = document.createElement("tr")

        row.innerHTML = `
            <td class="no-match" colspan="4">No Matches Found.</td>
        `
        table.appendChild(row)
    }

    sightings.forEach((sighting)=>{

        const bird = getSightingBird(sighting.speciesId)

        const row = document.createElement("tr")

        row.innerHTML = `
            <td>${scientificCtrl.checked ? bird.scientificName : bird.commonName}</td>
            <td>${sighting.location}</td>
            <td>${sighting.date}</td>
            <td>${sighting.user}</td>
        `
        table.appendChild(row)

    })
}

populateList(sightings)