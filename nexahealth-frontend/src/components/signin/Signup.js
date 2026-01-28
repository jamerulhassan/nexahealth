import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import axios from "axios";

const Signup = ({handleLogAndSign}) => {
  const nav = useNavigate();
const[errMsg, setErrmsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    role: "hospital"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.role === "hospital"){
        try{
            setErrmsg('');
            setIsLoading(true);
            const response = await axios.post("http://localhost:3001/auth/signup/hospital",{hospitalId : formData.id, password: formData.password, role : formData.role},{ withCredentials: true })   
            console.log("hi");
            if(response.data.status === "success"){
               localStorage.setItem(
        "registerHospitalDetails",
        JSON.stringify({ hospitalId: formData.id })
    )
                nav("/hospitalDashboard")
                handleLogAndSign("hospital")
            }else if(response.data.status === "hospitalId is already register"){
                setErrmsg("hospitalId is already register")
            }else{
                setErrmsg(response.data.message);
            }  
        }
        catch(err){
            setErrmsg(err.message); 
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }else{
        try{
            setErrmsg('');
            setIsLoading(true);
            const response = await axios.post("http://localhost:3001/auth/signup/govt",{govtId : formData.id, password: formData.password, Role : formData.role},{ withCredentials: true })   
            console.log(response.data);
            if(response.data.status === "success"){
                nav("/govtDashboard")
                handleLogAndSign("govt")
            }else if(response.data.status === "govtId is already register"){
                setErrmsg("govtId is already register")
            }else{
                setErrmsg(response.data.message);
            }  
        }
        catch(err){
            setErrmsg(err.message); 
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-sm"
        style={{ width: "420px", borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          <h4 className="text-center mb-4">
            📝 Sign Up
          </h4>

          <form onSubmit={handleSubmit}>
            {/* ID */}
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                name="id"
                placeholder="HospitalId / GovtId"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="hospital">Hospital</option>
                <option value="government">Government</option>
              </select>
            </div>

            <button className="btn btn-success w-100">
              Create Account
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <span
              className="text-primary"
              role="button"
              onClick={() =>
                nav("/")
              }
            >
              Login
            </span>
          </p>
        </div>
      </div>
      {isLoading ? <Loading/> : errMsg} {}
    </div>
  );
};

export default Signup;

