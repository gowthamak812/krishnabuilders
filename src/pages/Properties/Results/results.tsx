import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import bedroomIcon from '../../../images/icons/bedroom.svg';
import bathRoomIcon from '../../../images/icons/bathroom.svg';
import area from '../../../images/icons/area.svg';
import carParking from '../../../images/icons/car-parking.svg';
import './result.scss';

interface Property {
  id: number;
  title: string;
  propertyType?: string;
  status?: string;
  area: string;
  builtUpArea?: string;
  price: string;
  pricePerSqft?: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  parking?: number;
  locality?: string;
  city?: string;
  furnishing?: string;
  largeImage: string;
  thumbnail1: string;
  thumbnail2: string;
  images?: string[];
  slug: string;
}

const PropertyResults: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter properties based on URL parameters
  useEffect(() => {
    if (properties.length === 0) return;

    let filtered = [...properties];

    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');

    if (location) {
      filtered = filtered.filter(p => p.locality?.toLowerCase() === location.toLowerCase());
    }

    if (type) {
      filtered = filtered.filter(p => p.propertyType?.toLowerCase() === type.toLowerCase());
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(p => {
        const priceValue = parseFloat(p.price.replace(/[₹,Crore]/g, '').trim()) * 100; // Convert to lakhs
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return priceValue >= min && priceValue <= max;
      });
    }

    if (bedrooms) {
      const bedroomCount = bedrooms === '5+' ? 5 : parseInt(bedrooms);
      filtered = filtered.filter(p => {
        if (bedrooms === '5+') {
          return p.bedrooms >= bedroomCount;
        }
        return p.bedrooms === bedroomCount;
      });
    }

    setFilteredProperties(filtered);
  }, [properties, searchParams]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <h3>Error: {error}</h3>
      </Container>
    );
  }

  return (
    <Container className="property-results py-5">
      <h2 className="results-title mb-4">Properties for Sale</h2>
      <p className="results-count text-muted mb-4">{filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found</p>

      <div className="properties-list">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="property-card mb-4">
            <Row className="g-0">
              {/* Image Section */}
              <Col lg={7} className="property-images-col">
                <div className="property-images">
                  <div className="large-image">
                    <Link to={`/property-for-sale/${property.slug}`}>
                      <img
                        src={property.largeImage}
                        alt={property.title}
                        className="img-fluid"
                      />
                      {property.status && (
                        <Badge bg="success" className="status-badge">{property.status}</Badge>
                      )}
                    </Link>
                  </div>
                  <div className="thumbnails">
                    <img
                      src={property.thumbnail1}
                      alt="Property view 2"
                      className="img-fluid"
                    />
                    <img
                      src={property.thumbnail2}
                      alt="Property view 3"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </Col>

              {/* Content Section */}
              <Col lg={5} className="property-content-col">
                <Card.Body className="property-info">
                  <div className="property-header">
                    <i className="bi bi-heart like-icon"></i>
                    <Link to={`/property-for-sale/${property.slug}`} className="text-decoration-none">
                      <h4 className="property-title">{property.title}</h4>
                    </Link>
                    {property.locality && property.city && (
                      <p className="property-location mb-2">
                        <i className="bi bi-geo-alt-fill text-danger"></i> {property.locality}, {property.city}
                      </p>
                    )}
                  </div>

                  <div className="property-pricing mb-3">
                    <h3 className="property-price mb-1">{property.price}</h3>
                    {property.pricePerSqft && (
                      <p className="price-per-sqft text-muted mb-0">{property.pricePerSqft}/sqft</p>
                    )}
                  </div>

                  <p className="property-description">{property.description.substring(0, 150)}...</p>

                  {/* Property Features */}
                  <div className="property-features mb-3">
                    <Row className="g-2">
                      <Col xs={6} md={3}>
                        <div className="feature-item">
                          <img src={bedroomIcon} width={24} alt="Bedrooms" />
                          <span>{property.bedrooms} BHK</span>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="feature-item">
                          <img src={bathRoomIcon} width={24} alt="Bathrooms" />
                          <span>{property.bathrooms} Bath</span>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="feature-item">
                          <img src={area} width={24} alt="Area" />
                          <span>{property.area}</span>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="feature-item">
                          <img src={carParking} width={28} alt="Parking" />
                          <span>{property.parking || 2}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Additional Info */}
                  {(property.propertyType || property.furnishing) && (
                    <div className="additional-info mb-3">
                      {property.propertyType && <Badge bg="secondary" className="me-2">{property.propertyType}</Badge>}
                      {property.furnishing && <Badge bg="info">{property.furnishing}</Badge>}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="property-actions">
                    <Link to={`/property-for-sale/${property.slug}`}>
                      <Button variant="danger" className="view-details-btn">
                        View Details <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </Link>
                    <Button variant="outline-danger" className="contact-btn ms-2">
                      <i className="bi bi-telephone-fill me-2"></i>Contact
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default PropertyResults;