# MongoDB Atlas + Vercel Connection Fix

## 🚨 **Current Issue:**
```
"Operation `products.find()` buffering timed out after 10000ms"
```

This means your backend can't connect to MongoDB Atlas from Vercel.

## 🔧 **Step-by-Step Fix:**

### **1. Fix MongoDB Atlas Network Access**

**Go to MongoDB Atlas Dashboard:**

1. **Login to [MongoDB Atlas](https://cloud.mongodb.com/)**
2. **Select your cluster**
3. **Go to "Network Access" (left sidebar)**
4. **Click "Add IP Address"**
5. **Select "Allow Access from Anywhere"** or add `0.0.0.0/0`
6. **Click "Confirm"**

⚠️ **CRITICAL**: Vercel uses dynamic IPs, so you MUST whitelist `0.0.0.0/0` (all IPs)

### **2. Check MongoDB Connection String**

Your `MONGODB_URI` should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
```

**Common Issues:**
- ❌ Missing database name at the end
- ❌ Wrong username/password
- ❌ Special characters not URL encoded
- ❌ Wrong cluster URL

### **3. Test Connection String Locally**

```bash
# Test in your local backend
cd backend
node -e "
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected'))
  .catch(err => console.log('❌ Error:', err));
"
```

### **4. Update Vercel Environment Variables**

**Backend Vercel Project → Settings → Environment Variables:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/your_database_name?retryWrites=true&w=majority
```

**Important:**
- Replace `username`, `password`, `cluster0.xxxxx`, and `your_database_name`
- If password has special characters, URL encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - etc.

### **5. Create Database and Collection**

**In MongoDB Atlas:**
1. Go to "Browse Collections"
2. If no database exists, create one:
   - Database name: `ecommerce` (or whatever you used in URI)
   - Collection name: `products`

### **6. Redeploy Backend**

After updating environment variables:
1. Go to Vercel Dashboard
2. Go to your backend project
3. Click "Redeploy" (or push new commit)

## 🧪 **Test the Fix:**

### **Test 1: Health Check**
```bash
curl https://ecommerce-navy-delta.vercel.app/health
```
Should return: `{"status":"OK",...}`

### **Test 2: Products API**
```bash
curl -X POST https://ecommerce-navy-delta.vercel.app/api/products/get \
     -H "Content-Type: application/json" \
     -d '{"page":1,"limit":10}'
```
Should return: `{"message":"Product data","success":true,...}`

## 🔍 **Debug Steps:**

### **Check Vercel Function Logs:**
1. Go to Vercel Dashboard
2. Click your backend project
3. Go to "Functions" tab
4. Look for error messages

### **Common Error Messages:**

| Error | Solution |
|-------|----------|
| `MongoNetworkError` | Check IP whitelist |
| `Authentication failed` | Check username/password |
| `Server selection timed out` | Check connection string |
| `Database does not exist` | Create database in Atlas |

## 🎯 **Quick Checklist:**

- [ ] MongoDB Atlas IP whitelist: `0.0.0.0/0` ✅
- [ ] Connection string format correct ✅
- [ ] Database exists in Atlas ✅
- [ ] Username/password correct ✅
- [ ] Environment variable updated in Vercel ✅
- [ ] Backend redeployed ✅

## 🆘 **Still Not Working?**

### **Option 1: Create New MongoDB Cluster**
1. Create a new free cluster in MongoDB Atlas
2. Create a new database user
3. Whitelist all IPs (`0.0.0.0/0`)
4. Get new connection string
5. Update `MONGODB_URI` in Vercel

### **Option 2: Use MongoDB Compass**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Test connection with your URI
3. If it works locally but not on Vercel, it's an IP whitelist issue

### **Option 3: Check Atlas Status**
- Go to [MongoDB Status Page](https://status.mongodb.com/)
- Check if there are any outages

## 📞 **Get Connection String:**

1. **MongoDB Atlas Dashboard**
2. **Click "Connect" on your cluster**
3. **Choose "Connect your application"**
4. **Copy the connection string**
5. **Replace `<password>` with your actual password**
6. **Add database name at the end**

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/ecommerce?retryWrites=true&w=majority
```
