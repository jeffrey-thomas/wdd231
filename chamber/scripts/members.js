const url = "./data/members.json"

async function  getMemberData(){
    const response = await fetch(url)
    const data = await response.json()
    
    return data
}

function createSpotlightCard(member){
    //create Elements
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const tagline = document.createElement('p')
    const level = document.createElement('p')
    const info = document.createElement('div')
    const logo = document.createElement('img')
    const address = document.createElement('p')
    const phone = document.createElement('p')
    const url = document.createElement('a')

    //Populate elements
    card.classList.add('member-card')

    name.innerText=member.name
    name.classList.add('member-name')

    tagline.innerText = member.tagline
    tagline.classList.add('member-tagline')

    switch(member.membership){
        case 2:
            level.innerText = 'Silver Member'
            break;
        case 3:
            level.innerText = 'Gold Member'
            break;
        default:
            level.innerText = 'Member'
    }
    level.classList.add('member-level')

    info.classList.add('member-info')

    logo.src = member.imageurl
    logo.alt = `Logo for ${member.name}`
    logo.loading = 'lazy'
    logo.setAttribute('width',80)
    logo.setAttribute('height',80)
    logo.classList.add('member-logo')

    address.innerText = member.address
    address.classList.add('member-address')

    phone.innerText = member.phone
    phone.classList.add('member-phone')

    url.href = `http:\\\\${member.url}`
    url.innerText = member.url
    url.classList.add('member-url')

    //Append elements to page
    info.appendChild(logo)
    info.appendChild(address)
    info.appendChild(phone)
    info.appendChild(url)
    card.appendChild(level)
    card.appendChild(name)
    card.appendChild(tagline)

    card.appendChild(info)

    return card
}

export { getMemberData, createSpotlightCard }