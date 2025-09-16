import { Router } from "express";
import ProductManagerFS from "../managers/ProductManagerFS.js";

const router = Router();
const pm = new ProductManagerFS();

// / -> home con lista “estática” (HTTP)
router.get("/", async (_req, res) => {
  const products = await pm.getAll(); // devuelve array directo
  res.render("home", {
    title: "Home | Productos",
    products
  });
});

// /realtimeproducts -> vista con sockets
router.get("/realtimeproducts", async (_req, res) => {
  const products = await pm.getAll();
  res.render("realTimeProducts", {
    title: "Productos en tiempo real",
    products
  });
});

export default router;

