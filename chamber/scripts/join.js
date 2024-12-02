const timestamp = document.querySelector('#timestamp')
timestamp.value = new Date()

const levels = [
    {
        name:'Non Profit',
        info:['For non profit organizations', 'no membership fee']
    },
    {
        name:'Bronze Level',
        info:['15% Off Events', '10% Off Advertising', '$50/month']
    },
    {
        name:'Silver Level',
        info:['25% Off Events', '15% Off Advertising', 'Home Page Spotlighting','$100/month']
    },
    {
        name:'Gold Level',
        info:['50% Off Events', '25% Off Advertising', 'Home Page Spotlighting','$250/month']
    },
]


const levelDlg = document.querySelector('#level-dlg')


window.addEventListener('click',(event)=>{
    if(event.target===levelDlg)
        levelDlg.close()
})

function showLevelInfo(level){
    while(levelDlg.firstChild)
        levelDlg.removeChild(levelDlg.firstChild)

    const header = document.createElement('div')
    header.classList.add('dlg-header')

    const closeButton = document.createElement('button')
    closeButton.id = 'close-dialog'
    closeButton.innerText = 'X'

    const title = document.createElement('h3')
    title.innerText = `${levels[level].name} Membership`

    const content = document.createElement('div')
    content.classList.add('dlg-content')

    const list = document.createElement('ul')

    levels[level].info.forEach((bullet)=>{
        const item = document.createElement('li')
        item.innerText = bullet
        list.appendChild(item)
    })

    header.appendChild(title)
    header.appendChild(closeButton)
    content.appendChild(list)
    levelDlg.appendChild(header)
    levelDlg.appendChild(content)

    levelDlg.showModal()

    closeButton.addEventListener('click',()=>{
        levelDlg.close()
    })

}

const nonProfitBtn = document.querySelector('#non-profit-btn')
nonProfitBtn.addEventListener('click',()=>{
    showLevelInfo(0)
})

const bronzeBtn = document.querySelector('#bronze-btn')
bronzeBtn.addEventListener('click',()=>{
    showLevelInfo(1)
})

const silverBtn = document.querySelector('#silver-btn')
silverBtn.addEventListener('click',()=>{
    showLevelInfo(2)
})

const goldBtn = document.querySelector('#gold-btn')
goldBtn.addEventListener('click',()=>{
    showLevelInfo(3)
})