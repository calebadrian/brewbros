let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "Recipe"

let schema = new Schema({
    name: { type: String, required: true },
    batchSize: { type: Number, required: true },
    public: { type: Boolean, default: true },
    style: { type: String, required: true },
    subStyle: { type: String },
    boilTime: { type: Number, required: true },
    personalComments: { type: String },
    creatorId: { type: ObjectId, ref: 'User', required: true },
    fermentables: [{}],
    steepingGrains: [{}],
    hops: [{}],
    yeasts: [{}],
    adjuncts: [{}],
    created: { type: Number, required: true, default: Date.now() },
})


module.exports = mongoose.model(schemaName, schema)