import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GetAdmissionPage from './pages/getAdmission';
import AboutPage from './pages/about'
import AdmissionPage from './pages/admission';
import FaqPage from './pages/faq';
import ContactPage from './pages/contact';
import HomePage from './pages/home';
import ErrorPage from './pages/errorPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {

  return (

    <BrowserRouter>
      <div className='body'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<AdmissionPage />} />
          <Route path="/admission/list" element={<GetAdmissionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;