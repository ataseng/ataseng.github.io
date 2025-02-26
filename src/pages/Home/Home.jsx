import './Home.css';

import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';
import HomeTeamSection from '../../components/HomeTeamSection/HomeTeamSection';
import HomeDiscordSection from '../../components/HomeDiscordSection/HomeDiscordSection';
import HomeFeedBackSection from '../../components/HomeFeedBackSection/HomeFeedBackSection';
import HomeManagementSection from '../../components/HomeManagementSection/HomeManagementSection';

const Home = () => {
  return (
    <>
      <WelcomeSection/>
      <AboutSection />
      <HomeBillboardSection/>
      <HomeTeamSection/>
      <HomeDiscordSection/>
      <HomeFeedBackSection/>
      <HomeManagementSection/>
    </>
  );
}

export default Home;

