import mongoose from "mongoose";
/* 
const loginData = {
      govtId,
      password,
    };
*/
const govtUserModelSchema = new mongoose.Schema({
    govtId:{
        type: mongoose.Schema.Types.String,
        required : true,
        unique:true
    },
    password : {
        type : mongoose.Schema.Types.String,
    }
})

export const GovtUser = mongoose.model("GovtUser", govtUserModelSchema);