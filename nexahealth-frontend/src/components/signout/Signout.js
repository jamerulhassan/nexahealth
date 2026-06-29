import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const Signout = ({handleLogAndSign}) => {
  const nav = useNavigate();
const [errMsg, setErrmsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async() => {
    try{
          setErrmsg('')
          setIsLoading(true)
          const response = await axios.post("https://nexahealth-backend-yxs1.onrender.com/auth/signout",{},{withCredentials : true})
          console.log(response);
          
          if(response.data.status === "successfuly signout"){
            nav("/")
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
             Signout
          </h4>

          <p className="text-muted mb-4">
            You are currently logged in.<br />
            Do you want to signout from the application?
          </p>

          <div className="d-grid gap-2">
            <button
              className="btn btn-danger btn-lg"
              onClick={handleSignout}
            >
              Signout
            </button>

            {/* <button
              className="btn btn-outline-secondary"
              onClick={() => nav("/hospitalDashboard")}
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

export default Signout;
