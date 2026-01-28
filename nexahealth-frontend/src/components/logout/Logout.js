import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const Logout = () => {
  const nav = useNavigate();
const [errMsg, setErrmsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async() => {
    try{
          setErrmsg('')
          setIsLoading(true)
          const response = await axios.post("http://localhost:3001/auth/logout",{},{withCredentials : true})
          if(response.data.status === "successfuly logout"){
            nav("/")
            localStorage.removeItem("registerHospitalDetails");
            window.location.reload()
          }
        }catch(err){
          setErrmsg(err.msg)
        }
        finally{
          setIsLoading(false)
        }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-sm"
        style={{ width: "420px", borderRadius: "12px" }}
      >
        <div className="card-body text-center p-4">
          <h4 className="mb-3">
            Logout
          </h4>

          <p className="text-muted mb-4">
            You are currently logged in.<br />
            Do you want to logout from the  dashboard?
          </p>

          <div className="d-grid gap-2">
            <button
              className="btn btn-danger btn-lg"
              onClick={handleLogout}
            >
              Logout
            </button>

            {/* <button
              className="btn btn-outline-secondary"
              onClick={() => nav("/")}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </div>
     {isLoading ? <Loading/> : errMsg}
    </div>
  );
};

export default Logout;
