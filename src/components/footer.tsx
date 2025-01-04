import { Col, Row } from "react-bootstrap";
import Logo from '../images/Krishna_builders.png';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer-container justify-content-between">
        <div className="container">
          <Row className="py-5 mx-auto">
            <Col sm={12} md={6} lg={3} className="pe-5">
              <Link to='/'><img src={Logo} className="logo" alt="krishna builders" /></Link>
              <p className="text-small">We specialize in turning your vision of the perfect home into reality. Explore our services and start your journey towards your dream home today.</p>
            </Col>
            <Col sm={12} md={6} lg={3} className="quick-links lh-base">
              <h5>Quick links</h5>
              <span></span>
              <p><Link to="/about">About</Link></p>
              <p><Link to="/blogs">Blogs</Link></p>
              <p><Link to="/terms-and-conditions">Terms and Conditions</Link></p>
              <p><Link to="/privacy-policy">Privacy Policy</Link></p>
            </Col>
            <Col sm={12} md={6} lg={3} className="lh-base">
              <h5>Contacts</h5>
              <span></span>
              <p>Sivasakthi Nagar, Tirupattur<br />Pincode - 635 901</p>
              <p><a href="mailto:gowthamak812@gmail.com">gowthamak812@gmail.com</a></p>
              <p><a href="tel:919344832658">+91 9344832658</a></p>
            </Col>
            <Col sm={12} md={6} lg={3} className="lh-base">
              <h5>Our Latest Properties</h5>
              <span></span>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="py-4 bg-black text-white">
          <Row className="d-flex justify-content-between container mx-auto lh-base">
            <hr />
            <Col xs="auto">2024 © All rights reserved by Krishna Builders</Col>
            <Col xs="auto">Site by Gowtham AK</Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Footer;