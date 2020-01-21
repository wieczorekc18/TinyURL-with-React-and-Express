const express = require('express')
const router = express.Router()

const Url = require('../models/url')

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// the GET request

router.get('/:code', async (req, res)=>{
    try {
        const url = await Url.findOne({ urlCode: req.params.code})

        if(url){
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json("URL not found")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json('Server Error')
    }
})


module.exports = router