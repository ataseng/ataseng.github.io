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
import CompetitionsDetails from "./pages/Activities/Competitions/CompetititonDetail/CompetitionsDetails";
import BootcampsDetail from "./pages/Activities/Bootcamps/BootcampsDetail/BootcampsDetail";
import CareerDaysDetail from './pages/Activities/CareerDays/CarrerDaysDetail/CareerDaysDetail'
import EducationDetail from "./pages/Activities/Education/EducationDetail/EducationDetail";
import HackathonsDetail from "./pages/Activities/Hackathons/HackathonsDetail/HackathonsDetail";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/emegi-gecenler" element={<Credit />} />
        <Route path="/takim" element={<Team />} />
        <Route path="/iletisim" element={<Contact />} />
        
        {/* Activities Route */}
        <Route path="/etkinlikler" element={<Activities />} />

        <Route path="/etkinlikler/yarismalar" element={<Competitions />} />
        <Route path="/etkinlikler/yarismalar/:title" element={<CompetitionsDetails />} />

        <Route path="/etkinlikler/egitimler" element={<Education/>} />
        <Route path="/etkinlikler/egitimler/:title" element={<EducationDetail/>} />

        <Route path="/etkinlikler/bootcamps" element={<Bootcamps/>} />
        <Route path="/etkinlikler/bootcamps/:title" element={<BootcampsDetail/>} />

        <Route path="/etkinlikler/hackathons" element={<Hackathons/>} />
        <Route path="/etkinlikler/hackathons/:title" element={<HackathonsDetail/>} />

        <Route path="/etkinlikler/kariyer-gunleri" element={<CareerDays/>} />
        <Route path="/etkinlikler/kariyer-gunleri/:title" element={<CareerDaysDetail/>} />
      </Routes>
    </>
  );
}

export default App;
