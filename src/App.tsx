import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import 'bootstrap/scss/bootstrap.scss';
import './global.scss';
import Home from './pages/Home/home';
import About from './pages/About/about';
import Contact from './pages/Contact/contact';
import Footer from './components/footer';
import PropertyResults from './pages/Properties/Results/results';
import PropertyDetails from './pages/Properties/Details/details';
import Valuation from './pages/Valuation/valuation';
import Services from './pages/Services/services';
import NotFound from './pages/404/404';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<PropertyResults />} />
        <Route path="/property-services" element={<Services />} />
        <Route path="/property-for-sale/:slug" element={<PropertyDetails />} />
        <Route path="/valuation" element={<Valuation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;