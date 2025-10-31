import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUsers,
  FaCrown,
  FaStar,
} from "react-icons/fa";
import "./TableBookingWizard.css";

const TableBookingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tableType: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    wantsGown: "no",
    gownSize: "",
    hasColleagues: "no",
    terms: false,
  });
  const [addedColleagues, setAddedColleagues] = useState([]);
  const [currentColleague, setCurrentColleague] = useState({
    position: "",
    wantsGown: "no",
    gownSize: "",
    name: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const steps = [
    { number: 1, title: "Seat Selection" },
    { number: 2, title: "Personal Information" },
    { number: 3, title: "Gown Booking" },
    { number: 4, title: "Colleague Booking" },
    { number: 5, title: "Review & Submit" },
  ];

  const tableTypes = {
    silver: {
      name: "Silver",
      price: "$250usd",
      seats: "Seat for the high profile winner",
      features: [
        "Seat for the high profile winner",
        "Under the presidential outfit you get only a suit batch without a trouser",
        "Complimentary high profile",
        "Dinner and complimentary bottle of honey to show royalty on the silver row",
        "Customized silver seating",
      ],
      icon: FaUsers,
      color: "#C0C0C0",
    },
    gold: {
      name: "Gold Seat",
      price: "$500usd",
      seats: "One gold High profile reservation",
      features: [
        "One gold High profile reservation",
        "Complete presidential suit",
        "Second Role",
        "Golden decor",
        "High Profile meal",
        "Complimentary of a bottle of honey to show high profile",
        "Marketing material allowed",
        "Interviews with selected journalist",
        "Customized golden seating",
        "High profile customized tshirts signed by the council.",
        "Full story in the high profile s magazine to be published this December",
      ],
      icon: FaStar,
      color: "#FFD700",
    },
    platinum: {
      name: "Platinum seat",
      price: "$1000usd",
      seats: "Customized platinum seat",
      features: [
        "Customized platinum seat",
        "Platinum decorations",
        "In a front row classified seats",
        "Platinum high dinner",
        "Complementary of bottle of honey",
        "A chance to share your journey with audiences",
        "Full marketing package",
        "Waitors on the table",
        "Full story with preferred pictures in the magazine",
      ],
      icon: FaCrown,
      color: "#E5E4E2",
    },
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle colleague input changes
  const handleColleagueChange = (e) => {
    const { name, value } = e.target;
    setCurrentColleague((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add colleague
  const addColleague = () => {
    // Validate required fields
    if (!currentColleague.position.trim()) {
      setErrors((prev) => ({
        ...prev,
        colleaguePosition: "Please enter the colleague's position",
      }));
      return;
    }
    if (currentColleague.wantsGown === "yes" && !currentColleague.gownSize) {
      setErrors((prev) => ({
        ...prev,
        colleagueGownSize: "Please select a gown size",
      }));
      return;
    }

    const colleague = {
      id: Date.now(),
      position: currentColleague.position.trim(),
      wantsGown: currentColleague.wantsGown,
      gownSize:
        currentColleague.wantsGown === "yes"
          ? currentColleague.gownSize
          : "N/A",
      name: currentColleague.name.trim() || "Not provided",
      additionalInfo: currentColleague.additionalInfo.trim() || "None",
    };

    setAddedColleagues((prev) => [...prev, colleague]);
    clearColleagueForm();
    showSuccessMessage("Colleague added successfully!");
  };

  // Remove colleague
  const removeColleague = (id) => {
    setAddedColleagues((prev) => prev.filter((c) => c.id !== id));
    showSuccessMessage("Colleague removed successfully!");
  };

  // Edit colleague
  const editColleague = (id) => {
    const colleague = addedColleagues.find((c) => c.id === id);
    if (colleague) {
      setCurrentColleague({
        position: colleague.position,
        wantsGown: colleague.wantsGown,
        gownSize: colleague.gownSize !== "N/A" ? colleague.gownSize : "",
        name: colleague.name === "Not provided" ? "" : colleague.name,
        additionalInfo:
          colleague.additionalInfo === "None" ? "" : colleague.additionalInfo,
      });
      removeColleague(id);
    }
  };

  // Clear colleague form
  const clearColleagueForm = () => {
    setCurrentColleague({
      position: "",
      wantsGown: "no",
      gownSize: "",
      name: "",
      additionalInfo: "",
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.colleaguePosition;
      delete newErrors.colleagueGownSize;
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
      case 0: // Table Selection
        if (!formData.tableType) {
          newErrors.tableType = "Please select a table type";
        }
        break;

      case 1: // Personal Information
        if (!formData.firstName.trim()) {
          newErrors.firstName = "Please enter your first name";
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Please enter your last name";
        }
        if (!formData.address.trim()) {
          newErrors.address = "Please enter your address";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Please enter an email address";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Please enter a phone number";
        }
        break;

      case 2: // Gown Booking
        if (!formData.wantsGown) {
          newErrors.wantsGown = "Please select whether you want a gown";
        } else if (formData.wantsGown === "yes" && !formData.gownSize) {
          newErrors.gownSize = "Please select a gown size";
        }
        break;

      case 3: // Colleague Booking
        if (!formData.hasColleagues) {
          newErrors.hasColleagues =
            "Please select whether you want to book for colleagues";
        }
        break;

      case 4: // Review & Submit
        if (!formData.terms) {
          newErrors.terms = "You must agree to the terms and conditions";
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
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      submission_time: new Date().toISOString(),
    };

    try {
      const response = await fetch("/src/table-booking.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (data.success) {
        setBookingRef(data.bookingRef || "HCSA-" + Date.now());
        setShowSuccess(true);
      } else {
        setErrors({ submit: data.message || "Failed to submit booking" });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setErrors({ submit: "Unable to submit your booking. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render table selection step
  const renderTableSelectionStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Select Your Seat Package</h3>
        <h3>Billionaires or Aspiring Billionaires Banquet</h3>
      </div>

      <div className="table-type-selector">
        <div className="table-type-options">
          {Object.entries(tableTypes).map(([key, table]) => {
            const IconComponent = table.icon;
            return (
              <div
                key={key}
                className={`table-type-card ${
                  formData.tableType === key ? "selected" : ""
                }`}
                onClick={() =>
                  handleInputChange({
                    target: { name: "tableType", value: key },
                  })
                }
              >
                <input
                  type="radio"
                  id={`table-${key}`}
                  name="tableType"
                  value={key}
                  checked={formData.tableType === key}
                  onChange={handleInputChange}
                />
                <label htmlFor={`table-${key}`}>
                  <div className="table-type-header">
                    <div
                      className="table-type-icon"
                      style={{ color: table.color }}
                    >
                      <IconComponent />
                    </div>
                    <div className="table-type-name">{table.name}</div>
                    <div className="table-type-price">{table.price}</div>
                    <div className="table-type-seats">{table.seats}</div>
                  </div>
                  <div className="table-type-features">
                    <ul>
                      {table.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="table-type-desc">
                    Perfect for {table.seats.toLowerCase()} experience
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        {errors.tableType && (
          <div className="error-message">{errors.tableType}</div>
        )}
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
          <label htmlFor="firstName">
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? "error" : ""}
          />
          <div className="field-hint">Your first name</div>
          {errors.firstName && (
            <div className="error-message">{errors.firstName}</div>
          )}
        </div>

        <div className="form-group half">
          <label htmlFor="lastName">
            Last Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? "error" : ""}
          />
          <div className="field-hint">Your last name</div>
          {errors.lastName && (
            <div className="error-message">{errors.lastName}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address">
          Address <span className="required">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows="2"
          value={formData.address}
          onChange={handleInputChange}
          className={errors.address ? "error" : ""}
        />
        <div className="field-hint">Your complete physical address</div>
        {errors.address && (
          <div className="error-message">{errors.address}</div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ""}
          />
          <div className="field-hint">Your email address</div>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group half">
          <label htmlFor="phone">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? "error" : ""}
          />
          <div className="field-hint">
            Your contact number with country code
          </div>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
      </div>
    </div>
  );

  // Render gown booking step
  const renderGownStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Gown Booking</h3>
        <p>Would you like to book a ceremonial gown for the event?</p>
      </div>

      <div className="form-group">
        <label>
          Do you want to book a gown? <span className="required">*</span>
        </label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="wantGown"
              name="wantsGown"
              value="yes"
              checked={formData.wantsGown === "yes"}
              onChange={handleInputChange}
            />
            <label htmlFor="wantGown">Yes, book a gown for me</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="noGown"
              name="wantsGown"
              value="no"
              checked={formData.wantsGown === "no"}
              onChange={handleInputChange}
            />
            <label htmlFor="noGown">No, just the table booking</label>
          </div>
        </div>
        {errors.wantsGown && (
          <div className="error-message">{errors.wantsGown}</div>
        )}
      </div>

      {formData.wantsGown === "yes" && (
        <div className="gown-selection-form">
          <div className="form-group">
            <label htmlFor="gownSize">
              Gown Size <span className="required">*</span>
            </label>
            <select
              id="gownSize"
              name="gownSize"
              value={formData.gownSize}
              onChange={handleInputChange}
              className={errors.gownSize ? "error" : ""}
            >
              <option value="">Select gown size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xtralarge">XtraLarge</option>
              <option value="xxl">XXL</option>
            </select>
            <div className="field-hint">Please select your gown size</div>
            {errors.gownSize && (
              <div className="error-message">{errors.gownSize}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Render colleague booking step
  const renderColleagueStep = () => (
    <div className="wizard-step-content">
      <div className="step-heading">
        <h3>Colleague Booking</h3>
        <p>
          As a director or superior, you can book for other colleagues in your
          organization
        </p>
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
              checked={formData.hasColleagues === "yes"}
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
              checked={formData.hasColleagues === "no"}
              onChange={handleInputChange}
            />
            <label htmlFor="noColleagues">No, just for myself</label>
          </div>
        </div>
      </div>

      {formData.hasColleagues === "yes" && (
        <>
          <div className="colleague-entry-form">
            <div className="colleague-form">
              <div className="colleague-header">
                <h4>Add Colleague Information</h4>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="position">
                    Position <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={currentColleague.position}
                    onChange={handleColleagueChange}
                    placeholder="e.g., Manager, Director, Executive"
                    className={errors.colleaguePosition ? "error" : ""}
                  />
                  {errors.colleaguePosition && (
                    <div className="error-message">
                      {errors.colleaguePosition}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Include Gown?</label>
                  <div className="radio-group vertical">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="colleagueGownYes"
                        name="wantsGown"
                        value="yes"
                        checked={currentColleague.wantsGown === "yes"}
                        onChange={handleColleagueChange}
                      />
                      <label htmlFor="colleagueGownYes">Yes</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="colleagueGownNo"
                        name="wantsGown"
                        value="no"
                        checked={currentColleague.wantsGown === "no"}
                        onChange={handleColleagueChange}
                      />
                      <label htmlFor="colleagueGownNo">No</label>
                    </div>
                  </div>
                </div>
              </div>
              {currentColleague.wantsGown === "yes" && (
                <div className="form-group">
                  <label htmlFor="colleagueGownSize">
                    Gown Size <span className="required">*</span>
                  </label>
                  <select
                    id="colleagueGownSize"
                    name="gownSize"
                    value={currentColleague.gownSize}
                    onChange={handleColleagueChange}
                    className={errors.colleagueGownSize ? "error" : ""}
                  >
                    <option value="">Select gown size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xtralarge">XtraLarge</option>
                    <option value="xxl">XXL</option>
                  </select>
                  {errors.colleagueGownSize && (
                    <div className="error-message">
                      {errors.colleagueGownSize}
                    </div>
                  )}
                </div>
              )}
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
                <div className="field-hint">
                  Name is optional and can be provided later
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="additionalInfo">
                  Additional Info (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows="2"
                  value={currentColleague.additionalInfo}
                  onChange={handleColleagueChange}
                  placeholder="Any additional information about this colleague"
                />
                <div className="field-hint">
                  Optional additional information or special requirements
                </div>
              </div>
              <div className="colleague-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addColleague}
                >
                  Add Colleague
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={clearColleagueForm}
                >
                  Clear Form
                </button>
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
                        <strong>{colleague.position}</strong>
                        <br />
                        <span className="colleague-gown">
                          Gown:{" "}
                          {colleague.wantsGown === "yes"
                            ? `Yes (Size: ${colleague.gownSize})`
                            : "No"}
                        </span>
                        <br />
                        <span className="colleague-name">
                          Name: {colleague.name}
                        </span>
                        {colleague.additionalInfo &&
                          colleague.additionalInfo !== "None" && (
                            <>
                              <br />
                              <span className="colleague-additional-info">
                                Additional Info: {colleague.additionalInfo}
                              </span>
                            </>
                          )}
                      </div>
                    </div>
                    <div className="colleague-actions">
                      <button
                        type="button"
                        className="btn-small btn-edit"
                        onClick={() => editColleague(colleague.id)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        type="button"
                        className="btn-small btn-remove"
                        onClick={() => removeColleague(colleague.id)}
                      >
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
        <h4>Table Booking</h4>
        <div className="review-content">
          {formData.tableType && (
            <div className="table-review-card">
              <div className="table-review-header">
                <div className="table-review-name">
                  {tableTypes[formData.tableType].name}
                </div>
                <div className="table-review-price">
                  {tableTypes[formData.tableType].price}
                </div>
              </div>
              <div className="table-review-seats">
                {tableTypes[formData.tableType].seats}
              </div>
              <div className="table-review-features">
                <strong>Features:</strong>
                <ul>
                  {tableTypes[formData.tableType].features.map(
                    (feature, index) => (
                      <li key={index}>{feature}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="review-section">
        <h4>Personal Information</h4>
        <div className="review-content">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>
                  {formData.firstName} {formData.lastName}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Address:</strong>
                </td>
                <td>{formData.address}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{formData.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{formData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="review-section">
        <h4>Gown Booking</h4>
        <div className="review-content">
          {formData.wantsGown === "yes" ? (
            <p>
              <strong>Gown: Yes (Size: {formData.gownSize})</strong>
            </p>
          ) : (
            <p>
              <strong>No gown booking</strong>
            </p>
          )}
        </div>
      </div>

      <div className="review-section">
        <h4>Colleague Booking</h4>
        <div className="review-content">
          {formData.hasColleagues === "yes" ? (
            addedColleagues.length > 0 ? (
              <>
                <p>
                  <strong>
                    Booking for {addedColleagues.length} colleague(s):
                  </strong>
                </p>
                <table>
                  <tbody>
                    {addedColleagues.map((colleague, index) => (
                      <tr key={colleague.id}>
                        <td>
                          <strong>Colleague {index + 1}:</strong>
                        </td>
                        <td>
                          <strong>Position:</strong> {colleague.position}
                          <br />
                          <strong>Gown:</strong>{" "}
                          {colleague.wantsGown === "yes"
                            ? `Yes (Size: ${colleague.gownSize})`
                            : "No"}
                          <br />
                          <strong>Name:</strong> {colleague.name}
                          {colleague.additionalInfo &&
                            colleague.additionalInfo !== "None" && (
                              <>
                                <br />
                                <strong>Additional Info:</strong>{" "}
                                {colleague.additionalInfo}
                              </>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>
                <em>No colleagues added yet</em>
              </p>
            )
          ) : (
            <p>
              <strong>No additional colleagues</strong>
            </p>
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
            <strong style={{ color: "#d32f2f" }}>NB:</strong> After submitting
            your booking, please take a screenshot of the confirmation page and
            send it to our team for cross-checking and verification.
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
          I confirm that all information provided is accurate and agree to the{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>{" "}
          of the HCSA booking service. <span className="required">*</span>
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
          <p>
            Thank you {formData.firstName} {formData.lastName} for your{" "}
            {tableTypes[formData.tableType]?.name} booking. We have received
            your request and will process it promptly.
          </p>
          <p>
            Your booking reference number: <strong>{bookingRef}</strong>
          </p>
          <p>
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong> with your booking details.
          </p>
          <div className="success-actions">
            <button
              className="btn btn-secondary"
              onClick={() => (window.location.href = "/")}
            >
              Return to Homepage
            </button>
            <button className="btn btn-primary" onClick={() => window.print()}>
              Print Booking Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-wizard">
      <div className="section-header">
        <h2>Seat & Attire Booking</h2>
        <p>
          Reserve your seat and ceremonial attire for the Honourable Cabinet
          Summit Awards
        </p>
      </div>

      <div className="form-progress">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`progress-step ${
              index === currentStep ? "active" : ""
            } ${index < currentStep ? "completed" : ""}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="wizard-form">
        {currentStep === 0 && renderTableSelectionStep()}
        {currentStep === 1 && renderPersonalInfoStep()}
        {currentStep === 2 && renderGownStep()}
        {currentStep === 3 && renderColleagueStep()}
        {currentStep === 4 && renderReviewStep()}

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <div className="step-actions">
          {currentStep > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextStep}
            >
              {currentStep === 0
                ? "Continue to Personal Information"
                : currentStep === 1
                ? "Continue to Gown Booking"
                : currentStep === 2
                ? "Continue to Colleague Booking"
                : "Review Booking"}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TableBookingWizard;
