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

document.querySelector('#given-name').innerText = values['given-name']
document.querySelector('#last-name').innerText = values['last-name']
document.querySelector('#organization').innerText = values['organization']
document.querySelector('#title').innerText = values['title']
document.querySelector('#email').innerText = values['email']
document.querySelector('#phone').innerText = values['phone']