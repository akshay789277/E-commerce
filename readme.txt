BACKEND
pip install Flask Flask-MySQLdb flask-cors

python app.py

Frontend
npx create-react-app frontend
cd frontend
npm install axios
npm install react-router-dom

npm start


Database:
CREATE DATABASE productdb;

USE productdb;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    description TEXT
);

