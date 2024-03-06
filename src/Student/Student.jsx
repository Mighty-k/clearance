import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import './Student.css';
import avatar from '../img/Profile-Avatar-PNG.png'

const StudentDashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [student, setStudent] = useState({});
  const [isRequestButtonVisible, setIsRequestButtonVisible] = useState(true);
  // const [chartInstance, setChartInstance] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [chartData, setChartData] = useState(null);
  // const canvasRef = useRef(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);

  const handleRequestClearance = async () => {
    try {
      const response = await fetch(`http://localhost:3001/students/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...student,
          clearanceRequest: "true",
        }),
      });

      if (response.ok) {
        setStudent({ ...student, clearanceRequest: "true" });
        setIsRequestButtonVisible(false);
      } else {
        throw new Error('Failed to update clearance request');
      }
    } catch (error) {
      console.error('Error requesting clearance:', error);
      // Handle error: Display error message to the user
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/logout'); // Send a request to clear the session on the server-side
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure
    }
  };
  

  useEffect(() => {
    const Student_Data = location.state?.student;
  // console.log(Student_Data);
  if (!Student_Data) {
    navigate('/login'); // Redirect to login page if user data is not available
    return;
  }

  // Fetch student data dynamically
  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/students/${Student_Data.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      const studentData = await response.json();
  
      // Process department approval data
      const formattedDepartments = Object.entries(studentData)
        .filter(([key, value]) => key.endsWith('-approval'))
        .map(([department, adminApproval]) => ({
          name: department.slice(0, -9),
          approvalStatus: adminApproval === "approved" ? "Approved" : adminApproval === "rejected" ? "Rejected" : "Pending",
        }));
  
      setStudent(studentData);
      setDepartments(formattedDepartments);
  
      // Generate doughnut chart data
      const { approved, pending, rejected } = countApprovalStatus(Object.values(studentData));
      const chartData = {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [
          {
            data: [approved, pending, rejected],
            backgroundColor: ['#1ef506', '#f5ed06', '#b61e1e'],
            hoverBackgroundColor: ['#1ef506', '#f5ed06', '#b61e1e'],
          },
        ],
      };

      setChartData(chartData);


  
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Handle error: Display appropriate message to the user
    }
  };
  
  
  // Function to count approval status
  const countApprovalStatus = (approvalArray) => {
    let approved = 0;
    let pending = 0;
    let rejected = 0;
  
    approvalArray.forEach((status) => {
      switch (status) {
        case 'approved':
          approved++;
          break;
        case 'pending':
          pending++;
          break;
        case 'rejected':
          rejected++;
          break;
        default:
          break;
      }
    });
  
    return { approved, pending, rejected };
  };
    
  fetchStudentData(); // Fetch data and process it for the dynamic chart
}, [location.state?.student]);

const options = {
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }
  },
  elements: {
    arc: {
      borderColor: 'transparent' // Set border color to transparent
    }
  }
};

// useEffect(() => {
//   if (departments.length > 0) {
//     renderCircularChart(departments);
//   }
// }, [departments]);




  return (
    <div className="container-fluid das-body ">
      <div className={`nav-wrapper ${isExpanded ? "nav-expanded" : ""}`} onMouseOver={handleHover} onMouseLeave={handleLeave}>
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="/student-dashboard">
              <i className="fas fa-home"></i> {isExpanded && 'Home'}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/clearance">
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
      
      <div className="container d-body">
        <div className="container profile">
          <div className="cardd">
            <div className="cardd-content">
              <div className="cardd-left">
                <p>
                  <img src={avatar} alt="profile" />
                </p>
              </div>
              <div className="cardd-middle">
                <p className="cardd-text">
                  <span></span>
                  <span>Name:</span>  {student.name}<br />
                  <span>Matric Number:</span>  {student.matricNumber}<br />
                  <span>Department:</span>  {student.department}<br />
                  <span>Course:</span>  {student.course}
                </p>
              </div>
              <div className="cardd-right">
                <p className="cardd-text">
                  <span>Gender:</span> {student.gender}<br />
                  <span>Phone Number:</span> {student.phoneNumber}<br />
                  <span>Date of Birth</span>: {student.dateOfBirth}<br />
                  <span>Month of Graduation:</span> {student.monthOfGraduation}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container dashboard ">
          {/* request button */}
          {isRequestButtonVisible && student.clearanceRequest !== "true" && (
            <div className="d-flex request justify-content-center mb-4">
              <button
                className="req-button"
                type="button"
                onClick={handleRequestClearance}
              >
                Request for Clearance
              </button>
            </div>
          )}
          {/* progress section */}
          {student.clearanceRequest === "true" && (
            <div>
              <div className="p-5 status">
                <div className="card-body">
                  <h5 className="card-title">Clearance Progress</h5>
                  <ul className="list-group list-group-flush">
                    {departments.length > 0 && departments.map((department, index) => (
                      <li className="list-group-item d-flex justify-content-between" key={index}>
                        {department.name}
                        <span className={department.approvalStatus === "Approved" ? "text-success" : department.approvalStatus === "Rejected" ? "text-danger" : "yellow"}>
                          {department.approvalStatus}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="graph-notification ">
                <div className="container-flex">
                  <div className="graph">
                    <h5 className="card-title">Graph</h5>
                    <div className="container dashboard ">
                    <Doughnut className='doughnut' data={chartData} options={options} /> 
                    </div>
                  </div>
                  <div className="notification">
                    <h5 className="card-title">Notifications</h5>
                    <ul className="list-group">
                      <li className="list-group-item">{student.message}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
