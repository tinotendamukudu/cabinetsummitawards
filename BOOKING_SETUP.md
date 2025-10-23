# HCSA Booking System - React Implementation

## New Features Added

### 1. Multi-Step Booking Wizard Component
A complete React implementation of the blazer/gown booking form with the following features:

- **4-Step Wizard Process:**
  1. Attire Selection (Blazer/Gown)
  2. Personal Information
  3. Colleague Booking
  4. Review & Submit

- **Key Functionalities:**
  - Form validation at each step
  - Add/Edit/Remove colleagues
  - Real-time form state management
  - Success page with booking reference
  - Responsive design matching your existing UI

### 2. Routing Setup
- Integrated React Router for navigation
- Homepage route (`/`)
- Booking page route (`/booking`)
- Navigation from Presidential Outfit section to booking page

### 3. Components Created

#### `BookingWizard.jsx`
Main booking form component with multi-step wizard functionality

#### `BookingPage.jsx`
Dedicated page for the booking form with breadcrumb navigation and help section

#### Updated `PresidentialOutfit.jsx`
Added navigation button that redirects to booking page

#### Updated `App.jsx`
Integrated React Router with route configuration

## Installation Steps

### 1. Install React Router
```bash
npm install react-router-dom
```

### 2. Install Font Awesome (if not already installed)
```bash
npm install --save @fortawesome/fontawesome-free
```

Then add to your `main.jsx` or `index.html`:
```javascript
import '@fortawesome/fontawesome-free/css/all.min.css';
```

### 3. Run the Development Server
```bash
npm run dev
```

## Usage

### Navigating to Booking Page
- Click the "Book Your Outfit" button in the Presidential Outfit section
- Or navigate directly to `/booking`

### Form Flow
1. **Step 1:** Select Blazer or Gown
2. **Step 2:** Enter personal information (name, email, phone, address)
3. **Step 3:** Optionally add colleague bookings
4. **Step 4:** Review all details and submit

### API Integration

The booking form currently sends data to `/api/bookings`. Update this endpoint in `BookingWizard.jsx`:

```javascript
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(submissionData)
});
```

Replace with your actual backend endpoint.

## File Structure

```
src/
├── components/
│   ├── BookingWizard.jsx      # Multi-step booking form
│   ├── BookingWizard.css      # Booking form styles
│   ├── PresidentialOutfit.jsx # Updated with booking button
│   └── ... (other components)
├── pages/
│   ├── BookingPage.jsx        # Booking page wrapper
│   └── BookingPage.css        # Booking page styles
└── App.jsx                     # Updated with routing
```

## Customization

### Colors
The component uses your existing color scheme:
- Primary Green: `#2d5016`
- Lime Green: `#C8E06C`, `#A8C054`
- Cream: `#FFF7E6`
- Gold: `#D4AF37`, `#FFD700`

### Fonts
- Headings: 'Playfair Display', serif
- Body: System fonts (Arial, sans-serif)

### Form Fields
To add/modify form fields, edit the `formData` state in `BookingWizard.jsx`:

```javascript
const [formData, setFormData] = useState({
  bookingType: '',
  firstName: '',
  lastName: '',
  // ... add more fields here
});
```

## Features Implemented

✅ Multi-step wizard with progress indicator
✅ Form validation for each step
✅ Colleague booking functionality
✅ Add/Edit/Remove colleagues
✅ Review page before submission
✅ Success page with booking reference
✅ Responsive design (mobile, tablet, desktop)
✅ Error handling and display
✅ Loading states during submission
✅ Terms and conditions checkbox
✅ Important notices and help sections

## Backend Requirements

Your backend should expect the following JSON structure:

```json
{
  "bookingType": "blazer" | "gown",
  "firstName": "string",
  "lastName": "string",
  "address": "string",
  "email": "string",
  "phone": "string",
  "hasColleagues": "yes" | "no",
  "colleagues": [
    {
      "id": "number",
      "position": "string",
      "size": "string",
      "name": "string",
      "additionalInfo": "string"
    }
  ],
  "terms": true,
  "submission_time": "ISO string"
}
```

Expected response:

```json
{
  "success": true,
  "bookingRef": "HCSA-123456",
  "message": "Booking submitted successfully"
}
```

## Notes

- The form maintains all functionality from your original HTML/JavaScript version
- All UI elements match your existing design system
- The component is fully self-contained and reusable
- Client-side validation is implemented for all required fields
- The success page includes options to print or return home

## Support

For issues or questions, contact your development team or refer to the React Router documentation: https://reactrouter.com/
