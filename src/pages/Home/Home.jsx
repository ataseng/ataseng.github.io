import './Home.css';

import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';
import HomeTeamSection from '../../components/HomeTeamSection/HomeTeamSection';
// import HomeDiscordSection from '../../components/HomeDiscordSection/HomeDiscordSection';
import HomeFeedBackSection from '../../components/HomeFeedBackSection/HomeFeedBackSection';
import HomeManagementSection from '../../components/HomeManagementSection/HomeManagementSection';
import { useEffect, useRef, useState } from 'react';
import { homepage_default_content } from './homepage_default_content';

const Home = () => {

    const welcomeSectionRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const homeBillboardSectionRef = useRef(null);
    const homeTeamSectionRef = useRef(null);
    const homeFeedbackSectionRef = useRef(null);
    const homeManagementSectionRef = useRef(null);

    const [our_team, setOurTeam] = useState([]);

    const [homepage_content, setHomePageContent] = useState(homepage_default_content);

    useEffect(() => {
        fetch("https://ataseng.com/api/pages/home.php")
            .then(res => res.json())
            .then(data => {
                if (data.message === "success") {
                    setHomePageContent(data.homepage_content);
                    setOurTeam(data.teamcard_content);
                }
                else {
                    console.error(data.error);
                }
            })
            .catch(error => console.error(error));

    }, []);

    let lastScrollTop = 0;
    window.onscroll = function () {
        var st = window.pageYOffset || document?.documentElement?.scrollTop;
        if (st > lastScrollTop) {
            if (st <= aboutSectionRef?.current?.offsetTop) {
                aboutSectionRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        lastScrollTop = st <= 0 ? 0 : st;
    };

    return (
        <>
            <WelcomeSection text={homepage_content.WelcomeText} />
            <AboutSection ref={aboutSectionRef} title={homepage_content.AboutTitle} text={homepage_content.AboutText} listItems={homepage_content.AboutListItems} />
            <HomeBillboardSection title={homepage_content.BillboardTitle} text={homepage_content.BillboardText} listItems={homepage_content.BillboardListItems}/>
            <HomeTeamSection our_team = {our_team}/>
            {/* <HomeDiscordSection/> */}

            {/* TODO API */}
            <HomeFeedBackSection />
            <HomeManagementSection />
        </>
    );
}

export default Home;

