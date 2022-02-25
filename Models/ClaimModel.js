const mongoose = require('mongoose'),Schema = mongoose.Schema;
const statusEnum = ['Pending', 'Approved', 'Rejected'];

ClaimSchema = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required : true
    },
    description: {
        type: String,
        required: true,
        maxlength: [5000, "Description must be less than 5000 characters"], //Just to put a hard limit on it, would realistically provide more than enough headroom for anything
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        // Done in pence e.g 100 = £1
        type: Number,
        min : 0,
        validate: {
            validator: num => {
                return num >= 0 &&
                    num.isInteger;
            },
            message: '{VALUE} is not a valid cost!'
        }
    },
    status: {
        type: String,
        enum: statusEnum,
        required: true
    }
});

Claim = mongoose.model("Claim",ClaimSchema);
module.exports = Claim;        
