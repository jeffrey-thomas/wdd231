import { birdData as birds } from "./data.js"

const scientificCtrl = document.querySelector('#scientific-ctrl')
scientificCtrl.checked = localStorage.getItem('scientificNames')==="true"

const groupSelect = document.querySelector('#group')
const familySelect = document.querySelector('#subgroup')
const speciesSelect = document.querySelector('#species')

function createPlaceholderOption(message, parent){
    const placeholder = document.createElement('option')
    placeholder.value = ""
    placeholder.selected = true
    placeholder.disabled = true
    placeholder.innerText = message
    parent.appendChild(placeholder)
}

function populateSelectOrder(preserveValue){
    
    //preserve selection
    const oldValue = groupSelect.value

    //remove old options
    while(groupSelect.firstChild)
        groupSelect.removeChild(groupSelect.firstChild)

    //add placeholder
    createPlaceholderOption("Select a Group",groupSelect)

    //add options
    birds.clades.forEach((clade,index)=>{
        
        const option = document.createElement('option')
        option.value=index
        if(scientificCtrl.checked)
            option.innerText = clade.scientificName
        else
            option.innerText = clade.commonName

        groupSelect.appendChild(option)
    }) 

    //restore selection
    if(preserveValue)
        groupSelect.value = oldValue
}

function populateSelectFamily(preserveValue, order){
    
    //preserve value
    const oldValue = familySelect.value

    //remove old options
    while(familySelect.firstChild)
        familySelect.removeChild(familySelect.firstChild)

    //Make sure a group is selected
    if(order===""){
        createPlaceholderOption("Select a group first.",familySelect)
        return        
    }

    //add placeholder
    createPlaceholderOption("Select a Subgroup",familySelect)

    //add subgroup options
    birds.clades[order].subgroups.forEach((family,index)=>{
        const option = document.createElement('option')
        option.value=index
        if(scientificCtrl.checked)
            option.innerText = family.scientificName
        else
            option.innerText = family.commonName

        familySelect.appendChild(option)
    })


    //restore value
    if(preserveValue)
        familySelect.value = oldValue
    else
    //Autoselect if there is only one option
        if(birds.clades[order].subgroups.length===1){
            familySelect.value = 0
        }
}

function populateSelectSpecies(preserveValue, order, family){

    //preserve value
    const oldValue = speciesSelect.value

    //remove old options
    while(speciesSelect.firstChild)
        speciesSelect.removeChild(speciesSelect.firstChild)

    //Make sure a group and subgroup are selected
    if(family===""){
        createPlaceholderOption("Select a group and subgroup first.",speciesSelect)
        return        
    }

    //add placeholder
    createPlaceholderOption("Select a Species",speciesSelect)

    //add species options
    birds.clades[order].subgroups[family].birds.forEach((species,index)=>{
        const option = document.createElement('option')
        option.value=index
        if(scientificCtrl.checked)
            option.innerText = species.scientificName
        else
            option.innerText = species.commonName

        speciesSelect.appendChild(option)
    })

    //restore value
    if(preserveValue)
        speciesSelect.value = oldValue
    else
        //Autoselect if only one option
        if(birds.clades[order].subgroups[family].birds.length===1)
            speciesSelect.value = 0    
}

scientificCtrl.addEventListener('change',(event)=>{
    populateSelectOrder(true)
    populateSelectFamily(true,groupSelect.value)
    populateSelectSpecies(true, groupSelect.value, familySelect.value)
    localStorage.setItem('scientificNames',event.target.checked)
})

groupSelect.addEventListener('change',(event)=>{
    familySelect.value=""
    speciesSelect.value=""
    populateSelectFamily(false,event.target.value)
    populateSelectSpecies(false,event.target.value,familySelect.value)
})

familySelect.addEventListener('change',(event)=>{
    speciesSelect.value=""
    populateSelectSpecies(false,groupSelect.value, event.target.value)
})

populateSelectOrder()
