# Music Player

A modern, responsive music player built with HTML, CSS, and JavaScript.

## Features

- 🎵 Play/Pause functionality
- ⏮️ Previous/Next song controls
- 🔀 Shuffle mode
- 🔁 Repeat mode (off, repeat all, repeat one)
- 🔊 Volume control
- 📊 Progress bar with time display
- 📋 Playlist display
- 🎨 Modern, gradient UI design
- 📱 Responsive design for mobile devices

## How to Use

1. Open `INDEX.HTML` in your web browser
2. Click the play button to start playing music
3. Use the controls to navigate through your playlist

## Adding Your Own Music

To add your own music files:

1. Place your music files (MP3 format recommended) in a `music` folder within the project directory
2. Open `script.js`
3. Modify the `playlist` array at the top of the file:

```javascript
const playlist = [
    {
        title: "Your Song Title",
        artist: "Artist Name",
        src: "music/your-song.mp3",  // Path to your music file
        cover: "path/to/cover-image.jpg"  // Optional: Path to album cover
    },
    // Add more songs...
];
```

### Using Online Audio Sources

You can also use online audio URLs:

```javascript
{
    title: "Song Title",
    artist: "Artist",
    src: "https://example.com/audio.mp3",
    cover: "https://example.com/cover.jpg"
}
```

## File Structure

```
musicplayer/
├── INDEX.HTML      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Compatibility

This music player works on all modern browsers that support HTML5 audio:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Customization

### Changing Colors

Edit the gradient colors in `styles.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Replace `#667eea` and `#764ba2` with your preferred colors.

### Changing Fonts

Modify the `font-family` property in `styles.css`:

```css
font-family: 'Your Font', sans-serif;
```

## Notes

- For best results, use MP3 format audio files
- Ensure audio files are properly encoded
- Album covers are optional but enhance the visual experience
- The player uses HTML5 Audio API, so no external libraries are required

## License

Free to use and modify for personal or commercial projects.

