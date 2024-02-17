import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './Student.css';
import Auth from '../login/Auth';

const StudentDashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [student, setStudent] = useState({});
  const [isRequestButtonVisible, setIsRequestButtonVisible] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);

  const handleRequestClearance = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students/${student.id}`, {
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

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    navigate('/');
  };

  useEffect(() => {
    const storedStudentData = JSON.parse(localStorage.getItem('loginData'));
    setStudent(storedStudentData);

    // Get student's department approval data from JSON database
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://localhost:3000/students'); // Adjust URL as needed
        const studentsData = await response.json();

        const currentStudent = studentsData.find(
          (student) => student.id === storedStudentData.id
        );

        if (currentStudent) {
          // Extract and format department approval data
          const formattedDepartments = Object.entries(currentStudent)
            .filter(([key, value]) => key.endsWith('-approval'))
            .map(([department, adminApproval]) => ({
              name: department.slice(0, -9), // Adjust the slice value according to your department naming convention
              approvalStatus: adminApproval === "true" ? "Approved" : adminApproval === "rejected" ? "Rejected" : "Pending",
            }));

          setDepartments(formattedDepartments); // Correctly set the state
          renderCircularChart(formattedDepartments);
        } else {
          console.error('Error fetching student data:', response.statusText);
          // Handle error: Display appropriate message to the user
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        // Handle error: Display appropriate message to the user
      }
    };

    fetchStudentData(); // Fetch data and process it for the dynamic chart
  }, []);

  const renderCircularChart = (departmentsData) => {
    const approvedCount = departmentsData.filter(department => department.approvalStatus === "Approved").length;
    const rejectedCount = departmentsData.filter(department => department.approvalStatus === "Rejected").length;
    const pendingCount = departmentsData.length - approvedCount - rejectedCount;

    if (chartInstance) {
      chartInstance.destroy(); // Properly destroy the chart before creating a new one
    }

    const ctx = document.getElementById('chart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Rejected', 'Pending'],
        datasets: [{
          label: 'Clearance Status',
          data: [approvedCount, rejectedCount, pendingCount],
          backgroundColor: [
            'rgb(90, 219, 21)',
            'rgb(255, 99, 132)',
            'rgb(255, 237, 42)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Clearance Status'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });

    setChartInstance(newChart);
  };

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
      
      <div className="container d-body">
        <div className="container profile">
          <div className="cardd">
            <div className="cardd-content">
              <div className="cardd-left">
                <p>
                  <img src="src/img/Profile-Avatar-PNG.png" alt="profile" />
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
                      <canvas id="chart" width="400" height="400"></canvas>
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
