# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```
Screenshots of the Website:
<img width="2666" height="1608" alt="image" src="https://github.com/user-attachments/assets/a169aeac-e173-4eb5-96f6-2f071a2b3869" />
<img width="1265" height="607" alt="Screenshot 2025-07-26 at 8 21 36 PM" src="https://github.com/user-attachments/assets/7fef515e-d559-4295-ab66-997bcdfef923" />
<img width="1263" height="651" alt="Screenshot 2025-07-26 at 8 32 21 PM" src="https://github.com/user-attachments/assets/be9775d4-8f8d-4ba4-8e1e-4a87712b22aa" />
<img width="1303" height="821" alt="Screenshot 2025-07-26 at 8 21 03 PM" src="https://github.com/user-attachments/assets/a70dcacf-35a1-4b77-848a-e224a331e22c" />
