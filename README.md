# Hotel Booking System - React Frontend

A modern, responsive React.js boilerplate for a hotel booking system. This is a frontend-only application featuring hotel listings, search/filter functionality, booking forms, and reservation management.

## Features

- **Home Page**: Hero section with quick search functionality
- **Hotels Browsing**: Grid layout with hotel cards showing ratings, amenities, and prices
- **Advanced Filtering**: Filter by price range, star rating, and amenities
- **Booking System**: Complete booking form with guest information and reservation details
- **Reservations Management**: View and manage booked reservations
- **Navigation**: Sticky navbar with links to main sections
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Modern UI**: Clean, professional design with smooth animations

## Project Structure

```
e-hotels/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── HotelCard.js
│   │   └── SearchFilter.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── HotelsPage.js
│   │   ├── BookingPage.js
│   │   └── ReservationsPage.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
└── README.md
```

## Tech Stack

- **React**: 18.2.0 - JavaScript library for building user interfaces
- **React Router**: 6.17.0 - Client-side routing
- **Axios**: 1.6.0 - HTTP client (for future API integration)
- **CSS**: Custom CSS with modern flexbox and grid layouts

## Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd e-hotels
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode with hot reload
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Component Documentation

### Navbar

Navigation component with links to Home, Browse Hotels, and My Reservations. Sticky positioning for easy access throughout the site.

### HotelCard

Displays individual hotel information including:

- Hotel image/placeholder
- Name and star rating
- Description
- Amenities tags
- Price per night
- Book Now button

### SearchFilter

Sidebar component with filters for:

- Price range (slider)
- Star ratings (checkboxes)
- Amenities (checkboxes)

### Pages

**HomePage**:

- Hero section with welcome message
- Quick search form
- Why Choose Us section with features

**HotelsPage**:

- Hotel grid with sample data (6 hotels)
- Dynamic filtering based on selected criteria
- Responsive layout

**BookingPage**:

- Form for collecting guest information
- Booking date selection
- Special requests field
- Confirmation message

**ReservationsPage**:

- Display all confirmed reservations
- Detailed reservation information
- Empty state when no reservations exist

## Sample Data

The application includes 6 sample hotels for demonstration:

1. Grand Luxury Hotel - $250/night - 5 stars
2. Comfort Inn & Suites - $120/night - 4 stars
3. Budget Stay Hostel - $50/night - 3 stars
4. Beachfront Paradise Resort - $300/night - 5 stars
5. Mountain View Lodge - $180/night - 4 stars
6. City Center Boutique Hotel - $160/night - 4 stars

## Future Enhancements

To transform this into a full-stack application, consider adding:

- **Backend API Integration**: Replace sample data with API calls
- **User Authentication**: Login/signup system with user profiles
- **Payment Integration**: Stripe or similar for payment processing
- **Reviews & Ratings**: User reviews for hotels
- **Search Functionality**: Search by location, date range, etc.
- **Admin Dashboard**: Manage hotels and reservations
- **Email Notifications**: Confirmation emails for bookings
- **Image Uploads**: Dynamic hotel image management

## Styling

The application uses custom CSS with:

- CSS Grid for layouts
- Flexbox for component layouts
- CSS Variables for colors and spacing
- Media queries for responsive design
- Smooth transitions and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

## Getting Started

1. Open the workspace folder in VS Code
2. Run `npm install` to install dependencies
3. Run `npm start` to launch the development server
4. Start building your hotel booking platform!

## Notes

- This is a **frontend-only** boilerplate
- Sample data is hardcoded in the components
- No actual bookings are persisted (data resets on page refresh)
- No backend API is configured yet
- All styling is custom CSS (no external CSS framework)

For any questions or issues, feel free to modify the code and customize it to your needs!
