import { Router } from 'express';
 import CartManager from '../managers/CartManager.js';

const router = Router();
const cm = new CartManager();


router.post('/', async (_req, res) => {
  const cart = await cm.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
  try {
    const products = await cm.listProducts(req.params.cid);
    res.json(products);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const qty = req.body?.quantity ?? 1; 
    const cart = await cm.addProduct(req.params.cid, req.params.pid, qty);
    res.status(201).json(cart);
  } catch (err) {
    const code = /no encontrado/i.test(err.message) ? 404 : 400;
    res.status(code).json({ error: err.message });
  }
});

export default router; 
