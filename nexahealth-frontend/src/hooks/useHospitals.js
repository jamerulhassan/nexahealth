import { useEffect, useState } from "react";
import axios from "axios";

const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/nexahealth/hospitals") // change URL if needed
      .then(res => {
        setHospitals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        
        setError("Failed to load hospitals");
        setLoading(false);
      });
  }, []);

  return { hospitals, loading, error };
};

export default useHospitals;
