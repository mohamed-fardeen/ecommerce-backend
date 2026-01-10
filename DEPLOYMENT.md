# Production Deployment Guide

## Environment Variables Required

Set these environment variables in your deployment platform (Render, Vercel, etc.):

### Database Configuration
- `DB_URI` - MongoDB connection string for main database
  ```
  mongodb+srv://username:password@cluster.mongodb.net/react-shop?retryWrites=true&w=majority
  ```
- `DB_URI_LOCATION` - MongoDB connection string for location database
  ```
  mongodb+srv://username:password@cluster.mongodb.net/location_db?retryWrites=true&w=majority
  ```

### Security Configuration
- `JWT_SECRET` - JWT secret key (minimum 32 characters)
- `TOKEN_KEY` - Token encryption key (minimum 32 characters)

### Server Configuration
- `PORT` - Server port (optional, deployment platforms usually set this)

## Deployment Steps

1. **Push code to GitHub**
2. **Set environment variables** in deployment platform
3. **Deploy** - the platform will automatically run `npm install` and `node index.js`

## Fixes Applied

- ✅ Fixed dotenv import: `require("dotenv").config()`
- ✅ Removed separate database connections from schemas
- ✅ Added proper error handling for database connections
- ✅ Created `.env.example` for reference

## Database Collections

The application uses two databases:
- **Main Database**: Users, products, orders, cart, delivery-locations
- **Location Database**: address, coordinates collections

Both databases can be the same or separate MongoDB clusters.
