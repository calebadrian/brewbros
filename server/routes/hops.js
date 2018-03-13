var router = require('express').Router();
var Recipe = require('../models/recipe');
var Hops = require('../models/hop');



//Create a Hop
router.post('recipe/:recipeId/hops', (req, res, next) => {
  Hops.create(req.body)
    .then(hop => {
      if (!hop) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(hop)
    })
    .catch(next)
})

//Edit a Hop
router.put('recipe/:recipeId/hops/:hopId', (req, res, next) => {
  Hops.find({recipeId: req.params.recipeId, hopId: req.params.hopId}, req.body)
    .then(hop => {
      return res.send({
        message: 'Sucessfully updated the Hops',
        data: hop
      })
    })
    .catch(next)
})

//Delete a Hop
router.delete('recipe/:recipeId/hops/:hopId', (req, res, next) => {
  Hops.findById(req.params.hopId)
    .then(hop => {
      return res.send({
        message: 'Successfully deleted the Hop'
      })
    })
    .catch(next)
})

//Get hops by Recipe
router.get('/recipes/:recipeId/hops', (req, res, next) => {
  Hops.find({ recipeId: req.params.recipeId })
    .then(hop => {
      return res.send(hop)
    })
    .catch(next)
})



module.exports = { router };