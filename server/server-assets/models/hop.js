let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "Hops"

let schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    alphaAcidMin: { type: Number, required: true, default: 7 },
    betaAcidMin: { type: Number, required: true },
    betaAcidMax: { type: Number },
    humuleneMin: { type: Number },
    humuleneMax: { type: Number },
    caryophylleneMin: { type: Number },
    caryophylleneMax: { type: Number },
    cohumuloneMin: { type: Number },
    cohumuloneMax: { type: Number },
    myrceneMin: { type: Number },
    myrceneMax: { type: Number },
    farneseneMin: { type: Number },
    farneseneMax: { type: Number }
})


module.exports = mongoose.model(schemaName, schema)