const mongoose = require('mongoose');
const schema = mongoose.Schema({
    VaccinationID: Number,
    PetName: String,
    VaccinationType: String,
    VaccinationDate: Date,
    NextDueDate: Date
});
module.exports = mongoose.model("Petvaccination", schema);
