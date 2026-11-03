const fs = require('fs');
const path = './vercel.json';

// Read before writing: Check if file exists
if (fs.existsSync(path)) {
    console.log("vercel.json already exists. Current state:");
    console.log(fs.readFileSync(path, 'utf8'));
    console.log("\nNo changes made.");
    process.exit(0);
}

// Create the configuration
const content = `{
  "version": 2,
  "name": "ksf-discipleship-tracker",
  "builds": [
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "manifest.json", "use": "@vercel/static" },
    { "src": "service-worker.js", "use": "@vercel/static" },
    { "src": "download.jpeg", "use": "@vercel/static" },
    { "src": "teachers.JPG", "use": "@vercel/static" },
    { "src": "icon.png", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ]
}`;

fs.writeFileSync(path, content, 'utf8');
console.log("SUCCESS: Created vercel.json for Vercel deployment.");
console.log("- Configured static builds for all app assets.");
console.log("- Set up routing to serve index.html correctly.");
