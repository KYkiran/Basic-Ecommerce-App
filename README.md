# Product Manager

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing product inventory with ease.



## Features

- **Product Management**: Add, edit, and delete products
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode Toggle**: User-friendly interface with theme options
- **Image Previews**: Visual representation of products
- **Real-time Updates**: Instant reflection of changes in the product list

## Tech Stack

### Frontend
- **React.js**: UI library for building the user interface
- **React Query**: For data fetching, caching, and state management
- **Native Fetch API**: For making HTTP requests to the backend
- **Tailwind CSS**: For styling components with utility classes

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing product information
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js

## Installation and Setup

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/KYkiran/Basic-Ecommerce-App.git
   cd Basic-Ecommerce-App
   ```

2. **Install dependencies for backend**
   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=<Your-MongoDB-API-link>
   
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
product-manager/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
|   ├── package.json
|   ├── postcss.config.js
|   ├── tailwind.config.js
|   ├── vite.config.js
|   |── src/
|       ├── App.jsx                   
|       ├── api.js                    
|       ├── index.css                 
|       ├── main.jsx                  
|       └── components/
|           ├── Navbar.jsx            
|           ├── ProductForm.jsx       
|           ├── ProductList.jsx       
|           └── Toast.jsx
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products |
| POST   | /api/products | Create a new product |
| PUT    | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |

## Database Schema

### Product Model
```javascript
{
  name: String,
  price: Number,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Acknowledgements

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
