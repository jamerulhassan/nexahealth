import mongoose from 'mongoose'
/* 
const loginData = {
      hospitalId,
      password,
    };
    
*/
const hospitalUserModelSchema = new mongoose.Schema({
    hospitalId:{
        type: mongoose.Schema.Types.String,
        required : true,
        unique:true
    },
    password : {
        type : mongoose.Schema.Types.String,
    }
})

export const HospitalUser = mongoose.model("HospitalUser", hospitalUserModelSchema);