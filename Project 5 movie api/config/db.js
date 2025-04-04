const mongoose = require('mongoose');

const dbURI = "mongodb+srv://vishwaa8420:vishwa08@cluster0.qzx6y.mongodb.net/movie-pr?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("Database Successfully Connected.");
    } catch (err) {
        console.error("Database Connection Failed:", err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
