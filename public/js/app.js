
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#loc')
const m2=document.querySelector('#wet')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                m1.innerText=data.error
            else 
            {
                m1.innerText=data.location
                m2.innerText=data.weather_forecast
            }
        })
    })

})