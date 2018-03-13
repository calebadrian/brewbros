var router = require('express').Router();
var Recipe = require('../models/recipe');
var Users = require('../models/user');


//Create a Recipe
router.post('recipes', (req, res, next) => {
  req.body.userId = req.session.uid
  Recipe.create(req.body)
    .then(recipe => {
      if (!recipe) {
        return res.status(400).send({ error: "Invalid Id" })
      }
      return res.send(recipe)
    })
    .catch(next)
})

//Edit a Recipe
router.put('recipes/:recipeId', (req, res, next) => {
  Recipe.findByIdAndUpdate(req.params.recipeId, req.body)
    .then(recipe => {
      return res.send(recipe)
    })
    .catch(next)
})

//Delete a recipe
router.delete('recipes/:recipeId', (req, res, next) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      recipe.remove()
      return res.send({
        message: 'Sucessfully deleted Recipe'
      })
    })
    .catch(next)
})



//Get Users Recipes
router.get(':id/recipes', (req, res, next) => {
  Recipe.find({userId: req.session.uid})
    .then(recipe => {
      return res.send(recipe)
    })
    .catch(next)
})



module.exports = { router };