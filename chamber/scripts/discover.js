const lastVisit = localStorage.getItem('last-visit')
const welcome = document.querySelector('#welcome')
const now = new Date()

//Determine welcome messsage
if(lastVisit===null)    //First time visit
    welcome.innerText = `Welcome! Let us know if you have any questions.`
else{
    const last = new Date(lastVisit)

    const days = Math.floor((now.getTime()-last.getTime())/(24 * 60 * 60 * 1000))

    if(days<1) //Visiting again within 24 hours
        welcome.innerText = `Back so soon! Awesome!`
    else    //Visiting again after more than 1 day
        welcome.innerText = `You last visited ${days} day${ days > 1 ? 's' : '' } ago.`
}

//Update last visit in storage
localStorage.setItem('last-visit',now)