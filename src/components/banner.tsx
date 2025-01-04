
interface BannerProps {
    title: string;
    discription: string;
    image: string;
}

const Banner: React.FC<BannerProps> = ({ title, discription, image }) => {
    return (
        <>
            <div className='banner'>
                <div className="image-container">
                    <img src={image} alt="home page banner" />
                </div>
                <div className="banner-content">
                    <div>
                        <h1>{title}</h1>
                        <p>{discription}</p>
                        <div className="button-group">
                            <button className='button button-primary'>Find A Property</button>
                            <button className='button button-secondary'>Book A Valuation</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Banner;
