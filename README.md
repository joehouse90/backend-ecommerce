# 🚀 Proyecto E-commerce Backend - Entrega Final

Este proyecto es la **Entrega Final del curso de Backend en Coderhouse**.  
Se trata de un servidor desarrollado en **Node.js + Express + MongoDB** que gestiona productos y carritos, con vistas dinámicas en **Handlebars** y actualización en tiempo real mediante **WebSockets (Socket.IO)**.

---

## 📌 Objetivos
- Implementar **persistencia con MongoDB + Mongoose**.  
- Construir **endpoints RESTful** para productos y carritos.  
- Desarrollar vistas con **Handlebars** para la interacción del usuario.  
- Integrar **WebSockets** para la gestión en tiempo real de productos.  

---

## ⚙️ Tecnologías utilizadas
- Node.js + Express  
- MongoDB + Mongoose  
- Handlebars  
- Socket.IO  
- Dotenv  
- Nodemon  

---

## 🚦 Instalación y ejecución

1. Clonar este repositorio:
   git clone https://github.com/joehouse90/backend-ecommerce
   cd backend-ecommerce

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno en un archivo `.env`:
   MONGO_URI=mongodb+srv://<tu-cluster>
   PORT=8080

4. Ejecutar el servidor:
   npm run dev

Servidor corriendo en:  
👉 http://localhost:8080

---

## 🛒 Endpoints principales

### Productos (/api/products)
- **GET /** → lista de productos con paginación, filtros y orden:  
  /api/products?limit=10&page=1&sort=asc&query=categoria  
- **GET /:pid** → producto por ID.  
- **POST /** → crear producto.  
- **PUT /:pid** → actualizar producto.  
- **DELETE /:pid** → eliminar producto.  

📌 Respuesta con formato:
{
  "status": "success",
  "payload": [],
  "totalPages": 0,
  "prevPage": 0,
  "nextPage": 0,
  "page": 0,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": null
}

---

### Carritos (/api/carts)
- **POST /** → crea un carrito vacío.  
- **GET /:cid** → obtiene productos del carrito con populate.  
- **POST /:cid/product/:pid** → agrega producto (si existe, aumenta quantity).  
- **PUT /:cid** → reemplaza todo el carrito con un nuevo array.  
- **PUT /:cid/products/:pid** → actualiza cantidad de un producto.  
- **DELETE /:cid/products/:pid** → elimina un producto específico.  
- **DELETE /:cid** → vacía el carrito completo.  

---

## 🖼️ Vistas con Handlebars
- **/** (Home) → Bienvenida + listado estático de productos + acceso a productos en tiempo real.  
- **/products** → Lista paginada de productos con botón para agregar al carrito.  
- **/products/:pid** → Detalle de un producto con opción de agregar al carrito.  
- **/carts/:cid** → Vista de carrito con productos poblados, subtotales, total y opciones para vaciar o eliminar.  
- **/realtimeproducts** → Panel dinámico de administración de productos con Socket.IO.  

---

## ⚡ Funcionalidades en tiempo real
- Crear productos desde el formulario en /realtimeproducts.  
- Eliminar productos desde el panel.  
- La lista se actualiza automáticamente sin recargar la página.  

---


---

## 👨‍💻 Autor
**Joel Simoes Daniel**  
Entrega Final - Curso de Backend en Coderhouse 🚀  

