let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "Fermentable"

let schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    srmPrecise: { type: Number, required: true },
    moistureContent: { type: Number, required: true },
    dryYield: { type: Number, required: true },
    protein: { type: Number, required: true },
    maxInBatch: { type: Number },
    mashing: { type: String, required: true },
    srmHex: { type: String, required: true }
})


module.exports = mongoose.model(schemaName, schema)