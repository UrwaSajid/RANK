import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP'; // Import the new component
import AppTheme from './theme/AppTheme';
import './style.css';

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <FAQ />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <AppTheme>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} /> {/* Add the new route */}
      </Routes>
    </AppTheme>
  );
};

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import AppTheme from './theme/AppTheme';
import './style.css';

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <FAQ />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <AppTheme>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AppTheme>
  );
};

export default App;
