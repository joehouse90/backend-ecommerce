import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

// --- Resolver __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

// Guardamos io en app para usarlo en los routers
app.set("io", io);

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Servir estáticos ---
// Ahora cualquier archivo dentro de src/public se sirve directo desde /
app.use(express.static(path.join(__dirname, "public")));

// --- Handlebars ---
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// --- Rutas ---
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// --- Socket.IO ---
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// --- Server ---
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});



