var router = require('express').Router();
var Recipe = require('../models/recipe');
var Fermentables = require('../models/fermentable');



//Create a Fermentables
router.post('/api/recipe/:recipeId/fermentables', (req, res, next) => {
  Fermentables.create(req.body)
    .then(fermentable => {
      if (!fermentable) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(fermentable)
    })
    .catch(next)
})

//Edit a Fermentable
router.put('/api/recipe/:recipeId/fermentables/:fermentableId', (req, res, next) => {
  Fermentables.find({recipeId: req.params.recipeId, fermentableId: req.params.fermentableId}, req.body)
    .then(fermentable => {
      return res.send({
        message: 'Sucessfully updated the Fermentables',
        data: fermentable
      })
    })
    .catch(next)
})

//Delete a Fermentable
router.delete('/api/recipe/:recipeId/fermentables/:fermentableId', (req, res, next) => {
  Fermentables.findById(req.params.fermentableId)
    .then(fermentable => {
      return res.send({
        message: 'Successfully deleted the Fermentable'
      })
    })
    .catch(next)
})

//Get fermentables by Recipe
router.get('/api/recipes/:recipeId/fermentables', (req, res, next) => {
  Fermentables.find({ recipeId: req.params.recipeId })
    .then(fermentable => {
      return res.send(fermentable)
    })
    .catch(next)
})



module.exports = { router };