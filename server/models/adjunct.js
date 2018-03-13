let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId
let schemaName = "Adjunct"

let schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
})


module.exports = mongoose.model(schemaName, schema)