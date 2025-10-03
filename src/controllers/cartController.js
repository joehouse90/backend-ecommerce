import mongoose from "mongoose";
import * as cartService from "../services/cartService.js";

// Crear carrito
export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Obtener carrito por ID
export const getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ status: "error", message: `Invalid cart id: ${cid}` });
    }
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: "error", message: `Invalid product id: ${pid}` });
    }

    const updatedCart = await cartService.addProductToCart(
      cid,
      pid,
      Number(quantity) || 1
    );

    if (!updatedCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Eliminar producto específico
export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: "error", message: "IDs inválidos" });
    }

    const updatedCart = await cartService.removeProductFromCart(cid, pid);
    if (!updatedCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Reemplazar carrito
export const updateCart = async (req, res) => {
  try {
    const updatedCart = await cartService.updateCart(req.params.cid, req.body.products);
    if (!updatedCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Actualizar cantidad
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: "error", message: "IDs inválidos" });
    }

    const updatedCart = await cartService.updateProductQuantity(
      cid,
      pid,
      Number(quantity)
    );

    if (!updatedCart) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }

    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const clearedCart = await cartService.clearCart(req.params.cid);
    if (!clearedCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", payload: clearedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

