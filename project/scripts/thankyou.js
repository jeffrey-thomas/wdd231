import { birdData as birds } from "./data.js"

const url = location.href

const parameters = url.split('?')[1]

const values = {}

parameters.split('&').forEach((pair)=>{
    const strings = pair.split('=')
    values[strings[0]] = 
    strings[1].replace('%40','@')
              .replace('%28','(')
              .replace('%29',')')
              .replace('+',' ')
})

const bird = birds.clades[values['group']].subgroups[values['subgroup']].birds[values['species']]

document.querySelector('#bird').innerText = `${bird.commonName} (${bird.scientificName})`

document.querySelector('#location').innerText = values['location']
document.querySelector('#date').innerText = values['date']

let contributor = values['name']
if(!contributor)
    contributor = 'Anonymous'
document.querySelector('#name').innerText = contributor
