import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import "./admin.css";
import avatar from '../img/Profile-Avatar-PNG.png'

const Hod = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [students, setStudents] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(2); // Number of students to display per page
  const [rejectMessage, setRejectMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const hod = location.state?.hod;
  const currentDate = new Date().toISOString();

  const navigateReportPage = () =>{
    navigate("/hod_report", {state:{hod}})
  }

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);
  const handleLogout = async () => {
    try {
        await axios.get('http://localhost:3001/logout');
        navigate('/login');

        // Replace current location with login page to remove it from history
        window.history.replaceState(null, '', '/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  useEffect(() => {
    if (!hod){
      navigate('/login');
      return;
    } 
    axios
        .get(`http://localhost:3001/hod/students?clearanceRequest=true&hodApproval=pending&department=${hod.department}`)
        .then((res) => {
          console.log("students for approval:", res.data);
          setStudents(res.data);
        })
        .catch((err) => {
          console.error('Error fetching students:', err);
        });
  }, [hod]);  

  useEffect(() => {
    const filteredApproved = students.filter(student => student['HOD-approval'] === "approved");
    const filteredRejected = students.filter(student => student['HOD-approval'] === "rejected");
    setApproved(filteredApproved);
    setRejected(filteredRejected);
  }, [students]);  

  // Logic to get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentPendingStudents = students
    .filter(student => student['HOD-approval'] === "pending")
    .slice(indexOfFirstStudent, indexOfLastStudent);
  const currentRejectedStudents = rejected.slice(indexOfFirstStudent, indexOfLastStudent);
  const currentApprovedStudents = approved.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = (student) => {
    axios
      .patch(`http://localhost:3001/students/${student.id}`, {
        "HOD-approval": "approved",
        "hodDate":currentDate,
        "message": "no messages", 
      })
      .then(() => {
        setRejected((prevRejected) => prevRejected.filter((s) => s.id !== student.id));
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
        setApproved((prevApproved) => [...prevApproved, student]);
      })
      .catch((err) => {
        console.error("Error fetching students:",err);
      });
  };

  const handleReject = (student) => {
    const message = prompt(
    "Please enter a message to the rejected student:",
    "Sorry, your request has been rejected because ");
    if (message) {
      setRejectMessage(message);
      axios
        .patch(`http://localhost:3001/students/${student.id}`, {
          "HOD-approval": "rejected",
          "hodDate":currentDate,
          "message": message + ` - KINDLY MEET THE HOD FOR MORE INFORMATION`,
        })
        .then((res) => {
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
      <div className={`nav-wrapper ${isExpanded ? "nav-expanded" : ""}`} onMouseOver={handleHover} onMouseLeave={handleLeave}>
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="/hod">
              <i className="fas fa-home"></i> {isExpanded && 'Home'}
            </a>
          </li>
          <li className="nav-item">
          <button className="nav-link " onClick={navigateReportPage}>
          <i className="fas fa-print"></i> {" "}
              {isExpanded && "Report"}
            </button>
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
                <img src={avatar} alt="profile" />
              </p>
            </div>
            <div className="cardd-middle"></div>
            <div className="cardd-left">
              <p className="cardd-text" id="admin">
                <span className="fn">Name:</span>  {hod.fullName}<br />
                <span className="dept">Department:</span>HOD {hod.department}<br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="request-container">
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
            {currentPendingStudents.map((student) => (
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
          {/* Pagination for pending clearance requests */}
          <Pagination
            itemsPerPage={studentsPerPage}
            totalItems={students.filter(student => student['HOD-approval'] === "pending").length}
            paginate={paginate}
          />
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
              {currentRejectedStudents.map((student) => (
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
          {/* Pagination for rejected clearance requests */}
          <Pagination
            itemsPerPage={studentsPerPage}
            totalItems={rejected.length}
            paginate={paginate}
          />
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
              {currentApprovedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.matricNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination for approved clearance requests */}
          <Pagination
            itemsPerPage={studentsPerPage}
            totalItems={approved.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Hod;
