import mongoose from "mongoose";
const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  officeLocation: [String], // e.g., ["Bengaluru", "Hyderabad"]
  companyImage: { type: String }, // URL to company image
  applyLink: { type: String },
  contact: {
    name: String,
    email: String,
    phone: String,
    designation: String
  },
  jobDescription: String,
  hiringProcess: [{
    type: { type: String }, // e.g., "Presentation", "Assessment", "Interview"
    mode: String, // e.g., "Hybrid", "Online"
    date: Date,
    details: String
  }],
  opportunityType: {
    type: String, // e.g., 'Summer Internship', 'Winter Internship', 'Full Time', '6M+FullTime', etc.
    required: true
  },
  durationWeeks: Number, // For internships
  joiningDate: Date, // For internships or jobs
  graduationYear: Number,
  compensation: {
    ctc: String,
    details: String
  },
  eligibility: {
    cgpa: Number,
    activeBacklogsAllowed: { type: Boolean, default: false },
    departments: [String]
  },
  deadline: Date,
  datePosted: { type: Date, default: Date.now }
});

export default mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema);