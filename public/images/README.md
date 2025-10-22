# Images Folder Structure

## How to Add Images

Place your images in the appropriate folders:

### About Section Images
- `public/images/about/team-1.jpg` - First team/meeting image
- `public/images/about/team-2.jpg` - Second team/collaboration image  
- `public/images/about/team-3.jpg` - Third team/working image

### Hero Section
- `public/images/hero-bg.jpg` - Hero background image (optional)

### Winners/Leaders
- `public/images/winners/` - Photos of award winners and leaders

### Countries
- `public/images/flags/` - Country-specific images and flags

### Presidential Outfit
- `public/images/outfit/presidential-outfit.jpg` - The presidential outfit photo

## Image Specifications

### Recommended sizes:
- **About section images**: 800x600px or similar aspect ratio
- **Hero images**: 1920x1080px for backgrounds
- **Winner photos**: 400x400px (square)
- **Presidential outfit**: 800x1000px (portrait)

### Formats:
- Use `.jpg` or `.webp` for photos
- Use `.png` for images with transparency
- Optimize images before uploading (compress to reduce file size)

## Usage in Code

Images in the `public` folder can be referenced like this:
```jsx
<img src="/images/about/team-1.jpg" alt="Team meeting" />
```

The `/` at the beginning refers to the `public` folder automatically.
