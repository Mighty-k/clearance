import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loginData')) {
      // Check for existing login state in local storage
      setStudent(JSON.parse(localStorage.getItem('loginData'))); // Set student directly
    setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const isMatricNumber = /^\d{2}\/\d{4}$/.test(username);
      let userData;
      let endpoint;
  
      if (isMatricNumber) {
        endpoint = `https://clearance-database.onrender.com/students?matricNumber=${username}`;
      } else {
        if (username.startsWith('hod_')) {
          endpoint = `https://clearance-database.onrender.com/hods?username=${username}`;
        } else {
          endpoint = `https://clearance-database.onrender.com/admins?username=${username}`;
        }
      }
  
      const response = await fetch(endpoint);
      userData = await response.json();
  
      if (userData.length === 1) {
        if (userData[0].password === password) {
          // Store user data in local storage with a prefix based on user type
          const userTypePrefix = isMatricNumber ? 'student_' : username.startsWith('hod_') ? 'hod_' : 'admin_';
          localStorage.setItem(`${userTypePrefix}loginData`, JSON.stringify(userData[0]));
          
          // Store student data in local storage
          localStorage.setItem('loginData', JSON.stringify(userData[0]));
          if (isMatricNumber) {
            navigate('/student-dashboard', { state: userData[0] });
          } else if (username.startsWith('hod_')) {
            navigate('/hod', { state: userData[0] });
          } else {
            navigate('/admin', { state: userData[0] });
          }
        } else {
          // Display error message instead of logging to console
          setIsLoggedIn(false); // Update state for error display
          setMessage('Invalid username/password!');
          setIsShaking(true)
        }
      } else {
        // Display error message if username not found
        setIsLoggedIn(false); // Update state for error display
        setMessage('Invalid username/password!');
        setIsShaking(true)
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };
  useEffect( () => {
    if(isShaking){
      setTimeout(() => {
        setIsShaking(false);
      }, 500)
    }
  }, [isShaking]
  )
    
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
                    Matric No / User Name
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

export default Login;
