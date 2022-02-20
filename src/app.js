const express = require('express')
const hbs=require('hbs')
const path=require('path')
const app = express()
const port = process.env.PORT||3000
const forecast = require('./utils/forecast')
const geocode=require('./utils/geocode')

//setup directory path
const publicdirectory=path.join(__dirname,'../public')
const partialspath=path.join(__dirname,'../templates/partials')

//setup static directory
app.use(express.static(publicdirectory))

//setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialspath)


app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather app',
    name:'Sayan'
  })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'Nothing special.Heres a meme!!',
        name:'Sayan'
    })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error:'Not a valid query!!'
    })
  }
  geocode(req.query.address,(error,{lat,long,location}={})=>{
    if(error)
    {
      return res.send({
        error:'Try another search.Unable to find location'
      })
    }else
      forecast(lat,long,(error,data)=>{
         res.send({
          location,
          weather_forecast:data.wf
         })
        })
    })
})

 

app.get('*',(req,res)=>{
  res.send("Its a 404 page")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})