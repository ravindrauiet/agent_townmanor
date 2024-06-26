import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import SignUpForm from './SignUpForm'
import AgentList from './AgentList'
import CustomNavbar from './Navbar'
import Profile from './components/Profile'

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/agent/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
