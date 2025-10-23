import React, { useState, useEffect } from 'react';
import { FaUserTie, FaUserGraduate, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import './BookingWizard.css';

const BookingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    bookingType: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    hasColleagues: 'no',
    terms: false
  });
  const [addedColleagues, setAddedColleagues] = useState([]);
  const [currentColleague, setCurrentColleague] = useState({
    position: '',
    size: '',
    name: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const steps = [
    { number: 1, title: 'Blazer/Gown Selection' },
    { number: 2, title: 'Personal Information' },
    { number: 3, title: 'Colleague Booking' },
    { number: 4, title: 'Review & Submit' }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle colleague input changes
  const handleColleagueChange = (e) => {
    const { name, value } = e.target;
    setCurrentColleague(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add colleague
  const addColleague = () => {
    // Validate required fields
    if (!currentColleague.position.trim()) {
      setErrors(prev => ({ ...prev, colleaguePosition: 'Please enter the colleague\'s position' }));
      return;
    }
    if (!currentColleague.size) {
      setErrors(prev => ({ ...prev, colleagueSize: 'Please select a size' }));
      return;
    }

    const colleague = {
      id: Date.now(),
      position: currentColleague.position.trim(),
      size: currentColleague.size,
      name: currentColleague.name.trim() || 'Not provided',
      additionalInfo: currentColleague.additionalInfo.trim() || 'None'
    };

    setAddedColleagues(prev => [...prev, colleague]);
    clearColleagueForm();
    showSuccessMessage('Colleague added successfully!');
  };

  // Remove colleague
  const removeColleague = (id) => {
    setAddedColleagues(prev => prev.filter(c => c.id !== id));
    showSuccessMessage('Colleague removed successfully!');
  };

  // Edit colleague
  const editColleague = (id) => {
    const colleague = addedColleagues.find(c => c.id === id);
    if (colleague) {
      setCurrentColleague({
        position: colleague.position,
        size: colleague.size,
        name: colleague.name === 'Not provided' ? '' : colleague.name,
        additionalInfo: colleague.additionalInfo === 'None' ? '' : colleague.additionalInfo
      });
      removeColleague(id);
    }
  };

  // Clear colleague form
  const clearColleagueForm = () => {
    setCurrentColleague({
      position: '',
      size: '',
      name: '',
      additionalInfo: ''
    });
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.colleaguePosition;
      delete newErrors.colleagueSize;
      return newErrors;
    });
  };

  // Show success message
  const showSuccessMessage = (message) => {
    // Could be implemented with a toast notification library
    console.log(message);
  };

  // Validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 0: // Booking Type
        if (!formData.bookingType) {
          newErrors.bookingType = 'Please select a booking type';
        }
        break;

      case 1: // Personal Information
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'Please enter your first name';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Please enter your last name';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Please enter your address';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Please enter an email address';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Please enter a phone number';
        }
        break;

      case 2: // Colleague Booking
        if (!formData.hasColleagues) {
          newErrors.hasColleagues = 'Please select whether you want to book for colleagues';
        }
        break;

      case 3: // Review & Submit
        if (!formData.terms) {
          newErrors.terms = 'You must agree to the terms and conditions';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      colleagues: addedColleagues,
      submission_time: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (data.success) {
        setBookingRef(data.bookingRef || 'HCSA-' + Date.now());
        setShowSuccess(true);
      } else {
        setErrors({ submit: data.message || 'Failed to submit booking' });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Unable to submit your booking. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render booking type step
  const renderBookingTypeStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Select The Attire You Want</h3>
        <p>Please select the type of attire you want to book</p>
      </div>

      <div className="booking-type-selector">
        <div className="booking-type-options">
          <div 
            className={`booking-type-card ${formData.bookingType === 'blazer' ? 'selected' : ''}`}
            onClick={() => handleInputChange({ target: { name: 'bookingType', value: 'blazer' } })}
          >
            <input 
              type="radio" 
              id="blazerBooking" 
              name="bookingType" 
              value="blazer"
              checked={formData.bookingType === 'blazer'}
              onChange={handleInputChange}
            />
            <label htmlFor="blazerBooking">
              <div className="booking-type-icon"><FaUserTie /></div>
              <div className="booking-type-name">Blazer</div>
              <div className="booking-type-desc">Book your blazer(s) and select continue</div>
            </label>
          </div>

          <div 
            className={`booking-type-card ${formData.bookingType === 'gown' ? 'selected' : ''}`}
            onClick={() => handleInputChange({ target: { name: 'bookingType', value: 'gown' } })}
          >
            <input 
              type="radio" 
              id="gownBooking" 
              name="bookingType" 
              value="gown"
              checked={formData.bookingType === 'gown'}
              onChange={handleInputChange}
            />
            <label htmlFor="gownBooking">
              <div className="booking-type-icon"><FaUserGraduate /></div>
              <div className="booking-type-name">Gown</div>
              <div className="booking-type-desc">Book your gown(s) and select continue</div>
            </label>
          </div>
        </div>
        {errors.bookingType && <div className="error-message">{errors.bookingType}</div>}
      </div>
    </div>
  );

  // Render personal information step
  const renderPersonalInfoStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Personal Information</h3>
        <p>Please provide your personal details</p>
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="firstName">First Name <span className="required">*</span></label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
          />
          <div className="field-hint">Your first name</div>
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>

        <div className="form-group half">
          <label htmlFor="lastName">Last Name <span className="required">*</span></label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
          />
          <div className="field-hint">Your last name</div>
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address <span className="required">*</span></label>
        <textarea 
          id="address" 
          name="address" 
          rows="2"
          value={formData.address}
          onChange={handleInputChange}
          className={errors.address ? 'error' : ''}
        />
        <div className="field-hint">Your complete physical address</div>
        {errors.address && <div className="error-message">{errors.address}</div>}
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="email">Email Address <span className="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          <div className="field-hint">Your email address</div>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group half">
          <label htmlFor="phone">Phone Number <span className="required">*</span></label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error' : ''}
          />
          <div className="field-hint">Your contact number with country code</div>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
      </div>
    </div>
  );

  // Render colleague booking step
  const renderColleagueStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Colleague Booking</h3>
        <p>As a director or superior, you can book for other colleagues in your organization</p>
      </div>

      <div className="form-group">
        <label>Do you want to book for additional colleagues?</label>
        <div className="radio-group">
          <div className="radio-option">
            <input 
              type="radio" 
              id="bookForColleagues" 
              name="hasColleagues" 
              value="yes"
              checked={formData.hasColleagues === 'yes'}
              onChange={handleInputChange}
            />
            <label htmlFor="bookForColleagues">Yes, book for colleagues</label>
          </div>
          <div className="radio-option">
            <input 
              type="radio" 
              id="noColleagues" 
              name="hasColleagues" 
              value="no"
              checked={formData.hasColleagues === 'no'}
              onChange={handleInputChange}
            />
            <label htmlFor="noColleagues">No, just for myself</label>
          </div>
        </div>
      </div>

      {formData.hasColleagues === 'yes' && (
        <>
          <div className="colleague-entry-form">
            <div className="colleague-form">
              <div className="colleague-header">
                <h4>Add Colleague Information</h4>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="position">Position <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="position" 
                    name="position"
                    value={currentColleague.position}
                    onChange={handleColleagueChange}
                    placeholder="e.g., Manager, Director, Executive"
                    className={errors.colleaguePosition ? 'error' : ''}
                  />
                  {errors.colleaguePosition && <div className="error-message">{errors.colleaguePosition}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="size">{formData.bookingType === 'blazer' ? 'Blazer' : 'Gown'} Size <span className="required">*</span></label>
                  <select 
                    id="size" 
                    name="size"
                    value={currentColleague.size}
                    onChange={handleColleagueChange}
                    className={errors.colleagueSize ? 'error' : ''}
                  >
                    <option value="">Select size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xtralarge">XtraLarge</option>
                    <option value="xxl">XXL</option>
                  </select>
                  {errors.colleagueSize && <div className="error-message">{errors.colleagueSize}</div>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="colleagueName">Name (Optional)</label>
                <input 
                  type="text" 
                  id="colleagueName" 
                  name="name"
                  value={currentColleague.name}
                  onChange={handleColleagueChange}
                  placeholder="Colleague's full name"
                />
                <div className="field-hint">Name is optional and can be provided later</div>
              </div>
              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Info (Optional)</label>
                <textarea 
                  id="additionalInfo" 
                  name="additionalInfo" 
                  rows="2"
                  value={currentColleague.additionalInfo}
                  onChange={handleColleagueChange}
                  placeholder="Any additional information about this colleague"
                />
                <div className="field-hint">Optional additional information or special requirements</div>
              </div>
              <div className="colleague-actions">
                <button type="button" className="btn btn-primary" onClick={addColleague}>Add Colleague</button>
                <button type="button" className="btn btn-secondary" onClick={clearColleagueForm}>Clear Form</button>
              </div>
            </div>
          </div>

          {addedColleagues.length > 0 && (
            <div className="added-colleagues">
              <h4>Added Colleagues ({addedColleagues.length})</h4>
              <div className="colleagues-list">
                {addedColleagues.map((colleague, index) => (
                  <div key={colleague.id} className="colleague-item">
                    <div className="colleague-info">
                      <div className="colleague-summary">
                        <strong>{colleague.position}</strong> - {formData.bookingType === 'blazer' ? 'Blazer' : 'Gown'} Size: {colleague.size}
                        <br /><span className="colleague-name">Name: {colleague.name}</span>
                        {colleague.additionalInfo && colleague.additionalInfo !== 'None' && (
                          <><br /><span className="colleague-additional-info">Additional Info: {colleague.additionalInfo}</span></>
                        )}
                      </div>
                    </div>
                    <div className="colleague-actions">
                      <button type="button" className="btn-small btn-edit" onClick={() => editColleague(colleague.id)}>
                        <FaEdit /> Edit
                      </button>
                      <button type="button" className="btn-small btn-remove" onClick={() => removeColleague(colleague.id)}>
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  // Render review step
  const renderReviewStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Review & Submit</h3>
        <p>Please review your booking details before submission</p>
      </div>

      <div className="review-section">
        <h4>Booking Type</h4>
        <div className="review-content">
          <p><strong>{formData.bookingType === 'blazer' ? 'Blazer Booking' : 'Gown Booking'}</strong></p>
        </div>
      </div>

      <div className="review-section">
        <h4>Personal Information</h4>
        <div className="review-content">
          <table>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{formData.firstName} {formData.lastName}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{formData.address}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{formData.email}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{formData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="review-section">
        <h4>Colleague Booking</h4>
        <div className="review-content">
          {formData.hasColleagues === 'yes' ? (
            addedColleagues.length > 0 ? (
              <>
                <p><strong>Booking for {addedColleagues.length} colleague(s):</strong></p>
                <table>
                  <tbody>
                    {addedColleagues.map((colleague, index) => (
                      <tr key={colleague.id}>
                        <td><strong>Colleague {index + 1}:</strong></td>
                        <td>
                          <strong>Position:</strong> {colleague.position}<br />
                          <strong>{formData.bookingType === 'blazer' ? 'Blazer' : 'Gown'} Size:</strong> {colleague.size}<br />
                          <strong>Name:</strong> {colleague.name}
                          {colleague.additionalInfo && colleague.additionalInfo !== 'None' && (
                            <><br /><strong>Additional Info:</strong> {colleague.additionalInfo}</>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p><em>No colleagues added yet</em></p>
            )
          ) : (
            <p><strong>No additional colleagues</strong></p>
          )}
        </div>
      </div>

      <div className="booking-info-box important-notice">
        <div className="notice-icon">
          <FaExclamationTriangle />
        </div>
        <div className="notice-content">
          <h4>Important Notice</h4>
          <p>
            <strong style={{ color: '#d32f2f' }}>NB:</strong> After submitting your booking, please take a screenshot of the confirmation page and send it to our team for cross-checking and verification.
          </p>
        </div>
      </div>

      <div className="form-group terms-condition">
        <input 
          type="checkbox" 
          id="terms" 
          name="terms"
          checked={formData.terms}
          onChange={handleInputChange}
        />
        <label htmlFor="terms">
          I confirm that all information provided is accurate and agree to the <a href="#" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> of the HCSA booking service. <span className="required">*</span>
        </label>
        {errors.terms && <div className="error-message">{errors.terms}</div>}
      </div>
    </div>
  );

  // Success message
  if (showSuccess) {
    return (
      <div className="booking-wizard">
        <div className="booking-success">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h3>Booking Submitted Successfully!</h3>
          <p>Thank you {formData.firstName} {formData.lastName} for your {formData.bookingType} booking. We have received your request and will process it promptly.</p>
          <p>Your booking reference number: <strong>{bookingRef}</strong></p>
          <p>A confirmation email has been sent to <strong>{formData.email}</strong> with your booking details.</p>
          <div className="success-actions">
            <button className="btn btn-secondary" onClick={() => window.location.href = '/'}>Return to Homepage</button>
            <button className="btn btn-primary" onClick={() => window.print()}>Print Booking Details</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-wizard">
      <div className="section-header">
        <h2>Attire Booking</h2>
        <p>Reserve ceremonial attire for the Honourable Cabinet Summit Awards</p>
      </div>

      <div className="form-progress">
        {steps.map((step, index) => (
          <div 
            key={step.number} 
            className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="wizard-form">
        {currentStep === 0 && renderBookingTypeStep()}
        {currentStep === 1 && renderPersonalInfoStep()}
        {currentStep === 2 && renderColleagueStep()}
        {currentStep === 3 && renderReviewStep()}

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <div className="step-actions">
          {currentStep > 0 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              {currentStep === 0 ? 'Continue to Personal Information' : 
               currentStep === 1 ? 'Continue to Colleague Booking' : 
               'Review Booking'}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingWizard;
