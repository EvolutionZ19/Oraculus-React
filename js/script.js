let datas = []
async function init(){
    datas = await getDatas()
    showDatas(datas, 1)
    changeTop(datas, 1)
}
init()

async function getDatas(){
    const req = await fetch('json/horoscope.json')
    return await req.json()
}

function showDatas(datas, id){
    const signeActuel = datas.find(el => el.id === id)

    document.querySelector('h1').innerText = signeActuel.signe
    document.querySelector('#date').innerText = signeActuel.date

    document.querySelector('#amour').innerHTML = `<span>Amour : </span> ${signeActuel.amour}`
    document.querySelector('#travail').innerHTML = `<span>Travail : </span> ${signeActuel.travail}`
    document.querySelector('#argent').innerHTML = `<span>Argent : </span> ${signeActuel.argent}`
    document.querySelector('#sante').innerHTML = `<span>Santé : </span> ${signeActuel.sante}`
    document.querySelector('#famille').innerHTML = `<span>Famille : </span> ${signeActuel.famille}`
    document.querySelector('#conseil').innerHTML = `<span>Conseil : </span> ${signeActuel.conseil}`

    document.querySelector('aside img').src = signeActuel.image
}


function changeTop(datas, id){
    // Signe précédent
    const prev = id <= 1 ? datas.length : id - 1
    const signePrecedent = datas.find(el => el.id == prev)

    // On peuple celui de gauche
    const left = document.querySelector('.left-horoscope')
    left.innerHTML = `${signePrecedent.signe} <span>${signePrecedent.date} </span>`
    left.dataset.id = prev

    // Signe suivant
    const next = id >= datas.length ? 1 : id + 1
    const signeSuivant = datas.find(el => el.id == next)

    // On peuple celui de droite
    const right = document.querySelector('.right-horoscope')
    right.innerHTML = `${signeSuivant.signe} <span>${signeSuivant.date}</span>`
    right.dataset.id = next
}

// Ajoute les eventlistener sur les flèches
const arrowRight = document.querySelector('.arrow-right')
let index = 1
arrowRight.addEventListener('click', () => {
    index = index >= datas.length ? 1 : index + 1
    showDatas(datas, index)
    changeTop(datas, index)
})

const arrowLeft = document.querySelector('.arrow-left')
arrowLeft.addEventListener('click', () => {
    index = index <= 1 ? datas.length : index - 1
    showDatas(datas, index)
    changeTop(datas, index)
})

//  Afficher la date du jour 
const dateDuJour = new Date()
const jour = dateDuJour.getDate().toString().padStart(2, '0')
const mois = (dateDuJour.getMonth() + 1).toString().padStart(2, '0')
const annee = dateDuJour.getFullYear()

const dateFormatee = `${jour}/${mois}/${annee}`
document.querySelector('#datejour').innerText = `-- HOROSCOPE DU ${dateFormatee}`

// Eventlistener sur les éléments du top
const leftHoroscope = document.querySelector('.left-horoscope')
leftHoroscope.addEventListener('click', () => {
    showDatas(datas, parseInt(leftHoroscope.dataset.id))
    changeTop(datas, parseInt(leftHoroscope.dataset.id))
})

const rightHoroscope = document.querySelector('.right-horoscope')
rightHoroscope.addEventListener('click', () => {
    showDatas(datas, parseInt(rightHoroscope.dataset.id))
    changeTop(datas, parseInt(rightHoroscope.dataset.id))
})