var router = require('express').Router();
var BrewingSession = require('../models/brewingSession');

//Create a Brewing Session
router.post('/api/brewingSessions', (req, res, next) => {
    req.body.creatorId = req.session.uid
    BrewingSession.create(req.body)
        .then(recipe => {
            if (!recipe) {
                return res.status(400).send({ error: "Invalid Id" })
            }
            return res.send(recipe)
        })
        .catch(next)
})

//Edit a Session

//maybe come back too????

//Delete a Session
router.delete('/api/brewingSessions/brewingSessionId', (req, res, next) => {
    BrewingSession.findByIdAndRemove(req.params.BrewingSessionId)
        .then(brewingSession => {
            brewingSession.remove()
            return res.send({
                message: 'Sucessfully deleted Brewing Session!'
            })
        })
        .catch(next)
})

//Get Session By User

router.get('/api/user/:userid/brewingSessions', (req, res, next) => {
    BrewingSession.find({ creatorId: req.params.userid })
        .then(brewingSession => {
            return res.send(brewingSession)
        })
        .catch(next)
})

module.exports = { router };