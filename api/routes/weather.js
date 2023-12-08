const express = require('express')
const axios = require('axios')
const router = express.Router();

router.get('/',async(req,res,next)=>{
    let lat=21.9611136;
    let lon= 96.0987136;
  let   apiKey =  "aca0bb32cae2d034ae52c199ab82f37b"

    //"https://api.openweathermap.org/data/2.5/weather?units=metric&q=pyay&appid=aca0bb32cae2d034ae52c199ab82f37b"

    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    let weather = result.data;
    res.json(weather);

})

module.exports=router