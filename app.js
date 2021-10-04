const express = require("express")
const https = require("https")
const bodyParse = require("body-parser")


const app = express()
app.use(bodyParse.urlencoded({extended: true}))

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const cityName = req.body.cityName

    const query = cityName
    const apiKey = "6bc0bde3f0a885f344720ec65498414e"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + unit

    https.get(url, (response) =>{
        console.log(response.statusCode)

        response.on("data", (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The current temperature in "+ query +" is " + temp + " degrees Celsius.</h1>")
            res.write("<img src="+ iconURL +">")
            res.send()
        })
    }) 
})



app.listen(3000, () =>{

    console.log("Server is listening on port 3000.")

})