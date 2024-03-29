import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditOfficersDetails = () => {
  const location = useLocation();
  const user = location.state?.admin;
  const navigate = useNavigate();
  // State variables to store the edited details
//   const [editedName, setEditedName] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user?.email??"");
  const [editedFname, setEditedFname] =useState(user?.fullName??"");
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
      await axios.put(`http://localhost:3001/admins/${user.id}`, {
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


  return (
    <div className="container edit bg-white rounded-3">
      <h1>Edit User Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="">
          <label className="form-labael">
           User name:</label>
          <input className="form-control" type="text" value={user.username} readOnly />
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
          <label className="form-labael">Office</label>
          <input className="form-control" type="text" value={user.department} readOnly />
        </div>
        <button className="btn btn-success" type="submit" >Save Changes</button>
      </form>
    </div>
  );
};

export default EditOfficersDetails;
