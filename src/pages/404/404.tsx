import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../images/not-found.jpg';
import './404.scss';
const NotFound: React.FC = () => {
  return (
    <>
      <div className='not-found d-block d-md-flex'>
        <div className='not-found-image'>
          <img src={NotFoundImage} alt="page not found" />
          <div className='container not-found-content'>
            <h2>Oops! Something went wrong!</h2>
            <p className="blockquote">The page you are looking for not Available</p>
            <Link to={"/"}><button className="button button-primary">Back to Home Page</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;