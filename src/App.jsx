import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "./homepage/Homepage"
import Login from "./login/login"
import StudentDashboard from "./Student/Student"
import HODAdmin from "./admin/Hod"
import Officers from "./admin/Admin"
import Clearance from "./Student/clearance"
import Signup from "./login/Signup"
import OtpPage from "./login/Otp"
import AddStudentForm from "./superadmin/addStudent"
import AdminLogin from "./superadmin/LOGIN" 
import SuperAdmin from "./superadmin/superAdmin"
import AddHodForm from "./superadmin/addHod"
import AddAdminForm from "./superadmin/addAdmin"
import OfficerReportPage from "./admin/adminreport"
import HodReportPage from "./admin/hodreport"
import EditStudentDetails from "./superadmin/EditStudentDetail"
import EditOfficersDetails from "./superadmin/EditOfficer"
import EditHodsDetails from "./superadmin/EditHod"
const App = () =>{
  return(
    <Router>
      <Routes>
      <Route exact path='/' element ={<Homepage/>}/>
      <Route exact path='/login' element ={<Login/>}/>
      <Route exact path='/signup' element ={<Signup/>}/>
      <Route exact path='/student' element ={<StudentDashboard/>}/>
      <Route exact path='/hod' element ={<HODAdmin/>}/>
      <Route exact path='/officer' element ={<Officers/>}/>
      <Route exact path='/clearance' element ={<Clearance/>}/>
      <Route exact path='/otp' element ={<OtpPage/>}/>
      <Route exact path='/admin' element ={<AdminLogin/>}/>
      <Route exact path='/superadmin' element ={<SuperAdmin/>}/>
      <Route exact path='/addstudent' element ={<AddStudentForm/>}/>
      <Route exact path='/addhod' element ={<AddHodForm/>}/>
      <Route exact path='/addadmin' element ={<AddAdminForm/>}/>
      <Route exact path='/officer_report' element ={<OfficerReportPage/>}/>
      <Route exact path='/hod_report' element ={<HodReportPage/>}/>
      <Route exact path='/editStudent' element ={<EditStudentDetails/>}/>
      <Route exact path='/editOfficer' element ={<EditOfficersDetails/>}/>
      <Route exact path='/editHod' element ={<EditHodsDetails/>}/>

      </Routes>
    </Router>
  )
}
export default App