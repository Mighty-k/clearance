// import  { useState, useEffect } from 'react';
// import './Student.css'
// const departments = [
//   'HOD',
//   'Bursary',
//   'Library',
//   'Bookshop',
//   'EG White',
//   'Teaching Hospital',
//   'Alumni',
//   'Security',
//   'VPSD',
//   'School Officer',
//   'Registrar',
// ];

// const StudentDashboard = () => {
//   const [clearanceStatus, setClearanceStatus] = useState([]);

//   useEffect(() => {
//     // Fetch clearance status data from the backend (replace with your actual API call)
//     fetch('/api/clearance/status')
//       .then((response) => response.json())
//       .then((data) => setClearanceStatus(data));
//   }, []);

//   return (
//     <div>
//         <div id="navbar">
//         <a href="#home" className="nav-item">
//           <i className="fa fa-home"></i>
//           <span className="nav-text">Home</span>
//         </a>
//         <a href="#features" className="nav-item">
//           <i className="fa fa-check"></i>
//           <span className="nav-text">Request Clearance</span>
//         </a>
//         <a href="#pricing" className="nav-item">
//           <i className="fa fa-info"></i>
//           <span className="nav-text">Check Status</span>
//         </a>
//         <a href="#profile" className="nav-item">
//           <i className="fa fa-user"></i>
//           <span className="nav-text">Profile</span>
//         </a>
//       </div>


//       <div className="container body-h">
//         <div className="row">
//           <div className="col">
//             <h2>Welcome, Student!</h2>
//             <p>This is your dashboard. You can request clearance, check clearance status, and view clearance issues here.</p>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col">
//             <div className="card">
//               <div className="card-header">Clearance Request</div>
//               <div className="card-body">
//                 <button className="btn btn-primary">Request Clearance</button>
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <div className="card">
//               <div className="card-header">Clearance Status</div>
//               <div className="card-body">
//                 {clearanceStatus.length > 0 ? (
//                   <ul className="list-group">
//                     {departments.map((department, index) => (
//                       <li key={department} className={`list-group-item list-group-item-${clearanceStatus[index] === 'Approved' ? 'success' : 'secondary'}`}>
//                         {department}: {clearanceStatus[index]}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Status: Pending</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <div className="card">
//               <div className="card-header">Clearance Issues</div>
//               <div className="card-body">
//                 <p>No issues</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





// import { useState } from "react";
// import './Student.css'

// const StudentDashboard = () => {
//   const [student, setStudent] = useState({
//     // Replace with student data fetched from your backend
//     name: 'John Doe',
//     matricNumber: '123456',
//     department: 'Computer Science',
//     program: 'BSc Computer Science',
//     year: 'Final Year',
//     clearanceRequests: [
//       { id: 1, department: 'Library', reason: 'Book Clearance', status: 'Pending', submittedOn: '2024-01-25' },
//       { id: 2, department: 'Bursary', reason: 'Fee Clearance', status: 'Approved', submittedOn: '2024-01-20' },
//     ],
//   });

//   return (
//     <div className="std_dash">
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <a className="navbar-brand" href="#">Student Dashboard</a>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav">
//                 <li className="nav-item">
//                     <a className="nav-link active" href="#">Profile</a>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link" href="#">Clearance Requests</a>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link" href="#">Announcements</a>
//                 </li>
//                 </ul>
//                 <ul className="navbar-nav ml-auto">
//                 <li className="nav-item dropdown">
//                     <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     Settings
//                     </a>
//                     <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                     <a className="dropdown-item" href="#">Change Password</a>
//                     <a className="dropdown-item" href="#">Logout</a>
//                     </div>
//                 </li>
//                 </ul>
//             </div>
//             </nav>

//       <div className="container">
//         <div className="row">
//           <div className="col-md-4">
//             {/* Profile Section */}
//                     <div className="card mt-3">
//                     <div className="card-body">
//                         <h5 className="card-title">My Profile</h5>
//                         <p className="card-text">
//                         <b>Name:</b> {student.name} <br />
//                         <b>Matric Number:</b> {student.matricNumber} <br />      
//                         <b>Department:</b> {student.department} <br />
//                         <b>Program:</b> {student.program} <br />
//                         <b>Year:</b> {student.year}
//                         </p>
//                         <div className="progress">
//                         <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "70%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70% Completed</div>
//                         </div>
//                         <a href="#" className="btn btn-primary mt-3">Download Clearance Report</a>
//                     </div>
//                     </div>

