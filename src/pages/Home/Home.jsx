import './Home.css';

import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';
import HomeTeamSection from '../../components/HomeTeamSection/HomeTeamSection';
// import HomeDiscordSection from '../../components/HomeDiscordSection/HomeDiscordSection';
import HomeFeedBackSection from '../../components/HomeFeedBackSection/HomeFeedBackSection';
import HomeManagementSection from '../../components/HomeManagementSection/HomeManagementSection';
import { useEffect, useRef } from 'react';

const Home = () => {

    useEffect(() => {
        fetch("https://ataseng.com/api/get_welcome_text.php")
        .then(res => res.json())
        .then(data => {
            if(data.message === "success"){
                
            }
            else{

            }
        });
    }, []);

    var firstsec = document.getElementById('welcome-section');
    var secondsec = document.getElementById('about-section');
    var lastScrollTop = 0;
    window.onscroll = function(){
        var st = window.pageYOffset || document.documentElement.scrollTop; 
        if (st > lastScrollTop){
            secondsec?.scrollIntoView({behavior: "smooth"});
        } else {
            firstsec?.scrollIntoView({behavior: "smooth"});
        }
        lastScrollTop = st <= 0 ? 0 : st; 
    };

    const welcomeSection = useRef(null);
    const aboutSection = useRef(null);
    const homeBillboardSection = useRef(null);
    const homeTeamSection = useRef(null);
    const homeFeedbackSection = useRef(null);
    const homeManagementSection = useRef(null);

    console.log(welcomeSection.current);

  return (
    <>
      <WelcomeSection ref={welcomeSection}/>
      <AboutSection ref={aboutSection}/>
      <HomeBillboardSection ref={homeBillboardSection}/>
      <HomeTeamSection ref={homeTeamSection}/>
      {/* <HomeDiscordSection/> */}
      <HomeFeedBackSection ref={homeFeedbackSection}/>
      <HomeManagementSection ref={homeManagementSection}/>
    </>
  );
}

export default Home;

