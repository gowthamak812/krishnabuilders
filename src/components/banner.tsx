import React from 'react';

interface BannerProps {
    title: string;
    discription: string;
    image: string;
    children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ title, discription, image, children }) => {
    return (
        <>
            <div className='banner'>
                <div className="image-container">
                    <img src={image} alt="home page banner" />
                </div>
                <div className="banner-content">
                    <div className="banner-text">
                        <h1>{title}</h1>
                        <p>{discription}</p>
                    </div>
                    {children && (
                        <div className="banner-search">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Banner;
