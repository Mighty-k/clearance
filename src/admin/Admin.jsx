import { useState, useEffect } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from "axios";
import "./admin.css";
import {avatar} from '../img/Profile-Avatar-PNG.png'

const Admin = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [students, setStudents] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const admin = location.state?.admin;

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (!admin) {
      navigate('/login');
      return;
    } 

    const getStudents = async () => {
      try {
        const queryParams = {
          clearanceRequest: true,
          adminUsername: admin.username
        };
        const response = await axios.get(`http://localhost:3001/filteredStudents`, { params: queryParams });
        const allStudents = response.data;
        console.log("filtered: ",response.data);
        const pendingStudents = allStudents.filter(student => student[`${admin.username.toUpperCase()}-approval`] === "pending");
        const approvedStudents = allStudents.filter(student => student[`${admin.username.toUpperCase()}-approval`] === "approved");
        const rejectedStudents = allStudents.filter(student => student[`${admin.username.toUpperCase()}-approval`] === "rejected");

        setStudents(pendingStudents);
        setApproved(approvedStudents);
        setRejected(rejectedStudents);
      } catch (error) {
        console.error(error);
      }
    };

    getStudents();
  }, [admin]);

  const handleApprove = (student) => {
    axios
      .patch(`http://localhost:3001/students/${student.id}`, {
        [`${admin.username.toUpperCase()}-approval`]: "approved",
        message: "no messages", 
      })
      .then(() => {
        setRejected((prevRejected) => prevRejected.filter((s) => s.id !== student.id));
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
        setApproved((prevApproved) => [...prevApproved, student]);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  const handleReject = (student) => {
    const message = prompt(
      "Please enter a message to the rejected student:",
      "Sorry, your request has been rejected because "
    );
    if (message) {
      axios
        .patch(`http://localhost:3001/students/${student.id}`, {
          [`${admin.username.toUpperCase()}-approval`]: "rejected",
          message: message + ` - KINDLY MEET THE ${admin.fullName} FOR MORE INFORMATION`,
        })
        .then(() => {
          setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
          setRejected((prevRejected) => [...prevRejected, { ...student, message }]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="container">
      {/* Navigation section */}
      <div
        className={`nav-wrapper ${isExpanded ? "nav-expanded" : ""}`}
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
      >
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="/admin">
              <i className="fas fa-home"></i> {isExpanded && "Home"}
            </a>
          </li> 
          <li className="nav-item">
            <button className="nav-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> {isExpanded && "Logout"}
            </button>
          </li>
        </ul>
      </div>

      {/* Profile section */}
      <div className="profile">
        <div className="cardd" id="admin-prof">
          <div className="cardd-content">
            <div className="cardd-left">
              <p>
                <img src={avatar} alt="profile" />
              </p>
            </div>
            <div className="cardd-middle"></div>
            <div className="cardd-left">
              <p className="cardd-text" id="admin">
                <span className="fn">Name:</span> {admin.fullName}
                <br />
                <span className="dept">Department:</span> {admin.username}
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clearance request section */}
      <div className="request-container">
        {/* Pending clearance requests */}
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
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.matricNumber}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(student)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(student)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
       
        {/* Rejected clearance requests */}
        <div className="row clr-rejected">
          <h2 className="text-left">Rejected Clearance</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Matric number</th>
                <th>Action</th>
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
         
        {/* Approved clearance requests */}
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
              {approved.map(student => (
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
    </div>
  );
};

export default Admin;
