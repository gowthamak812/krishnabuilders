import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bedroomIcon from '../../../images/icons/bedroom.svg';
import bathRoomIcon from '../../../images/icons/bathroom.svg';
import area from '../../../images/icons/area.svg';
import carParking from '../../../images/icons/car-parking.svg';
import './result.scss';

interface Property {
  id: number;
  title: string;
  area: string;
  price: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: string;
  garden: string;
  gym: string;
  largeImage: string;
  thumbnail1: string;
  thumbnail2: string;
}

const PropertyResults: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="property-results">
      <ul>
        {properties.map((property) => (
          <Row key={property.id} className="property-card">
            <Col md={7} className="property-images">
              <Col md={8} className="large-image zoom-image">
                <img
                  src={property.largeImage}
                  alt="Property Large"
                  className="zoom-image img-fluid"
                />
              </Col>
              <Col md={4} className="thumbnails">
                <img
                  src={property.thumbnail1}
                  alt="Property Thumbnail 1"
                  className="zoom-image img-fluid"
                />
                <img
                  src={property.thumbnail2}
                  alt="Property Thumbnail 2"
                  className="zoom-image img-fluid"
                />
              </Col>
            </Col>
            <Col md={5} className="property-info">
              <i className="bi bi-house-heart like-icon"></i>
              <Row>
                <Col>
                  <div>
                    <h5 className="property-title">{property.title}</h5>
                    <p className="property-price">{property.price}</p>
                    <p className="property-description">{property.description}</p>
                    <div className="property-facilities">
                      <strong>Facilities:</strong>
                      <div className="facilities">
                        <span><img src={area} width={30} />{property.area}</span>
                        <span><img src={bedroomIcon} width={30} />{property.bedrooms} BHK</span>
                        <span><img src={bathRoomIcon} width={30} />{property.bathrooms}</span>
                        <span><img src={carParking} width={40} /></span>
                      </div>
                    </div>
                  </div>
                  <Button variant="danger" className="details-button">
                    View More Details
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </ul>
    </div>
  )
}

export default PropertyResults;