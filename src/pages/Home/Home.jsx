import './Home.css';



import AboutSection from '../../components/AboutSection/AboutSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import HomeBillboardSection from '../../components/HomeBillboardSection/HomeBillboardSection';

const Home = () => {
  return (
    <>
     
      <WelcomeSection/>
      <HomeBillboardSection/>
      <AboutSection />
    </>
  );
}

export default Home;

