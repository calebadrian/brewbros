let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "BrewingSession"

let schema = new Schema({
    recipe: {},
    creatorId: { type: ObjectId, ref: 'User', required: true },
    private: { type: Boolean, default: false },
    startBrewing: {
        type: Number,
        required: true,
        default: Date.now()
    },
    endBrewing: {
        type: Number,
        default: 0
    },
    bottlingDate: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model(schemaName, schema)