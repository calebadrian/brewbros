let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "Yeast"

let schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    yeastType: { type: String, required: true },
    attenuationMin: { type: Number, required: true },
    attenuationMax: { type: Number, required: true },
    fermentTempMin: { type: Number, required: true },
    fermentTempMax: { type: Number, required: true },
    alcoholToleranceMin: { type: Number, required: true },
    alcoholToleranceMax: { type: Number, required: true },
    yeastFormat: { type: String, required: true }
})


module.exports = mongoose.model(schemaName, schema)