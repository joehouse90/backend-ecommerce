# 🛒 Backend E-commerce - Entrega 1

API RESTful desarrollada en **Node.js + Express**, que gestiona **productos** y **carritos de compra**.  
La persistencia se realiza mediante archivos JSON (`products.json` y `carts.json`).

---

## 🚀 Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Levantar el servidor en modo desarrollo (con nodemon)
npm run dev
```

El servidor queda disponible en:  
👉 http://localhost:8080

---

## 📦 Estructura sugerida del proyecto

```
backend-ecommerce/
  data/
    products.json
    carts.json
  src/
    managers/
      ProductManager.js
      CartManager.js
    routes/
      products.router.js
      carts.router.js
    utils/
      id.js
    app.js
  package.json
  README.md
  .gitignore
```
> *La persistencia usa `data/products.json` y `data/carts.json`.*

---

## 📂 Endpoints

### 🔹 Products

| Método | Endpoint             | Descripción                      |
|-------:|----------------------|----------------------------------|
| GET    | `/api/products`      | Lista todos los productos        |
| GET    | `/api/products/:pid` | Obtiene un producto por ID       |
| POST   | `/api/products`      | Crea un nuevo producto           |
| PUT    | `/api/products/:pid` | Actualiza un producto existente  |
| DELETE | `/api/products/:pid` | Elimina un producto              |

#### 📌 Ejemplo POST (crear producto)

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

**Response (ejemplo)**
```json
{
  "id": 10,
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

---

### 🔹 Carts

| Método | Endpoint                           | Descripción                                        |
|-------:|------------------------------------|----------------------------------------------------|
| POST   | `/api/carts`                       | Crea un carrito vacío                              |
| GET    | `/api/carts/:cid`                  | Lista los productos de un carrito por ID           |
| POST   | `/api/carts/:cid/product/:pid`     | Agrega un producto al carrito (o incrementa qty)   |

#### 📌 Ejemplo POST (agregar producto al carrito)

**Request**
```http
POST /api/carts/4/product/2
Content-Type: application/json
```

**Body**
```json
{ "quantity": 1 }
```

**Response (ejemplo)**
```json
{
  "id": 4,
  "products": [
    { "product": "2", "quantity": 1 }
  ]
}
```

---

## ✅ Notas de la entrega

- Puerto por defecto: **8080**.
- IDs se **autogeneran** (no se envían por body).
- En `PUT /api/products/:pid` **no se modifica** el `id`.
- En `POST /api/carts/:cid/product/:pid` si el producto ya existe en el carrito, se **incrementa** `quantity`.
- No se requiere frontend; se prueba con **Postman** o navegador (solo GET).

---

## 📦 Dependencias principales

- `express`
- `nodemon` (dev)

---

## ✨ Autor

**Joel Simoes Daniel** — Entrega 1 · Curso Backend Coderhouse

