import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Added missing import to fix runtime reference errors

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, "Username must be at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
    },
    { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
    // Agar password modified nahi hai, toh bina kuch kiye yahin se return ho jao
    if (!this.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // NO next() NEEDED HERE! Async function automatically handle kar leta hai.
    } catch (err) {
        throw err; // next(err) ki jagah error throw kijiye, mongoose khud handle karega
    }
});

// Instance method to validate password during session key establishment
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); 
};

const User = mongoose.model("User", userSchema);
export default User;