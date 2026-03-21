Personal Finance Planner
A responsive budget tracking web app built with vanilla HTML, CSS, and JavaScript. Track your monthly expenses by category, set a budget, and get real-time spending insights — all without any frameworks or dependencies.

live link
https://personal-finance-planner-xi.vercel.app/

Features

Monthly budget setting — Set a budget for each month separately
Add expenses — Log expenses with amount, category, date, and an optional note
Edit & delete — Update or remove any expense entry
Spending breakdown — See how much you spent per category with percentage split
Real-time dashboard — Total spent and remaining balance update instantly
Overspending warning — Highlights the highest spending category as a percentage of your budget
Data persistence — All data saved to localStorage, survives page refresh and browser close
Month switcher — Switch between months and view that month's data independently
Responsive design — Works on mobile, tablet, and desktop
Zero dependencies — Pure HTML, CSS, JavaScript, no libraries or frameworks


Categories

Food
Rent
Utilities
Travel
Others


Tech Stack
TechnologyUsageHTML5Structure and layoutCSS3Styling, responsive grid, media queriesJavaScript (ES6+)App logic, DOM manipulation, state managementlocalStorage APIClient-side data persistence

Project Structure
Personal-Finance-Planner/
├── index.html       # App layout and structure
├── styles.css       # All styling including responsive breakpoints
└── scripts.js       # Full app logic — state, events, render functions

How to Run Locally
No installation needed. Just clone and open.
bash# Clone the repository
git clone https://github.com/Anandhu9255/personal-finance-planner.git

# Navigate into the folder
cd personal-finance-planner

# Open in browser
open index.html
Or simply download the ZIP, extract it, and double-click index.html.

How to Use

Set your budget — Enter a budget amount in the "Budget Amount" field at the top
Select a month — Use the month picker to choose the month you want to track
Add an expense — Fill in the amount, category, date, and an optional note, then click "+ Add Expense"
View breakdown — The Spending Breakdown section shows how your spending is split across categories
Edit an expense — Click the ✏️ button on any expense row to load it back into the form and update it
Delete an expense — Click the 🗑️ button to remove a single entry
Clear all — Use the "Clear All" button to wipe all expenses for the current month


Key JavaScript Concepts Used

DOM selection and manipulation
Event listeners (click, change)
Array methods — push, filter, find, reduce, sort, forEach
localStorage — getItem, setItem, JSON.parse, JSON.stringify
Dynamic HTML rendering with innerHTML and createElement
Date handling and month-based filtering
State management with plain JS variables

Future Improvements

 Add a visual bar chart for the spending breakdown
 Export expenses to CSV
 Add custom categories
 Dark mode support
 Monthly comparison view
