# Vercel Backend Troubleshooting Guide

## Common Issues and Solutions

### 1. 500 Internal Server Error

**Possible Causes:**
- Missing environment variables
- Database connection issues
- Serverless function configuration problems

**Solutions:**

#### Check Environment Variables in Vercel:
1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Ensure these are set:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   SECRET_KEY_ACCESS_TOKEN=your_jwt_access_secret
   SECRET_KEY_REFRESH_TOKEN=your_jwt_refresh_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

#### Test Endpoints:
- `https://your-backend.vercel.app/` - Basic server info
- `https://your-backend.vercel.app/health` - Health check

### 2. Database Connection Issues

**Check MongoDB URI:**
- Ensure it's a valid MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- For Vercel, whitelist `0.0.0.0/0` (all IPs) in MongoDB Atlas

### 3. CORS Issues

**If frontend can't connect:**
- Check `FRONTEND_URL` environment variable
- Ensure it matches your frontend Vercel URL exactly
- Include `https://` in the URL

### 4. Function Timeout

**Vercel has limits:**
- Hobby plan: 10 seconds max
- Pro plan: 60 seconds max
- Ensure database queries are optimized

### 5. Debug Steps

1. **Check Vercel Function Logs:**
   - Go to Vercel dashboard
   - Click on your function
   - Check the "Function Logs" tab

2. **Test Locally with Production Environment:**
   ```bash
   NODE_ENV=production npm start
   ```

3. **Check MongoDB Atlas:**
   - Ensure cluster is running
   - Check connection string format
   - Verify database name exists

### 6. Common Fixes Applied

✅ **Removed `process.exit(1)`** - Not allowed in serverless functions
✅ **Added proper error handling** - Catches and logs errors
✅ **Fixed CORS configuration** - Added fallback origin
✅ **Added health check endpoint** - For debugging
✅ **Created vercel.json** - Proper serverless configuration
✅ **Added environment detection** - Different behavior for dev/prod

### 7. Testing Your Deployment

1. **Test basic endpoint:**
   ```bash
   curl https://your-backend.vercel.app/health
   ```

2. **Test API endpoint:**
   ```bash
   curl https://your-backend.vercel.app/api/products/get -X POST -H "Content-Type: application/json" -d '{"page":1,"limit":10}'
   ```

### 8. If Still Not Working

1. Check Vercel function logs for specific error messages
2. Ensure all dependencies are in `package.json`
3. Verify the `vercel.json` configuration
4. Test with a minimal endpoint first
5. Check if MongoDB Atlas is accessible from Vercel's IPs
