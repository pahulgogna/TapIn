import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Recorder from './components/Recorder'
import SignupPage from './pages/Signup'
import Login from './pages/Login'
import { RecoilRoot } from 'recoil'
import Appbar from './components/Appbar'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import MyNote from './pages/MyNote'
import Landing from './pages/Landing'
import Learnmore from './pages/Learnmore'
import Contact from './pages/Contact';
import FAQSection from './pages/Faq'
import Team from './pages/Team'
import CreateTeam from './pages/CreateTeam'
import YourTeam from './pages/YourTeam'



function App() {

  return (
    <div>
      <BrowserRouter>
        <RecoilRoot>
          <Appbar/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/recorder" element={<Recorder />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<MyNote />} />
            <Route path="/learnmore" element={<Learnmore />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQSection />} />
            <Route path="/team" element={<Team />} />
            <Route path="/createteam" element={<CreateTeam/>} />
            <Route path="/yourteam" element={<YourTeam/>} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  )
}

export default App
