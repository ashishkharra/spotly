import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import ScrollTop from './components/ScrollTop.jsx';
import Loading from './components/Loading.jsx';
import Error from './components/Error.jsx';
import Protected from './components/Protected.jsx';
import { userAuth } from './components/Store.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Register = lazy(() => import('./components/Register/Register.jsx'));
const Profile = lazy(() => import('./components/Profile/Profile.jsx'));
const FindParking = lazy(() => import('./pages/FindParking.jsx'));
const HowItWork = lazy(() => import('./pages/HowItWork.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const ListSpace = lazy(() => import('./pages/ListSpace.jsx'));

const App = () => {
  useEffect(() => {
    userAuth.getState().fetchUser();
  },[]);
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Suspense fallback={<div className="flex h-96 justify-center items-center"><Loading /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Protected element={<Profile />} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-parking" element={<FindParking />} />
          <Route path="/how-it-works" element={<HowItWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/host" element={<ListSpace />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