//                 </div>
//                 </div>
//                 </div>
//                 <div className="col-md-8">
//                     {/* Clearance Requests Section */}
//             <div className="card mt-3">
//              <div className="card-body">
//             <h5 className="card-title">Clearance Requests</h5>
//             <table className="table table-striped">
//             <thead>
//                 <tr>
//                 <th scope="col">Department</th>
//                 <th scope="col">Reason</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Submitted</th>
//                 <th scope="col">Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {student.clearanceRequests.map((request) => (
//                 <tr key={request.id}>
//                     <td>{request.department}</td>
//                     <td>{request.reason}</td>
//                     <td className="status">
//                     {request.status === "Pending" && <span className="pending">{request.status}</span>}
//                     {request.status === "Approved" && <span className="approved">{request.status}</span>}
//                     {request.status === "Rejected" && <span className="rejected">{request.status}</span>}
//                     </td>
//                     <td>{request.submittedOn}</td>
//                     <td>
//                     {request.status === "Pending" && (
//                         <>
//                         <button className="btn btn-sm btn-danger"
//                         //  onClick={() => handleCancelRequest(request.id)}
//                          >
//                             Cancel
//                         </button>
//                         <button className="btn btn-sm btn-info" 
//                         // onClick={() => handleViewDetails(request.id)}
//                         >
//                             View Details
//                         </button>
//                         </>
//                     )}
//                     </td>
//                 </tr>
//                 ))}
//             </tbody>
//             </table>
//         </div>
//         </div>


//           </div>
//         </div>
    
//   );
// }


// import  { useState, useEffect } from 'react';

// const StudentDashboard = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [student, setStudent] = useState({});
//   const [departments, setDepartments] = useState([]);

//   const handleHover = () => setIsExpanded(true);
//   const handleLeave = () => setIsExpanded(false);

//   const handleRequestClearance = async () => {
//     setStudent({ ...student, clearanceStatus: "requested" });
//     // Back-end call to update student clearance status to "requested"
//     // Replace with actual PHP API call
//     // const response = await fetch("/api/request-clearance", {
//     //   method: "POST",
//     //   body: JSON.stringify({ studentId: student.id }),
//     };

//     useEffect(() => {
//       // Simulate fetching student and department data from the backend
//       // Replace with actual API calls
//       const fetchData = async () => {
//         // Simulate fetching student data
//         const studentResponse = await fetch('http://localhost:3001/student');
//         const studentData = await studentResponse.json();
//         setStudent(studentData);
  
//         // Simulate fetching department data
//         const departmentsResponse = await fetch('http://localhost:3001/departments');
//         const departmentsData = await departmentsResponse.json();
//         setDepartments(departmentsData);
//       };
  
//       fetchData();
//     }, []);
    
//   //   const data = await response.json();
//   //   if (data.success) {
//   //     setStudent({ ...student, clearanceStatus: "requested" });
//   //   } else {
//   //     // Handle error message
//   //   }
//   // };

//   return (
//     <div className="container-fluid">
//       {/* Navbar */}
//       <div className="d-flex flex-column nav-wrapper" onMouseOver={handleHover} onMouseLeave={handleLeave}>
//         <div className="d-flex mb-3 justify-content-center">
//           <span className="fs-4 fw-bold">{student.name}</span>
//         </div>
//         <div className="d-flex mb-3 justify-content-center">
//           <span className="text-muted">{student.matricNumber}</span>
//         </div>
//         <ul className={`nav flex-column nav-pills ${isExpanded ? "nav-expanded" : ""}`}>
//           <li className="nav-item">
//             <a className="nav-link active" href="/">
//               <i className="fas fa-home"></i> Home
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/print-clearance">
//               <i className="fas fa-print"></i> Print Clearance Report
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/logout">
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Dashboard Content */}
//       <div className="container mt-3">
//         {student.clearanceStatus === "pending" && (
//           <div className="d-flex justify-content-center mb-4">
//             <button
//               className="btn btn-primary"
//               type="button"
//               onClick={handleRequestClearance}
//             >
//               Request for Clearance
//             </button>
//           </div>
//         )}
//         {student.clearanceStatus !== "pending" && (
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Clearance Progress</h5>
//               <ul className="list-group list-group-flush">
//                 {departments.map((department) => (
//                   <li className="list-group-item d-flex justify-content-between">
//                     {department.name}
//                     <span className={department.isApproved ? "text-success" : "text-muted"}>
//                       {department.isApproved ? "Approved" : "Pending"}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// export default StudentDashboard;
