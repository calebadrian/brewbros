let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "Recipe"

let schema = new Schema({
    name: { type: String, required: true },
    batchSize: { type: Number, required: true },
    private: { type: Boolean, default: false },
    style: { type: String, required: true },
    subStyle: { type: String },
    boilTime: { type: Number, required: true },
    personalComments: { type: String },
    creatorId: { type: ObjectId, ref: 'User', required: true },
    creatorName: { type: String, required: true },
    fermentables: [{}],
    steepingGrains: [{}],
    hops: [{}],
    yeasts: [{}],
    adjuncts: [{}],
    created: { type: Number, required: true, default: Date.now() },
    favorited: [],
    originalGravity: { type: Number, required: true },
    finalGravity: { type: Number, required: true },
    abv: { type: Number, required: true },
    ibu: { type: Number, required: true },
    color: { type: Number, required: true }
})


module.exports = mongoose.model(schemaName, schema)