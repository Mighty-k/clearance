
import  { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './superadmin.css'

const AddAdminForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:'', 
        email:'', 
        password:'',
         fullname:'',
          department:'',
         
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/addAdmins', formData);
      alert('Officer added successfully!');
      navigate('/superadmin')
    } catch (error) {
      console.error('Error adding officer:', error);
      alert('An error occurred while adding officer.');
    }
    
  };

  return (
    <div className="container rounded-3 bg-white add text-center align-items-center">
         <form className='form' onSubmit={handleSubmit}>
        <div className="container text-center">
        
        <input className="form-control"
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="username" 
                />
      <input className="form-control"
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="email" 
      />
       <input className="form-control"
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="password" 
      />
      <input className="form-control"
        type="fullname" 
        name="fullname" 
        value={formData.fullname} 
        onChange={handleChange} 
        placeholder="fullname" 
      />
      <input className="form-control"
        type="department" 
        name="department" 
        value={formData.department} 
        onChange={handleChange} 
        placeholder="department" 
      />
       
      <button className=' btn btn-success' type="submit">Add officer</button>
        </div>
    </form>
    </div>
   
  );
};

export default AddAdminForm;
