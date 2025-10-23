# 🚀 Deploy to Surge.sh

Your frontend is ready! Now deploy it to Surge.

## 📋 Quick Deploy

### Step 1: Open Terminal/PowerShell
```powershell
cd C:\Users\makan\OneDrive\Desktop\buildiForKingGuyApp\frontend\dist
```

### Step 2: Deploy to Surge
```powershell
npx surge . andile-m-afrika-school.surge.sh
```

### Step 3: Login When Prompted
- **Email**: Your Surge email (or create new account)
- **Password**: Your Surge password

---

## 🌐 Your URLs After Deployment

### Frontend (Surge):
**https://andile-m-afrika-school.surge.sh**

### Backend API (Vercel):
**https://andile-m-afrika-school.vercel.app/api**

---

## ✅ What's Configured

✅ Frontend built with correct API URL  
✅ Points to Vercel backend  
✅ Ready to deploy  
✅ CNAME file created  

---

## 🔄 To Redeploy Later

Whenever you make changes:

```powershell
# 1. Build with API URL
cd C:\Users\makan\OneDrive\Desktop\buildiForKingGuyApp\frontend
$env:VITE_API_URL='https://andile-m-afrika-school.vercel.app/api'
npm run build

# 2. Deploy to Surge
cd dist
npx surge . andile-m-afrika-school.surge.sh
```

---

## 🎯 Architecture

```
Users → surge.sh (Frontend)
          ↓
        Vercel (Backend API)
```

- **Frontend**: Static files on Surge
- **Backend**: Serverless functions on Vercel
- **Fast & Reliable**: Both platforms are CDN-based

---

## 🆘 Troubleshooting

### "Need to login"
Create a free account at https://surge.sh or login with existing account

### "Domain already taken"
If someone else has the domain, try:
```powershell
npx surge . your-school-name.surge.sh
```

### "API not working"
Make sure backend is deployed on Vercel:
```powershell
npx vercel --prod --yes
```

---

## 💡 Benefits of This Setup

✅ **Surge.sh**:
- Super fast deployment (~10 seconds)
- Easy to use
- Great for static sites
- Free SSL

✅ **Vercel API**:
- Serverless functions
- Auto-scaling
- Always online
- Free tier

---

**After deploying, share this link with everyone:**  
**https://andile-m-afrika-school.surge.sh**

