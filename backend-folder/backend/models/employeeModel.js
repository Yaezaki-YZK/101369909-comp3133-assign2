const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  salary: { type: Number, required: true }
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
