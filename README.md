# Java Study Tracker

A full-stack application to track Java concepts learned daily! Built with React (frontend) and Spring Boot (backend).

## Features
- User Registration/Login
- Personal Dashboard with user's items
- "Till Now" page with all items from all users
- Non-case-sensitive search functionality
- Add new items with photos
- Password reset using only username
- Responsive UI

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- CSS (custom styling)

### Backend
- Spring Boot 3.3.2
- Spring Data JPA
- H2 Database (in-memory)
- Maven

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- Java 17+
- Maven

### Installation

#### Frontend
```bash
# Navigate to the project root
npm install
npm run dev
```

#### Backend
```bash
cd backend
mvn spring-boot:run
```

## Usage

1. Open the app at http://localhost:5173 (or whatever port Vite is running on)
2. Register a new account or login
3. Use the dashboard to add new Java concepts
4. Explore "Till Now" to see all items and search through them

## Project Structure

```
.
├── src/              # React frontend code
│   ├── components/   # Reusable components
│   ├── context/      # Auth context
│   ├── pages/        # Page components
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── backend/          # Spring Boot backend code
│   └── src/main/java/com/javastudy/jjj/
│       ├── controller/
│       ├── entity/
│       ├── repository/
│       └── service/
└── README.md
```

## Deployment

The app is ready to deploy! You can deploy the frontend to Vercel/Netlify and the backend to Railway/Heroku.

## License
MIT
