var router = require('express').Router();
var Recipes = require('../models/recipe');
var Users = require('../models/user');


//Create a Recipe
router.post('recipes', (req, res, next) => {
  req.body.creatorId = req.session.uid
  console.log(req.body)
  Recipes.create(req.body)
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
  Recipes.findByIdAndUpdate(req.params.recipeId, req.body)
    .then(recipe => {
      return res.send(recipe)
    })
    .catch(next)
})

//Delete a recipe
router.delete('recipes/:recipeId', (req, res, next) => {
  Recipes.findById(req.params.recipeId)
    .then(recipe => {
      recipe.remove()
      return res.send({
        message: 'Sucessfully deleted Recipe'
      })
    })
    .catch(next)
})



//Get Users Recipes
router.get('recipes', (req, res, next) => {
  Recipes.find({creatorId: req.session.uid})
    .then(recipe => {
      return res.send(recipe)
    })
    .catch(next)
})



module.exports = { router };