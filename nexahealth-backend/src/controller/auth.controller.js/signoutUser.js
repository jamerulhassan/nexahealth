import { GovtUser } from "../../models/govtUserModelSchema.js";
import { HospitalUser } from "../../models/hospitalUserModelSchema.js";

const signoutUser = async (req, res, next) =>{
    console.log(req.user.role);
    
try{
    let deletedUser;
    if(req.user.role === 'hospital'){
        deletedUser = await HospitalUser.deleteOne({_id : req.user._id})
    }else{
        deletedUser = await GovtUser.deleteOne({_id : req.user._id})
    }
    req.logout((err)=>{
    if(err) return next(err)
    
    req.session.destroy(()=>{
        res.clearCookie("connect.sid")
        if(deletedUser){
            return res.send({status : "successfuly signout"})
        }
    })
    })
    }catch(err){
        return next(err)
    }
}
export default signoutUser; 