📊 Expense Tracker Backend (MERN)

This is the backend service for the Expense Tracker application. It provides RESTful APIs for user authentication, income/expense management, dashboard statistics, and file uploads.
Built with Node.js, Express, MongoDB, and JWT authentication.

🚀 Features

🔑 User Authentication (Register, Login, JWT-based Auth)

👤 User Profile management

💰 Manage Incomes (Add, Get, Delete, Export as Excel)

🧾 Manage Expenses (Add, Get, Delete, Export as Excel)

📊 Dashboard stats (Total Income, Total Expenses, Balance)

📂 File upload support (profile images, receipts, etc.) via Multer

🔒 Password hashing with bcrypt

🌍 CORS-enabled for frontend connection

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT, bcrypt

File Uploads: Multer

Other: dotenv, cors, nodemon

📂 Project Structure
backend/
│── config/            # Database config
│   └── db.js
│
│── controller/        # Controllers (Auth, Income, Expense, Dashboard)
│   └── authController.js
│   └── incomeController.js
│   └── expenseController.js
│   └── dashboardController.js
│
│── middleware/        # Middlewares
│   └── authMiddleware.js
│   └── uploadMiddleware.js
│
│── models/            # Mongoose models
│   └── User.js
│   └── Income.js
│   └── Expense.js
│
│── routes/            # Routes
│   └── authRoutes.js
│   └── incomeRoutes.js
│   └── expenseRoute.js
│   └── dashboardRoutes.js
│
│── uploads/           # Uploaded files (auto-created)
│
│── .env.example       # Example environment variables
│── server.js          # Entry point
│── package.json

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/SwaminathanVK/expense-Tracker-BE.git
cd expense-Tracker-BE

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory and add:

MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=your_jwt_secret_here
PORT=4000


(Do not commit .env to GitHub — use .env.example instead!)

4️⃣ Run the Server

For development (auto-reload with nodemon):

npm run dev


Or normal start:

npm start

📡 API Endpoints
🔑 Auth

POST /api/v1/auth/register → Register user

POST /api/v1/auth/login → Login user

GET /api/v1/auth/user → Get logged-in user (JWT protected)

POST /api/v1/auth/upload-image → Upload image

💰 Income

POST /api/v1/income/add → Add income

GET /api/v1/income/get → Get all incomes

DELETE /api/v1/income/:id → Delete income

GET /api/v1/income/downloadexcel → Download income report

🧾 Expense

POST /api/v1/expense/add → Add expense

GET /api/v1/expense/get → Get all expenses

DELETE /api/v1/expense/:id → Delete expense

GET /api/v1/expense/downloadexcel → Download expense report

📊 Dashboard

GET /api/v1/dashboard → Get income/expense stats

🛡️ Authentication

Uses JWT stored in frontend localStorage

Protected routes require Authorization: Bearer <token> header

Example:

GET /api/v1/income/get
Authorization: Bearer your_jwt_token_here

✅ Best Practices

.env file must not be pushed → use .env.example

Use strong JWT_SECRET in production

Use MongoDB Atlas for deployment instead of local DB

📌 Future Improvements

Add categories for expenses/incomes

Add pagination & filters

Add monthly/yearly reports

Deploy backend on Render/Heroku and frontend on Vercel/Netlify

👨‍💻 Author

Swaminathan VK

GET /api/v1/income/get
Authorization: Bearer your_jwt_token_here
