# 🏆 HCSA - cPanel Hosting Deployment Guide

## Overview
This guide will help you deploy the Honourable Cabinet Summit Awards website to cPanel hosting.

## 📋 Prerequisites
- cPanel hosting account
- FTP/File Manager access
- Domain name configured

## 🚀 Quick Deployment Steps

### Step 1: Build the Project
```bash
# Run this command in your project directory
npm run build
```
Or simply run: `deploy-cpanel.bat` (Windows) or `deploy-cpanel.sh` (Mac/Linux)

### Step 2: Upload Files to cPanel
1. **Login to cPanel**
   - Access your cPanel dashboard
   - Go to "File Manager"

2. **Navigate to public_html**
   - Click on the `public_html` folder
   - This is where your website files should go

3. **Upload Built Files**
   - Upload ALL contents from the `dist` folder to `public_html`
   - Make sure to include:
     - `index.html`
     - `assets/` folder (contains CSS, JS files)
     - `images/` folder (contains all images)
     - `.htaccess` file (very important for routing)

### Step 3: Set Permissions
- Set `.htaccess` file permissions to `644`
- Ensure all files are readable (644 for files, 755 for folders)

### Step 4: Test Your Website
- Visit your domain in a browser
- Test navigation between pages
- Verify all images load correctly
- Check that the booking form works

## 📁 File Structure After Upload
```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [other asset files]
└── images/
    ├── favicon.png
    ├── logo.png
    ├── about/
    ├── cta/
    └── [other image files]
```

## 🔧 Important Files Explained

### `.htaccess`
- **Purpose**: Handles client-side routing for React app
- **Location**: Must be in `public_html` root
- **Permissions**: 644
- **What it does**: 
  - Redirects all requests to index.html
  - Enables compression
  - Sets cache headers
  - Adds security headers

### `index.html`
- **Purpose**: Main entry point of your application
- **Contains**: All necessary meta tags, favicon, and app container

## 🚨 Troubleshooting

### Problem: "Page Not Found" errors
**Solution**: 
- Check that `.htaccess` file is uploaded and has 644 permissions
- Verify mod_rewrite is enabled on your hosting

### Problem: Images not loading
**Solution**:
- Ensure `images/` folder is uploaded completely
- Check file paths are correct
- Verify image file permissions (644)

### Problem: Styles not working
**Solution**:
- Confirm `assets/` folder is uploaded
- Check that CSS files have correct permissions
- Clear browser cache

### Problem: Booking form not working
**Solution**:
- This is a frontend-only build
- Backend API endpoints need to be configured separately
- Contact your hosting provider about PHP/Node.js support if needed

## 📞 Support

### Hosting-Related Issues
- Contact your cPanel hosting provider
- Check hosting control panel for error logs

### Application Issues
- Review browser developer console for errors
- Check network tab for failed requests

## 🔒 Security Features Included

The `.htaccess` file includes:
- ✅ XSS Protection
- ✅ Content Type Options
- ✅ Frame Options (prevents clickjacking)
- ✅ Referrer Policy
- ✅ File access restrictions

## 📈 Performance Features

- ✅ Gzip compression enabled
- ✅ Browser caching configured
- ✅ Static asset optimization

## 🎯 Next Steps After Deployment

1. **Set up SSL certificate** (usually free with cPanel)
2. **Configure domain redirects** (www to non-www or vice versa)
3. **Set up analytics** (Google Analytics, etc.)
4. **Test on mobile devices**
5. **Set up monitoring** (uptime monitoring)

---

**🎉 Congratulations!** Your HCSA website should now be live and accessible via your domain name!