# Backend Ecommerce - Entrega Nº2

Proyecto desarrollado como parte del curso **Backend (Coderhouse)**.  
Esta entrega implementa un servidor con **Express**, **Handlebars** y **WebSockets** para gestionar productos en tiempo real.

---

## 🚀 Características
- Servidor con **Express** y **Nodemon**.
- Motor de plantillas **Handlebars** para vistas dinámicas.
- Persistencia de productos en archivo `data/products.json`.
- Vista **Home** (`/`) que muestra la lista de productos cargados.
- Vista **RealTimeProducts** (`/realtimeproducts`) que permite:
  - Crear nuevos productos en vivo.
  - Eliminar productos en vivo.
- Actualización automática de la lista gracias a **Socket.IO**.
- Carpeta `public/` para archivos estáticos (CSS y JS).
- Visualización inmediata de productos recién creados en la vista realtime.

---

## 📂 Estructura del proyecto
```plaintext
backend-ecommerce/
├── data/
│   └── products.json
├── src/
│   ├── managers/              # Lógica de acceso a datos (ProductManagerFS)
│   ├── public/                # Archivos estáticos (css, js)
│   │   ├── css/
│   │   └── js/realtime.js
│   ├── routes/                # Routers (products, carts, views)
│   ├── views/                 # Vistas Handlebars
│   │   ├── layouts/main.handlebars
│   │   ├── home.handlebars
│   │   └── realTimeProducts.handlebars
│   └── app.js                 # Configuración principal del servidor
├── package.json
└── README.md



---

## ⚙️ Instalación
1. Clonar el repositorio o descargarlo en tu PC.
2. Instalar dependencias:
   npm install
3. Levantar el servidor en modo desarrollo:
   npm run dev

---

## 🌐 Rutas disponibles
- `/` → Vista **Home** con la lista de productos.
- `/realtimeproducts` → Vista con productos en tiempo real (crear/eliminar).
- `/api/products` → API REST para productos (**GET, POST, DELETE**).
- `/api/carts` → API REST básica de carritos.

---

## ✅ Requisitos cumplidos (Entrega 2)
- Implementación de **Express** y **Vistas**.
- Configuración de **WebSockets (Socket.IO)**.
- Vista `home.handlebars` con lista estática de productos.
- Vista `realTimeProducts.handlebars` con lista dinámica.
- Formularios para crear y eliminar productos.
- Actualización automática sin recargar página.
- Persistencia de productos en archivo **JSON**.

---

## 👨‍💻 Autor
Joel Simoes Daniel



