import { Router } from "express";
import * as productService from "../services/productService.js";
import * as cartService from "../services/cartService.js";

const router = Router();


router.get("/", (req, res) => {
  res.render("home", { title: "Bienvenido a mi tienda" });
});


router.get("/products", async (req, res) => {
  try {
    
    const result = await productService.getProducts(req.query);
    const products = result.payload;

    const cartId = "68df418e3f02a4725a3bbc86";

    
    res.render("products", { products, cartId });
  } catch (error) {
    console.error("Error cargando productos:", error);
    res.status(500).send("Error cargando productos: " + error.message);
  }
});


router.get("/products/:pid", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", { 
      product: product.toObject ? product.toObject() : product 
    });
  } catch (error) {
    console.error("Error cargando producto:", error);
    res.status(500).send("Error cargando producto: " + error.message);
  }
});


router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cartDetail", { 
      cart: cart.toObject ? cart.toObject() : cart 
    });
  } catch (error) {
    console.error("Error cargando carrito:", error);
    res.status(500).send("Error cargando carrito: " + error.message);
  }
});


router.get("/realtimeproducts", async (req, res) => {
  try {
    const result = await productService.getProducts({});
    const products = result.payload || [];
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error cargando productos en tiempo real:", error);
    res.status(500).send("Error cargando realtimeproducts: " + error.message);
  }
});

export default router;







