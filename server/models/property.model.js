const { model, Schema } = require('mongoose');

const PropertySchema = new Schema({
    propertyName: {
        type: String,
        required: [true, 'Este es un campo requerido'],
        maxlength: [150, 'No debe excer los 150 caracteres']
    },
    description: {
        type: String,
        required: [true, 'Este es un campo requerido'],
        maxlength: [300, 'No debe excer los 300 caracteres']
    },
    location: {
        type: String,
        required: [true, 'Este es un campo requerido'],
    },
    likes: {
        type: Number, 
        default: 0
    },
    isSold: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'Este es un campo requerido'],
        min: [0, 'Propiedad no puede valer 0 pesos']
    },
    owner: {
        type: String,
        required: [true, 'Este es un campo requerido'],
        maxlength: [150, 'No debe excer los 150 caracteres']
    }
}, {timestamps: true});

const Property = model('Property', PropertySchema);

module.exports = Property;