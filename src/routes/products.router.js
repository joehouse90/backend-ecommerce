import { Router } from "express";
import ProductManagerFS from "../managers/ProductManagerFS.js";

const router = Router();
const pm = new ProductManagerFS();

// GET lista con querys (opcional)
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await pm.getAll({ limit, page, sort, query });
    res.json(result);
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const prod = await pm.getById(req.params.pid);
    if (!prod) return res.status(404).json({ status: "error", error: "No encontrado" });
    res.json({ status: "success", payload: prod });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// CREATE -> emite actualización
router.post("/", async (req, res) => {
  try {
    const created = await pm.add(req.body);
    // Emitir nueva lista
    const io = req.app.get("io");
    const full = await pm.getAll({});
    io.emit("products:updated", full.payload);

    res.status(201).json({ status: "success", payload: created });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
});

// UPDATE (no es obligatorio para la consigna, pero útil)
router.put("/:pid", async (req, res) => {
  try {
    const updated = await pm.update(req.params.pid, req.body);
    const io = req.app.get("io");
    const full = await pm.getAll({});
    io.emit("products:updated", full.payload);

    res.json({ status: "success", payload: updated });
  } catch (err) {
    const code = /no encontrado/i.test(err.message) ? 404 : 400;
    res.status(code).json({ status: "error", error: err.message });
  }
});

// DELETE -> emite actualización
router.delete("/:pid", async (req, res) => {
  try {
    await pm.delete(req.params.pid);
    const io = req.app.get("io");
    const full = await pm.getAll({});
    io.emit("products:updated", full.payload);

    res.json({ status: "success" });
  } catch (err) {
    const code = /no encontrado/i.test(err.message) ? 404 : 400;
    res.status(code).json({ status: "error", error: err.message });
  }
});

export default router;

