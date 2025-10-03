import { Router } from "express";
import * as cartService from "../services/cartService.js";

const router = Router();


router.post("/", async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const updatedCart = await cartService.addProductToCart(cid, pid, quantity);
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.removeProductFromCart(cid, pid);
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.delete("/:cid", async (req, res) => {
  try {
    const updatedCart = await cartService.clearCart(req.params.cid);
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body; 
    const updatedCart = await cartService.replaceCart(cid, products);
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ status: "error", message: "Cantidad inválida" });
    }

    const updatedCart = await cartService.updateProductQuantity(cid, pid, quantity);
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;




