import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./admin.css";
import Auth from "../login/Auth";

const Hod = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hod = JSON.parse(localStorage.getItem("hod_loginData"));
  const [students, setStudents] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]); // State for rejected students
  const [rejectMessage, setRejectMessage] = useState(""); // State for reject message
  const navigate = useNavigate();

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);
  const handleLogout = () => {
    localStorage.removeItem('hod_loginData');
    navigate('/login');
  };

  useEffect(() => {
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
    const filteredApproved = students.filter(student => student['HOD-approval'] === "true");
    const filteredRejected = students.filter(student => student['HOD-approval'] === "rejected"); // Filter out rejected students
    setApproved(filteredApproved);
    setRejected(filteredRejected);
  }, [students]);  

  const handleApprove = (student) => {
    axios
      .patch(`http://localhost:3000/students/${student.id}`, {
        "HOD-approval": "true",
        "message": "no messages", 
      })
      .then((res) => {
        setStudents(students.filter((s) => s.id !== student.id));
        setApproved([...approved, student]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleReject = (student) => {
    const message = prompt("Please enter a message to the rejected student:", "Sorry, your request has been rejected because ...");
    if (message) {
      setRejectMessage(message);
      axios
        .patch(`http://localhost:3000/students/${student.id}`, {
          "HOD-approval": "rejected",
          "message": message + ` - Rejected by HOD`,
        })
        .then((res) => {
          setStudents(students.filter((s) => s.id !== student.id));
          setRejected([...rejected, { ...student, message }]); // Add rejected student with rejection message to state
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
            <a className="nav-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> {isExpanded && 'Logout'}
            </a>
          </li>
        </ul>
      </div>
      <div className="profile">
      <div className="cardd" id="admin-prof">
      <div className="cardd-content">
      <div className="cardd-left">
                <p>
                  <img src="src/img/Profile-Avatar-PNG.png" alt="profile" />
                </p>
              </div>
              <div className="cardd-middle">
               
              </div>
              <div className="cardd-left">
              <p className="cardd-text" id="admin">
                  <span className="fn">Name:</span>  {hod.fullName}<br />
                  <span className="dept">Department:</span>HOD {hod.department}<br />
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
                <th>Matric number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {students
              .filter(student => student['HOD-approval'] === "false") // Filter out students with HOD-approval set to true
              .map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.matricNumber}</td>
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
        <div className="row clr-rejected">
          <h2 className="text-left">Rejected Clearance</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Matric number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rejected.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.matricNumber}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleApprove(student)}>Approve</button>
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
                <th>Matric number</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.matricNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  );
};

export default Hod;
