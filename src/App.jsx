import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "./homepage/Homepage"
import Login from "./login/login"
import StudentDashboard from "./Student/Student"
import HODAdmin from "./admin/Hod"
import Admin from "./admin/Admin"

const App = () =>{
  return(
    <Router>
      <Routes>
      <Route exact path='/' element ={<Homepage/>}/>
      <Route exact path='/login' element ={<Login/>}/>
      <Route exact path='/student-dashboard' element ={<StudentDashboard/>}/>
      <Route exact path='/hod' element ={<HODAdmin/>}/>
      <Route exact path='/admin' element ={<Admin/>}/>
      </Routes>
    </Router>
  )
}
export default App