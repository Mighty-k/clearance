import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Signup = () => {
  const [roles, setRoles] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status
  const [message, setMessage] = useState('');
  const [department, setDepartment]= useState('')
  const [isShaking, setIsShaking] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('loginData')) {
      // Check for existing login state in local storage
      setIsLoggedIn(true); // Set login status if user is already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Your login logic
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    if(isShaking){
      setTimeout(() => {
        setIsShaking(false);
      }, 500)
    }
  }, [isShaking]);

  return (
    <div className="container-fluid">
      {/* ... */}
      
      <div className="row">
        <div className="col-md-3">
          <img
            src="src/img/bulogo.jpg"
            alt="Student Clearance System"
            className="img-fluid img"
          />
        </div>
        <div className="col-md-9 bod d-flex align-items-center">
          <div className="card bg-light p-5 w-50 mx-auto">
            <div className="card-body ">
              <h3 className="card-title text-center mb-4">Sign up</h3>
              <p style={{textAlign:'center'}}>Already registered? <a href='/login'>login</a></p>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                {!isLoggedIn && message && (
                    <p className={`alert alert-danger ${isShaking ? 'shake' : ''}`} 
                    role="alert">
                      {message}
                    </p>
                  )}
                  
                </div>
                
                <div className='mb-3'>
                  <select value={roles} onChange={(e)=> setRoles(e.target.value)} className='form-control'>
                    <option  >Select an option</option>
                    <option  value='option1'>Students</option>
                    <option value= 'option2'>HODs</option>
                    <option value= 'option3'>Officers</option>
                  </select>
                </div>
                {/* Conditional rendering based on selected role */}
                {roles === 'option1' && (
                  <>

                   <div>
                     <label htmlFor="Matric" className="form-label">
                      Department
                    </label>
                    <select className='form-control' value={department} >
                      <option>Select an option</option>
                      <option>Software Engineering</option>
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Computer Technology</option>
                      <option>Computer Information Systems</option>
                      <option>Medcine</option>
                      <option>Law and Humanities</option>
                      <option>Mass Communication</option>
                      <option>Public Health</option>
                      <option>Nutrition and Dietetics</option>
                      <option>Agriculture</option>
                  
                    </select>
                  </div>


                    <div className="mb-3">
                    <label htmlFor="Matric" className="form-label">
                      Matric No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="studentID"
                      name="studentID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                     <label htmlFor="Matric" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="studentID"
                      name="studentID"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                 
                  </>
                  
                  
                )}
                {roles === 'option2' && (
                                    <>

                   <div>
                     <label htmlFor="Matric" className="form-label">
                      Department
                    </label>
                    <select className='form-control' value={department} >
                      <option>Select an option</option>
                      <option>Software Engineering</option>
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Computer Technology</option>
                      <option>Computer Information Systems</option>
                      <option>Medcine</option>
                      <option>Law and Humanities</option>
                      <option>Mass Communication</option>
                      <option>Public Health</option>
                      <option>Nutrition and Dietetics</option>
                      <option>Agriculture</option>
                  
                    </select>
                  </div>


                    <div className="mb-3">
                    <label htmlFor="Matric" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="studentID"
                      name="studentID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                     <label htmlFor="Matric" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="studentID"
                      name="studentID"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                 
                  </>
                )}
                {roles === 'option3' && (
                                    <>

                   <div>
                     <label htmlFor="Matric" className="form-label">
                      Type
                    </label>
                    <select className='form-control' value={department} >
                      <option>Select an option</option>
                      <option> Bursary</option>
                      <option> Library</option>
                      <option> Bookshop</option>
                      <option> E.G White</option>
                      <option>  BUTH</option>
                      <option>Alumni</option>
                      <option>Security</option>
                      <option> VPSD</option>
                      <option>Registry</option>
                    </select>
                  </div>


                    <div className="mb-3">
                    <label htmlFor="Matric" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="studentID"
                      name="studentID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                     <label htmlFor="Matric" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="studentID"
                      name="studentID"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                 
                  </>
                )}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
