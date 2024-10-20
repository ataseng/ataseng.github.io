import './Home.css';



import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';
import HomeTeamSection from '../../components/HomeTeamSection/HomeTeamSection';

const Home = () => {
  return (
    <>
     
      <WelcomeSection/>
      <AboutSection />
      <HomeBillboardSection/>
      <HomeTeamSection/>
    </>
  );
}

export default Home;

