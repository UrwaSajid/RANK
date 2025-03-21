import React from 'react';
import aboutImage from '../assets/aboutus2.svg';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img src={aboutImage} alt="About Image" className="img-fluid rounded" style={{ width: '75%' }} />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-4">ABOUT US</h2>
                        <p className="about-text">
                            At Rank, we believe that effective team management starts with clear 
                            communication and structured feedback. Our platform is designed to 
                            simplify the way organizations manage their staff, evaluate performance, 
                            and make data-driven decisions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
