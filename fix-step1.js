const fs = require('fs');
const path = './index.html';

if (!fs.existsSync(path)) {
    console.log("ERROR: index.html not found. Please run this in the folder containing your app.");
    process.exit(1);
}

let c = fs.readFileSync(path, 'utf8');

// --- ANCHOR 1: Add the state variable ---
const anchor1 = 'let pastorSignatureData = null;';
if (!c.includes(anchor1)) {
    console.log("ANCHOR 1 NOT FOUND: Could not find variable declaration area.");
    process.exit(1);
}
const replace1 = `let pastorSignatureData = null;
let activeInsightStudentId = null; // Tracks the student selected via search for the dashboard charts`;
c = c.split(anchor1).join(replace1);
console.log("Anchor 1 matched and replaced.");

// --- ANCHOR 2: Update Search to trigger Insight Mode ---
const anchor2 = `onclick="showStudentDetail('\${id}')"`;
if (!c.includes(anchor2)) {
    console.log("ANCHOR 2 NOT FOUND: Could not find the search click handler.");
    process.exit(1);
}
const replace2 = `onclick="selectStudentForInsight('\${id}')"`;
c = c.split(anchor2).join(replace2);
console.log("Anchor 2 matched and replaced.");

// --- ANCHOR 3: Add the new Insight functions after initSearch ---
// We use a very specific, unique string from the read output
const anchor3 = "document.addEventListener('click', e => { if (!inp.contains(e.target) && !drop.contains(e.target)) drop.classList.add('hidden'); });";
if (!c.includes(anchor3)) {
    console.log("ANCHOR 3 NOT FOUND: Could not find the end of initSearch.");
    process.exit(1);
}

const replace3 = `document.addEventListener('click', e => { if (!inp.contains(e.target) && !drop.contains(e.target)) drop.classList.add('hidden'); });
}

function selectStudentForInsight(id) {
    activeInsightStudentId = id;
    document.getElementById('searchDropdown').classList.add('hidden');
    if (document.getElementById('globalSearch')) {
        document.getElementById('globalSearch').value = students[id]?.name || '';
    }
    // Force re-render of dashboard to show student charts
    if (currentView === 'dashboard') {
        renderDashboard(document.getElementById('contentArea'));
    } else {
        navigateTo('dashboard');
    }
}

function clearStudentInsight() {
    activeInsightStudentId = null;
    if (document.getElementById('globalSearch')) {
        document.getElementById('globalSearch').value = '';
    }
    renderDashboard(document.getElementById('contentArea'));
}`;

c = c.split(anchor3).join(replace3);
console.log("Anchor 3 matched and replaced.");

fs.writeFileSync(path, c, 'utf8');
console.log("\nSUCCESS: Dashboard state management and search hooks updated.");
console.log("- Added 'activeInsightStudentId' variable.");
console.log("- Search bar now triggers 'selectStudentForInsight'.");
console.log("- Added 'selectStudentForInsight' and 'clearStudentInsight' functions.");