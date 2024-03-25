import  { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import "./superadmin.css"
const AddHodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department:'', 
        departmentCode:'', 
         username:'',
         fullName:'',
          email:'',
         password:'',
  });
const location = useLocation();
const admin = location.state?.superAdmin

useEffect(()=>{
  if(!admin){
    navigate("/login")
    return
  }
})
if (!admin ) {

  return null;
}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addHods', formData);
      alert('Hod added successfully!');
      navigate(-1)
    } catch (error) {
      console.error('Error adding hod:', error);
      alert('An error occurred while adding hod.');
    }
    
  };
  const goback= () => {
    navigate(-1)
  }

  return (
    <div className="container rounded-3 bg-white add ">
      <h2>
        Add HOD
      </h2>
      
      <form className='form' onSubmit={handleSubmit}>
        <div className="container ">
        <label className="form-labael">
           Department:</label>
        <input className="form-control"
                type="text" 
                name="department" 
                value={formData.department} 
                onChange={handleChange} 
                placeholder="Department" 
                />
      <label className="form-labael">
           Department code:</label>
      <input className="form-control"
        type="text" 
        name="departmentCode" 
        value={formData.departmentCode} 
        onChange={handleChange} 
        placeholder="Department code" 
      />
      <label className="form-labael">
           User name:</label>
       <input className="form-control"
        type="username" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="username" 
      />
      <label className="form-labael">
           Full name:</label>
       <input className="form-control"
        type="text" 
        name="fullName" 
        value={formData.fullName} 
        onChange={handleChange} 
        placeholder="fullName" 
      />
      <label className="form-labael">
           Email:</label>
      <input className="form-control"
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="email" 
      />
      <label className="form-labael">
           Password:</label>
      <input className="form-control"
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="password" 
      />
       
      <button className=' btn btn-success ' type="submit">Add hod</button>
      <button className='btn btn-primary' onClick={goback}>
      Back
    </button>
        </div>
    </form>
    
    </div>
    
  );
};

export default AddHodForm;
