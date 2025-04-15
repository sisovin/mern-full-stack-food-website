# MERN Full-Stack Food Website

A modern, responsive restaurant website built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, menu management, table bookings, blog functionality, and more.

![Food Website Preview](docs/template/assets/images/main-b.jpg)

## Features

- 🔐 **Full Authentication System** - JWT-based authentication with role-based access control
- 🍽️ **Complete Menu Management** - Browse food items by category with filtering options
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 📅 **Table Reservation System** - Book tables with date, time, and party size selection
- 📝 **Blog Platform** - Read and interact with restaurant news and recipes
- 🛒 **Shopping Cart** - Add items to cart for online ordering
- ⚡ **Redis Caching** - Improved performance through data caching
- 🗑️ **Soft Delete Functionality** - Records are preserved for data integrity
- 📊 **Admin Dashboard** - Complete control panel for restaurant management

## Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - Database with Mongoose ODM
- **Redis** - Caching layer
- **JWT** - Authentication
- **Argon2** - Password hashing
- **Winston & Morgan** - Logging

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Swiper.js** - Touch-enabled sliders
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - API requests

## Project Structure

This is a detailed file and folder structure for the MERN full-stack food website project. Since I am implementing all features from the start, using TypeScript with Redis caching, pnpm workspaces, tests, and planning for internationalization and real-time features, here's a comprehensive structure:

## Root Directory Structure

```
mern-full-stack-food-website/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                   # CI pipeline
│   │   └── deploy.yml               # Deployment workflow
├── .vscode/
│   ├── extensions.json              # Recommended extensions
│   └── settings.json                # VS Code settings
├── apps/
│   ├── backend/                     # Backend application
│   └── frontend/                    # Frontend application
├── packages/                        # Shared packages
│   ├── eslint-config/               # Shared ESLint config
│   ├── tsconfig/                    # Shared TypeScript config
│   └── ui-components/               # Shared UI components
├── .env                             # Environment variables
├── .env.example                     # Example environment variables
├── .eslintrc                        # ESLint root config
├── .gitignore                       # Git ignore patterns
├── .prettierrc                      # Prettier config
├── package.json                     # Root package.json
├── pnpm-lock.yaml                   # pnpm lockfile
├── pnpm-workspace.yaml              # pnpm workspace config
├── README.md                        # Project documentation
└── turbo.json                       # Turborepo config
```

## Backend Structure

