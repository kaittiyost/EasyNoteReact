import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import NavBar from "./NavBar";
import MyNote from "./MyNote";
import Toxic from "./Toxic";
import AddNote from "./AddNote";
import Footer from "./Footer";
import { Routes ,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
    <NavBar />
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Register' element={<Register/>} />
      <Route path='/MyNote' element={<MyNote/>} />
      <Route path='/AddNote' element={<AddNote/>} />
      <Route path='/Toxic' element={<Toxic/>} />
    </Routes>
    <Footer />
  </div>
  );
}

export default App;
