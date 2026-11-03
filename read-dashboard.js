const fs = require('fs');
const path = './index.html';

if (!fs.existsSync(path)) {
    console.log("ERROR: index.html not found in current directory. Please run this in the folder containing your app.");
    process.exit(1);
}

const content = fs.readFileSync(path, 'utf8');

// Extract the main script section
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
if (!scriptMatch) {
    console.log("ERROR: Could not find the main script tag before </body>.");
    process.exit(1);
}

const scriptContent = scriptMatch[1];

// Find renderDashboard function
const renderStart = scriptContent.indexOf('function renderDashboard(c) {');
const renderEnd = scriptContent.indexOf('\nfunction renderDataEntry', renderStart);
const renderDashboard = renderStart !== -1 && renderEnd !== -1 ? scriptContent.substring(renderStart, renderEnd) : "NOT FOUND";

// Find initSearch function
const searchStart = scriptContent.indexOf('function initSearch() {');
const searchEnd = scriptContent.indexOf('\nfunction showStudentDetail', searchStart);
const initSearch = searchStart !== -1 && searchEnd !== -1 ? scriptContent.substring(searchStart, searchEnd) : "NOT FOUND";

console.log("=== CURRENT renderDashboard FUNCTION ===");
console.log(renderDashboard);
console.log("\n=== CURRENT initSearch FUNCTION ===");
console.log(initSearch);
console.log("\n=== READ COMPLETE ===");