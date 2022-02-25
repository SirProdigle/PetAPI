const mongoose = require('mongoose'),Schema = mongoose.Schema;
const insuranceEnum = ["Fully Covered", "Accident Only", "No Cover"]
const typeEnum = ['Dog', 'Cat', 'Lizard', "Other"]

PetSchema = new Schema({
    name: {
        type: String,
        maxlength: [200, 'Name must be less than 200 characters'],
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 200,
        required: true
    },
    type: {
        type: String,
        enum: typeEnum,
        required: true
    },
    insuranceStatus: {
        type: String,
        enum: insuranceEnum,
        required: true
    }
});

Pet = mongoose.model("Pet",PetSchema);
module.exports = Pet;        
