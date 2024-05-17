const { Schema, model} = require('mongoose');


const hospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  
});

hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
   
    return object;
});

module.exports = model('hospital', hospitalSchema);