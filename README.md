# SpotQuest Backend: Photo Tagging App API

![SpotQuest Backend](https://res.cloudinary.com/dehoidlo0/image/upload/v1731857908/photo-tagging-app/lvrguait26lj7aivzjhr.png)

## [API Documentation]()

Welcome to the **SpotQuest Backend**, the server-side of the photo tagging game! This backend powers all the essential functionality, including user authentication, score tracking, and leaderboard management. It interacts seamlessly with the frontend to create an engaging experience for players.

## 🚀 Built With

- **Node.js** – The runtime environment for building scalable and efficient server-side applications.
- **Express.js** – The web framework for building the API and handling routing.
- **Prisma** – ORM tool to manage database queries and ensure efficient data handling.
- **dotenv** – For environment variable management to keep sensitive data secure.
- **cookie-parser** – Middleware for parsing cookies for session management.
- **cors** – Ensures cross-origin requests are handled securely.
- **express-session-with-prisma-session-store** – Manages user sessions for a personalized experience.

## ✨ Features

- **Session Management** – Users can log in and maintain sessions throughout their gameplay.
- **Leaderboard API** – Store and retrieve user scores, including time, username, and submission date.
- **Character Validation** – API endpoint to check if the clicked character is correct.
- **Custom Error Handling** – API responses are clearly structured to handle errors gracefully.

### 🌐 Prisma Integration

- **Database Management** – Prisma interacts with a PostgreSQL database to store game data, including user sessions and leaderboard scores.
- **Efficient Queries** – Fetch leaderboard data sorted by the fastest times to display player rankings.
- **Character Verification** – Verify if the clicked character is valid using Prisma’s database queries.

## 🧪 Testing with Vitest and Supertest

To ensure the stability and correctness of the API, **Supertest** and **Vitest** are used for testing:

- **Supertest** is employed for end-to-end HTTP testing, making sure all API endpoints function as expected.
- **Vitest** is used for unit and integration testing, ensuring that individual functions and modules are working as intended.

## 📸 More Screenshots

<details open>
  <summary>Click to view more images</summary>
  <img src="https://res.cloudinary.com/dehoidlo0/image/upload/v1731858065/photo-tagging-app/h19no79bje31fjpsqogd.png" alt="Homepage Endpoint">
  <img src="https://res.cloudinary.com/dehoidlo0/image/upload/v1731858170/photo-tagging-app/fp2e9qentrpppbr8au8u.png" alt="Leaderboard Endpoint">
  <img src="https://res.cloudinary.com/dehoidlo0/image/upload/v1731858011/photo-tagging-app/gmtoblx8qypwbw596izb.png" alt="Error Handling">
</details>

## 📄 Installation Instructions

To run **SpotQuest Backend** locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/oxamyt/photo-tagging-app-backend

   ```

2. cd photo-tagging-app-backend

   ```bash
   npm install

   ```

3. Create your own ENV variables for db,frontend url and secret.
   ```bash
   node app.js
   ```
