const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique:true
    },
    firstName: { 
        type: String,
        required: [true, "Name field is required"],
        validate: {
            validator: function(v) {
                return v.length>=3;
            },
            message: props => `${props.value} is too short,\nname must be at least 3 characters long`
        },
        trim: true
     },


    lastName: { 
        type: String,
        required: [true, "Name field is required"],
        validate: {
            validator: function(v) {
                return v.length>=3;
            },
            message: props => `${props.value} is too short,\nname must be at least 3 characters long`
        },
        trim: true
     },
    
    middleName: {
        type: String,
        validate: {
            validator: function(v) {
                return v.length>=3;
            },
            message: props => `${props.value} is too short,\nname must be at least 3 characters long`
        },
        trim: true
    },
    username: { 
        type: String, 
        required: [true, "this field is required"],
        validate: {
            validator: function(v) {
                return v.length>=5;
            },
            message: (props) => `${props.value} is too short,\nusername must be at least 5 characters long`
        },
        trim: true
    },
    
    age: { 
        type: Number, 
        min: [16, "you must be up to 16"],
        max: [100, "Age cannot exceed 100."] },
    
    email: { type: String, unique: true},
    
    password: {
        type: String, 
        required: [true, "Password must be provided"],
        minlength:[8, "password must be at least 8 characters"],
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$$%^&*]).{8,}$/.test(v);

            },
            message: props => "Password must contain :\nAt least one capital letter\nAt least one small letter\nAt least one number\nAt least one special character"
        }
    },
    
    created_at: {type: Date, default: Date.now}
});


userSchema.virtual("name").get(function () {
    return `${this.firstName} ${this.middleName} ${this.lastName} `;
});

const User = mongoose.model("User", userSchema);


module.exports = User;
