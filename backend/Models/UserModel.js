import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true,
    },
    Phone:{
        type:String,
        required:true,
    },
    DOB:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Active"
    },
    wishlist: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"  
      }]
},

{
    timestamps:true
})
const UserModel = mongoose.model("UserModel", UserSchema)
export default UserModel