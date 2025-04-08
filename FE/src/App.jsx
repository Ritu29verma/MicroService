import { Toaster } from "react-hot-toast";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RegisterOrganization from "./Pages/RegisterOrganization";
import CustomizeChat from "./Pages/CustomizeChat";
import IntegrationScript from "./Pages/IntegrationScript";
import VerifyDomain from "./Pages/VerifyDomain";
function App() {

  return (
     <Router>
       <Toaster position="bottom-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/register-organization" element={<RegisterOrganization/>}/>
        <Route path="/customize-chat" element={<CustomizeChat />} />
        <Route path="/integration-script" element={<IntegrationScript />} />
        <Route path="/verify-domain" element={<VerifyDomain />} />

      </Routes>
    </Router>
  )
}

export default App
