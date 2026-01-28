import React, { useMemo, useState } from "react";
import useHospitals from "../hooks/useHospitals";

const GovtDashboard = () => {
  const { hospitals, loading, error } = useHospitals();
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [specialization, setSpecialization] = useState("");

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const matchSearch =
        h.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
        h.doctors.some((d) =>
          d.doctorName.toLowerCase().includes(search.toLowerCase())
        );

      const matchSpecialty = specialty
        ? h.doctors.some((d) => d.specialty === specialty)
        : true;

      const matchSpecialization = specialization
        ? h.specializations.includes(specialization)
        : true;

      return matchSearch && matchSpecialty && matchSpecialization;
    });
  }, [search, specialty, specialization, hospitals]);

  if (loading) return <div className="text-center my-4">Loading hospitals...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">🏛 Government Hospital Dashboard</h3>

      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search hospital or doctor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select className="form-select" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="">All Doctor Specialties</option>
            {[...new Set(hospitals.flatMap(h => h.doctors.map(d => d.specialty)))]
              .map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
            <option value="">All Hospital Specializations</option>
            {[...new Set(hospitals.flatMap(h => h.specializations))]
              .map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Hospital</th>
              <th>Doctors</th>
              <th>Specializations</th>
              <th>Blood (+)</th>
              <th>Blood (-)</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((h, i) => (
              <tr key={h.hospitalId}>
                <td>{i + 1}</td>
                <td>{h.hospitalName}</td>
                <td>{h.doctors.map(d => `${d.doctorName} (${d.specialty})`).join(", ")}</td>
                <td>{h.specializations.join(", ")}</td>
                <td>{`${h.bloodCapacity.A_Positive}/${h.bloodCapacity.B_Positive}/${h.bloodCapacity.O_Positive}/${h.bloodCapacity.AB_Positive}`}</td>
                <td>{`${h.bloodCapacity.A_Negative}/${h.bloodCapacity.B_Negative}/${h.bloodCapacity.O_Negative}/${h.bloodCapacity.AB_Negative}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GovtDashboard;
