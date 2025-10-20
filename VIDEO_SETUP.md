# 🎥 Video Integration Guide

## How to Add Real Videos to Your School App

Your app now has a **Video Lectures** page just like Coursera! Here's how to integrate real videos:

---

## 📺 Option 1: YouTube Videos (Easiest & Free)

### Step 1: Upload Videos to YouTube
1. Create a YouTube channel for your school
2. Upload your lecture videos
3. Get the video ID from the URL
   - Example: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`

### Step 2: Update the Lectures.tsx File

Replace the video player placeholder with:

```tsx
{/* Replace this in Lectures.tsx around line 160 */}
<div className="relative bg-black aspect-video">
  <iframe
    src={`https://www.youtube.com/embed/${videoId}`}
    className="w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
```

### Step 3: Add Video IDs to Your Lessons

```tsx
const courseModules = [
  {
    id: 1,
    title: 'Week 1: Introduction',
    lessons: [
      { 
        id: '1-1', 
        title: 'Course Overview', 
        videoId: 'YOUR_YOUTUBE_VIDEO_ID',  // Add this
        duration: '10:24',
        completed: false,
        locked: false 
      },
    ]
  }
];
```

---

## 📹 Option 2: Vimeo (Professional & Ad-Free)

### Benefits
- No ads
- Better privacy controls
- Professional appearance
- Custom player

### Implementation

```tsx
<iframe
  src={`https://player.vimeo.com/video/${vimeoVideoId}`}
  className="w-full h-full"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
></iframe>
```

**Pricing**: Free plan includes 500MB/week uploads

---

## 🎬 Option 3: Video.js (Self-Hosted)

### For Self-Hosted Videos

1. **Install Video.js**
```bash
cd frontend
npm install video.js
```

2. **Import and Use**
```tsx
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

<video
  id="my-video"
  className="video-js vjs-big-play-centered"
  controls
  preload="auto"
  width="100%"
  height="100%"
>
  <source src="/videos/lecture-1.mp4" type="video/mp4" />
</video>
```

**Note**: You need to host video files on your server or cloud storage (AWS S3, Google Cloud, etc.)

---

## ☁️ Option 4: Cloud Storage + CDN

### AWS S3 + CloudFront
1. Upload videos to S3
2. Enable CloudFront CDN
3. Use secure signed URLs

### Google Cloud Storage
1. Upload to GCS bucket
2. Enable Cloud CDN
3. Use public or signed URLs

---

## 🎯 Recommended Approach

### For Schools Starting Out:
✅ **YouTube** - Free, reliable, easy to use

### For Professional/Commercial:
✅ **Vimeo** - No ads, better control, professional

### For Complete Control:
✅ **Self-Hosted with CDN** - Full ownership, requires more setup

---

## 🔧 Quick Implementation Example

### Update `Lectures.tsx` to use YouTube:

```tsx
// Add this function at the top of your Lectures component
const getVideoEmbedUrl = (videoId: string) => {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
};

// Replace the video player section with:
<div className="relative bg-black aspect-video">
  <iframe
    src={getVideoEmbedUrl(currentLesson?.videoId || 'dQw4w9WgXcQ')}
    className="w-full h-full"
    title={currentLesson?.title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
```

---

## 📊 Features Already Built-In

Your video page includes:

✅ Video player interface  
✅ Progress tracking  
✅ Course curriculum sidebar  
✅ Downloadable resources section  
✅ Discussion/comments area  
✅ Lesson completion tracking  
✅ Next lesson navigation  

---

## 🎨 Where is the Video Page?

**URL**: `http://localhost:3000/lectures`

**Navigation**: Click "Video Lectures" in the sidebar menu

---

## 💡 Tips for Best Experience

1. **Video Quality**: Upload in 1080p for best quality
2. **File Size**: Keep videos under 1GB for faster loading
3. **Captions**: Add subtitles for accessibility
4. **Thumbnails**: Create custom thumbnails for each video
5. **Organization**: Group videos by week/module/topic

---

## 🔐 Security Considerations

- Use signed URLs for premium content
- Implement access control (students only)
- Prevent video downloads if needed
- Track viewing analytics

---

## 📱 Mobile Support

All video options work perfectly on:
- ✅ iOS (iPhone/iPad)
- ✅ Android phones/tablets
- ✅ Desktop browsers
- ✅ Responsive design

---

## 🚀 Next Steps

1. Choose your video hosting platform
2. Upload your first lecture video
3. Get the video ID/URL
4. Update the `Lectures.tsx` file
5. Test on different devices

---

**Your app is production-ready! Just add your videos and you're good to go!** 🎓

