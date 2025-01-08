const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  userProfile: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  contactInfo: {
    phoneNumber: { type: String, required: true },
    alternatePhone: { type: String },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  employmentInfo: {
    jobTitle: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    companyName: { type: String },
    experience: { type: Number, required: true },
    resume: { type: String, required: true },
  },
  financialInfo: {
    monthlyIncome: { type: Number, required: true },
    loanStatus: { type: String, required: true },
    loanAmount: { type: Number },
    creditScore: { type: Number, required: true },
  },
  preferences: {
    preferredContact: { type: String, required: true },
    hobbies: { type: [String] },
    newsletter: { type: Boolean },
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
