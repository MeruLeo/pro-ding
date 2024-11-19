const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
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
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        visibility: {
            type: String,
            enum: ["private", "public", "restricted"],
            default: "private",
        },
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: function () {
                return this.visibility !== "public";
            },
        },
        allowedMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        isComplite: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const model = mongoose.model("Task", schema);
module.exports = model;
