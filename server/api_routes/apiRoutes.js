var router = require('express').Router();
var axios = require('axios')

var key = '?key=e96ab9f00ea6c4d6e6ad50967fc0627d'
let beerDB = axios.create({
  baseURL: 'http://api.brewerydb.com/v2/',
  timeout: 10000
})


router.get('/api/styles', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/styles' + key)
    .then(response => {
      console.log(response)
      res.send(response.data.data)
    })
})





module.exports = { router };