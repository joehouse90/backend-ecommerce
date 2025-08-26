import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const pm = new ProductManager();

router.get('/', async (_req, res) => {
  const data = await pm.getProducts();
  res.json(data);
});

router.get('/:pid', async (req, res) => {
  const item = await pm.getProductById(req.params.pid);
  if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const created = await pm.addProduct(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.updateProduct(req.params.pid, req.body);
    res.json(updated);
  } catch (err) {
    const code = /no encontrado/i.test(err.message) ? 404 : 400;
    res.status(code).json({ error: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const removed = await pm.deleteProduct(req.params.pid);
    res.json(removed);
  } catch (err) {
    const code = /no encontrado/i.test(err.message) ? 404 : 400;
    res.status(code).json({ error: err.message });
  }
});

export default router; // <--- IMPORTANTE
