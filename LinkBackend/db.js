// db.js
const mongoose = require("mongoose");

// MongoDB connection string
const mongoURI =
  "mongodb+srv://munirshahzad044:Shahzad%40713@whatapplink.vnrv60l.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

// Define a Job model
const JobSchema = new mongoose.Schema({
  name: String,
  category: String,
  createdAt: String,
  views: Number,
  link: String,
});

const Job = mongoose.model("Job", JobSchema);

module.exports = { mongoURI, Job };
