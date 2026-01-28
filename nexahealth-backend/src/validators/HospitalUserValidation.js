export const HospitalUserValidation = {
    hospitalId :{
        notEmpty:{
            errorMessage:"Id must not be empty"
        },
        isString :{
            errorMessage : "Id must be a string"
        }
    },
    password : {
        notEmpty:{
            errorMessage:"password must not be empty"
        }
    }
}