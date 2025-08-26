# Backend E-commerce — Entrega 1 (Mate & Yerbas)

API en Node + Express con persistencia en archivos (FS).
- Puerto: 8080
- Rutas: /api/products y /api/carts
- Managers: ProductManager y CartManager
- Test: Postman / navegador (no hay frontend)

## Cómo correr
npm install
npm run dev   # (nodemon) o npm start

## Endpoints
GET  /health
GET  /api/products
GET  /api/products/:pid
POST /api/products
PUT  /api/products/:pid
DEL  /api/products/:pid

POST /api/carts
GET  /api/carts/:cid
POST /api/carts/:cid/product/:pid   # agrega o incrementa quantity
