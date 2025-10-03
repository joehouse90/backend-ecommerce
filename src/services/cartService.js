import mongoose from "mongoose";
import { Cart } from "../models/Cart.js";

// ✅ Crear carrito vacío
export const createCart = async () => {
  const cart = new Cart({ products: [] });
  await cart.save();
  return await cart.populate("products.product"); 
};

// ✅ Obtener carrito por ID con populate
export const getCartById = async (cid) => {
  if (!mongoose.Types.ObjectId.isValid(cid)) return null;
  return await Cart.findById(cid).populate("products.product");
};

// ✅ Agregar producto al carrito (o aumentar cantidad si ya existe)
export const addProductToCart = async (cid, pid, quantity = 1) => {
  if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
    return null;
  }

  const cart = await Cart.findById(cid);
  if (!cart) return null;

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === pid
  );

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += Number(quantity);
  } else {
    cart.products.push({
      product: new mongoose.Types.ObjectId(pid),
      quantity: Number(quantity),
    });
  }

  await cart.save();
  return await cart.populate("products.product");
};

// ✅ Eliminar un producto específico del carrito
export const removeProductFromCart = async (cid, pid) => {
  if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
    return null;
  }

  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== pid
  );

  await cart.save();
  return await cart.populate("products.product");
};

// ✅ Reemplazar carrito completo con nuevo array de productos
export const replaceCart = async (cid, products) => {
  if (!mongoose.Types.ObjectId.isValid(cid)) return null;

  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = products.map((p) => ({
    product: new mongoose.Types.ObjectId(p.product),
    quantity: Number(p.quantity),
  }));

  await cart.save();
  return await cart.populate("products.product");
};

// ✅ Actualizar cantidad de un producto específico
export const updateProductQuantity = async (cid, pid, quantity) => {
  if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
    return null;
  }

  const q = Number(quantity);
  if (!Number.isFinite(q) || q < 1) {
    throw new Error("Quantity must be a positive number");
  }

  const res = await Cart.updateOne(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": q } }
  );

  if (res.matchedCount === 0) {
    return null;
  }

  return await Cart.findById(cid).populate("products.product");
};

// ✅ Vaciar carrito
export const clearCart = async (cid) => {
  if (!mongoose.Types.ObjectId.isValid(cid)) return null;

  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = [];
  await cart.save();
  return await cart.populate("products.product");
};




