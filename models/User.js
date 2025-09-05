import mongoose from 'mongoose';

import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,   required: true},
    email: {
        type: String, unique: true, required: true},
    password: {
        type: String, required: true},
        // profileImageUrl: {
        // type: String, default: null},
},
{
    timestamps: true,
}); 

// Hash password before saving user
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);