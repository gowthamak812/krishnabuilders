import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ServiceItem {
    Title: string;
    Content: any;
    Icon: any;
    href: string;
}


const Items: ServiceItem[] = [
    { Title: '1 BHK Construction', href: '/1BHKConstruction', Icon: 'bi bi-bricks', Content: `Partner with us in crafting '1 BHK Homes, One Dream at a Time,' where spaces transform into havens, and the foundations of cherished memories are laid.` },
    { Title: '2 BHK Construction', href: '/2BHKConstruction', Icon: 'bi bi-buildings', Content: `At Sai Construction, we take pride in being your premier 2 BHK construction service provider, dedicated to crafting homes that resonate with your aspirations.` },
    { Title: '3 BHK Construction', href: '/3BHKConstruction', Icon: 'bi bi-tools', Content: `Entrust us with the construction of your 3 BHK, and let us build a space that not only reflects your lifestyle but stands as a testament to our commitment to excellence in every aspect of construction.` },
    { Title: 'Commercial Building Construction', href: '/CommercialBuildingConstruction', Icon: 'bi bi-nut-fill', Content: `Our Commercial Building Services are designed to meet the dynamic needs of businesses seeking to create inspiring and functional spaces.` },
    { Title: `Planning & Estimation`, href: '/Planning', Icon: 'bi bi-clipboard-data', Content: `Embark on the journey of "Planning &amp; Estimation," where every blueprint shapes tomorrow's structures and paves the way for construction excellence.` },
    { Title: 'Elevation Works', href: '/ElevationWorks', Icon: 'bi bi-house-fill', Content: `Partner with us in the journey of 'Elevating Spaces, Elevating Lives,' as we construct environments where visions rise, and aspirations reach new heights with each elevation project` },
    { Title: 'Interior Work', href: '/InteriorWork', Icon: 'bi bi-door-open-fill', Content: `Join us in the mission of "Crafting Spaces, Creating Comfort," and let's build interiors where every corner resonates with warmth, and your vision for a cozy home comes to life.` },
];


const Service: React.FC = () => {
    return (
        <>
            <div id="services" className="services py-5">
                <div className="container">
                    <h4 className="text-center mb-4">Our Services</h4>
                    <div className="row gy-4">
                        {Items.map((item) => (
                            <div className="col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className={item.Icon}></i>
                                        <div className="circle" id="circle"></div>
                                    </div>
                                    <h3>{item.Title}</h3>
                                    <p>{item.Content}</p>
                                    <a href={item.href} className="readmore stretched-link">Learn more <i className="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div></>

    );
}

export default Service;