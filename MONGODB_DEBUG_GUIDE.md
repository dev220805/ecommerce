# MongoDB Connection Debug Guide

## 🚨 **Current Issue:**
```
Operation `users.findOne()` buffering timed out after 10000ms
```

This means MongoDB connection is failing. Let's debug step by step.

## 🔍 **Debug Steps:**

### **1. Test Database Connection**
After redeploying, test this endpoint:
```bash
curl https://ecommerce-navy-delta.vercel.app/test-db
```

**Expected Response:**
```json
{
  "status": "Database test",
  "mongooseState": "connected",
  "mongooseStateCode": 1,
  "hasMongoUri": true,
  "mongoUriStart": "mongodb+srv://...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### **2. Check MongoDB Atlas Settings**

#### **A. Network Access (CRITICAL!):**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your project/cluster
3. Click "Network Access" (left sidebar)
4. **MUST have entry: `0.0.0.0/0` (Allow access from anywhere)**
5. If not, click "Add IP Address" → "Allow Access from Anywhere"

#### **B. Database User:**
1. Click "Database Access" (left sidebar)
2. Ensure you have a user with "Read and write to any database" permissions
3. Note the username and password (no special characters!)

#### **C. Connection String:**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Should look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority`

### **3. Check Vercel Environment Variables**

Go to **Backend Vercel Project** → **Settings** → **Environment Variables**:

**Required Variables:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/your_database_name?retryWrites=true&w=majority
SECRET_KEY_ACCESS_TOKEN=your_jwt_secret_here
SECRET_KEY_REFRESH_TOKEN=your_jwt_refresh_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=https://ecommerce-jr38.vercel.app
NODE_ENV=production
```

**Common Issues:**
- ❌ Missing database name in URI
- ❌ Wrong username/password
- ❌ Special characters not URL encoded
- ❌ Missing environment variables

### **4. URL Encode Special Characters**

If your password has special characters:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`

**Example:**
- Password: `myPass@123#`
- Encoded: `myPass%40123%23`

### **5. Test Connection Locally**

Test your MongoDB URI locally:
```bash
cd backend
node -e "
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log('Testing connection...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected successfully');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ Connection failed:', err.message);
    process.exit(1);
  });
"
```

### **6. Create New MongoDB Cluster (If Needed)**

If nothing works, create a fresh cluster:

1. **Create New Cluster:**
   - Go to MongoDB Atlas
   - Create new free cluster
   - Choose AWS/Google Cloud (not Azure)

2. **Create Database User:**
   - Username: `ecommerceuser` (simple, no special chars)
   - Password: `ecommerce123` (simple, no special chars)
   - Permissions: "Read and write to any database"

3. **Network Access:**
   - Add IP: `0.0.0.0/0` (Allow access from anywhere)

4. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy string: `mongodb+srv://ecommerceuser:ecommerce123@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority`

5. **Update Vercel Environment Variable:**
   - Update `MONGODB_URI` with new connection string
   - Redeploy backend

## 🧪 **Test Sequence:**

1. **Basic Health Check:**
   ```bash
   curl https://ecommerce-navy-delta.vercel.app/health
   ```

2. **Database Connection Test:**
   ```bash
   curl https://ecommerce-navy-delta.vercel.app/test-db
   ```

3. **Products API Test:**
   ```bash
   curl -X POST https://ecommerce-navy-delta.vercel.app/api/products/get \
        -H "Content-Type: application/json" \
        -d '{"page":1,"limit":10}'
   ```

## 🎯 **Expected Results:**

- ✅ Health check: Returns OK status
- ✅ DB test: Shows "connected" state
- ✅ Products API: Returns product data (even if empty array)

## 🆘 **If Still Failing:**

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard
   - Click your backend project
   - Go to "Functions" tab
   - Look for error messages

2. **Try Different Region:**
   - In Vercel, try deploying to a different region
   - Some regions have better MongoDB Atlas connectivity

3. **Contact Support:**
   - MongoDB Atlas support
   - Vercel support

The most common issue is **Network Access** not allowing `0.0.0.0/0` in MongoDB Atlas!
