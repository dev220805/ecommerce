# Deployment Guide for Vercel

## Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory with:

```env
# Backend API URL
# For local development: http://localhost:8080
# For production: https://your-backend-domain.vercel.app
VITE_API_URL=http://localhost:8080
```

## Vercel Deployment Steps

### 1. Frontend Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Set the **Root Directory** to `frontend`
4. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-domain.vercel.app` (replace with your actual backend URL)
5. Deploy

### 2. Backend Deployment
1. Create a new Vercel project for the backend
2. Set the **Root Directory** to `backend`
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `SECRET_KEY_ACCESS_TOKEN`: JWT access token secret
   - `SECRET_KEY_REFRESH_TOKEN`: JWT refresh token secret
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `FRONTEND_URL`: Your frontend Vercel URL (e.g., `https://your-frontend.vercel.app`)
4. Deploy

### 3. Update Frontend Environment
After backend deployment, update the frontend's `VITE_API_URL` environment variable in Vercel to point to your deployed backend URL.

## API Endpoints Updated

All API calls now use the `API_URL` environment variable:
- `${API_URL}/api/user/login`
- `${API_URL}/api/user/register`
- `${API_URL}/api/products/get`
- `${API_URL}/api/products/search-product`
- `${API_URL}/api/products/create`
- `${API_URL}/api/cart/get`
- `${API_URL}/api/cart/create`
- And more...

## Files Updated

- `frontend/src/services/cartService.js`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/ProductInfo.jsx`
- `frontend/src/pages/SearchResults.jsx`
- `frontend/src/pages/Cart.jsx`
- `frontend/src/pages/AddProduct.jsx`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/Login.jsx`
- `frontend/src/components/Register.jsx`
