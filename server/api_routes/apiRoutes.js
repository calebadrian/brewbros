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
      res.send(response.data.data)
    })
})


router.get('/api/categories', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/categories' + key)
    .then(response => {
      console.log("Categories", response)
      res.send(response.data.data)
    })
})

router.get('/api/fermentables', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/fermentables' + key)
    .then(response => {
      console.log("Fermentables", response)
      res.send(response.data.data)
    })
})

router.get('/api/hops', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/hops' + key)
    .then(response => {
      console.log("Hops", response)
      res.send(response.data.data)
    })
})

router.get('/api/yeasts', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/yeasts' + key)
    .then(response => {
      console.log("Yeasts", response)
      res.send(response.data.data)
    })
})

router.get('/api/adjuncts', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/adjuncts' + key)
    .then(response => {
      console.log("Adjuncts", response)
      res.send(response.data.data)
    })
})


module.exports = { router };