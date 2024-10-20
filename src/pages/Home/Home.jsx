import './Home.css';



import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';
import HomeTeamSection from '../../components/HomeTeamSection/HomeTeamSection';
import HomeDiscordSection from '../../components/HomeDiscordSection/HomeDiscordSection';

const Home = () => {
  return (
    <>
     
      <WelcomeSection/>
      <AboutSection />
      <HomeBillboardSection/>
      <HomeTeamSection/>
      <HomeDiscordSection/>
    </>
  );
}

export default Home;

