# app.py
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'admin'
app.config['MYSQL_DB'] = 'productdb'

mysql = MySQL(app)

# Create a route to get all products
@app.route('/products', methods=['GET'])
def get_products():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, name, price FROM products")
        products = cur.fetchall()
        cur.close()
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create a route to add a product
@app.route('/product', methods=['POST'])
def add_product():
    product = request.json
    name = product['name']
    price = product['price']
    description = product['description']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO products (name, price, description) VALUES (%s, %s, %s)", (name, price, description))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Product added successfully'})

# Create a route to update a product
@app.route('/product/<id>', methods=['PUT'])
def update_product(id):
    product = request.json
    name = product['name']
    price = product['price']
    description = product['description']

    cur = mysql.connection.cursor()
    cur.execute("UPDATE products SET name=%s, price=%s, description=%s WHERE id=%s", (name, price, description, id))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Product updated successfully'})

# Create a route to delete a product
@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM products WHERE id=%s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Product deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
