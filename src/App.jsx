// import the packages
import { Route, Routes } from 'react-router-dom'

// // File import
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFoundPage'
import SignUp from './Pages/SignUp'
import LogIn from './Pages/LogIn'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourceList from './Pages/CourcesPages/CourceList'
import CourceDescription from './Pages/CourcesPages/CourceDescription'
import RequireAuth from './Component/Auth/RequireAuth'
import CreateCourse from './Pages/CourcesPages/CreateCourse'
import UserProfile from './Pages/User/UserProfile'
import EditProfile from './Pages/User/EditProfile'
import CheckOut from './Pages/Payment/CheckOut'
import CheckOutSuccess from './Pages/Payment/CheckOutSuccess'
import CheeckOutFailure from './Pages/Payment/CheeckOutFailure'
import Displaylectures from './Pages/DashBoard/Displaylecture'
import Addlecture from './Pages/DashBoard/Addlecture'
import AdminDashboard from './Pages/DashBoard/AdminDashboard'
const App = () => {
  return (
    <>
      <Routes>
        {/* Home Page Area */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/about' element={<AboutUs />}></Route>
        <Route path='/contact' element={<Contact />}></Route>

        {/* Registration Area */}
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn />}></Route>

        {/* Cources Routes */}
        <Route path='/cources' element={<CourceList />}></Route>
        <Route path='/course/description' element={<CourceDescription />}></Route>

        {/* create Cource */}
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<Addlecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* User Profile */}

        <Route element={<RequireAuth allowedRoles={["Admin", "User"]} />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path='/checkout/success' element={<CheckOutSuccess />} />
          <Route path='/checkout/fail' element={<CheeckOutFailure />} />
        </Route>

        {/* DashBoard Pages  */}
        <Route path='/course/dispalylecture' element={<Displaylectures />}></Route>

        {/* Denied Page */}
        <Route path='/denied' element={<Denied />}></Route>
        {/* Not Found Page */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>

    </>
  )
}

export default App