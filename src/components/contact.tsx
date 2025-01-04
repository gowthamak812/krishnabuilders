import React from 'react';
import { Col } from 'react-bootstrap';

const Contact: React.FC = () => {
  return (
    <>
      <section className='mycontact container d-block d-lg-flex'>
        <Col sm={12} lg={6}>
          <div className="h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31162.049877383895!2d78.56471545000001!3d12.499168000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac540dd5ac6613%3A0x6f3185b3090fa58!2sTirupathur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715870154059!5m2!1sen!2sin"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              style={{ position: 'relative', width: '100%', height: '95%', border: 0, minHeight: '424px' }}
            ></iframe>
          </div>
        </Col>
        <Col sm={12} lg={6} className="myform" >
          <p className="display-6">If You Have Any Query, Please Contact Us</p>
          <p className="mb-4">Our team is dedicated to ensuring your visit is memorable, so please don't hesitate to get in touch with us.</p>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" className="form-control bg-white" id="name" placeholder="Your Name" name="name" />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="email" className="form-control bg-white" id="email" placeholder="Your Email" name="email" />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div>
                <div className="form-floating">
                  <input type="text" className="form-control bg-white" id="subject" placeholder="Phone" name="phone" />
                  <label htmlFor="phone">Phone</label>
                </div>
              </div>
              <div>
                <div className="form-floating">
                  <textarea className="form-control bg-white" placeholder="Leave a message here" id="message" style={{ height: "150px" }} name="comments"></textarea>
                  <label htmlFor="message">Message</label>
                </div>
              </div>
              <div>
                <button className="button button-primary py-3 px-5" type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </Col>
      </section>
    </>
  );
}

export default Contact;
