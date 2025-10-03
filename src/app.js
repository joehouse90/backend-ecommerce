import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

import dotenv from "dotenv";
import { connectDB } from "./config/database.js"; 
import * as productService from "./services/productService.js";  // ✅ Importamos servicios de productos

dotenv.config();
connectDB();

// --- Resolver __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

// Guardamos io en app para usarlo en routers si hace falta
app.set("io", io);

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Servir estáticos ---
app.use(express.static(path.join(__dirname, "public")));

// --- Handlebars con helpers ---
app.engine(
  "handlebars",
  engine({
    helpers: {
      eq: (a, b) => a === b, 
      json: (context) => JSON.stringify(context),
      calcTotal: (products) => {
        return products.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      },
      multiply: (a, b) => a * b   // ✅ helper para subtotales
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// --- Rutas ---
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// --- Socket.IO ---
io.on("connection", async (socket) => {
  console.log("Cliente conectado:", socket.id);

  // 🔹 Enviar lista inicial de productos
  const result = await productService.getProducts({});
  socket.emit("products:updated", result.payload);

  // 🔹 Crear producto en tiempo real
  socket.on("addProduct", async (data) => {
    try {
      await productService.createProduct(data);
      const updated = await productService.getProducts({});
      io.emit("products:updated", updated.payload); // emitimos a todos
    } catch (error) {
      console.error("Error creando producto en tiempo real:", error);
    }
  });

  // 🔹 Eliminar producto en tiempo real
  socket.on("deleteProduct", async (id) => {
    try {
      await productService.deleteProduct(id);
      const updated = await productService.getProducts({});
      io.emit("products:updated", updated.payload);
    } catch (error) {
      console.error("Error eliminando producto en tiempo real:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// --- Server ---
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});




