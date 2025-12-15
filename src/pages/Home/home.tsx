import React from 'react';
import Banner from '../../components/banner';
import HomeBanner from '../../images/home.jpg';
import Service from '../../components/services';
import Contact from '../../components/contact';
import PropertySearch from '../../components/PropertySearch';


const Home: React.FC = () => {
  return (
    <>
      <Banner
        title="Find Your Dream Property"
        discription="Discover prime residential properties in Bangalore's most sought-after locations. Your perfect home awaits."
        image={HomeBanner}
      >
        <PropertySearch />
      </Banner>
      <Service />
      <Contact />
    </>
  );
}

export default Home;
