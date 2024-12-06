    const mongoose = require("mongoose");


    const userSchema  = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        goal: {
            type: String,
        },


        purchases: [ 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Purchase",
            }
        ]

        });

        module.exports = mongoose.model("User", userSchema);

