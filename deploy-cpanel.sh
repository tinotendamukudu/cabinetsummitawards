#!/bin/bash

# HCSA - cPanel Deployment Script
# This script helps deploy the Honourable Cabinet Summit Awards app to cPanel hosting

echo "🏆 HCSA - cPanel Deployment Script"
echo "=================================="

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

echo ""
echo "📋 Deployment Instructions for cPanel:"
echo "======================================"
echo ""
echo "1. 📁 Upload Files:"
echo "   - Upload ALL contents from the 'dist' folder to your cPanel public_html directory"
echo "   - Make sure to upload the .htaccess file as well"
echo ""
echo "2. 🌐 File Manager Steps:"
echo "   a) Login to your cPanel"
echo "   b) Go to File Manager"
echo "   c) Navigate to public_html folder"
echo "   d) Delete any existing files (if replacing an old site)"
echo "   e) Upload the entire contents of the 'dist' folder"
echo "   f) Extract files if uploaded as a zip"
echo ""
echo "3. ⚙️ Important Settings:"
echo "   - Ensure .htaccess file permissions are set to 644"
echo "   - Make sure index.html is in the root of public_html"
echo "   - Check that all asset files (CSS, JS, images) are uploaded"
echo ""
echo "4. 🔍 Testing:"
echo "   - Visit your domain to test the site"
echo "   - Test navigation to different pages"
echo "   - Check that all images and assets load correctly"
echo ""
echo "5. 🚨 Troubleshooting:"
echo "   - If pages don't load: Check .htaccess file exists and has correct permissions"
echo "   - If images don't show: Verify the images folder is uploaded"
echo "   - If styles are broken: Ensure CSS files are in the assets folder"
echo ""
echo "📧 Need help? Contact your hosting provider's support team."
echo ""
echo "✨ Your HCSA website should now be live on your domain!"
echo "=================================="