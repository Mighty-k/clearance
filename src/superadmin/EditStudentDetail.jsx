import {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudentDetails = () => {
  const location = useLocation();
  const user = location.state?.student;
  const navigate = useNavigate();
  // State variables to store the edited details
  const [editedName, setEditedName] = useState(user?.name??"");
  const [editedEmail, setEditedEmail] = useState(user?.email??"");
  const [editedMatric, setEditedMatric] =useState(user?.matricNumber??"");
  const [editPhone, setEditPhone ] = useState(user?.phoneNumber??"");
  const [editMonth, setEditMonth ] = useState(user?.monthOfGraduation??"");
  // Add more state variables as needed
  if (!user) {
    return(
       <div className="container bg-white text-center">
        <h1>user not found!</h1>  
        <button className="btn btn-secondary" onClick={()=>navigate(-1)}>
          back</button>
       </div>);
  }
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update user details
      await axios.put(`http://localhost:3001/students/${user.id}`, {
        name: editedName,
        email: editedEmail,
        matricNumber: editedMatric,
        phoneNumber: editPhone,
        monthOfGraduation: editMonth,
        // Include other updated fields as needed
      });
      // Show alert message
      window.alert("Details have been saved");
      // Navigate back to the previous page
      navigate(-1)
    } catch (error) {
      // Handle error case (e.g., show error message)
      console.error("Error updating user details:", error);
    }
  };


  return (
    <div className="container edit bg-white rounded-3">
      <h1>Edit User Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="">
          <label className="form-labael">Name:</label>
          <input className="form-control" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
        </div>
        <div className="">
          <label >
            Matric Number
          </label>
          <input className="form-control" type="text" value ={editedMatric} onChange={(e) => setEditedMatric(e.target.value)} />
        </div>
        <div>
          <label className="form-labael">Email:</label>
          <input className="form-control" type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
        </div>
        <div>
          <label className="form-labael">Phone Number:</label>
          <input className="form-control" type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
        </div>
        <div>
          <label className="form-labael">
            Month Of Graduation
          </label>
          <select className="form-control" name="monthOfGraduation" value={editMonth} onChange={(e) => setEditMonth(e.target.value)}>
        <option value="">Select month of graduation</option>
        <option value="January">January</option>
        <option value="Febuary">Febuary</option>
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
        </div>
        <div>
          <label className="form-labael">
            Department
          </label>
          <input className="form-control" type="text" value={user.department} readOnly />
        </div>
        <div>
          <label className="form-labael">
            Gender
          </label>
          <input className="form-control" type="text" value={user.gender}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
            Date Of Birth
          </label>
          <input className="form-control" type="text" value={user.dateOfBirth}  readOnly/>
        </div>
       
        <div>
          <label className="form-labael">
            Requested Clearance?
          </label>
          <input className="form-control" type="text" value={user.clearanceRequest}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          Hod Approval
          </label>
          <input className="form-control" type="text" value={user["HOD-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          Bursary Approval
          </label>
          <input className="form-control" type="text" value={user["BURSARY-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
           Library Approval
          </label>
          <input className="form-control" type="text" value={user["LIBRARY-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
           BookShop Approval
          </label>
          <input className="form-control" type="text" value={user["BOOKSHOP-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          EG White Approval
          </label>
          <input className="form-control" type="text" value={user["EGWHITE-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          BUTH Approval
          </label>
          <input className="form-control" type="text" value={user["BUTH-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          Alumni Approval
          </label>
          <input className="form-control" type="text" value={user["ALUMNI-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          Security Approval
          </label>
          <input className="form-control" type="text" value={user["SECURITY-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          VPSD Approval
          </label>
          <input className="form-control" type="text" value={user["VPSD-approval"]}  readOnly/>
        </div>
        <div>
          <label className="form-labael">
          Registry Approval
          </label>
          <input className="form-control" type="text" value={user["REGISTRY-approval"]}  readOnly/>
        </div>
        <div></div>
        {/* Add more fields for other details */}
        <button className="btn btn-success" type="submit" >Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudentDetails;
