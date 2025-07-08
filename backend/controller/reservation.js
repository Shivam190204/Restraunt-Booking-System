import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservation.js"; // Confirm this path and export style

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, time, date,guest } = req.body;

    if (!firstName || !lastName || !email || !phone || !time || !date ||!guest) {
        return next(new ErrorHandler("Please fill out the entire form!", 400));
    }

    try {
        // Corrected: Mongoose create() expects an object
       await Reservation.create({ firstName, lastName, email, phone, time, date,guest });

        res.status(200).json({
            success: true, // Corrected typo 'sucess' -> 'success'
            message: "Reservation sent successfully!" // Corrected typo 'sucessfully' -> 'successfully'
        });
    } catch (error) {
        // --- CRUCIAL DEBUGGING STEP: Log the actual error ---
        console.error("Error during reservation creation:", error); // This will show you the exact error

        // Initialize variables for the error message and status code
        let errorMessage = error.message || "Internal Server Error!"; // Default message if error.message is not set
        let statusCode = error.statusCode || 500; // Default status code

        // Check if the error is a Mongoose Validation Error (Case-sensitive!)
        if (error.name === 'ValidationError') { // FIX: Changed 'validationError' to 'ValidationError'
            // Map validation errors to their messages
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            // Join them into a single string for the error message
            errorMessage = validationErrors.join(', ');
            statusCode = 400; // Validation errors are typically Bad Request
        }

        // If it's another type of error (e.g., MongooseError, network error),
        // it will fall through, using the default errorMessage and statusCode (500).
        // You could add specific handling for other error types if needed here.

        // Pass the determined error message and status code to your ErrorHandler
        return next(new ErrorHandler(errorMessage, statusCode));
    }
    return next(error);
};