# Marketing Campaign Manager - Frontend

This is the frontend application for the Marketing Campaign Manager, built with React and Tailwind CSS.

## Features

- **Dashboard**
  - Overview of key metrics
  - Recent orders tracking
  - Customer statistics
  - Campaign performance summary

- **Customer Management**
  - View and manage customer profiles
  - Track customer spending
  - Customer segmentation
  - Bulk customer import via CSV
  - Search and filter capabilities

- **Order Management**
  - Track and manage customer orders
  - View order history
  - Bulk order import via CSV
  - Search and filter functionality

- **Campaign Management**
  - Create and manage marketing campaigns
  - AI-powered message generation
  - Target audience segmentation
  - Campaign performance tracking
  - Message customization

- **User Interface**
  - Responsive design
  - Modern and clean UI
  - Intuitive navigation
  - Loading states and error handling
  - Toast notifications

## Tech Stack

- React
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Hot Toast for notifications
- Lucide React for icons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── services/          # API services
├── context/           # React context
├── hooks/             # Custom hooks
├── utils/             # Utility functions
└── assets/            # Static assets
```

## Key Components

### Pages
- `Dashboard.jsx` - Main dashboard with metrics
- `Customers.jsx` - Customer management
- `Orders.jsx` - Order management
- `CreateCampaign.jsx` - Campaign creation
- `Campaigns.jsx` - Campaign management

### Components
- `LoadingSpinner.jsx` - Loading state component
- `ErrorMessage.jsx` - Error display component
- `Pagination.jsx` - Pagination controls
- `SearchBar.jsx` - Search functionality

## API Integration

The frontend communicates with the backend through the following services:
- `api.js` - Base API configuration
- `authService.js` - Authentication services
- `customerService.js` - Customer management
- `orderService.js` - Order management
- `campaignService.js` - Campaign management

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

## Development

- Development server runs on `http://localhost:5173`
- API requests are proxied to the backend server
- Hot module replacement enabled
- ESLint for code quality
- Prettier for code formatting

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest) 