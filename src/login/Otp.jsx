import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import './login.css'; 
import bulogo from '../img/bulogo.jpg';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState(''); 
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user; // Access the user from location.state

  // Display timeout for messages and errors
  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setOtpSentMessage('');
      setError('');
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(messageTimer);
  }, [otpSentMessage, error]);

  const handleGenerateOtp = async () => {
    try {
      // Send a request to your backend to generate and send a new OTP
      await axios.post('http://localhost:3001/regenerate-otp', { email: user.email });
      setOtpSentMessage('OTP has been sent to your email');
    } catch (error) {
      console.error('Error generating OTP:', error);
      setError('Failed to generate OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/verify-otp', { email: user.email, otp });
      console.log('OTP verification successful');
      console.log('response: ', response);
      if (user.role === 'admin') {
        navigate('/admin', { state: { admin: user } });
      } else if (user.role === 'hod') {
        navigate('/hod', { state: { hod: user } });
      } else {
        console.error('Unauthorized');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
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
              <h3 className="card-title text-center mb-4">Enter the otp sent to your email</h3>
              {otpSentMessage && <p>{otpSentMessage}</p>}
              {error && <p className="alert alert-danger">{error}</p>}
              <form onSubmit={handleSubmit}> 
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="submit">Verify OTP</button>
              </form>
              <button className="btn btn-secondary" onClick={handleGenerateOtp}>Regenerate OTP</button>
              <button className="btn btn-link mt-3" onClick={() => navigate('/')}>Back to Homepage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
