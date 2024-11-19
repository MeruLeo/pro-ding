const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        icon: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["تعویق", "برنامه ریزی", "انجام شده", "لغو شده"],
            default: "برنامه ریزی",
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        message: {
            type: String,
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

schema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "project",
});

module.exports = mongoose.model("Project", schema);
