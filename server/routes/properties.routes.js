const { findAllProperty, findOneSingleProperty, updateExistingProperty, deleteAnExistingProperty, createNewProperty } = require("../controllers/property.controller");

module.exports = app => {
    app.get("/api/properties/", findAllProperty);
    app.get("/api/properties/:id", findOneSingleProperty);
    app.put("/api/properties/update/:id", updateExistingProperty);
    app.post("/api/properties/new", createNewProperty);
    app.delete("/api/properties/delete/:id", deleteAnExistingProperty);
};