import './Home.css';

import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';
import HomeTeamSection from '../../components/HomeTeamSection/HomeTeamSection';
// import HomeDiscordSection from '../../components/HomeDiscordSection/HomeDiscordSection';
import HomeFeedBackSection from '../../components/HomeFeedBackSection/HomeFeedBackSection';
import HomeManagementSection from '../../components/HomeManagementSection/HomeManagementSection';
import { useEffect } from 'react';

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

  return (
    <>
      <WelcomeSection/>
      <AboutSection />
      <HomeBillboardSection/>
      <HomeTeamSection/>
      {/* <HomeDiscordSection/> */}
      <HomeFeedBackSection/>
      <HomeManagementSection/>
    </>
  );
}

export default Home;

