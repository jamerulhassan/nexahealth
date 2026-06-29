import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const GovtLogin = ({handleLogAndSign}) => {
  const [govtId, setGovtId] = useState("");
  const [password, setPassword] = useState("");
const [errMsg, setErrmsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setErrmsg("")
      setIsLoading(true)
      const response = await axios.post("http://localhost:3001/auth/login",{id : govtId,password, role : "govt"},{withCredentials : true})
      console.log(response);
      
      if(response.data.status === "successfuly login"){
        nav("/govtDashboard")
        handleLogAndSign("govt")
      }else if(response.data.status === "userNotFound"){
        setErrmsg("You didn't register yet!! Do the Signup")
      }else if(response.data.status === "password Incorrect"){
        setErrmsg("Enter the correct password")
      }
    }
    catch(err){
      setErrmsg(err.msg)
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-3">🏛️ Government Login 🏛️</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Government ID</label>
            <input
              type="text"
              className="form-control"
              value={govtId}
              onChange={(e) => setGovtId(e.target.value)}
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

          <button className="btn btn-dark w-100">Login</button>
        </form>


      </div>
       {isLoading ? <Loading/> : errMsg}
    </div>
  );
};

export default GovtLogin;
