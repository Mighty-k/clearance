import { useNavigate, useLocation  } from 'react-router-dom';
import "./clearance.css"


function Clearance() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const student = location.state?.student;

  
  const handlePrint = () => {
    window.print(); // Trigger the print functionality
  };
  const handleBack = () => {
    navigate(-1);
  }

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
          <strong>NAME:</strong> <span>{student.name}</span>
        </p>
        <p>
          <strong>MATRIC No:</strong> <span>{student.matricNumber}</span>
          <span>    </span>
          <strong>DEPARTMENT:</strong> <span>{student.department}</span>
          <span> </span>
          <strong>COURSE:</strong> <span>{student.course}</span>

        </p>
        <p>
          <strong>GENDER:</strong> <span>{student.gender}</span>
          <span> </span>
          <strong>GSM No:</strong> <span>{student.phoneNumber}7</span>
          <span> </span>
          <strong>BURSARY ACCOUNT NUMBER:</strong> <span>{student.matricNumber}</span>
        </p>
        <p>
          <strong>DATE OF BIRTH:</strong> <span>{student.dateOfBirth}</span>
          <span> </span>
          <strong>DATE OF GRADUATION:</strong> <span>{student.monthOfGraduation}</span>
        </p>
      </div>
      <div className="part-c">
        <h3>DEPARTMENTAL AND SCHOOL CLEARANCE</h3>
        <table className="clearance-table">
          <thead>
            <tr>
              <th>CLEARING OFFICER</th>
              <th>APPROVAL STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>H.O.D.</td>
              <td>{student["HOD-approval"].toUpperCase()}</td>
              <td>{student.hodDate}</td>
            </tr>
            <tr>
              <td>BURSARY</td>
              <td>{student["BURSARY-approval"].toUpperCase()}</td>
              <td>{student.bursaryDate}</td>
            </tr>
            <tr>
              <td>LIBRARY</td>
              <td>{student["LIBRARY-approval"].toUpperCase()}</td>
              <td>{student.libraryDate}</td>
            </tr>
            <tr>
              <td>BOOKSHOP</td>
              <td>{student["BOOKSHOP-approval"].toUpperCase()}</td>
              <td>{student.bookshopDate}</td>
            </tr>
            <tr>
              <td>E. G. WHITE</td>
              <td>{student["EGWHITE-approval"].toUpperCase()}</td>
              <td>{student.egwhiteDate}</td>
            </tr>
            <tr>
              <td>BUTH</td>
              <td>{student["BUTH-approval"].toUpperCase()}</td>
              <td>{student.buthDate}</td>
            </tr>
            <tr>
              <td>ALUMNI</td>
              <td>{student["ALUMNI-approval"].toUpperCase()}</td>
              <td>{student.alumniDate}</td>
            </tr>
            <tr>
              <td>SECURITY</td>
              <td>{student["SECURITY-approval"].toUpperCase()}</td>
              <td>{student.securityDate}</td>
            </tr>
            <tr>
              <td>VPSD</td>
              <td>{student["VPSD-approval"].toUpperCase()}</td>
              <td>{student.vpsdDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="registrar">
      <h3>REGISTRAR'S OFFICE</h3>
        <p>
          <strong>DATE PRESENTED:</strong> <span>21 Febuary 2024</span>
        </p>
        <p>
          <strong>REMARKS:</strong> 
          {student["REGISTRY-approval"] === "approved"?
          <span>
            CLEARED
          </span>
          :
          <span></span>
          
          }
          <span></span>
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
              <td>{student["REGISTRY-approval"].toUpperCase()}</td>
              <td>{student.registryDate}</td>
            </tr>
          </tbody>
        </table>
        <div className="part-e">
          <h3>GET THIS STAMPED TO VALIDATE THIS DOCUMENT</h3>
          <table>
          <tbody>
            <tr>
              <td>
                <p>
                REGISTRAR _________________________
                </p>
               
              </td>
              <td>
              <p>
                Date _________________________
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        
      </div>
      <button className="btn print btn-success" onClick={handlePrint}>Print Report</button>
      <button className="btn print btn-primary" onClick={handleBack}>back</button>
        </div>
     
    </div>
  );
}

export default Clearance;