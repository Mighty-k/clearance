import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './admin.css'
const OfficerReportPage = () => {
  const location = useLocation();
  const officer = location.state?.officer;

  const [approvedStudents, setApprovedStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!officer){
      navigate("/login")
      return
    }
    const fetchStudents = async () => {
      try {
        const queryParams = {
          clearanceRequest: true,
          officerUsername: officer.username,
        };

        const response = await axios.get("http://localhost:3001/filteredStudents", {
          params: queryParams,
        });

        const allStudents = response.data;

        const approved = allStudents.filter(student => student[`${officer.username.toUpperCase()}-approval`] === "approved");
        const rejected = allStudents.filter(student => student[`${officer.username.toUpperCase()}-approval`] === "rejected");
        const pending = allStudents.filter(student => student[`${officer.username.toUpperCase()}-approval`] === "pending");

        setApprovedStudents(approved);
        setRejectedStudents(rejected);
        setPendingStudents(pending);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [officer]);
  if (!officer) {

    return null;
  }
  const handlePrint = () => {
    window.print(); // Trigger the print functionality
  };
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="container report bg-white text-left rounded-3">
      <h1>Officer Report</h1>
      <h2>Officer Information:</h2>
      <p>Name: {officer.fullName}</p>
      <p>Department: {officer.username}</p>
      <h2>Total Students:</h2>
      <p>Pending Requests: {pendingStudents.length}</p>
      <p>Approved Requests: {approvedStudents.length}</p>
      <p>Rejected Requests: {rejectedStudents.length}</p>
      <h2>Approved Students:</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Matric_no</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {approvedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.matricNumber}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Rejected Students:</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Matric_no</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rejectedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.matricNumber}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Pending Students:</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Matric_no</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pendingStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.matricNumber}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn print btn-success" onClick={handlePrint}>Print Report</button>
      <button className="btn print btn-primary" onClick={handleBack}>back</button>
    </div>
  );
};

export default OfficerReportPage;
