# Complete Vercel Deployment Guide

## 🚨 **IMPORTANT: Fix CORS Issues**

### **Current Issue:**
- Frontend URL: `https://ecommerce-jr38.vercel.app`
- Backend URL: `https://ecommerce-navy-delta.vercel.app`
- Double slash in API calls: `//api/products/get`

## 🔧 **Step-by-Step Fix:**

### **1. Backend Environment Variables (Vercel Dashboard)**

Go to your **backend** Vercel project → Settings → Environment Variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secrets
SECRET_KEY_ACCESS_TOKEN=your_jwt_access_secret_here
SECRET_KEY_REFRESH_TOKEN=your_jwt_refresh_secret_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# CORS - Frontend URL (CRITICAL!)
FRONTEND_URL=https://ecommerce-jr38.vercel.app

# Environment
NODE_ENV=production
```

### **2. Frontend Environment Variables (Vercel Dashboard)**

Go to your **frontend** Vercel project → Settings → Environment Variables:

```env
# Backend URL (NO trailing slash!)
VITE_API_URL=https://ecommerce-navy-delta.vercel.app
```

⚠️ **CRITICAL**: Make sure `VITE_API_URL` has **NO trailing slash**!

### **3. Test the Fix**

After updating environment variables:

1. **Redeploy both projects** (or they'll use old env vars)
2. **Test endpoints:**
   ```bash
   # Test backend health
   curl https://ecommerce-navy-delta.vercel.app/health
   
   # Test CORS
   curl -H "Origin: https://ecommerce-jr38.vercel.app" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://ecommerce-navy-delta.vercel.app/api/products/get
   ```

## 🔍 **Debug Steps:**

### **Check Environment Variables:**
1. Go to Vercel Dashboard
2. Check both projects' environment variables
3. Ensure no typos in URLs
4. Redeploy after changes

### **Check Network Tab:**
1. Open browser DevTools → Network
2. Look for the actual URLs being called
3. Check if there are double slashes (`//`)

### **Common Issues:**

| Issue | Solution |
|-------|----------|
| Double slash in URLs | Remove trailing slash from `VITE_API_URL` |
| CORS blocked | Update `FRONTEND_URL` in backend |
| 404 errors | Check API endpoint paths |
| 500 errors | Check backend logs in Vercel |

## 📋 **Checklist:**

- [ ] Backend `FRONTEND_URL` = `https://ecommerce-jr38.vercel.app`
- [ ] Frontend `VITE_API_URL` = `https://ecommerce-navy-delta.vercel.app` (no trailing slash)
- [ ] All other backend environment variables set
- [ ] Both projects redeployed after env var changes
- [ ] Test API calls work without CORS errors

## 🚀 **Expected Result:**

After fixing:
- ✅ No CORS errors
- ✅ API calls work: `https://ecommerce-navy-delta.vercel.app/api/products/get`
- ✅ Frontend can fetch data from backend
- ✅ Authentication works across domains

## 🆘 **If Still Not Working:**

1. **Check Vercel Function Logs:**
   - Go to backend Vercel project
   - Check "Functions" tab for error logs

2. **Test Individual Endpoints:**
   ```bash
   # Test if backend is running
   curl https://ecommerce-navy-delta.vercel.app/
   
   # Test specific API
   curl -X POST https://ecommerce-navy-delta.vercel.app/api/products/get \
        -H "Content-Type: application/json" \
        -d '{"page":1,"limit":10}'
   ```

3. **Check Browser Console:**
   - Look for exact error messages
   - Check if URLs have double slashes
   - Verify CORS error details
