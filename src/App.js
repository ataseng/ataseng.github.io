import { Route, Routes } from "react-router";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Credit from "./pages/Credit/Credit";
import Team from './pages/Team/Team';
import Contact from "./pages/Contact/Contact";
import Activities from "./pages/Activities/Activities";
import Competitions from "./pages/Activities/Competitions/Competitions";
import Education from './pages/Activities/Education/Education'
import Bootcamps from './pages/Activities/Bootcamps/Bootcamps'
import Hackathons from './pages/Activities/Hackathons/Hackathons'
import CareerDays from "./pages/Activities/CareerDays/CareerDays";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Activities Route */}
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/yarismalar" element={<Competitions />} />
        <Route path="/activities/egitimler" element={<Education/>} />
        <Route path="/activities/bootcamps" element={<Bootcamps/>} />
        <Route path="/activities/hackathons" element={<Hackathons/>} />
        <Route path="/activities/kariyer-gunleri" element={<CareerDays/>} />
      </Routes>
    </>
  );
}

export default App;
