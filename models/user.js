const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName : {
            type : String,
            required : [true,"Please enter username"],
            unique :[true,"Username exits already"]

        },
        password : {
            type:String,
            required : [true,"Please enter a password"],
            minlength : [8,"Minimum password length is 8"],
        },
        admin:{
            type:Boolean,
            default:false
        }
        
    }
)
// userSchema.pre("save" , async function(next){
//     const salt = await Bcrypt.genSalt()
//     this.password = await Bcrypt.hash(this.password,salt)
//     next()

// })


module.exports = mongoose.model("User",userSchema)