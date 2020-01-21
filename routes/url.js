const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

const Url = require('../models/url')


router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body
    const baseUrl = config.get('baseUrl')

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid URL')
    }

    const urlCode = shortid.generate()


    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({ longUrl })

            if(url){
                res.json(url)
            }else{
                const shortUrl = baseUrl + '/' + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                await url.save()

                res.json(url)
            }
        } catch (error) {
            console.error(error)
            res.status(500).json('Server Error')
        }
    }else{
        console.log(longUrl)
        res.status(400).json("Invalid URL")
    }
})

module.exports = router
