import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './PropertySearch.scss';

const PropertySearch: React.FC = () => {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        location: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: ''
    });

    const locations = ['Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City'];
    const propertyTypes = ['Villa', 'Apartment', 'Penthouse', 'Studio'];
    const bedroomOptions = ['1', '2', '3', '4', '5+'];
    const priceRanges = [
        { label: 'Any', min: '', max: '' },
        { label: 'Under ₹50L', min: '', max: '50' },
        { label: '₹50L - ₹1Cr', min: '50', max: '100' },
        { label: '₹1Cr - ₹2Cr', min: '100', max: '200' },
        { label: '₹2Cr - ₹5Cr', min: '200', max: '500' },
        { label: 'Above ₹5Cr', min: '500', max: '' }
    ];

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (filters.location) params.append('location', filters.location);
        if (filters.propertyType) params.append('type', filters.propertyType);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);

        navigate(`/properties?${params.toString()}`);
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRange = priceRanges.find(range => range.label === e.target.value);
        if (selectedRange) {
            setFilters({
                ...filters,
                minPrice: selectedRange.min,
                maxPrice: selectedRange.max
            });
        }
    };

    return (
        <div className="property-search-wrapper">
            <Container>
                <Card className="search-card">
                    <Card.Body>
                        <h3 className="search-title mb-4">Find Your Dream Property</h3>
                        <Row className="g-3">
                            <Col md={6} lg={3}>
                                <Form.Group>
                                    <Form.Label className="search-label">
                                        <i className="bi bi-geo-alt-fill me-2"></i>Location
                                    </Form.Label>
                                    <Form.Select
                                        value={filters.location}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                        className="search-select"
                                    >
                                        <option value="">All Locations</option>
                                        {locations.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6} lg={3}>
                                <Form.Group>
                                    <Form.Label className="search-label">
                                        <i className="bi bi-building me-2"></i>Property Type
                                    </Form.Label>
                                    <Form.Select
                                        value={filters.propertyType}
                                        onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                                        className="search-select"
                                    >
                                        <option value="">All Types</option>
                                        {propertyTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6} lg={2}>
                                <Form.Group>
                                    <Form.Label className="search-label">
                                        <i className="bi bi-currency-rupee me-2"></i>Price Range
                                    </Form.Label>
                                    <Form.Select
                                        onChange={handlePriceRangeChange}
                                        className="search-select"
                                    >
                                        {priceRanges.map((range) => (
                                            <option key={range.label} value={range.label}>{range.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6} lg={2}>
                                <Form.Group>
                                    <Form.Label className="search-label">
                                        <i className="bi bi-door-closed me-2"></i>Bedrooms
                                    </Form.Label>
                                    <Form.Select
                                        value={filters.bedrooms}
                                        onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                                        className="search-select"
                                    >
                                        <option value="">Any</option>
                                        {bedroomOptions.map((bed) => (
                                            <option key={bed} value={bed}>{bed} BHK</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={12} lg={2}>
                                <Form.Group className="search-button-group">
                                    <Form.Label className="search-label d-none d-lg-block">&nbsp;</Form.Label>
                                    <Button
                                        variant="danger"
                                        className="search-button w-100"
                                        onClick={handleSearch}
                                    >
                                        <i className="bi bi-search me-2"></i>Search
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default PropertySearch;
