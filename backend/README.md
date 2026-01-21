HRMS Backend (ready-to-run)
===========================

What's included
- index.js : Express server + MongoDB connection
- routes/items.js : CRUD endpoints for items
- models/Item.js : Mongoose schema
- package.json : scripts and deps
- .env.example : example env
- .env : prefilled with connection string (edit if needed)

Quick start (Windows / macOS / Linux)
1. Unzip and open a terminal in the backend folder.
2. Install dependencies:
   npm install
3. Edit .env if you want to change DB or PORT.
4. Start in development (auto-reload):
   npm run dev
   or for production:
   npm start
5. Test API:
   GET http://localhost:5000/api/items

Notes
- The provided .env contains the connection string you gave. If you'd rather not have credentials in files, remove or edit the .env before running.
