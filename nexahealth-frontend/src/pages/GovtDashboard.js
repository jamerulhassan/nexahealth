import React, { useMemo, useState } from "react";
import useHospitals from "../hooks/useHospitals";

const GovtDashboard = () => {
  const { hospitals, loading, error } = useHospitals();

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [specialization, setSpecialization] = useState("");

  /* =======================
     Filter hospitals
  ======================= */
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const matchSearch =
        h.hospitalName?.toLowerCase().includes(search.toLowerCase()) ||
        h.doctors?.some((d) =>
          d.doctorName?.toLowerCase().includes(search.toLowerCase())
        );

      const matchSpecialty = specialty
        ? h.doctors?.some((d) => d.specialty === specialty)
        : true;

      const matchSpecialization = specialization
        ? h.specializations?.includes(specialization)
        : true;

      return matchSearch && matchSpecialty && matchSpecialization;
    });
  }, [search, specialty, specialization, hospitals]);

  if (loading) {
    return (
      <div className="text-center my-4">Loading hospitals...</div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  /* =======================
     Collect dropdown values
  ======================= */
  const doctorSpecialties = [
    ...new Set(
      hospitals.flatMap((h) =>
        h.doctors?.map((d) => d.specialty) || []
      )
    ),
  ];

  const hospitalSpecializations = [
    ...new Set(
      hospitals.flatMap((h) => h.specializations || [])
    ),
  ];

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">
        🏛 Government Hospital Dashboard
      </h3>

      {/* FILTERS */}
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
          <select
            className="form-select"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">All Doctor Specialties</option>
            {doctorSpecialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Hospital Specializations</option>
            {hospitalSpecializations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Hospital</th>
              <th>Phone</th>
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

                {/* PHONE NUMBER */}
                <td>
                  {h.hospitalPhoneno ? (
                    <a
                      href={`tel:${h.hospitalPhoneno}`}
                      className="text-decoration-none"
                    >
                      {h.hospitalPhoneno}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>

                <td>
                  {h.doctors
                    ?.map(
                      (d) =>
                        `${d.doctorName} (${d.specialty})`
                    )
                    .join(", ") || "N/A"}
                </td>

                <td>
                  {h.specializations?.join(", ") || "N/A"}
                </td>

                <td>
                  {`${h.bloodCapacity?.A_Positive || 0}/${
                    h.bloodCapacity?.B_Positive || 0
                  }/${h.bloodCapacity?.O_Positive || 0}/${
                    h.bloodCapacity?.AB_Positive || 0
                  }`}
                </td>

                <td>
                  {`${h.bloodCapacity?.A_Negative || 0}/${
                    h.bloodCapacity?.B_Negative || 0
                  }/${h.bloodCapacity?.O_Negative || 0}/${
                    h.bloodCapacity?.AB_Negative || 0
                  }`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredHospitals.length === 0 && (
          <div className="text-center text-muted mt-3">
            No hospitals found
          </div>
        )}
      </div>
    </div>
  );
};

export default GovtDashboard;
