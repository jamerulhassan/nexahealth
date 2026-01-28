import React, { useEffect, useMemo, useState } from "react";
import useHospitals from "../hooks/useHospitals";

/* Distance calculation (Haversine) */
const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = v => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

const UserDashboard = () => {
  const { hospitals, loading } = useHospitals();
  const [userLoc, setUserLoc] = useState(null);

  /* Filters */
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setUserLoc({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  /* Collect all specializations for dropdown */
  const specializationOptions = useMemo(() => {
    const set = new Set();
    hospitals.forEach(h =>
      h.specializations?.forEach(s => set.add(s))
    );
    return [...set];
  }, [hospitals]);

  const filteredData = useMemo(() => {
    if (!userLoc) return [];

    return hospitals
      .map(h => ({
        ...h,
        totalBlood: Object.values(h.bloodCapacity || {}).reduce(
          (a, b) => a + b,
          0
        ),
        distance: getDistanceKm(
          userLoc.lat,
          userLoc.lon,
          h.latitude,
          h.longitude
        ),
      }))
      .filter(h => {
        const textMatch =
          h.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
          h.location.toLowerCase().includes(search.toLowerCase());

        const specializationMatch =
          !specialization ||
          h.specializations?.includes(specialization);

        return textMatch && specializationMatch;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [hospitals, userLoc, search, specialization]);

  if (loading || !userLoc) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">🏥 Nearby Hospitals</h3>

      {/* SEARCH & FILTER */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search hospital or location"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={specialization}
            onChange={e => setSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializationOptions.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* HOSPITAL CARDS */}
      {filteredData.map(h => (
        <div key={h.hospitalId} className="card mb-4 shadow">
          <div className="card-body">
            <h5 className="fw-bold">{h.hospitalName}</h5>
            <p className="text-muted">{h.location}</p>

            <p>
              <strong>Hospital ID:</strong> {h.hospitalId}
            </p>

            <p>
              <strong>Coordinates:</strong> {h.latitude}, {h.longitude}
            </p>

            <p>
              <strong>Total Blood Units:</strong> {h.totalBlood}
            </p>

            {/* BLOOD CAPACITY */}
            <div className="mb-3">
              <strong>Blood Availability:</strong>
              <div className="row mt-2">
                {Object.entries(h.bloodCapacity || {}).map(
                  ([group, count]) => (
                    <div key={group} className="col-6 col-md-3 mb-1">
                      <span
                        className={`badge ${
                          count > 50 ? "bg-success" : "bg-danger"
                        } me-1`}
                      >
                        {group.replace("_", " ")}
                      </span>
                      {count}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* DOCTORS */}
            <p>
              <strong>Doctors:</strong>{" "}
              {h.doctors?.map(d => d.doctorName).join(", ") || "N/A"}
            </p>

            {/* SPECIALIZATIONS */}
            <p>
              <strong>Specializations:</strong>{" "}
              {h.specializations?.join(", ")}
            </p>

            <span className="badge bg-primary">
              {h.distance.toFixed(2)} km away
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
