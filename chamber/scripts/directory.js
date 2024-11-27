const url = "./data/members.json"

const membersDiv = document.querySelector('#members') 

async function  getMemberData(){
    const response = await fetch(url)
    const data = await response.json()
    
    displayMembers(data.members)
}

getMemberData()

const displayMembers = (members)=>{
    //Clear member display area
    while(membersDiv.firstChild)
        membersDiv.removeChild(membersDiv.firstChild)

    //Create a card for each business
    members.forEach((member)=>{
        //Create HTML Elements
        const card = document.createElement('div')
        const name = document.createElement('h2')
        const tagline = document.createElement('p')
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
        card.appendChild(name)
        card.appendChild(tagline)
        card.appendChild(info)
        membersDiv.appendChild(card)
    })
}

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