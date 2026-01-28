
const logoutUser = (req, res, next) => {    
    req.logout((err)=>{
        if(err) return next(err)
        
        req.session.destroy(()=>{
            res.clearCookie("connect.sid")
            res.send({status : "successfuly logout"})
        })
    })
};
    
export default logoutUser