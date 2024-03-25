import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import "./superadmin.css";

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    matricNumber: '',
    email: '',
    password: '',
    department: '',
    school: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
    monthOfGraduation: ''
  });
  const [hodDepartments, setHodDepartments] = useState([]);
  const location = useLocation()

  const admin = location.state?.superAdmin

  useEffect(()=>{
    if(!admin){
      navigate("/login")
      return
    }
  })
  

  useEffect(() => {
    const fetchHodDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/allhods');
        // Extract department names from HOD records
        const departments = response.data.map(hod => hod.department);
        setHodDepartments(departments);
      } catch (error) {
        console.error('Error fetching HOD departments:', error);
      }
    };
    fetchHodDepartments();
  }, []);

  if (!admin ) {
  
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addStudents', formData);
      alert('Student added successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error adding student:', error);
      alert('An error occurred while adding student.');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container rounded-3 bg-white add  align-items-center">
      <form onSubmit={handleSubmit}>
        <div className="">
          <input className="form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input className="form-control"
            type="text"
            name="matricNumber"
            value={formData.matricNumber}
            onChange={handleChange}
            placeholder="Matric Number"
          />
          <input className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <select className="form-control" name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            {/* Map over HOD departments to create options */}
            {hodDepartments.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
          <input className="form-control"
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="School"
          />
          <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* <option value="Mentally Challenged">Mentally Challenged</option> */}
          </select>
          <input className="form-control"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input className="form-control"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
          <select className="form-control" name="monthOfGraduation" value={formData.monthOfGraduation} onChange={handleChange}>
            <option value="">Select Month of Graduation</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <button className='btn btn-success' type="submit">Add Student</button>
          <button className='btn btn-primary' onClick={goBack}>
        Back
      </button>

        </div>
        
      </form>
     
    </div>
    
  );
};

export default AddStudentForm;
