# Shoe Reselling Full Stack Application

This project is now scaffolded as a full stack application with:
- **Backend:** Node.js, Express, MongoDB (REST APIs for products, users, authentication (JWT), cart, orders)
- **Frontend:** React (consumes backend APIs)

## Structure
- `backend/` — Node.js/Express/MongoDB API
- `frontend/` — React app

## Migration Instructions for Static Assets
If you have existing static HTML, CSS, JS, or images:
- **HTML/JS:** Convert your static HTML/JS into React components inside `frontend/src/`.
- **CSS:** Place global CSS in `frontend/public/` or use CSS modules in `frontend/src/`.
- **Images/Assets:** Place in `frontend/public/` for direct access or import into React components from `frontend/src/`.

## Getting Started

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with `MONGO_URI` and (optionally) `PORT`.
4. `npm run dev` (for development with nodemon)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

---

For further customization, implement the models, controllers, and React components as needed.
