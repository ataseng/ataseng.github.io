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

    const welcomeSectionRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const homeBillboardSectionRef = useRef(null);
    const homeTeamSectionRef = useRef(null);
    const homeFeedbackSectionRef = useRef(null);
    const homeManagementSectionRef = useRef(null);

    useEffect(() => {
        fetch("https://ataseng.com/api/get_homepage_content.php")
        .then(res => res.json())
        .then(data => {
            if(data.message === "success"){
                console.log(data)
            }
            else{

            }
        });

    }, []);

    let lastScrollTop = 0;
    window.onscroll = function(){
        var st = window.pageYOffset || document?.documentElement?.scrollTop;
        if (st > lastScrollTop){
            if (st <= aboutSectionRef?.current?.offsetTop) {
                aboutSectionRef?.current?.scrollIntoView({behavior: "smooth", block: "start"});
            }
            // else if(st <= homeBillboardSectionRef.current.offsetTop){
            //     homeBillboardSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
            // }
            // else if(st <= homeTeamSectionRef.current.offsetTop){
            //     homeTeamSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
            // }
            // else if(st <= homeFeedbackSectionRef.current.offsetTop){
            //     homeFeedbackSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
            // }
            // else if(st <= homeManagementSectionRef.current.offsetTop){
            //     homeManagementSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
            // }
        }
        // else {
        //     if(st >= homeManagementSectionRef.current.offsetTop){
        //         homeManagementSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        //     }
        //     else if(st >= homeFeedbackSectionRef.current.offsetTop){
        //         homeFeedbackSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        //     }
        //     else if(st >= homeTeamSectionRef.current.offsetTop){
        //         homeTeamSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        //     }
        //     else if(st >= homeBillboardSectionRef.current.offsetTop){
        //         homeBillboardSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        //     }
        //     else if(st >= aboutSectionRef.current.offsetTop){
        //         aboutSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        //     }
        //     else if(st >= welcomeSectionRef.current.offsetTop){
        //         welcomeSectionRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        //     }
        // }
        lastScrollTop = st <= 0 ? 0 : st;
    };

  return (
    <>
      <WelcomeSection ref={welcomeSectionRef}/>
      <AboutSection ref={aboutSectionRef}/>
      <HomeBillboardSection ref={homeBillboardSectionRef}/>
      <HomeTeamSection ref={homeTeamSectionRef}/>
      {/* <HomeDiscordSection/> */}
      <HomeFeedBackSection ref={homeFeedbackSectionRef}/>
      <HomeManagementSection ref={homeManagementSectionRef}/>
    </>
  );
}

export default Home;

