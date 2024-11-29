import { getMemberData, createSpotlightCard } from "./members.js"

const membersDiv = document.querySelector('#members') 

const data = await getMemberData()

//Create a card for each business
data.members.forEach((member)=>{
    const card = createSpotlightCard(member)
    membersDiv.appendChild(card)
})

const grid = document.querySelector('#grid')
const list = document.querySelector('#list')

grid.addEventListener('click',()=>{
    grid.classList.add('active')
    list.classList.remove('active')

    membersDiv.classList.remove('list')
    membersDiv.classList.add('grid')
})

list.addEventListener('click',()=>{
    list.classList.add('active')
    grid.classList.remove('active')

    membersDiv.classList.remove('grid')
    membersDiv.classList.add('list')
})