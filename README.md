# 🛒 Backend E-commerce – Entrega 1

API RESTful desarrollada en **Node.js + Express**, que gestiona **productos** y **carritos de compra**.  
La persistencia se realiza mediante archivos JSON (`products.json` y `carts.json`).

---

## ⚙️ Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Levantar el servidor en modo desarrollo (con nodemon)
npm run dev
```

El servidor queda disponible en:  
👉 http://localhost:8080

---

## 📂 Estructura de carpetas

```
backend-ecommerce/
├── data/
│   ├── carts.json
│   └── products.json
├── src/
│   ├── app.js
│   ├── managers/
│   │   ├── CartManager.js
│   │   └── ProductManager.js
│   ├── routes/
│   │   ├── carts.router.js
│   │   └── products.router.js
│   └── utils/
│       └── id.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔗 Endpoints

### 📦 Products

| Método | Endpoint              | Descripción                        |
|--------|------------------------|------------------------------------|
| GET    | /api/products          | Lista todos los productos          |
| GET    | /api/products/:pid     | Obtiene un producto por ID         |
| POST   | /api/products          | Crea un nuevo producto             |
| PUT    | /api/products/:pid     | Actualiza un producto existente    |
| DELETE | /api/products/:pid     | Elimina un producto                |

### 🛒 Carts

| Método | Endpoint                        | Descripción                                      |
|--------|----------------------------------|--------------------------------------------------|
| POST   | /api/carts                       | Crea un nuevo carrito                            |
| GET    | /api/carts/:cid                  | Lista los productos de un carrito                |
| POST   | /api/carts/:cid/product/:pid     | Agrega un producto al carrito (o incrementa qty) |

---

## 📌 Ejemplo de requests

### 🔹 Crear producto

**Request**

```http
POST /api/products
Content-Type: application/json
```

**Body**
```json
{
  "title": "Mate de vidrio premium",
  "description": "Mate de vidrio forrado en cuero, fácil de limpiar",
  "code": "MAT-VID-010",
  "price": 2800,
  "status": true,
  "stock": 12,
  "category": "mates",
  "thumbnails": ["/img/mate_vidrio.jpg"]
}
```

**Response**
```json
{
  "id": 10,
  "title": "Mate de vidrio premium",
  "price": 2800,
  "stock": 12,
  "category": "mates"
}
```

---

### 🔹 Crear carrito

**Request**
```http
POST /api/carts
```

**Response**
```json
{
  "id": 3,
  "products": []
}
```

---

### 🔹 Agregar producto al carrito

**Request**
```http
POST /api/carts/3/product/2
Content-Type: application/json
```

**Body**
```json
{ "quantity": 1 }
```

**Response**
```json
{
  "id": 3,
  "products": [
    { "product": "2", "quantity": 1 }
  ]
}
```

---

## 🧪 Cheatsheet con cURL

```bash
# Obtener todos los productos
curl -X GET http://localhost:8080/api/products

# Crear un nuevo producto
curl -X POST http://localhost:8080/api/products   -H "Content-Type: application/json"   -d '{"title":"Mate de vidrio premium","price":2800,"stock":12,"category":"mates"}'

# Crear carrito
curl -X POST http://localhost:8080/api/carts

# Agregar producto al carrito
curl -X POST http://localhost:8080/api/carts/1/product/2 -H "Content-Type: application/json" -d '{"quantity":1}'
```

---

## 📦 Dependencias principales

- `express`
- `nodemon` (dev)

---

## ✨ Autor

**Joel Simoes Daniel** – Entrega 1 · Curso Backend Coderhouse
