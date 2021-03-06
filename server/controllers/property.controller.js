const Property = require("../models/property.model")

module.exports.findAllProperty = (req, res) => {
    Property.find()
        .then(allProperty => res.json({ properties: allProperty }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleProperty = (req, res) => {
    Property.findOne({ _id: req.params.id })
        .then(oneSingleProperty => res.json({ property: oneSingleProperty }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewProperty = (req, res) => {
    Property.create(req.body)
        .then(newlyCreatedProperty => res.json({ property: newlyCreatedProperty }))
        .catch(err => {
            if(err?.name === 'ValidationError') {
                console.error(err.errors)
                const errors = Object.values(err.errors).map(val => `${val.path}: ${val.message}`);
                return res.status(500).json({errors: errors})

            }
            console.log("🚀 ~ file: user.controller.js ~ line 8 ~ err", err)
        
        })
};

module.exports.updateExistingProperty = (req, res) => {
    Property.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedProperty => res.json({ property: updatedProperty }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingProperty = (req, res) => {
    Property.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};