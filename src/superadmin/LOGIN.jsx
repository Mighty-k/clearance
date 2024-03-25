
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login/login.css';
import bulogo from '../img/bulogo.jpg'

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status
    const [message, setMessage] = useState('');
    const [isShaking, setIsShaking] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:3001/logadmin', { username, password });
        console.log('Login successful');
        const { dashboard, user } = response.data;
        // console.log(response.data);
     
      //  if  (dashboard === 'superAdmin'){
      //   navigate('/superadmin', {state: {super:user}});
 
      //   }else 
        if (dashboard === 'otp') {   
           
            navigate('/otp', {state: {user:user}});
        }

        else {
          console.error('Unauthorized');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        if (error.response && error.response.status === 401) {
          // Invalid credentials
          setIsLoggedIn(false);
          setMessage('Invalid username/password!');
          setIsShaking(true);
        } else {
          // Other errors
          setIsShaking(true);
          setMessage('An error occurred on the server. Please try again later.');
        }
      }
    };
    useEffect(() => {
      let shakeTimeoutId;
      let messageTimeoutId;
    
      if (isShaking) {
        shakeTimeoutId = setTimeout(() => {
          setIsShaking(false); // Set isShaking to false 
        }, 700); // 0.7 second
    
      
      }
      if(message !== ""){
        messageTimeoutId = setTimeout(() => {
          setMessage('');
        }, 2000); // 1 second
      }
    
      // Cleanup function to clear the timeouts if the component unmounts or is updated
      return () => {
        clearTimeout(messageTimeoutId);
        clearTimeout(shakeTimeoutId);
        
      };
    }, [isShaking]
    )
      
    return (
      <div className="container-fluid">
        {/* ... */}
        
        <div className="row">
          <div className="col-md-3">
            <img
              src={bulogo}
              alt="Student Clearance System"
              className="img-fluid img"
            />
          </div>
          <div className="col-md-9 bod d-flex align-items-center">
            <div className="card bg-light p-5 w-50 mx-auto">
              <div className="card-body ">
                <h3 className="card-title text-center mb-4">Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                  {!isLoggedIn && message && (
                      <p className={`alert alert-danger ${isShaking ? 'shake' : ''}`} 
                      role="alert">
                        {message}
                      </p>
                    )}
                    <label htmlFor="username" className="form-label">
                     User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                    >
                      Login
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
  

export default AdminLogin