```
mern-full-stack-food-website/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                   # CI pipeline
│   │   └── deploy.yml               # Deployment workflow
├── .vscode/
│   ├── extensions.json              # Recommended extensions
│   └── settings.json                # VS Code settings
    apps/backend/
    ├── src/
    │   ├── config/
    │   │   ├── db.ts                     # MongoDB connection setup
    │   │   ├── redis.ts                  # Redis caching client setup
    │   │   ├── i18n.ts                   # Internationalization setup
    │   │   ├── jwt.ts                    # JWT configuration
    │   │   └── winston.ts                # Logging configuration
    │   ├── controllers/
    │   │   ├── authController.ts         # Authentication logic
    │   │   ├── userController.ts         # User management
    │   │   ├── roleController.ts         # Role management
    │   │   ├── menuController.ts         # Menu management
    │   │   ├── bookingController.ts      # Table booking logic
    │   │   ├── blogController.ts         # Blog management
    │   │   ├── faqController.ts          # FAQ management
    │   │   └── cartController.ts         # Shopping cart management
    │   ├── middlewares/
    │   │   ├── authMiddleware.ts         # Authentication middleware
    │   │   ├── cacheMiddleware.ts        # Redis caching middleware
    │   │   ├── errorHandler.ts           # Global error handling
    │   │   ├── logger.ts                 # Request logging
    │   │   ├── rateLimiter.ts            # API rate limiting
    │   │   ├── validator.ts              # Request validation middleware
    │   │   └── corsMiddleware.ts         # CORS configuration
    │   ├── models/
    │   │   ├── User.ts                   # User schema
    │   │   ├── Role.ts                   # Role schema
    │   │   ├── Permission.ts             # Permission schema
    │   │   ├── Menu.ts                   # Menu item schema
    │   │   ├── MenuCategory.ts           # Menu category schema
    │   │   ├── Booking.ts                # Table booking schema
    │   │   ├── Blog.ts                   # Blog post schema
    │   │   ├── Comment.ts                # Comment schema for blog
    │   │   ├── FAQ.ts                    # FAQ schema
    │   │   ├── Cart.ts                   # Shopping cart schema
    │   │   └── Order.ts                  # Order schema
    │   ├── routes/
    │   │   ├── authRoutes.ts             # Authentication routes
    │   │   ├── userRoutes.ts             # User management routes
    │   │   ├── roleRoutes.ts             # Role management routes
    │   │   ├── menuRoutes.ts             # Menu management routes
    │   │   ├── bookingRoutes.ts          # Table booking routes
    │   │   ├── blogRoutes.ts             # Blog management routes
    │   │   ├── faqRoutes.ts              # FAQ management routes
    │   │   ├── cartRoutes.ts             # Shopping cart routes
    │   │   └── orderRoutes.ts            # Order management routes
    │   ├── services/
    │   │   ├── authService.ts            # Authentication service
    │   │   ├── userService.ts            # User management service
    │   │   ├── roleService.ts            # Role management service
    │   │   ├── menuService.ts            # Menu management service
    │   │   ├── bookingService.ts         # Table booking service
    │   │   ├── blogService.ts            # Blog management service
    │   │   ├── faqService.ts             # FAQ management service
    │   │   ├── cartService.ts            # Shopping cart service
    │   │   ├── orderService.ts           # Order management service
    │   │   ├── emailService.ts           # Email notifications service
    │   │   └── pushNotificationService.ts # Push notifications service
    │   ├── utils/
    │   │   ├── argon2.ts                 # Password hashing
    │   │   ├── responseHandler.ts        # API response formatter
    │   │   ├── validators.ts             # Input validation
    │   │   ├── cacheUtils.ts             # Redis cache helpers
    │   │   ├── dateUtils.ts              # Date handling utilities
    │   │   └── fileUtils.ts              # File handling utilities
    │   ├── websockets/
    │   │   ├── socketServer.ts           # WebSocket server setup
    │   │   ├── notificationHandler.ts    # Real-time notification handler
    │   │   ├── orderUpdates.ts           # Order status updates
    │   │   └── chatHandler.ts            # Real-time chat functionality
    │   ├── locales/                      # Internationalization files
    │   │   ├── en/                       # English translations
    │   │   └── es/                       # Spanish translations
    │   ├── tests/
    │   │   ├── integration/              # Integration tests
    │   │   │   ├── auth.test.ts
    │   │   │   ├── user.test.ts
    │   │   │   ├── menu.test.ts
    │   │   │   ├── booking.test.ts
    │   │   │   ├── blog.test.ts
    │   │   │   └── faq.test.ts
    │   │   └── unit/                     # Unit tests
    │   │       ├── services/
    │   │       │   ├── authService.test.ts
    │   │       │   └── ...
    │   │       └── utils/
    │   │           ├── validators.test.ts
    │   │           └── ...
    │   ├── types/                        # TypeScript type definitions
    │   │   ├── auth.types.ts
    │   │   ├── user.types.ts
    │   │   ├── menu.types.ts
    │   │   ├── booking.types.ts
    │   │   ├── blog.types.ts
    │   │   └── faq.types.ts
    │   ├── app.ts                        # Express app setup
    │   └── server.ts                     # Entry point
    ├── .gitignore                        # Git ignore patterns for backend
    ├── .env.test                         # Test environment vars
    ├── jest.config.js                    # Jest configuration
    ├── nodemon.json                      # Nodemon configuration
    ├── package.json                      # Backend dependencies
    ├── tsconfig.json                     # TypeScript config
    └── README.md                         # Backend documentation
├── packages/                        # Shared packages
│   ├── eslint-config/               # Shared ESLint config
│   ├── tsconfig/                    # Shared TypeScript config
│   └── ui-components/               # Shared UI components
├── .eslintrc                        # ESLint root config
├── .gitignore                       # Git ignore patterns
├── .prettierrc                      # Prettier config
├── package.json                     # Root package.json
├── pnpm-lock.yaml                   # pnpm lockfile
├── pnpm-workspace.yaml              # pnpm workspace config
├── README.md                        # Project documentation
└── turbo.json                       # Turborepo config
```

## Frontend Structure

