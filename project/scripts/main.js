const menu = document.querySelector('#menu');
const nav = document.querySelector('nav')

menu.addEventListener('click',()=>{
    menu.classList.toggle('open');
    nav.classList.toggle('open');
})

const year = document.querySelector('#currentyear');
const modified = document.querySelector('#lastmodified');

const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

modified.innerHTML = `Last Modified: ${document.lastModified}`