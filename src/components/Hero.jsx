import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/dash.webp';

const Hero = () => {
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/signup'); // Changed to go to signup instead of signin
    };
    
    return (
        <section className="hero">
            <div className="container">
                <div className="row align-items-center hero-content">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1>MANAGE TEAMS LIKE NEVER BEFORE</h1>
                        <div className="subtitle">MANAGE · EVALUATE · GROW - ALL IN ONE PLACE</div>
                        <p className="hero-text">
                            Transform your team management with data-driven insights and smarter solutions. Create rooms, manage hierarchies, and deliver structured feedback—all in one place.
                        </p>
                        <button className="btn login-btn" onClick={handleGetStarted}>Get Started</button>
                    </div>
                    <div className="col-lg-6">
                        <img src={heroImage} alt="Dashboard Preview" className="hero-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/dash.webp';

const Hero = () => {
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/signin');
    };
    
    return (
        <section className="hero">
            <div className="container">
                <div className="row align-items-center hero-content">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1>MANAGE TEAMS LIKE NEVER BEFORE</h1>
                        <div className="subtitle">MANAGE · EVALUATE · GROW - ALL IN ONE PLACE</div>
                        <p className="hero-text">
                            Transform your team management with data-driven insights and smarter solutions. Create rooms, manage hierarchies, and deliver structured feedback—all in one place.
                        </p>
                        <button className="btn login-btn" onClick={handleGetStarted}>Get Started</button>
                    </div>
                    <div className="col-lg-6">
                        <img src={heroImage} alt="Dashboard Preview" className="hero-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
