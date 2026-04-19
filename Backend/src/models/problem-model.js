const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    platform: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    revisionCount: {
        type: Number,
        default: 0,
    },
    reviewed: {
        type: Boolean,
        default: false,
    },
    reviewedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });


problemSchema.index({ link: 1, user: 1 }, { unique: true });

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;