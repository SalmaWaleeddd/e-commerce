# E-Commerce Store

A modern, responsive e-commerce application built with React, TypeScript, and Tailwind CSS.

##  Features

### Core Features
- **Product Browsing**: View products with images, prices, and categories
- **Product Details**: Detailed view with descriptions and add-to-cart functionality
- **Shopping Cart**: Add, remove, and update product quantities
- **User Authentication**: Sign up, login, and protected routes
- **Product Creation**: Add new products (authenticated users only)

### Cart Features
- Real-time cart calculations
- Free shipping on orders over $50
- 8% tax rate applied
- Local storage persistence
- Protected cart page

### Technical Features
- Responsive design (mobile & desktop)
- Form validation and error handling
- Loading states and error boundaries
- Clean component architecture
- Type-safe with TypeScript

##  Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Context API** for state management
- **LocalStorage** for data persistence
- **React Hook Form** for form handling

##  Project Structure
```bash
src/
├── components/     # Reusable UI components
├── contexts/      # React contexts (Auth, Cart)
├── pages/         # Page components
├── services/      # API service layers
├── utils/         # Utility functions
├── types/         # TypeScript definitions
└── routes/        # Route configurations
```

##  Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```
## Environment Setup
Create a .env file:
```bash
#env
VITE_API_URL=https://fakestoreapi.com
```
## Available Scripts
```bash
# Start development server
npm run dev  

# Run ESLint
npm run lint 
```

## Authentication
The app uses mock authentication for demonstration:

- Any username/password combination works

- Session persists across page reloads

- Protected routes: /cart and /create-product

