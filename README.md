# About this app

The client side of this app was created using React and TypeScript, while the server side was developed using NestJS and Node.js with Express.

The goal of this app was to create a functional version of an online store with essential features, including below:

- User registration, 
- User login,
- Password reset & reminder.
- Searching items by category or keywords,
---

## Technologies and libraries

### On the client side, I used the following technologies:

- **TypeScript** – for static typing,
- **React** – to build the user interface,
- **Redux Toolkit** – for state management,
- **RTK Query** – for handling data queries and caching,
- **React Router** – for navigation between components,
- **Ant Design** – UI components,
- **Axios** – for HTTP requests.
- **Error boundry** - for error handling.

### On the server side, I used:

- **NestJS** – a Node.js framework,
- **Express** – as the HTTP server,
- **bcryptjs** – for password hashing,
- **jsonwebtoken** – for handling JWT-based authentication,
- **nodemailer** – for sending email notifications,
- **mongoose** – as the MongoDB ORM.

---
Todo: 
- Add sharp for image processing or something similar.
- Add settings panel for user,
- Add option for change avatar,
- Adding and removing items from the shopping cart, 
- Viewing transaction history and purchase details,
- Admin capabilities to manage user information, review transactions, and modify the store inventory.

---

How to run this app?

---

Clone repository with git clone https://github.com/DendiLBN/bookStore.
Fetch all dependencies on the server side using npm install or yarn install and then go to the client - ./client and fetch all dependiences using also npm or yarn.
Run app using npm run dev or yarn dev.
Open http://localhost:3000 to view it in the browser.
