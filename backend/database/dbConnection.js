import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RESTAURANT"
    })
    .then(() => { // Correct: () for no arguments
        console.log("Connected to database successfully!");
    })
    .catch((err) => { // Correct: (err) for one argument, or err => for brevity
        // Also, you're using backticks for string interpolation, which is correct,
        // but ensure the interpolation is within the backticks.
        console.log(`Some error occurred while connecting to the database! ${err}`);
    });
};

export default dbConnection; // Make sure to export this function so your server.js can use it!