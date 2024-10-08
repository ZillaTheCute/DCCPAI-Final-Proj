import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

// Pages
import AboutPage from './Pages/AboutPage.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import UnderConstructionPage from './Pages/UnderConstructionPage/UnderConstructionPage.jsx';
import FindUsPage from './Pages/FindUsPage.jsx';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage.jsx';
import TermsAndConditionsPage from './Pages/TermsAndConditionsPage.jsx';
import ReturnsPage from './Pages/ReturnsPage.jsx';
import PaymentsPage from './Pages/PaymentsPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import AccountRegistrationPage from './Pages/AccountRegistrationPage.jsx';
import FAQPage from './Pages/FAQPage.jsx';
import ProductDetailsPage from './Pages/ProductDetailsPage.jsx';
import LogoutPage from './Pages/LogoutPage.jsx';  // Import the LogoutPage


// Simple authentication check function
const isAuthenticated = () => !!localStorage.getItem('authToken');

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/DCCPAI-Website',
    element: <LandingPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/Shop',
    element: <ShopPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/Login',
    // element: <LoginPage />,
    element: !isAuthenticated() ? <LoginPage /> : <Navigate to="/"/>,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/About',
    element: <AboutPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/FindUs',
    element: <FindUsPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/PrivacyPolicy',
    element: <PrivacyPolicyPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/TermsAndConditions',
    element: <TermsAndConditionsPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/Returns',
    element: <ReturnsPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/Payments',
    element: <PaymentsPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/Login',
    element: <LoginPage />,
    errorElement: <UnderConstructionPage />,
  },
  // Only Admin can Access Registration
  {
    path: '/Register',
    element: isAuthenticated() && [0].includes(Number(localStorage.getItem('adminState')))
      ? <AccountRegistrationPage />
      : <Navigate to="/" />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/FAQ',
    element: <FAQPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/ProductDetails',
    element: <ProductDetailsPage />,
    errorElement: <UnderConstructionPage />,
  },
  {
    path: '/PageNotFound',
    element: <UnderConstructionPage />,
  },
  {
    path: '/Logout',
    element: <LogoutPage />,  // For Logout purposes to remove authentication
    errorElement: <UnderConstructionPage />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
