import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = ({ loginStatus }) => {
  const [userLoc, setUserLoc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        alert("Location permission is required for SOS");
      }
    );
  }, []);

  const callAmbulance = async () => {
    if (!userLoc) {
      alert("Location not ready");
      return;
    }


    try {
      setLoading(true);

      const res = await axios.post(
        "https://nexahealth-backend-yxs1.onrender.com/ambulance",
        { userLoc },
        { withCredentials: true }
      );

      const phone = res.data.phoneNumber;

      if (!phone) {
        alert("No ambulance phone number found");
        return;
      }
      window.location.href = `tel:${phone}`;
      
    } catch (err) {
     
      console.error(err);
      alert("Unable to contact ambulance service");
    } finally {
      
      
      setLoading(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/">
          NexaHealth
        </Link>

        <div className="ms-auto d-flex gap-2 align-items-center">

          <Link to="/" className="btn btn-outline-light btn-sm">
            Home
          </Link>

          <button
            className="btn btn-danger"
            onClick={callAmbulance}
            disabled={!userLoc || loading}
          >
            {loading ? "Connecting…" : "🚑 Call Ambulance"}
          </button>

          {loginStatus ? (
            <>
              <Link to="/logout" className="btn btn-light btn-sm">
                Logout
              </Link>
              <Link to="/signout" className="btn btn-success btn-sm">
                Signout
              </Link>
            </>
          ) : (
            <Link to="/signup" className="btn btn-success btn-sm">
              Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