```
apps/frontend/
├── public/
│   ├── favicon.ico                   # Website icon
│   ├── index.html                    # Main HTML file
│   ├── manifest.json                 # PWA configuration
│   ├── robots.txt                    # SEO configuration
│   └── locales/                      # Translation files for i18next
│       ├── en/
│       └── es/
├── src/
│   ├── api/                          # API clients
│   │   ├── axios.ts                  # Axios setup with interceptors
│   │   ├── auth.api.ts               # Authentication API
│   │   ├── menu.api.ts               # Menu API
│   │   ├── booking.api.ts            # Booking API
│   │   ├── blog.api.ts               # Blog API
│   │   └── faq.api.ts                # FAQ API
│   ├── assets/
│   │   ├── images/                   # Image files
│   │   │   ├── logo.svg
│   │   │   ├── hero-bg.jpg
│   │   │   └── ...
│   │   └── fonts/                    # Custom fonts
│   ├── components/
│   │   ├── common/                   # Shared components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Form/
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Navbar.test.tsx
│   │   │   │   └── Navbar.module.css
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── ...
│   │   ├── menu/                     # Menu components
│   │   │   ├── MenuCard/
│   │   │   ├── MenuFilter/
│   │   │   └── ...
│   │   ├── booking/                  # Booking components
│   │   │   ├── BookingForm/
│   │   │   ├── DatePicker/
│   │   │   └── ...
│   │   ├── blog/                     # Blog components
│   │   │   ├── BlogCard/
│   │   │   ├── CommentSection/
│   │   │   └── ...
│   │   └── slider/                   # Slider components
│   │       ├── Slider.tsx
│   │       ├── Slider.test.tsx
│   │       └── Slider.module.css
│   ├── context/                      # React context
│   │   ├── AuthContext.tsx           # Authentication context
│   │   ├── CartContext.tsx           # Shopping cart context
│   │   ├── UIContext.tsx             # UI state context
│   │   └── NotificationContext.tsx   # Notifications context
│   ├── hooks/                        # Custom hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useCart.ts                # Shopping cart hook
│   │   ├── useMenu.ts                # Menu data hook
│   │   ├── useBooking.ts             # Booking hook
│   │   ├── useBlog.ts                # Blog data hook
│   │   └── useFAQ.ts                 # FAQ data hook
│   ├── pages/                        # Page components
│   │   ├── Home/
│   │   │   ├── Home.tsx              # Home page component
│   │   │   ├── Home.test.tsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   ├── Menu/
│   │   ├── BookTable/
│   │   ├── Gallery/
│   │   ├── Blog/
│   │   │   ├── BlogList.tsx          # Blog listing page
│   │   │   ├── BlogPost.tsx          # Single blog post page
│   │   │   └── ...
│   │   ├── FAQs/
│   │   ├── Contact/
│   │   └── admin/                    # Admin dashboard pages
│   │       ├── Dashboard/
│   │       ├── Users/
│   │       ├── MenuManagement/
│   │       ├── BookingManagement/
│   │       ├── BlogManagement/
│   │       └── FAQManagement/
│   ├── services/                     # Frontend services
│   │   ├── auth.service.ts           # Authentication service
│   │   ├── storage.service.ts        # Local storage service
│   │   └── websocket.service.ts      # WebSocket client service
│   ├── socket/                       # WebSocket setup
│   │   ├── socket.ts                 # Socket.io client setup
│   │   └── handlers.ts               # Socket event handlers
│   ├── styles/                       # Global styles
│   │   ├── global.css                # Global CSS
│   │   ├── variables.css             # CSS variables
│   │   └── animations.css            # CSS animations
│   ├── utils/                        # Utility functions
│   │   ├── date.ts                   # Date formatting
│   │   ├── validation.ts             # Form validation
│   │   └── formatters.ts             # Data formatters
│   ├── i18n/                         # Internationalization
│   │   ├── config.ts                 # i18next configuration
│   │   └── resources.ts              # Translation resources
│   ├── types/                        # TypeScript types
│   │   ├── auth.types.ts
│   │   ├── menu.types.ts
│   │   ├── booking.types.ts
│   │   ├── blog.types.ts
│   │   └── faq.types.ts
│   ├── routes/                       # Routing
│   │   ├── routes.ts                 # Route definitions
│   │   ├── ProtectedRoute.tsx        # Auth protection
│   │   └── AdminRoute.tsx            # Admin protection
│   ├── App.tsx                       # Main app component
│   ├── index.tsx                     # Entry point
│   └── vite-env.d.ts                 # Vite type definitions
├── .env                              # Frontend env vars
├── .env.production                   # Production env vars
├── package.json                      # Frontend dependencies
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite configuration
├── jest.config.js                    # Jest configuration
└── README.md                         # Frontend documentation
```

## Shared Package Structure (example)

```
packages/ui-components/
├── src/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Modal/
│   └── index.ts                      # Main export file
├── package.json
└── tsconfig.json
```

## Root Configuration Files

Here are some essential configuration files to set up:

1. `pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

2. `turbo.json`:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

3. Root `.env.example`:
```
# MongoDB
MONGODB_URI=mongodb://localhost:27017/food-website

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
```

This structure provides a solid foundation for your full-stack restaurant website with all the features you mentioned. The monorepo setup with shared packages will help with code reuse, and the organized folder structure makes navigation and maintenance easier.

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Argon2 (for password hashing)
- Redis (optional, for caching)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-full-stack-food-website.git
   cd food-website
   ```

2. Install backend dependencies:
   ```bash
   cd apps/backend
   pnpm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   pnpm install
   ```

4. Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food-website
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   REDIS_URL=redis://localhost:6379
   ARGON2=your_argon2_config
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd apps/backend
   pnpm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd apps/frontend
   pnpm start
   ```

3. Access the website at `http://localhost:3000`

## API Documentation

The API endpoints follow RESTful conventions:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/logout` - Logout user

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get a specific menu item
- `POST /api/menu` - Create a new menu item (Admin)
- `PUT /api/menu/:id` - Update a menu item (Admin)
- `DELETE /api/menu/:id` - Delete a menu item (Admin)

### Table Booking
- `GET /api/booking` - Get all bookings (Admin)
- `POST /api/booking` - Create a new booking
- `PUT /api/booking/:id` - Update a booking
- `DELETE /api/booking/:id` - Cancel a booking

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get a specific blog post
- `POST /api/blog` - Create a new blog post (Admin)
- `PUT /api/blog/:id` - Update a blog post (Admin)
- `DELETE /api/blog/:id` - Delete a blog post (Admin)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from various restaurant websites
- [Swiper](https://swiperjs.com/) for the image sliders
- [Font Awesome](https://fontawesome.com/) and [Iconscout](https://iconscout.com/) for icons

---

© 2025 Mern Full-Stack Food Website, Powered by the Copa Webdev Team.



