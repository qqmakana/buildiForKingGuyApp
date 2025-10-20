# 🚀 DEPLOY NOW - Quick Checklist

## ✅ Your app is 100% ready to go live!

Follow these steps in order:

---

## STEP 1: Push to GitHub (5 minutes)

```bash
cd /Users/qaqambilemakana/Desktop/ancBoys

# Set your Git identity (one-time)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Create repo on GitHub first: https://github.com/new
# Name it: onlineschool

# Then run (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/onlineschool.git
git push -u origin main
```

**✓ Done? Your code is on GitHub!**

---

## STEP 2: Deploy Backend to Render (10 minutes)

1. Go to: **https://render.com**
2. Sign up with GitHub (it's free!)
3. Click **"New +"** → **"Web Service"**
4. Select your **onlineschool** repo
5. Settings:
   ```
   Name: andile-school-api
   Root Directory: backend
   Build: npm install && npm run build
   Start: npm start
   Plan: Free
   ```
6. Click **"Create Web Service"**
7. **WAIT 5-10 min** for deploy
8. **COPY YOUR URL**: `https://andile-school-api-XXXX.onrender.com`

**✓ Backend is live!**

---

## STEP 3: Deploy Frontend to Vercel (5 minutes)

1. Go to: **https://vercel.com**
2. Sign up with GitHub (it's free!)
3. Click **"Add New Project"**
4. Select **onlineschool** repo
5. Settings:
   ```
   Framework: Vite
   Root: frontend
   Build: npm run build
   Output: dist
   ```
6. **IMPORTANT!** Add Environment Variable:
   ```
   VITE_API_URL = https://andile-school-api-XXXX.onrender.com
   ```
   (Use YOUR Render URL from Step 2)

7. Click **"Deploy"**
8. **WAIT 2-3 min**

**✓ Your school is LIVE!** 🎉

---

## 🌐 YOUR LIVE URL

You'll get: `https://onlineschool-XXXX.vercel.app`

**Share this with students!**

---

## 🎯 Test It

1. Open your Vercel URL
2. Login: `student@andile.edu` / `student123`
3. Try all pages
4. Check video lectures

---

## ⚠️ Important Notes

### Free Tier Limits:
- ✅ Render: Backend sleeps after 15 min (wakes on first request)
- ✅ Vercel: Unlimited for personal projects
- ✅ Both include FREE SSL (HTTPS)

### If Backend Sleeps:
- Normal on free tier
- First load takes 30-60 seconds
- Upgrade to $7/month for always-on

---

## 🔄 Future Updates

To update your live site:

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push
```

**Auto-deploys to production!** 🎉

---

## 📊 What You Get FREE

- ✅ Live website with custom URL
- ✅ HTTPS (secure)
- ✅ Auto-deploy from GitHub
- ✅ Global CDN (fast worldwide)
- ✅ 99.9% uptime
- ✅ No credit card required!

---

## 🎓 Your School is Going Live!

**Total Time**: 20 minutes  
**Cost**: $0 (FREE!)  
**Students**: Unlimited  
**Scalability**: Automatic  

---

## 🆘 Quick Troubleshooting

**Login doesn't work?**
- Check VITE_API_URL in Vercel env vars
- Make sure it ends without trailing slash

**Backend error?**
- Check Render logs
- Wait 60 seconds if it was sleeping

**Need help?**
- See DEPLOYMENT_GUIDE.md for details

---

**START DEPLOYING NOW! In 20 minutes, your school will be live worldwide! 🚀**

