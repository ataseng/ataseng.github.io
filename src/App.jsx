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
import CareerDaysDetail from './pages/Events/CareerDays/CarrerDaysDetail/CareerDaysDetail';
// import EducationDetail from "./pages/Events/Educations/EducationDetail/EducationDetail";
import HackathonsDetail from "./pages/Events/Hackathons/HackathonsDetail/HackathonsDetail";
import ScrollToTop from "./utils/ScrollToTop";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "./redux/actions/settingsActions";
import EducationPost from "./pages/Admin/Educations/EducationPost";
import EducatorPost from "./pages/Admin/Educators/EducatorPost";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import { ToastContainer } from "react-toastify";
import PrivacyPolicy from "./pages/TermsAndPolicies/PrivacyPolicy";
import CookiePolicy from "./pages/TermsAndPolicies/CookiePolicy";
import TermsOfUse from "./pages/TermsAndPolicies/TermsOfUse";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
    
    const dispatch = useDispatch();
    const settingList = useSelector(state => state.settings);
    const { error, loading, settings } = settingList;

    const footerHeight = document.querySelector("footer")?.clientHeight;
    document.querySelector(":root").style.setProperty("--client-footer-height", `${footerHeight}px`);

    useEffect(() => {

        dispatch(getSettings());

    }, [dispatch]);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/kayit" element={<Register />} />
                <Route path="/giris" element={<Login />} />

                <Route path="/profil" element={<UserProfile />} />
                {/* <Route path="/" element={<Home />} /> */}

                <Route path="/hakkimizda" element={<About />} />
                <Route path="/emegi-gecenler" element={<Credits />} />
                <Route path="/takim" element={<Team />} />
                <Route path="/iletisim" element={<Contact />} />

                {/* Activities Route */}
                <Route path="/etkinlikler" element={<Events />} />

                <Route path="/etkinlikler/yarismalar" element={<Competitions />} />
                <Route path="/etkinlikler/yarismalar/:title" element={<CompetitionDetail />} />

                <Route path="/etkinlikler/egitimler" element={<Educations />} />
                {/* <Route path="/etkinlikler/egitimler/:title" element={<EducationDetail/>} /> */}

                <Route path="/etkinlikler/bootcamps" element={<Bootcamps />} />
                <Route path="/etkinlikler/bootcamps/:title" element={<BootcampsDetail />} />

                <Route path="/etkinlikler/hackathons" element={<Hackathons />} />
                <Route path="/etkinlikler/hackathons/:title" element={<HackathonsDetail />} />

                <Route path="/etkinlikler/kariyer-gunleri" element={<CareerDays />} />
                <Route path="/etkinlikler/kariyer-gunleri/:title" element={<CareerDaysDetail />} />

                <Route path="/kosullar-ve-sartlar" element={<TermsOfUse />} />
                <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
                <Route path="/cerez-politikasi" element={<CookiePolicy />} />

                <Route path="/admin/egitim-ekle" element={<EducationPost />} />
                <Route path="/admin/egitimci-ekle" element={<EducatorPost />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss pauseOnHover/>
        </>
    );
}

export default App;
