var router = require('express').Router();
var Recipes = require('../models/recipe');
var Users = require('../models/user');


//Create a Recipe
router.post('/api/recipes', (req, res, next) => {
    req.body.creatorId = req.session.uid
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
router.put('/api/recipes/:recipeId', (req, res, next) => {
    Recipes.findById(req.params.recipeId, req.body)
        .then(recipe => {
            recipe.favorited = req.body
            recipe.markModified('favorited')
            recipe.save()
            return res.send(recipe)
        })
        .catch(next)
})

//Delete a recipe
router.delete('/api/recipes/:recipeId', (req, res, next) => {
    Recipes.findById(req.params.recipeId)
        .then(recipe => {
            recipe.remove()
            return res.send({
                message: 'Sucessfully deleted Recipe'
            })
        })
        .catch(next)
})

//Get All Recipes
router.get('/api/recipes', (req, res, next) => {
    Recipes.find()
        .then(recipe => {
            return res.send(recipe)
        })
        .catch(next)
})

//Get Users Recipes
router.get('/api/recipes/user/:userid', (req, res, next) => {
  Recipes.find({creatorId: req.params.userid})
    .then(recipe => {
      return res.send(recipe)
    })
    .catch(next)
})

router.get('/api/recipes/user/:userid/favorites', (req, res, next) => {
    Recipes.find()
        .then(recipes => {
            var temp = []
            for (var i = 0; i < recipes.length; i++){
                if (recipes[i].favorited.includes(req.params.userid)){
                    temp.push(recipes[i])
                }
            }
            res.send(temp)
        })
        .catch(err => {
            console.error(err)
        })
})

//Get Users Currently Brewing
router.get('/api/recipes/user/currentlyBrewing', (req, res, next) => {
    Recipes.find({ creatorId: req.session.uid })
        .then(recipe => {
            return res.send(recipe)
        })
        .catch(next)
})



module.exports = { router };