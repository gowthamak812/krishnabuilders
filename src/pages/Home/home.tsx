import React from 'react';
import Banner from '../../components/banner';
import HomeBanner from '../../images/home.jpg';
import Service from '../../components/services';
import Contact from '../../components/contact';


const Home: React.FC = () => {
  return (
    <>
      <Banner title="Prime property estate agents" discription="We are a team of experienced property advisors specialising in prime residential property in Bath, Bristol and the West Country." image={HomeBanner} />
      <Service />
      <Contact />
    </>
  );
}

export default Home;
