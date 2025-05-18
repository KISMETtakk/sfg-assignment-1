import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimetablePage.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  { label: "08:00-10:00", startTime: "08:00:00", endTime: "10:00:00" },
  { label: "10:00-12:00", startTime: "10:00:00", endTime: "12:00:00" },
  { label: "12:00-14:00", startTime: "12:00:00", endTime: "14:00:00" },
  { label: "14:00-16:00", startTime: "14:00:00", endTime: "16:00:00" },
];

export default function TimetablePage() {
  const [lecturers, setLecturers] = useState([]);
  const [modules, setModules] = useState([]);
  const [timetable, setTimetable] = useState({});
  const [lecturerId, setLecturerId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8180/api/lecturer/get-all")
      .then((res) => {
        const formatted = res.data.map((l) => ({
          id: l.lecturerID,
          name: `${l.fname} ${l.lname}`,
        }));
        setLecturers(formatted);
      })
      .catch((err) => console.error("Failed to load lecturers", err));
  }, []);

  const fetchModulesForLecturer = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8180/api/lecturer/modules/${id}`);
      const uniqueModules = Array.from(
        new Map(res.data.map((item) => [item.moduleID, item])).values()
      );
      setModules(uniqueModules);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  const handleLecturerChange = (e) => {
    const selectedId = e.target.value;
    setLecturerId(selectedId);
    setCourseId("");
    setModules([]);
    if (selectedId) fetchModulesForLecturer(selectedId);
  };

  const handleSelection = (day, slotLabel, lecturerId) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [slotLabel]: lecturerId,
      },
    }));
  };

  const handleUpload = () => {
    if (!courseId || !lecturerId) {
      alert("Please select both a lecturer and module before uploading.");
      return;
    }
    setShowSummary(true);
  };

  const handleFinalUpload = async () => {
    const payloads = [];
    for (const day of days) {
      for (const slot of timeSlots) {
        const assignedLecturerId = timetable[day]?.[slot.label];
        if (assignedLecturerId) {
          payloads.push({
            day,
            startTime: slot.startTime,
            endTime: slot.endTime,
            moduleId: parseInt(courseId),
            lecturerId: parseInt(assignedLecturerId),
          });
        }
      }
    }

    try {
      await Promise.all(
        payloads.map((entry) =>
          axios.post("http://localhost:8180/api/timetable/create", entry)
        )
      );
      setSuccessMessage("Uploaded timetable successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for errors.");
    }
  };

  return (
    <div className="timetable-container">
      <h2>Create Weekly Timetable</h2>

      {/* Lecturer Selection */}
      <div className="course-select">
        <label>Select Lecturer: </label>
        <select value={lecturerId} onChange={handleLecturerChange}>
          <option value="" disabled>Select a Lecturer</option>
          {lecturers.map((lect) => (
            <option key={lect.id} value={lect.id}>
              {lect.name}
            </option>
          ))}
        </select>
      </div>

      {/* Course/Module selection */}
      <div className="course-select">
        <label>Select Module: </label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          disabled={!lecturerId}
        >
          <option value="" disabled>Select a Module</option>
          {modules.map((mod) => (
            <option key={mod.moduleID} value={mod.moduleID}>
              {mod.moduleName}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable input */}
      {!showSummary && (
        <>
          <div className="timetable-grid">
            {days.map((day) => (
              <div key={day} className="timetable-day-column">
                <h3>{day}</h3>
                {timeSlots.map((slot) => (
                  <div key={slot.label} className="timetable-slot">
                    <label>{slot.label}</label>
                    <select
                      onChange={(e) =>
                        handleSelection(day, slot.label, e.target.value)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Lecturer
                      </option>
                      {lecturers.map((lect) => (
                        <option key={lect.id} value={lect.id}>
                          {lect.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="upload-button" onClick={handleUpload}>
            Upload Timetable
          </button>
        </>
      )}

      {/* Summary Table */}
      {showSummary && (
        <div className="summary-section">
          <h3>
            Summary for Module:{" "}
            {modules.find((m) => m.moduleID.toString() === courseId)?.moduleName}
          </h3>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Day</th>
                {timeSlots.map((slot) => (
                  <th key={slot.label}>{slot.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {timeSlots.map((slot) => (
                    <td key={slot.label}>
                      {
                        lecturers.find(
                          (l) =>
                            l.id.toString() === timetable[day]?.[slot.label]
                        )?.name || "—"
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button className="upload-button" onClick={handleFinalUpload}>
            Final Upload
          </button>
        </div>
      )}

      {successMessage && (
        <div className="success-popup">{successMessage}</div>
      )}
    </div>
  );
}
