import React from 'react';
import BookingWizard from '../components/BookingWizard';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  return (
    <div className="booking-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <span className="breadcrumb-separator"><FaChevronRight /></span>
            <span className="breadcrumb-current">Attire Booking</span>
          </nav>
        </div>
      </div>

      {/* Booking Wizard */}
      <BookingWizard />

      {/* Help Section */}
      <div className="booking-help-section">
        <div className="container">
          <div className="booking-contact">
            <h4>Need Help?</h4>
            <p>If you have any questions or need assistance with your booking, please contact our support team:</p>
            <div className="contact-details">
              <p><i className="fas fa-envelope"></i> <a href="mailto:info@cabinetsummitawards.com">info@cabinetsummitawards.com</a></p>
              <p><i className="fas fa-phone"></i> <a href="tel:+263713219733">+263 71 321 9733</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
