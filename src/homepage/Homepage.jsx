// import { useState, useEffect } from 'react';
import './Homepage.css'

const Homepage = () => {
  
  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center align-items-center p-5 background">
    <div className="row rounded bg-light shadow-lg p-5">
      <div className="col-md-6 text-center">
        <h1 className="display-4 fw-bold">Final Clearance made easy</h1>
        <p className="lead">Streamline your final year clearance process.</p>
        <ul className="list-group list-group-flush my-5">
          <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i>Convenient online process</li>
          <li className="list-group-item"><i className="fas fa-clock text-primary me-2"></i>Track progress in real-time</li>
          <li className="list-group-item"><i className="fas fa-envelope text-info me-2"></i>Receive timely notifications</li>
        </ul>
        <a href="/login" className="btn btn-primary btn-lg">Get Started</a>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <img src="/src/img/bulogo.jpg" alt="Student celebrating graduation" className="img-fluid w-75"></img>
      </div>
    </div>
  </div>
  );
}

export default Homepage;
