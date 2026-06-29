import './App.css';
import { Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import GovtDashboard from './pages/GovtDashboard';
import RoleDashboard from './pages/RoleDashboard';
import Footer from './components/Footer';
import HospitalLogin from './components/login/HospitalLogin';
import GovtLogin from './components/login/GovtLogin';
import Header from './components/Header/Header';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import Signup from './components/signin/Signup';
import Logout from './components/logout/Logout';
import Signout from './components/signout/Signout';
function App() {
  const [registeredHospital, setRegisteredHospital] = useState(null)
  const [hospitalloginStatus, setHospitalLoginStatus] = useState(false)
  const [govtloginStatus, setGovtLoginStatus] = useState(false)
  const [loginStatus , setLoginStatus] = useState(false)
  const handleLogAndSign = async (dash) => {
    try {
      const res = await axios.post(
        "https://nexahealth-backend-yxs1.onrender.com/auth/me",
        {},
        { withCredentials: true }
      );
      console.log(res.data + "app.js");
      if(dash === 'hospital'){
        setHospitalLoginStatus(res.data === true ? true : false);
      }else{
        setGovtLoginStatus(res.data === true ? true : false);
      }
      
      setLoginStatus(res.data === true ? true : false)
    } catch (err) {
      console.error(err);
      if(dash === 'hospital'){
        setHospitalLoginStatus(false);
      }else{
        setGovtLoginStatus(false);
      }

      setLoginStatus(false)
    }
  };
  useEffect(() => {
    handleLogAndSign();
  }, []);
  return (
    <>
    <Header loginStatus={loginStatus}/>
      <Routes>
        <Route path="/" element={<RoleDashboard hospitalloginStatus={hospitalloginStatus} govtloginStatus={govtloginStatus}/>} />
        <Route path="userDashboard" element={<UserDashboard />} />
        <Route path="hospitalDashboard">
          <Route index element={<HospitalDashboard registeredHospital={registeredHospital}/>} />
          <Route path="hospitalLogin" element={<HospitalLogin handleLogAndSign={handleLogAndSign} setRegisteredHospital={setRegisteredHospital}/>} />
        </Route>
        <Route path="govtDashboard">
          <Route index element={<GovtDashboard />} />
          <Route path="govtLogin" element={<GovtLogin handleLogAndSign={handleLogAndSign}/>} />
        </Route>
        <Route path="logout" element={<Logout handleLogAndSign={handleLogAndSign}/>} />
        <Route path="signout" element={<Signout handleLogAndSign={handleLogAndSign}/>} />
        <Route path="signup" element={<Signup handleLogAndSign={handleLogAndSign}/>} />
      </Routes>
      <Footer />
    </>

    
  );
}

export default App;


