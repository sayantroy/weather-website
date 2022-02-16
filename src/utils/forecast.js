const request=require('postman-request')

const forecast=(lat,long,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=24642bab69b04885effc88fb87de848a&query=${lat},${long}`
    request({url,json:true},(error,{body}={})=>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        callback(undefined,
            {ctemp:body.current.temperature,
            wf:body.current.weather_descriptions[0]
        })
})
}
module.exports=forecast

