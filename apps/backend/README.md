# MERN Full-Stack Food Website

## Project Overview
This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to provide a platform for users to explore and share food recipes. The application allows users to create an account, browse recipes, and submit their own recipes.

## Features
- User authentication (sign up, login, logout)
- Recipe submission and management
- Recipe browsing and searching
- User profiles
- Comments and ratings for recipes
- Responsive design for mobile and desktop
- Admin panel for managing users and recipes
- Caching for improved performance
- Logging for monitoring and debugging

## Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - Database with Mongoose ODM
- **Redis** - Caching layer
- **JWT** - Authentication
- **Argon2** - Password hashing
- **Winston & Morgan** - Logging

## Project Structure

```
mern-full-stack-food-website/
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
├── .gitignore                        # Git ignore file
├── .env.test                         # Test environment vars
├── jest.config.js                    # Jest configuration
├── nodemon.json                      # Nodemon configuration
├── package.json                      # Backend dependencies
├── tsconfig.json                     # TypeScript config
└── README.md                         # Backend documentation
```

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
3. Create a `.env` file in the backend directory with:
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
2. Access the website at `http://localhost:3000`

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