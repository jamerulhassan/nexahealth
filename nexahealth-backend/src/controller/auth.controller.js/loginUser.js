import passport from "passport";

 const loginUser = (req, res, next) => {    
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    
    if (err) return next(err);
    if (!user) {  
      console.log("inside");
                
      return res.json({ status: info});
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ status: "successfuly login", hospitalInfo : user.hospitalInfo});
    });
  })(req, res, next);
};

export default loginUser
