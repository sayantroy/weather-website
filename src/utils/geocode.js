const request=require('postman-request')

const geocode=(place,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiaG9sYWNoaWthNjkiLCJhIjoiY2t4dWxraGx2MHlkcjJub3oyZGx2NmZ6aCJ9.SywSUyX10f5yaYEyrFfR_Q&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined,{
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode

