let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "BrewingSession"

let schema = new Schema({
    recipe: {},
    creatorId: { type: ObjectId, ref: 'User', required: true },
    private: { type: Boolean, default: false },
    startBrewing: {
        type: String,
        required: true,
    },
    endBrewing: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model(schemaName, schema)