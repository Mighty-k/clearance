import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './admin.css'
const HodReportPage = () => {
  const location = useLocation();
  const hod = location.state?.hod;

  const [approvedStudents, setApprovedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    if(!hod){
      navigate("/login")
      return
    }
    axios
        .get(`http://localhost:3001/hod/students?clearanceRequest=true&hodApproval=pending&department=${hod.department}`)
        .then((res) => {
          console.log("students for approval:", res.data);
          setStudents(res.data);

          const approved = students.filter(student => student[`HOD-approval`] === "approved");
        const rejected = students.filter(student => student[`HOD-approval`] === "rejected");
        const pending = students.filter(student => student[`HOD-approval`] === "pending");

        setApprovedStudents(approved);
        setRejectedStudents(rejected);
        setPendingStudents(pending);

        })
        .catch((err) => {
          console.error('Error fetching students:', err);
        });
  }, [hod, students]); 


  if (!hod ) {

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
      <h1>hod Report</h1>
      <h2>hod Information:</h2>
      <p>Name: {hod.fullName}</p>
      <p>Department: {hod.department}</p>
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

export default HodReportPage;
