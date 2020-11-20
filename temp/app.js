const locationForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#result')

locationForm.addEventListner('submit', (e) => {
    e.priventDefalut()
    const location = search.value
    messageOne.textContent = location
})