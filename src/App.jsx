import { Route, Routes } from "react-router";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Credits from "./pages/Credits/Credits";
import Team from './pages/Team/Team';
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";
import Competitions from "./pages/Events/Competitions/Competitions";
import Educations from './pages/Events/Educations/Educations'
import Bootcamps from './pages/Events/Bootcamps/Bootcamps'
import Hackathons from './pages/Events/Hackathons/Hackathons'
import CareerDays from "./pages/Events/CareerDays/CareerDays";
import CompetitionDetail from "./pages/Events/Competitions/CompetititonDetail/CompetitionDetail";
import BootcampsDetail from "./pages/Events/Bootcamps/BootcampsDetail/BootcampsDetail";
import CareerDaysDetail from './pages/Events/CareerDays/CarrerDaysDetail/CareerDaysDetail'
// import EducationDetail from "./pages/Events/Educations/EducationDetail/EducationDetail";
import HackathonsDetail from "./pages/Events/Hackathons/HackathonsDetail/HackathonsDetail";


function App() {
  
  return (
    <>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/emegi-gecenler" element={<Credits />} />
            <Route path="/takim" element={<Team />} />
            <Route path="/iletisim" element={<Contact />} />
            
            {/* Activities Route */}
            <Route path="/etkinlikler" element={<Events />} />

            <Route path="/etkinlikler/yarismalar" element={<Competitions />} />
            <Route path="/etkinlikler/yarismalar/:title" element={<CompetitionDetail />} />

            <Route path="/etkinlikler/egitimler" element={<Educations/>} />
            {/* <Route path="/etkinlikler/egitimler/:title" element={<EducationDetail/>} /> */}

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
