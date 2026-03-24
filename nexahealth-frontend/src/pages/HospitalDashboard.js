import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading/Loading";

const deepCopy = (data) => JSON.parse(JSON.stringify(data));

const EMPTY_BLOOD = {
  A_Positive: 0,
  B_Positive: 0,
  O_Positive: 0,
  AB_Positive: 0,
  A_Negative: 0,
  B_Negative: 0,
  O_Negative: 0,
  AB_Negative: 0,
};

const HospitalDashboard = () => {
  const [errMsg, setErrmsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // 🔐 safe localStorage read
  const storedHospital = JSON.parse(
    localStorage.getItem("registerHospitalDetails") || "null"
  );

  const [registeredHospital, setRegisteredHospital] =
    useState(storedHospital);

  const [formData, setFormData] = useState({
    hospitalId: "",
    hospitalName: "",
    hospitalPhoneno: "",
    location: "",
    latitude: "",
    longitude: "",
    bloodCapacity: EMPTY_BLOOD,
    doctors: [{ doctorName: "", specialty: "" }],
    specializations: "",
  });

  const [originalData, setOriginalData] = useState(null);

  // 📍 geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => {}
    );
  }, []);

  // 🔁 sync form if hospital exists
  useEffect(() => {
    if (!registeredHospital) return;

    const synced = {
      hospitalId: registeredHospital.hospitalId ?? "",
      hospitalName: registeredHospital.hospitalName ?? "",
      hospitalPhoneno: registeredHospital.hospitalPhoneno
        ? String(registeredHospital.hospitalPhoneno)
        : "",
      location: registeredHospital.location ?? "",
      latitude: registeredHospital.latitude ?? "",
      longitude: registeredHospital.longitude ?? "",
      bloodCapacity: registeredHospital.bloodCapacity ?? EMPTY_BLOOD,
      doctors:
        registeredHospital.doctors ?? [{ doctorName: "", specialty: "" }],
      specializations:
        registeredHospital.specializations?.join(", ") ?? "",
    };

    setFormData(synced);
    setOriginalData(deepCopy(synced));
  }, [registeredHospital]);

  // 🔍 detect changes
  const hasChanges =
    originalData &&
    JSON.stringify(formData) !== JSON.stringify(originalData);

  // 🔧 generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("bloodCapacity.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        bloodCapacity: {
          ...prev.bloodCapacity,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 👨‍⚕️ doctors
  const handleDoctorChange = (index, field, value) => {
    const updated = [...formData.doctors];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, doctors: updated }));
  };

  const addDoctor = () =>
    setFormData((prev) => ({
      ...prev,
      doctors: [...prev.doctors, { doctorName: "", specialty: "" }],
    }));

  // 🚀 submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrmsg("");

    try {
      // ✅ prevent sending null phone
      const payload = {
        ...formData,
        hospitalPhoneno:
          formData.hospitalPhoneno !== ""
            ? formData.hospitalPhoneno
            : registeredHospital?.hospitalPhoneno || null,
        latitude: formData.latitude || userLocation?.latitude,
        longitude: formData.longitude || userLocation?.longitude,
        bloodCapacity: Object.fromEntries(
          Object.entries(formData.bloodCapacity).map(([k, v]) => [k, Number(v)])
        ),
        specializations: formData.specializations
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      let res;

      if (registeredHospital) {
        if (!hasChanges) {
          alert("No changes detected");
          setIsLoading(false);
          return;
        }

        res = await axios.patch(
          `http://localhost:3001/api/hospitals/${formData.hospitalId}`,
          payload,
          { withCredentials: true }
        );
        alert("Hospital updated successfully");
      } else {
        res = await axios.post(
          "http://localhost:3001/api/hospitals",
          payload,
          { withCredentials: true }
        );
        alert("Hospital added successfully");
      }

      localStorage.setItem(
        "registerHospitalDetails",
        JSON.stringify(res.data)
      );
      setRegisteredHospital(res.data);
    } catch (err) {
      console.error(err);
      setErrmsg("Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center">🏥 Hospital Dashboard</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow mt-3">
        <input
          className="form-control mb-2"
          name="hospitalId"
          placeholder="Hospital ID"
          value={formData.hospitalId}
          onChange={handleChange}
          disabled={!!registeredHospital}
        />

        <input
          className="form-control mb-2"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
        />

        {/* 📞 PHONE (Editable, won't become null) */}
        <input
          type="text"
          className="form-control mb-2"
          name="hospitalPhoneno"
          placeholder="Hospital Phone Number"
          value={formData.hospitalPhoneno}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="location"
          placeholder="Address"
          value={formData.location}
          onChange={handleChange}
        />

        <h6>Blood Capacity</h6>
        <div className="row">
          {Object.keys(formData.bloodCapacity).map((k) => (
            <div key={k} className="col-md-3 mb-2">
              <input
                className="form-control"
                name={`bloodCapacity.${k}`}
                placeholder={k}
                value={formData.bloodCapacity[k]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <h6>Doctors</h6>
        {formData.doctors.map((d, i) => (
          <div key={i} className="row mb-2">
            <div className="col">
              <input
                className="form-control"
                placeholder="Doctor Name"
                value={d.doctorName}
                onChange={(e) =>
                  handleDoctorChange(i, "doctorName", e.target.value)
                }
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Specialty"
                value={d.specialty}
                onChange={(e) =>
                  handleDoctorChange(i, "specialty", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addDoctor}
        >
          + Add Doctor
        </button>

        <input
          className="form-control mb-3"
          name="specializations"
          placeholder="Specializations (comma separated)"
          value={formData.specializations}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-100"
          disabled={registeredHospital && !hasChanges}
        >
          {registeredHospital ? "Update" : "Submit"}
        </button>
      </form>

      {isLoading && <Loading />}
      {errMsg && <p className="text-danger mt-2">{errMsg}</p>}
    </div>
  );
};

export default HospitalDashboard;
