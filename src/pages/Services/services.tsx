import React from 'react';
import Banner from '../../components/banner';
import Service from '../../components/services';
import ServiceImg from '../../images/services-image.jpg'
import './services.scss';

const Services: React.FC = () => {
  return (
    <>
      <Banner title="Our Services" discription="our services discription" image={ServiceImg} />
      <Service />
    </>

  );
}

export default Services;