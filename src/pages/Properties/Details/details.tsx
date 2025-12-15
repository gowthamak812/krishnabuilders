import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner, Card, Form } from 'react-bootstrap';
import './details.scss';

interface PropertyFeatures {
  interior: string[];
  exterior: string[];
  amenities: string[];
}

interface NearbyPlaces {
  schools: string[];
  hospitals: string[];
  shopping: string[];
  transport: string[];
}

interface Agent {
  name: string;
  phone: string;
  email: string;
}

interface Property {
  id: number;
  title: string;
  propertyType: string;
  status: string;
  price: string;
  pricePerSqft: string;
  area: string;
  builtUpArea: string;
  carpetArea: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  parking: number;
  facing: string;
  floor: string;
  totalFloors: number;
  furnishing: string;
  ageOfProperty: string;
  possession: string;
  reraNumber: string;
  description: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmarks: string[];
  maintenanceCharges: string;
  images: string[];
  largeImage: string;
  thumbnail1: string;
  thumbnail2: string;
  floorPlan: string;
  virtualTour: string;
  features: PropertyFeatures;
  nearbyPlaces: NearbyPlaces;
  agent: Agent;
  slug: string;
}

const PropertyDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/properties.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Property[] = await response.json();

        const foundProperty = data.find((p) => p.slug === slug);
        if (foundProperty) {
          setProperty(foundProperty);
          setActiveImage(foundProperty.images[0]);
          const priceValue = parseFloat(foundProperty.price.replace(/[₹,Crore]/g, '').trim()) * 10000000;
          setLoanAmount(priceValue * 0.8);
        } else {
          setError('Property not found');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Calculate EMI
  useEffect(() => {
    if (loanAmount > 0) {
      const monthlyRate = interestRate / 12 / 100;
      const months = loanTenure * 12;
      const emiValue = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      setEmi(emiValue);
    }
  }, [loanAmount, interestRate, loanTenure]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const nextImage = () => {
    if (property) {
      setLightboxIndex((lightboxIndex + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setLightboxIndex((lightboxIndex - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !property) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <h2>{error || 'Property not found'}</h2>
        <Button variant="outline-danger" onClick={() => navigate('/properties')}>Back to Properties</Button>
      </Container>
    );
  }

  return (
    <div className="property-details-page">
      {/* Breadcrumb */}
      <Container className="breadcrumb-section py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/properties">Properties</a></li>
            <li className="breadcrumb-item active" aria-current="page">{property.locality}</li>
          </ol>
        </nav>
      </Container>

      {/* Hero Section */}
      <Container className="hero-section mb-4">
        <Row>
          <Col lg={8}>
            <h1 className="property-title">{property.title}</h1>
            <p className="property-address">
              <i className="bi bi-geo-alt-fill text-danger"></i> {property.address}, {property.locality}, {property.city}
            </p>
            <div className="property-badges mb-3">
              <Badge bg="success" className="me-2">{property.status}</Badge>
              <Badge bg="info" className="me-2">{property.propertyType}</Badge>
              <Badge bg="secondary">RERA: {property.reraNumber}</Badge>
            </div>
          </Col>
          <Col lg={4} className="text-lg-end">
            <h2 className="property-price text-danger mb-2">{property.price}</h2>
            <p className="price-per-sqft text-muted">{property.pricePerSqft}/sqft</p>
          </Col>
        </Row>
      </Container>

      {/* Image Gallery */}
      <Container className="gallery-section mb-5">
        <Row>
          <Col lg={8}>
            <div className="main-image-container mb-3" onClick={() => openLightbox(0)}>
              <img src={activeImage} alt={property.title} className="main-image" />
              <div className="image-overlay">
                <i className="bi bi-arrows-fullscreen"></i> View All Photos
              </div>
            </div>
            <Row className="thumbnails g-2">
              {property.images.slice(0, 6).map((img, index) => (
                <Col xs={4} md={2} key={index}>
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  />
                </Col>
              ))}
              {property.images.length > 6 && (
                <Col xs={4} md={2}>
                  <div className="thumbnail more-images" onClick={() => openLightbox(0)}>
                    <span>+{property.images.length - 6} more</span>
                  </div>
                </Col>
              )}
            </Row>
          </Col>

          {/* Sticky Sidebar */}
          <Col lg={4}>
            <Card className="sticky-sidebar">
              <Card.Body>
                <h4 className="mb-3">Contact Agent</h4>
                <div className="agent-info mb-4">
                  <h5>{property.agent.name}</h5>
                  <p className="mb-1"><i className="bi bi-telephone-fill"></i> {property.agent.phone}</p>
                  <p><i className="bi bi-envelope-fill"></i> {property.agent.email}</p>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Your Name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Your Email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Your Phone" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={3} placeholder="Message" />
                  </Form.Group>
                  <Button variant="danger" className="w-100 mb-2">Send Enquiry</Button>
                  <Button variant="outline-danger" className="w-100">Schedule Visit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Quick Stats */}
      <Container className="quick-stats mb-5">
        <Row className="g-3">
          <Col xs={6} md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <i className="bi bi-house-door stat-icon"></i>
                <h5>{property.bedrooms} BHK</h5>
                <p className="text-muted">Bedrooms</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <i className="bi bi-rulers stat-icon"></i>
                <h5>{property.area}</h5>
                <p className="text-muted">Built-up Area</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <i className="bi bi-compass stat-icon"></i>
                <h5>{property.facing}</h5>
                <p className="text-muted">Facing</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <i className="bi bi-car-front stat-icon"></i>
                <h5>{property.parking}</h5>
                <p className="text-muted">Parking</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Main Content */}
      <Container className="main-content mb-5">
        <Row>
          <Col lg={12}>
            {/* Overview */}
            <section className="content-section mb-5">
              <h3 className="section-title">Overview</h3>
              <div className="description">
                {property.description.split('\\n').map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </section>

            {/* Property Details */}
            <section className="content-section mb-5">
              <h3 className="section-title">Property Details</h3>
              <Card className="details-card">
                <Card.Body>
                  <Row className="g-4">
                    {[
                      { icon: 'building', label: 'Property Type', value: property.propertyType },
                      { icon: 'rulers', label: 'Built-up Area', value: property.builtUpArea },
                      { icon: 'bounding-box', label: 'Carpet Area', value: property.carpetArea },
                      { icon: 'door-closed', label: 'Bedrooms', value: `${property.bedrooms} BHK` },
                      { icon: 'droplet', label: 'Bathrooms', value: property.bathrooms },
                      { icon: 'window', label: 'Balconies', value: property.balconies },
                      { icon: 'layers', label: 'Floor', value: property.floor },
                      { icon: 'compass', label: 'Facing', value: property.facing },
                      { icon: 'calendar-check', label: 'Age', value: property.ageOfProperty },
                      { icon: 'key', label: 'Possession', value: property.possession },
                      { icon: 'car-front', label: 'Parking', value: `${property.parking} Covered` },
                      { icon: 'currency-rupee', label: 'Maintenance', value: property.maintenanceCharges },
                    ].map((detail, index) => (
                      <Col md={6} lg={4} key={index}>
                        <div className="detail-item">
                          <div className="detail-icon">
                            <i className={`bi bi-${detail.icon}`}></i>
                          </div>
                          <div className="detail-content">
                            <span className="detail-label">{detail.label}</span>
                            <span className="detail-value">{detail.value}</span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </section>

            {/* Features & Amenities */}
            <section className="content-section mb-5">
              <h3 className="section-title">Features & Amenities</h3>

              <div className="features-modern-grid">
                {/* Interior Features */}
                <div className="feature-category-section mb-5">
                  <div className="category-header-modern">
                    <div className="category-icon">
                      <i className="bi bi-house-door-fill"></i>
                    </div>
                    <h4>Interior Features</h4>
                  </div>
                  <Row className="g-3">
                    {property.features.interior.map((feature, index) => (
                      <Col md={6} lg={4} key={index}>
                        <div className="modern-feature-card">
                          <div className="feature-check">
                            <i className="bi bi-check-circle-fill"></i>
                          </div>
                          <span className="feature-text">{feature}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                {/* Exterior Features */}
                <div className="feature-category-section mb-5">
                  <div className="category-header-modern">
                    <div className="category-icon">
                      <i className="bi bi-tree-fill"></i>
                    </div>
                    <h4>Exterior Features</h4>
                  </div>
                  <Row className="g-3">
                    {property.features.exterior.map((feature, index) => (
                      <Col md={6} lg={4} key={index}>
                        <div className="modern-feature-card">
                          <div className="feature-check">
                            <i className="bi bi-check-circle-fill"></i>
                          </div>
                          <span className="feature-text">{feature}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                {/* Amenities */}
                <div className="feature-category-section">
                  <div className="category-header-modern">
                    <div className="category-icon">
                      <i className="bi bi-stars"></i>
                    </div>
                    <h4>Community Amenities</h4>
                  </div>
                  <Row className="g-3">
                    {property.features.amenities.map((amenity, index) => (
                      <Col md={6} lg={4} key={index}>
                        <div className="modern-feature-card">
                          <div className="feature-check">
                            <i className="bi bi-check-circle-fill"></i>
                          </div>
                          <span className="feature-text">{amenity}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </section>

            {/* Floor Plan */}
            {property.floorPlan && (
              <section className="content-section mb-5">
                <h3 className="section-title">Floor Plan</h3>
                <img src={property.floorPlan} alt="Floor Plan" className="floor-plan-image" />
              </section>
            )}

            {/* Location */}
            <section className="content-section mb-5">
              <h3 className="section-title">Location & Nearby</h3>
              <Card className="location-card">
                <Card.Body>
                  <div className="address-section mb-4">
                    <i className="bi bi-geo-alt-fill text-danger"></i>
                    <div>
                      <h6>Address</h6>
                      <p>{property.address}, {property.locality}, {property.city}, {property.state} - {property.pincode}</p>
                    </div>
                  </div>

                  <div className="landmarks-section mb-4">
                    <h6 className="mb-3"><i className="bi bi-pin-map-fill me-2"></i>Nearby Landmarks</h6>
                    <Row className="g-2">
                      {property.landmarks.map((landmark, index) => (
                        <Col md={6} key={index}>
                          <div className="landmark-badge">
                            <i className="bi bi-geo-fill"></i>
                            <span>{landmark}</span>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <Row className="nearby-places-grid">
                    <Col md={6} className="mb-4">
                      <div className="nearby-category">
                        <div className="category-header">
                          <i className="bi bi-mortarboard-fill"></i>
                          <h6>Schools</h6>
                        </div>
                        <ul>
                          {property.nearbyPlaces.schools.map((school, index) => (
                            <li key={index}>{school}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col md={6} className="mb-4">
                      <div className="nearby-category">
                        <div className="category-header">
                          <i className="bi bi-hospital-fill"></i>
                          <h6>Hospitals</h6>
                        </div>
                        <ul>
                          {property.nearbyPlaces.hospitals.map((hospital, index) => (
                            <li key={index}>{hospital}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col md={6} className="mb-4">
                      <div className="nearby-category">
                        <div className="category-header">
                          <i className="bi bi-cart-fill"></i>
                          <h6>Shopping</h6>
                        </div>
                        <ul>
                          {property.nearbyPlaces.shopping.map((shop, index) => (
                            <li key={index}>{shop}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col md={6} className="mb-4">
                      <div className="nearby-category">
                        <div className="category-header">
                          <i className="bi bi-train-front-fill"></i>
                          <h6>Transport</h6>
                        </div>
                        <ul>
                          {property.nearbyPlaces.transport.map((transport, index) => (
                            <li key={index}>{transport}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </section>

            {/* EMI Calculator */}
            <section className="content-section mb-5">
              <h3 className="section-title">EMI Calculator</h3>
              <Card className="emi-calculator-card">
                <Card.Body>
                  <Row>
                    <Col lg={7}>
                      <div className="calculator-inputs">
                        <Form.Group className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label className="mb-0">Loan Amount</Form.Label>
                            <span className="input-value">₹{(loanAmount / 10000000).toFixed(2)} Cr</span>
                          </div>
                          <Form.Range
                            min={1000000}
                            max={parseFloat(property.price.replace(/[₹,Crore]/g, '').trim()) * 10000000}
                            step={100000}
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                            className="custom-range"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label className="mb-0">Interest Rate</Form.Label>
                            <span className="input-value">{interestRate}% p.a.</span>
                          </div>
                          <Form.Range
                            min={6}
                            max={15}
                            step={0.1}
                            value={interestRate}
                            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                            className="custom-range"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label className="mb-0">Loan Tenure</Form.Label>
                            <span className="input-value">{loanTenure} Years</span>
                          </div>
                          <Form.Range
                            min={5}
                            max={30}
                            step={1}
                            value={loanTenure}
                            onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                            className="custom-range"
                          />
                        </Form.Group>
                      </div>
                    </Col>

                    <Col lg={5}>
                      <div className="emi-result-card">
                        <div className="emi-main">
                          <p className="emi-label">Monthly EMI</p>
                          <h2 className="emi-amount">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h2>
                        </div>
                        <div className="emi-breakdown">
                          <div className="breakdown-item">
                            <span className="breakdown-label">Principal Amount</span>
                            <span className="breakdown-value">₹{loanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                          </div>
                          <div className="breakdown-item">
                            <span className="breakdown-label">Total Interest</span>
                            <span className="breakdown-value">₹{((emi * loanTenure * 12) - loanAmount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                          </div>
                          <div className="breakdown-item total">
                            <span className="breakdown-label">Total Amount</span>
                            <span className="breakdown-value">₹{(emi * loanTenure * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </section>
          </Col>
        </Row>
      </Container>

      {/* Lightbox */}
      {showLightbox && property && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="bi bi-x-lg"></i>
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <img src={property.images[lightboxIndex]} alt={`Property ${lightboxIndex + 1}`} />
            <button className="lightbox-next" onClick={nextImage}>
              <i className="bi bi-chevron-right"></i>
            </button>
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetails;
