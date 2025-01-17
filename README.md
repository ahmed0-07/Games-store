# Game Store

A web application for selling PlayStation games. Users can browse games, add them to their cart, and make purchases. Admins can manage games (add, remove).

---

## Features

### User Features
- **Browse Games**: View a list of featured games with details (name, price).
- **Add to Cart**: Add games to the shopping cart.
- **View Cart**: See all games added to the cart.
- **Checkout**: Proceed to checkout (placeholder functionality).
- **Authentication**: Sign up, log in, and log out.

### Admin Features
- **Add Game**: Add new games to the store.
- **Remove Game**: Remove games from the store.
- **Manage Games**: View and manage all games in the store.

---

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - Bootstrap (for styling)
  - EJS (for templating)

- **Backend**:
  - Node.js
  - Express.js (for routing)
  - MongoDB (for database)
  - Mongoose (for database modeling)

- **Authentication**:
  - JSON Web Tokens (JWT)

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running.

### Steps
1. **Clone the repository**:
   ```bash
    git clone https://github.com/ahmed0-07/Games-store.git
    cd Games-store

2. **Install dependencies**:
   ```bash
    npm install

3. **Set up environment variables**:
Create a .env file in the root directory and add the following:
   ```env
    MONGODB_URI=your-url
    JWT_SECRET=your-secret-key
    PORT=your-port

4. **Install dependencies**:
   ```bash
    npx nodemon app.js

5. **Access the application**:
   Open your browser and go to http://localhost:(your-port)

**Home page**:
![Home page](Myimgs/Homepage.png)

**Login**:
![login](Myimgs/Screenshot%20(127).png)

**User Home page**:
![user](Myimgs/Screenshot%20(130).png)

**Cart**:
![cart](Myimgs/Screenshot%20(131).png)

![thnx](Myimgs/Screenshot%20(132).png)

**Admin home page**:
![admin](Myimgs/Screenshot%20(128).png)

**Adding games**:
![add](Myimgs/Screenshot%20(129).png)