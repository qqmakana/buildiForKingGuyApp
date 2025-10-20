# 🚀 Deploy Your School Platform - FREE!

## ✅ What We're Deploying

Your complete school platform will go live on:
- **Frontend**: Vercel (FREE, lightning fast)
- **Backend**: Render (FREE tier)
- **Domain**: You'll get free domains for both!

---

## 📋 Prerequisites

- [ ] GitHub account (sign up at github.com)
- [ ] Vercel account (sign up at vercel.com with GitHub)
- [ ] Render account (sign up at render.com with GitHub)

---

# PART 1: Deploy Backend (API) to Render

## Step 1: Push Code to GitHub First

```bash
cd /Users/qaqambilemakana/Desktop/ancBoys

# Commit the new deployment files
git add .
git commit -m "Add deployment configuration"

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/onlineschool.git
git push -u origin main
```

## Step 2: Deploy Backend on Render

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with GitHub
4. Click **"New +"** → **"Web Service"**
5. Connect your **onlineschool** repository
6. Fill in the details:

### Configuration:
```
Name: andile-school-api
Region: Choose closest to you
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
Instance Type: Free
```

7. **Environment Variables** (click "Advanced"):
```
NODE_ENV = production
JWT_SECRET = (Render will auto-generate)
PORT = 5000
```

8. Click **"Create Web Service"**

9. **Wait 5-10 minutes** for deployment

10. **Copy your backend URL**: It will look like:
    ```
    https://andile-school-api-XXXXX.onrender.com
    ```

---

# PART 2: Deploy Frontend to Vercel

## Step 1: Configure Frontend for Production

Update the environment variable with your Render backend URL:

In Vercel dashboard (we'll do this during deployment).

## Step 2: Deploy to Vercel

1. Go to: **https://vercel.com**
2. Click **"Start Deploying"** or **"Add New Project"**
3. Sign up with GitHub
4. Click **"Import Project"**
5. Select your **onlineschool** repository
6. Configure:

### Build Settings:
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

7. **Environment Variables** (IMPORTANT!):
   Click "Environment Variables" and add:
   ```
   Key: VITE_API_URL
   Value: https://andile-school-api-XXXXX.onrender.com
   ```
   (Use YOUR Render backend URL from Part 1, Step 10)

8. Click **"Deploy"**

9. **Wait 2-3 minutes** for deployment

10. **Your site is LIVE!** 🎉
    URL will be like: `https://onlineschool-XXXXX.vercel.app`

---

## ✅ Test Your Live Site

1. Open your Vercel URL
2. Try logging in:
   - Email: `student@andile.edu`
   - Password: `student123`
3. Check all pages work
4. Test video lectures page

---

## 🎯 What You Get (FREE!)

### Vercel (Frontend):
- ✅ Free SSL certificate (HTTPS)
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Custom domain support
- ✅ Unlimited bandwidth

### Render (Backend):
- ✅ Free tier: 750 hours/month
- ✅ Automatic SSL
- ✅ Auto-deploy from GitHub
- ✅ Free PostgreSQL database (if needed later)

---

## ⚠️ Important Notes

### Render Free Tier:
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Upgrade to paid ($7/month) to keep it always on

### Database:
- Currently using SQLite (data resets on deploy)
- For production, upgrade to PostgreSQL (free tier available on Render)

---

## 🔄 Auto-Deploy (Already Set Up!)

Every time you push to GitHub:
- Vercel auto-deploys frontend
- Render auto-deploys backend

Just run:
```bash
git add .
git commit -m "Your changes"
git push
```

And your live site updates automatically! 🎉

---

## 🌐 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your domain (e.g., andileschool.com)
3. Update DNS records as shown

### For Render (Backend):
1. Go to Settings → Custom Domain
2. Add your API domain (e.g., api.andileschool.com)
3. Update DNS records

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Check VITE_API_URL in Vercel environment variables
- Make sure Render backend is running
- Check Render logs for errors

### "Backend spinning down"
- This is normal on free tier
- Upgrade to paid ($7/month) for always-on

### "Login not working"
- Check browser console for errors
- Verify backend URL is correct
- Check Render logs

---

## 📊 Monitor Your Deployment

### Vercel:
- Dashboard: https://vercel.com/dashboard
- See deployments, analytics, logs

### Render:
- Dashboard: https://dashboard.render.com
- See logs, metrics, events

---

## 🎓 Your Live School Platform!

Once deployed, share your link:
```
https://onlineschool-XXXXX.vercel.app
```

Students can:
- Access from anywhere
- Watch video lectures
- Submit assignments
- Check grades
- View schedule

---

## 💡 Pro Tips

1. **Custom Domain**: Buy a domain ($10/year) for professional look
2. **Database Upgrade**: Switch to PostgreSQL for persistent data
3. **Analytics**: Add Google Analytics to track usage
4. **Email**: Set up email notifications (SendGrid free tier)
5. **CDN**: Upload videos to YouTube/Vimeo for better performance

---

## 🎉 Next Steps After Deployment

1. ✅ Test everything thoroughly
2. ✅ Share link with students
3. ✅ Add real course videos (see VIDEO_SETUP.md)
4. ✅ Customize branding
5. ✅ Monitor analytics

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Community**: Stack Overflow, Reddit

---

**Your school platform will be LIVE in about 15 minutes! 🚀**

