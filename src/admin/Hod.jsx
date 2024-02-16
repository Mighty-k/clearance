import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./admin.css";
import Auth from "../login/Auth";

const Hod = () => {
  // Get the hod data from the local storage
  const [isExpanded, setIsExpanded] = useState(false);
  const hod = JSON.parse(localStorage.getItem("loginData"));
  const [students, setStudents] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejectMessage, setRejectMessage] = useState(""); // State for reject message
  const navigate = useNavigate();

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    navigate('/');
  };

  useEffect(() => {
    // fetch the students who requested clearance from the same department as the hod
    axios
      .get(`http://localhost:3000/students?clearanceRequest=true&department=${hod.department}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [hod]);  

  useEffect(() => {
    // filter students based on HOD approval status
    const filteredApproved = students.filter(student => student['HOD-approval'] === true);
    setApproved(filteredApproved);
  }, [students]);  

  const handleApprove = (student) => {
    // send the student's request to the next admin for approval
    axios
      .patch(`http://localhost:3000/students/${student.id}`, {
        "HOD-approval": true,
      })
      .then((res) => {
        // remove the student from the students array
        setStudents(students.filter((s) => s.id !== student.id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleReject = (student) => {
    // Prompt for reject message
    const message = prompt("Please enter a message to the rejected student:", "Sorry, your request has been rejected because ...");
    if (message) {
      // Set reject message to state
      setRejectMessage(message);
      // send the message to the student
      axios
        .patch(`http://localhost:3000/students/${student.id}`, {
          "HOD-approval": false,
          "message": message,
        })
        .then((res) => {
          // remove the student from the students array
          setStudents(students.filter((s) => s.id !== student.id));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="container">
        <div className={`nav-wrapper ${isExpanded ? "nav-expanded" : ""}`} onMouseOver={handleHover} onMouseLeave={handleLeave}>
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="/hod">
              <i className="fas fa-home"></i> {isExpanded && 'Home'}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/print-clearance">
              <i className="fas fa-print"></i> {isExpanded && 'Print Clearance Report'}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> {isExpanded && 'Logout'}
            </a>
          </li>
        </ul>
      </div>
      <div className="profile">
      <div className="cardd" id="hod-prof">
      <div className="cardd-content">
      <div className="cardd-left">
                <p>
                  <img src="../src/img/Profile-Avatar-PNG.png" alt="profile" />
                </p>
              </div>
              <div className="cardd-middle">
               
              </div>
              <div className="cardd-left">
              <p className="cardd-text" id="hod">
                  <span className="fn">Name:</span>  {hod.fullName}<br />
                  <span className="dept">Department:</span>  {hod.department}<br />
                </p>
              </div>
        </div>
      </div>
      </div>
        <div className="row clr-reqs">
          <h2 className="text-left">Clearance Requests</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {students
              .filter(student => !student['HOD-approval']) // Filter out students with HOD-approval set to true
              .map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => handleApprove(student)}>
                      Approve
                    </button>
                    <button className="btn btn-danger" onClick={() => handleReject(student)}>
                      Reject
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
          </table>
        </div>
        <hr />
        <div className="row clr-aprv">
          <h2 className="text-left">Approved Clearance</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Hod;
