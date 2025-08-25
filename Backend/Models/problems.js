import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    reviewed: {
        type: Boolean,
        default: false,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    revisionCount: {
        type: Number,
        default: 0
    },
    nextRevision: {
        type: Date,
    }
}, {timestamps: true});

problemSchema.index({ link: 1, user: 1 }, { unique: true });

export const Problems = mongoose.model('Problems', problemSchema);