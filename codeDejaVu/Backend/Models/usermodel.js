import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        default: './logo.png',
    },
    nemesis: {
        type: String,
        default: "DP"
    }
}, {timestamps: true}); //auto add the createdAt and updatedAt date.


const User = mongoose.model('User', userSchema); 
export default User;