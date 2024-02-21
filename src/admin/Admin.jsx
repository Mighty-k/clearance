import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin_loginData"));
  const [students, setStudents] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const navigate = useNavigate();

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);
  const handleLogout = () => {
    localStorage.removeItem("admin_loginData");
    navigate("/login");
  };

  useEffect(() => {
    if (!admin) return;
  
    const getStudents = async () => {
      try {
        let queryParams = `clearanceRequest=true&${admin.username.toUpperCase()}-approval=false&${admin.username.toUpperCase()}-approval=rejected`; // Include rejected status
        switch (admin.username.toUpperCase()) {
          case "BURSARY":
            queryParams += "&HOD-approval=true";
            break;
          case "LIBRARY":
            queryParams += "&BURSARY-approval=true";
            break;
          case "BOOKSHOP":
            queryParams += "&LIBRARY-approval=true";
            break;
          case "EGWHITE":
            queryParams += "&BOOKSHP-approval";
            break;
          case "BUTH":
            queryParams += "&EGWHITE-approval=true";
            break;
          case "ALUMNI":
            queryParams += "&BUTH-approval=true";
            break;
          case "SECURITY":
            queryParams += "&ALUMNI-approval=true";
            break;
          case "VPSD":
            queryParams += "&SECURITY-approval=true";
            break;
          case "REGISTRY":
            queryParams += "&VPSD-approval=true";
            break;
          default:
            break;
        }
        // Convert boolean values to string
        queryParams = queryParams.replace(/true/g, "true").replace(/false/g, "false");
        const response = await axios.get(`https://clearance-database.onrender.com/students?${queryParams}`);
        const students = response.data;
        // Separate students into approved, pending approval, and rejected
        const approvedStudents = students.filter(student => student[`${admin.username.toUpperCase()}-approval`] === "true");
        const pendingStudents = students.filter(student => student[`${admin.username.toUpperCase()}-approval`] !== "true" && student[`${admin.username.toUpperCase()}-approval`] !== "rejected");
        const rejectedStudents = students.filter(student => student[`${admin.username.toUpperCase()}-approval`] === "rejected");
        setApproved(approvedStudents);
        setStudents(pendingStudents);
        setRejected(rejectedStudents);
      } catch (error) {
        console.error(error);
      }
    };
  
    getStudents();
  }, [admin]);
  
  const handleApprove = (student) => {
    axios
      .patch(`https://clearance-database.onrender.com/students/${student.id}`, {
        [`${admin.username.toUpperCase()}-approval`]: "true",
        "message": "no messages", 
      })
      .then(() => {
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
        setApproved((prevApproved) => [...prevApproved, student]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleReject = (student) => {
    const message = prompt(
      "Please enter a message to the rejected student:",
      "Sorry, your request has been rejected because "
    );
    if (message) {
      axios
        .patch(`https://clearance-database.onrender.com/students/${student.id}`, {
          [`${admin.username.toUpperCase()}-approval`]: "rejected", // Change status to "rejected"
          message: message + ` please see your ${admin.fullName}`, // Add rejection message with admin's name
        })
        .then(() => {
          setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
          setRejected((prevRejected) => [...prevRejected, { ...student, message }]); // Add to rejected list with rejection message
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className="container">
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
      <div className="profile">
        <div className="cardd" id="admin-prof">
          <div className="cardd-content">
            <div className="cardd-left">
              <p>
                <img src="src/img/Profile-Avatar-PNG.png" alt="profile" />
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
      {/* clearance request */}
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
            .filter(student => student[`${admin.username.toUpperCase()}-approval`] === "false")
            .map(student => (
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
     
           {/* Clearance rejected */}
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
       {/* clearance approved */}
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
  );
};

export default Admin;
