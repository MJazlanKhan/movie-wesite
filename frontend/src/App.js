import Home from "./MyPages/Home"
import Signin from "./MyPages/Signin";
import Signup from "./MyPages/Signup";
import Admin from "./MyPages/Admin"
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./MyPages/AdminDashboard";
import SinglePost from "./MyComponents/SinglePost";
import Wishlist from "./MyPages/Wishlist";
import Settings from "./MyPages/Settings";
import Carousel from "./MyComponents/Carousel";
function App() {
  return (
    <div >
     <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/home' element={<AdminDashboard />} />
        <Route path='/post/:postId' element={<SinglePost />} />
        <Route path='/user/wishlist/:userId' element={<Wishlist />} />
        <Route path='/user/settings/:userId' element={<Settings />} />
        <Route path='/Carousel' element={<Carousel />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
