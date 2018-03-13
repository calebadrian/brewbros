var router = require('express').Router();
var Recipe = require('../models/Recipe');
var Adjucnt = require('../models/Adjunct');



//Create a Adjunct
router.post('recipe/:recipeId/adjuncts', (req, res, next) => {
  Adjuncts.create(req.body)
    .then(adjunct => {
      if (!adjunct) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(adjunct)
    })
    .catch(next)
})

//Edit a Adjunct
router.put('recipe/:recipeId/adjuncts/:adjunctId', (req, res, next) => {
  Adjuncts.find({ recipeId: req.params.recipeId, adjunctId: req.params.adjunctId }, req.body)
    .then(adjunct => {
      return res.send({
        message: 'Sucessfully updated the Adjuncts',
        data: adjunct
      })
    })
    .catch(next)
})

//Delete a Adjunct
router.delete('recipe/:recipeId/adjuncts/:adjunctId', (req, res, next) => {
  Adjuncts.findById(req.params.adjunctId)
    .then(adjunct => {
      return res.send({
        message: 'Successfully deleted the Adjunct'
      })
    })
    .catch(next)
})

//Get adjuncts by Recipe
router.get('/recipes/:recipeId/adjuncts', (req, res, next) => {
  Adjuncts.find({ recipeId: req.params.recipeId })
    .then(adjunct => {
      return res.send(adjunct)
    })
    .catch(next)
})



module.exports = { router };