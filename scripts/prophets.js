const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function  getProphetData(){
    const response = await fetch(url)
    const data = await response.json()
    // console.table(data)
    displayProphets(data.prophets)
}

const displayProphets = (prophets)=>{
    prophets.forEach((prophet)=>{
        const card = document.createElement('section')
        const fullName = document.createElement('h2')
        const portrait = document.createElement('img')
        const birthdate = document.createElement('p')
        const birthplace = document.createElement('p')

        fullName.innerText=`${prophet.name} ${prophet.lastname}`

        portrait.src = prophet.imageurl
        portrait.alt = `Portrait of ${prophet.name} ${prophet.lastname}`
        portrait.loading = 'lazy'
        portrait.setAttribute('width',347)
        portrait.setAttribute('height',447)

        birthdate.innerText = `Date of Birth: ${prophet.birthdate}`

        birthplace.innerText = `Place of Birth: ${prophet.birthplace}`

        card.appendChild(fullName)
        card.appendChild(birthdate)
        card.appendChild(birthplace)
        card.appendChild(portrait)
        cards.appendChild(card)
    })
}

getProphetData()