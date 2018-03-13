var router = require('express').Router();
var Recipe = require('../models/Recipe');
var Yeast = require('../models/Yeast');



//Create a Yeast
router.post('recipe/:recipeId/yeasts', (req, res, next) => {
  Yeasts.create(req.body)
    .then(yeast => {
      if (!yeast) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(yeast)
    })
    .catch(next)
})

//Edit a Yeast
router.put('recipe/:recipeId/yeasts/:yeastId', (req, res, next) => {
  Yeasts.find({recipeId: req.params.recipeId, yeastId: req.params.yeastId}, req.body)
    .then(yeast => {
      return res.send({
        message: 'Sucessfully updated the Yeasts',
        data: yeast
      })
    })
    .catch(next)
})

//Delete a Yeast
router.delete('recipe/:recipeId/yeasts/:yeastId', (req, res, next) => {
  Yeasts.findById(req.params.yeastId)
    .then(yeast => {
      return res.send({
        message: 'Successfully deleted the Yeast'
      })
    })
    .catch(next)
})

//Get yeasts by Recipe
router.get('/recipes/:recipeId/yeasts', (req, res, next) => {
  Yeasts.find({ recipeId: req.params.recipeId })
    .then(yeast => {
      return res.send(yeast)
    })
    .catch(next)
})



module.exports = { router };