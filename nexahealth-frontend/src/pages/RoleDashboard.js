import React from "react";
import { useNavigate } from "react-router-dom";

const RoleDashboard = ({hospitalloginStatus, govtloginStatus }) => {
  const navigate = useNavigate();
  const handleRoute = (dash) =>{
    if(dash === "hospital"){
      if(hospitalloginStatus){
        navigate('/hospitalDashboard')
      }else{
        navigate('/hospitalDashboard/hospitalLogin')
      }
    }else{
      if(govtloginStatus){
        navigate('/govtDashboard')
      }else{
        navigate('/govtDashboard/govtLogin')
      }
    }
  }
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center w-100" style={{ maxWidth: "500px" }}>
        <h2 className="mb-2 fw-bold">NexaHealth</h2>
        <p className="text-muted mb-4">
          Select your role to continue
        </p>

        <div className="d-grid gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/userDashboard")}
          >
            👤 User
          </button>

          <button
            className="btn btn-success btn-lg"
            onClick={() => handleRoute("hospital")}
          >
            🏨 Hospital
          </button>

          <button
            className="btn btn-dark btn-lg"
            onClick={() => handleRoute("govt")}
          >
            🏛️ Government
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleDashboard;
