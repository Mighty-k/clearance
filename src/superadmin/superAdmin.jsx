
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';

const SuperAdmin = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [students, setStudents] = useState([])
    const [admins, setAdmins] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5); 
    const [hods, setHods] = useState([])
  const handleHover = () => setIsExpanded(true);
  const handleLeave = () => setIsExpanded(false);
  const location = useLocation()
  const superAdmin = location.state?.super;
  const navigate = useNavigate();
  // Dummy data for demonstration

  const handleLogout =  () => {
    navigate("/login", {replace:true})
};
useEffect(() => {

  if (!superAdmin) {
    navigate('/login');
    return;
  }

    const fetchdata = async () => {
      try{
      

        const studentsResponse = await  axios.get("http://localhost:3001/api/users/allStudents");
        setStudents(studentsResponse.data);
        const adminsResponse = await  axios.get("http://localhost:3001/api/users/alladmins");
        setAdmins(adminsResponse.data);
        const hodsResponse = await  axios.get("http://localhost:3001/api/users/allhods");
        setHods(hodsResponse.data);
      }catch(error){
        console.error("Error fetching data: ", error);
      }
    };
    fetchdata()
  }, [superAdmin])

  if (!superAdmin) {
    return null;
  }

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const currentofficers = admins.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const currentHods = hods.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const gotoAddHod = () => {
    navigate("/addhod", {state:{superAdmin}} )
  }
  const gotoAddStudent = () => {
    navigate("/addstudent", {state:{superAdmin}})
  }

  
  return (
    <div className="container das-body super bg-white bg-opacity-50 rounded-3">
            <div
        className={`nav-wrapper ${isExpanded ? "nav-expanded" : ""}`}
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
      >
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="/superadmin">
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
      <h2>Profile</h2>
      <div className="card mb-3">
        <div className="card-body">
          {/* Super admin's profile information */}
          <p>{superAdmin.fullname.toUpperCase()}</p>
        </div>
      </div>

      <h2>All Students</h2>
      <div className="table-responsive mb-3">
        <table className="table">
          <thead>
            <tr>
              <th>Matric Number</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Displaying students in a table */}
            {currentStudents.map(student => (
              
              <tr key={student.id}>
                <td>{student.matricNumber}</td>
                <td>{student.name}</td>
                <td>

                  <button className="btn btn-primary" onClick={()=>navigate("/editStudent", {state:{student}})}>
                  edit
                 
                  </button>
                </td>
              </tr>
            ))
            }
           
          </tbody>
        </table>
        <Pagination
            itemsPerPage={studentsPerPage}
            totalItems={students.length}
            paginate={paginate}
          />
      </div>
      {/* Button to add new student */}
      <button className="btn btn-success" onClick={gotoAddStudent}>Add Student</button>

      <h2>All departmental officers</h2>
      <div className="table-responsive mb-3">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Office</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Displaying admins in a table */}
            {currentofficers.map(admin => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.fullName}</td>
                <td>
                  {/* Button to edit admin details */}
                  <button className="btn btn-primary"  onClick={()=>navigate("/editOfficer", {state:{admin}})}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            itemsPerPage={studentsPerPage}
            totalItems={admins.length}
            paginate={paginate}
          />
      </div>

      <h2>All HODs</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Displaying HODs in a table */}
            {currentHods.map(hod => (
              <tr key={hod.id}>
                <td>{hod.departmentCode}</td>
                <td>{hod.department}</td>
                <td>
                  <button className="btn btn-primary"  onClick={()=>navigate("/editHod", {state:{hod}})}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
            itemsPerPage={studentsPerPage}
            totalItems={hods.length}
            paginate={paginate}
          />
      </div>
      
      {/* Button to add new HOD */}
      <button className="btn btn-success" onClick={gotoAddHod}>Add HOD</button>
    </div>
  );
};

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

export default SuperAdmin;
