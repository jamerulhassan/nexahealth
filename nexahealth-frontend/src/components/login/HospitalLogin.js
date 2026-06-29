import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import axios from "axios";


const HospitalLogin = ({handleLogAndSign, setRegisteredHospital}) => {
  const nav = useNavigate()
  const [hospitalId, setHospitalId] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrmsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setErrmsg("")
      setIsLoading(true)
      console.log("above");
      
      const response = await axios.post("https://nexahealth-backend-yxs1.onrender.com/auth/login",{id : hospitalId,password, role : "hospital"},{withCredentials : true})
      localStorage.setItem("registerHospitalDetails", JSON.stringify(response.data.hospitalInfo))
      setRegisteredHospital(response.data.hospitalInfo)
      if(response.data.status === "successfuly login"){

        nav("/hospitalDashboard")
        handleLogAndSign("hospital")
      }else if(response.data.status === "userNotFound"){
        
        
        setErrmsg("You didn't register yet!! Do the Signup")
      }else if(response.data.status === "password Incorrect"){
        setErrmsg("Enter the correct password")
      }
    }
    catch(err){
      console.log(err);
      
      const message = err.response || "Something went wrong";
  setErrmsg(message);

    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-3">🏨 Hospital Login 🏨</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Hospital ID</label>
            <input
              type="text"
              className="form-control"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100">Login</button>
        </form>


      </div>
      {isLoading ? <Loading/> : errMsg}
    </div>
    
  );
};

export default HospitalLogin;
