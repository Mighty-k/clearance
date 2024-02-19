import "./clearance.css"
import React from 'react';

function Clearance() {
  return (
    <div className="final-clearance-form">
        <div className="clearance-body">
        <div className="header">
        <div className="babcock-logo">
            <img className="logo" src="/src/img/bulogo.jpg" alt="bu logo" />
        </div>
        <div className="university-name">
          <h2>BABCOCK UNIVERSITY</h2>
          <h3>ORIGINAL COPY</h3>
        </div>
      </div>
      <div className="office-of-registrar">
        <h3>OFFICE OF THE REGISTRAR</h3>
        <p>ILISHAN-REMO, OGUN STATE</p>
      </div>
      <div className="form-title">
        <h2>GRADUATING STUDENT'S FINAL CLEARANCE FORM</h2>
      </div>
      <div className="part-a">
        <h3>PERSONAL DETAIL</h3>
        <p>
          <strong>NAME:</strong> <span>OBASANYE, ABIGAIL OMOLOLA</span>
        </p>
        <p>
          <strong>MATRIC No:</strong> <span>BUS200999</span>
          <span>    </span>
          <strong>DEPARTMENT:</strong> <span>BUSINESS ADMINISTRATION</span>
          <span> </span>
          <strong>COURSE:</strong> <span>BUSINESS MANAGEMENT</span>

        </p>
        <p>
          <strong>GENDER:</strong> <span>FEMALE</span>
          <span> </span>
          <strong>GSM No:</strong> <span>+2347031234567</span>
          <span> </span>
          <strong>BURSARY ACCOUNT NUMBER:</strong> <span>1234567890</span>
        </p>
        <p>
          <strong>DATE OF BIRTH:</strong> <span>20/11/1998</span>
          <span> </span>
          <strong>DATE OF GRADUATION:</strong> <span>DECEMBER 2023</span>
        </p>
      </div>
      <div className="part-c">
        <h3>DEPARTMENTAL AND SCHOOL CLEARANCE</h3>
        <table className="clearance-table">
          <thead>
            <tr>
              <th>CLEARING OFFICER</th>
              <th>SIGNATURE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>H.O.D.</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>BURSARY</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>LIBRARY</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>BOOKSHOP</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>E. G. WHITE</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>BUTH</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>ALUMNI</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>SECURITY</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>VPSD</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
            <tr>
              <td>SCHOOL OFFICER</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="registrar">
      <h3>REGISTRAR'S OFFICE</h3>
        <p>
          <strong>DATE PRESENTED:</strong> <span>{/* Insert date presented here */}</span>
        </p>
        <p>
          <strong>REMARKS:</strong> <span>{/* Insert any remarks from the registrar's office */}</span>
        </p>
        <table className="clearance-table">
          <thead>
            <tr>
              <th>CLEARING OFFICER</th>
              <th>SIGNATURE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>REGISTRAR</td>
              <td>{/* Insert signature image here */}</td>
              <td>{/* Insert date here */}</td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
     
    </div>
  );
}

export default Clearance;