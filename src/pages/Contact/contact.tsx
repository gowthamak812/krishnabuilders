import React from 'react';
import contact from '../../images/contact.jpg'
import Banner from '../../components/banner';
import ContactSection from '../../components/contact';
import './contact.scss';

const Contact: React.FC = () => {
  return (
    <>
      <Banner title="Contact" discription="contact us discription" image={contact} />
      <ContactSection />
    </>
  );
}

export default Contact;
