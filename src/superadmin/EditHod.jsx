import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditHodsDetails = () => {
  const location = useLocation();
  const user = location.state?.hod;
  const navigate = useNavigate();
  // State variables to store the edited details
  const [editedName, setEditedName] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedFname, setEditedFname] =useState(user.fullName);
  // Add more state variables as needed

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update user details
      await axios.put(`http://localhost:3001/hods/${user.id}`, {
        username: editedName,
        email: editedEmail,
        fullName: editedFname,
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

  if (!user) {
    return <div>User data not found</div>; // Render a message if user data is not available
  }

  return (
    <div className="container edit bg-white rounded-3">
      <h1>Edit User Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="">
          <label className="form-labael">
           User name:</label>
          <input className="form-control" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
        </div>
        <div className="">
          <label >
            Full Name:
          </label>
          <input className="form-control" type="text" value ={editedFname} onChange={(e) => setEditedFname(e.target.value)} />
        </div>
        <div>
          <label className="form-labael">Email:</label>
          <input className="form-control" type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
        </div>
        <div>
          <label className="form-labael">Department</label>
          <input className="form-control" type="text" value={user.department} readOnly />
        </div>
        <div>
          <label className="form-labael">Department code</label>
          <input className="form-control" type="text" value={user.departmentCode} readOnly />
        </div>
        <button className="btn btn-success" type="submit" >Save Changes</button>
      </form>
    </div>
  );
};

export default EditHodsDetails;
