# Snooker Shoot-Out Timer

A fullscreen match timer + shot clock app for Snooker Shoot-Out style games.  
Built with React + Electron, designed for laptop use with audio cues, configurable foul points, bilingual support, and intuitive scoring.

---

## Features

- Shot Clock with visual + numeric countdown  
- Match Timer (10 min default, with audio warning at 5 min)  
- Sound cues for countdown and timeouts  
- Click ball buttons to add points  
- Long press to undo a point  
- Foul entry with custom point input (via on-screen numpad or keyboard)  
- Settings for language (English / Finnish) and player names  
  - Default language: **Finnish**
  - To change default, edit this line in `App.js`:  
    ```js
    const [language, setLanguage] = useState("FI");
    ```
    → Change `"FI"` to `"EN"`  
  - You can also change it in-app under **Asetukset** (Settings)
- "Close App" button with confirmation prompt  
- Packaged for Windows (.exe)

---

## Installation (Development)

```bash
git clone https://github.com/JussiMo/shootout-timer.git
cd shootout-timer
npm install
npm run start
```

To launch with Electron:

```bash
npm run build
npm run electron
```

---

## Build Electron App

To package the app into a Windows executable:

```bash
npx electron-packager . shootout-timer \
  --platform=win32 \
  --arch=x64 \
  --icon=icon.ico \
  --overwrite \
  --asar
```

This will create a `shootout-timer-win32-x64/` folder with the `.exe` file.

---

## Notes

- Works best in fullscreen mode  
- Designed for physical, in-person matches  
- Tested and used on Windows laptops
