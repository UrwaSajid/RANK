import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        { question: "What is Rank?", answer: "Rank is a modern HR platform designed to simplify feedback, performance evaluation, and decision-making for organizations. It allows senior staff to create rooms, manage hierarchies, and provide structured feedback, while employees can join rooms and track their performance." },
        { question: "Who can use Rank?", answer: "Rank is ideal for organizations of all sizes, including companies, educational institutions, and government bodies. Senior staff can create rooms and manage teams, while employees can join rooms to receive feedback and track their progress." },
        { question: "What features does Rank offer?", answer: "Rank offers features like hierarchical feedback, performance tracking, analytics and reports, decision-making tools (e.g., promotions, warnings), and customizable feedback criteria." },
        { question: "Is Rank secure?", answer: "Yes, Rank prioritizes data security and privacy. We use robust encryption and access controls to protect your information." },
        { question: "Does Rank integrate with other tools?", answer: "Currently, Rank is a standalone platform, but we are working on integrations with popular tools like Slack, Microsoft Teams, and Google Workspace." },
        { question: "Can I export reports?", answer: "Yes, senior staff can export performance reports and analytics for further analysis." }
    ];

    return (
        <section id="faq" className="faq">
            <div className="container">
                <h2 className="text-center mb-5">Frequently Asked Questions</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="faq-question">{faq.question}</div>
                                <div
                                    className="faq-answer"
                                    style={{
                                        maxHeight: activeIndex === index ? '200px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.3s ease-out'
                                    }}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
