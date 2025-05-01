import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container text-center">
                <h2 className="mb-5">Get in Touch</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <a href="mailto:support@rank.com">support@rank.com</a>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>+1 (123) 456-7890</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>Fast University CFD, Faisalabad</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
